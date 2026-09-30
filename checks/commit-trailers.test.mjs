#!/usr/bin/env node
/**
 * Counter-test for the commit-trailers check.
 *
 * Rule E3: a check is not trusted until it has been fed deliberate violations
 * and shown to fail on each, and shown to pass on the legitimate cases nearest
 * to them. Here the nearest legitimate cases are a commit only people wrote,
 * one with a person as co-author, and the lowercase key git itself writes.
 * Reporting any of them would teach people to ignore the check.
 *
 * The CLI cases run in a throwaway repository, because the two ways this check
 * could read nothing — no range, and a range with no commits — live there and
 * nowhere in the library.
 *
 * Usage: node commit-trailers.test.mjs
 */

import { spawnSync } from 'node:child_process';
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { finding, parseLog, trailers } from './lib/commit-trailers.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const CHECK = join(HERE, 'commit-trailers.mjs');

let failures = 0;
let ran = 0;

/**
 * @param name    what the case establishes
 * @param actual  what the assertion produced
 * @param wanted  what it should have produced
 */
function expect(name, actual, wanted) {
  ran += 1;
  const ok = JSON.stringify(actual) === JSON.stringify(wanted);
  if (!ok) failures += 1;
  console.log(`${ok ? 'ok  ' : 'FAIL'}  ${name}`);
  if (!ok) {
    console.log(`        wanted ${JSON.stringify(wanted)}`);
    console.log(`        got    ${JSON.stringify(actual)}`);
  }
}

const AGENT = 'Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>';
const ASSISTED = 'Assisted-by: Claude Opus 5.5';
const PERSON = 'Co-authored-by: Ada Example <ada@example.org>';

/** A commit message from a subject, a body and trailer paragraphs. */
const msg = (...paragraphs) => ['fix: a subject', 'A body line.', ...paragraphs].join('\n\n');

// ── the library ─────────────────────────────────────────────────────────────

expect('an agent co-author with Assisted-by passes',
  finding(msg(ASSISTED, AGENT)), null);
expect('an agent co-author without Assisted-by fails',
  finding(msg(AGENT)) !== null, true);
expect('a commit with neither trailer passes — only people wrote it',
  finding(msg()), null);
expect('a person as co-author passes without Assisted-by',
  finding(msg(PERSON)), null);
expect('both trailers in one paragraph pass',
  finding(msg(`${ASSISTED}\n${AGENT}`)), null);
expect('the lowercase key git writes is the same trailer',
  finding(msg('co-authored-by: Claude <noreply@anthropic.com>')) !== null, true);
expect('an agent named only by its address is still an agent',
  finding(msg('Co-Authored-By: Someone <x@anthropic.com>')) !== null, true);
expect('a bot co-author counts as an agent',
  finding(msg('Co-authored-by: helper[bot] <1+helper[bot]@users.noreply.github.com>')) !== null, true);
expect('an empty Assisted-by does not count',
  finding(msg('Assisted-by:', AGENT)) !== null, true);
expect('Assisted-by in a prose paragraph does not count',
  finding(msg(`This change was\n${ASSISTED}`, AGENT)) !== null, true);
expect('Assisted-by on the subject line does not count',
  finding([ASSISTED, AGENT].join('\n\n')) !== null, true);
expect('a trailer paragraph is read with CRLF line endings',
  finding(msg(ASSISTED, AGENT).replace(/\n/g, '\r\n')), null);
expect('the finding names the co-author it matched',
  /noreply@anthropic\.com/.test(finding(msg(AGENT)) ?? ''), true);
expect('trailers are read from every trailer paragraph, not only the last',
  trailers(msg(ASSISTED, AGENT)).map((t) => t.key), ['assisted-by', 'co-authored-by']);
expect('a log splits into its commits',
  parseLog('aaa\0one\n\0bbb\0two\n\0').map((c) => c.sha), ['aaa', 'bbb']);

// ── the CLI, in a throwaway repository ──────────────────────────────────────

const dir = mkdtempSync(join(tmpdir(), 'trailers-'));
const git = (...args) =>
  spawnSync('git', ['-c', 'user.name=Test', '-c', 'user.email=test@example.org',
    '-c', 'commit.gpgsign=false', ...args], { cwd: dir, encoding: 'utf8' });
let n = 0;
/** Commit a change to `file` with the given message and return its sha. */
function commit(message, file = 'f.txt') {
  writeFileSync(join(dir, file), String(n++));
  git('add', file);
  git('commit', '-q', '-m', message);
  return git('rev-parse', 'HEAD').stdout.trim();
}
const run = (...args) => spawnSync(process.execPath, [CHECK, ...args], { cwd: dir, encoding: 'utf8' });

try {
  git('init', '-q');
  const base = commit('chore: the base');
  const good = commit(msg(ASSISTED, AGENT));
  const human = commit(msg());

  // Each failure is asserted by what it says as well as by its exit code: the
  // three are reached by different guards, and without one of them the run
  // would still exit 1 by falling into the next.
  const none = run();
  expect('CLI: no range given fails, and says so',
    [none.status, none.stdout.includes('no range given')], [1, true]);
  const empty = run(`${human}..${human}`);
  expect('CLI: a range with no commits fails — nothing was read',
    [empty.status, empty.stdout.includes('nothing was read')], [1, true]);
  const wrong = run('no-such-ref..HEAD');
  expect('CLI: a range that does not resolve fails, and says git failed',
    [wrong.status, wrong.stdout.includes('git log no-such-ref..HEAD failed')], [1, true]);
  expect('CLI: a range of passing commits passes',
    run(`${base}..${human}`).status, 0);
  expect('CLI: the report says how many commits it read',
    /OK · 2 commit\(s\) read/.test(run(`${base}..${human}`).stdout), true);

  const bad = commit(msg(AGENT));
  expect('CLI: one failing commit in the range fails',
    run(`${base}..${bad}`).status, 1);
  expect('CLI: the report names the failing commit',
    run(`${base}..${bad}`).stdout.includes(bad.slice(0, 7)), true);

  // A file of its own on the side branch, so the merge cannot conflict.
  git('checkout', '-q', '-b', 'side', good);
  commit(msg(ASSISTED, AGENT), 'side.txt');
  git('checkout', '-q', '-');
  // The merge message names an agent and lacks the trailer on purpose, and the
  // range starts after `bad`: passing shows both that merges are left out and
  // that a commit before the range is not read.
  git('merge', '-q', '--no-ff', '-m', msg(AGENT), 'side');
  expect('CLI: a merge commit, and a commit before the range, are not read',
    run(`${bad}..HEAD`).status, 0);
} finally {
  rmSync(dir, { recursive: true, force: true });
}

console.log(`\n${ran} cases, ${failures} failed`);
process.exit(failures ? 1 : 0);
