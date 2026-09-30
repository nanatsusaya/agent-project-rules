/**
 * The decision half of the commit-trailers check.
 *
 * Split from the CLI the way lib/skill-pages.mjs is, so the cases can be
 * written as commit messages rather than as a repository per case.
 *
 * One claim: **a commit an agent helped with says so in an `Assisted-by:`
 * trailer.** The convention is in CLAUDE.md, under *Delivery*, and in the
 * manual. A harness adds its own `Co-Authored-By:` line whatever the
 * repository asks for, so the repository's line depends on the agent
 * remembering an instruction that competes with that default. Nothing checked
 * it, which is the arrangement E1 argues against.
 *
 * What it can see is limited, and the limit is stated rather than hidden: a
 * commit is known to be agent-assisted only when it carries a co-author line
 * that names an agent. A commit an agent wrote with no attribution at all looks
 * exactly like a human's, and no reading of the message can tell them apart.
 */

import { normaliseEol } from './markdown.mjs';

/**
 * A co-author that is an agent rather than a person.
 *
 * Matched on the whole trailer value, name and address together. The list is
 * the attributions harnesses actually write; a person's co-author line matches
 * none of them, and must not, because a commit two people wrote is not one that
 * owes an `Assisted-by:`. Extend it when a harness is seen writing another.
 */
export const AGENT = [
  /@anthropic\.com\b/i,
  /@openai\.com\b/i,
  /\bclaude\b/i,
  /\bcodex\b/i,
  /\bcopilot\b/i,
  /\bgemini\b/i,
  /\[bot\]/i,
];

/** A line shaped like a trailer: a token, a colon, and something after it. */
const TRAILER = /^([A-Za-z][A-Za-z0-9-]*):\s*(.*?)\s*$/;

/**
 * The trailers of a commit message, as `{ key, value }` with the key lowered.
 *
 * Trailers are read from every paragraph after the subject that consists of
 * trailer lines and nothing else — not only from the last one, which is where
 * `git interpret-trailers` looks. This repository's commits put `Assisted-by:`
 * in a paragraph of its own above the harness's `Co-Authored-By:`, and a check
 * that read only the last paragraph would report every one of them.
 *
 * A paragraph with a single prose line in it is not a trailer block, so a
 * sentence that happens to start `Assisted-by:` inside the body, or a quoted
 * trailer, counts for nothing.
 *
 * @param message the full commit message
 */
export function trailers(message) {
  const paragraphs = normaliseEol(message)
    .split(/\n\s*\n/)
    .slice(1)
    .map((p) => p.split('\n').filter((l) => l.trim() !== ''))
    .filter((lines) => lines.length);
  const found = [];
  for (const lines of paragraphs) {
    const parsed = lines.map((l) => TRAILER.exec(l));
    if (parsed.some((m) => !m)) continue;
    for (const [, key, value] of parsed) found.push({ key: key.toLowerCase(), value });
  }
  return found;
}

/**
 * Why a commit message fails the convention, or null when it does not.
 *
 * Keys are compared without case: git writes `Co-authored-by`, harnesses write
 * `Co-Authored-By`, and both are the same trailer.
 *
 * @param message the full commit message
 */
export function finding(message) {
  const all = trailers(message);
  const agents = all
    .filter((t) => t.key === 'co-authored-by')
    .filter((t) => AGENT.some((re) => re.test(t.value)));
  if (!agents.length) return null;
  const assisted = all.filter((t) => t.key === 'assisted-by' && t.value !== '');
  if (assisted.length) return null;
  return `names an agent as co-author (${agents[0].value}) but carries no Assisted-by: trailer`;
}

/**
 * Split `git log --format=%H%x00%B%x00` output into commits.
 *
 * @param out the raw output
 */
export function parseLog(out) {
  const parts = out.split('\0');
  const commits = [];
  for (let i = 0; i + 1 < parts.length; i += 2) {
    const sha = parts[i].trim();
    if (sha) commits.push({ sha, message: parts[i + 1] });
  }
  return commits;
}
