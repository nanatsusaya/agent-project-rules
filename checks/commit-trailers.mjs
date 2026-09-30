#!/usr/bin/env node
/**
 * Delivery check: does every commit an agent helped with carry `Assisted-by:`?
 *
 * House style rather than method, like the others: the trailer is this
 * repository's convention and the manual's suggestion, and an adopting project
 * decides its own. It reads commit messages rather than files, so it takes a
 * range and does not run under `npm run lint`: on a working tree there is no
 * range to read, and over the whole history it would report every commit made
 * before the convention existed. CI runs it over a pull request's commits.
 *
 * It exists because the convention competes with a harness default. The
 * harness adds its own co-author line whatever the repository says; the
 * repository's line is there only if the agent remembers. It has held so far,
 * and nothing made it hold.
 *
 * Usage: node commit-trailers.mjs <range>    e.g. origin/main..HEAD
 */

import { spawnSync } from 'node:child_process';

import { finding, parseLog } from './lib/commit-trailers.mjs';

const range = process.argv[2];

const bar = '─'.repeat(72);
console.log(bar);
console.log('commit trailers');
console.log('  claim:  a commit that names an agent as co-author also carries');
console.log('          an Assisted-by: trailer');
console.log(`  source: git log ${range ?? '(no range given)'}`);
console.log(bar);

/** @param lines what to say before the verdict */
function fail(...lines) {
  console.log('');
  for (const l of lines) console.log(`  ${l}`);
  console.log(`\n${bar}`);
  console.log('FAIL');
  console.log(bar);
  process.exit(1);
}

// No default range. Any default would be a guess about which branch is the
// base, and a wrong guess reads either nothing or the whole history — the first
// reports agreement, the second reports every commit older than the convention.
if (!range) fail('no range given — name one, e.g. origin/main..HEAD');

// Merge commits are left out: they are written by the platform when the owner
// merges, not by an agent, and they carry no trailers of their own.
const log = spawnSync('git', ['log', '--no-merges', '--format=%H%x00%B%x00', range], {
  encoding: 'utf8',
});
if (log.status !== 0) fail(`git log ${range} failed:`, ...String(log.stderr).trim().split('\n'));

const commits = parseLog(log.stdout);

// A range with nothing in it is a finding rather than a pass. A pull request
// always has a commit, so an empty range means the range is wrong, and a check
// that read nothing and reported agreement is the silent no-op E3 is about.
if (!commits.length) fail(`${range} holds no commits — nothing was read`);

const findings = [];
for (const { sha, message } of commits) {
  const why = finding(message);
  if (why) findings.push(`${sha.slice(0, 7)} ${message.split('\n')[0]}\n      ${why}`);
}

if (findings.length) {
  console.log('');
  for (const f of findings) console.log(`  ${f}`);
  console.log(`\n${bar}`);
  console.log(`FAIL · ${findings.length} of ${commits.length} commit(s)`);
  console.log(bar);
  process.exit(1);
}

console.log(`\n${bar}`);
console.log(`OK · ${commits.length} commit(s) read, none without its trailer`);
console.log(bar);
