#!/usr/bin/env node
/**
 * Counter-test for the skill-pages check.
 *
 * Rule E3: a check is not trusted until it has been fed deliberate violations
 * and shown to fail on each, and shown to pass on the legitimate cases nearest
 * to them. Here the nearest legitimate cases are a page with a section of its
 * own between the five, a `##` line inside a fence, and an index link that
 * carries an anchor. Reporting any of them would be a false alarm.
 *
 * The cases that carry the most weight are the two empty lists. A check that
 * compares skills with pages and finds neither reports nothing, and nothing is
 * what agreement looks like.
 *
 * Usage: node skill-pages.test.mjs
 */

import {
  SECTIONS,
  linkedPages,
  missingInOrder,
  pageFindings,
  sections,
} from './lib/skill-pages.mjs';

/**
 * The five, written out rather than imported from the check.
 *
 * Importing `SECTIONS` would make the cases agree with whatever the check
 * currently says, so a section added to the constant would move the test with
 * it and be caught by nothing. The set is a decision; a decision is what a
 * counter-test is supposed to hold.
 */
const WANTED = [
  'What it does',
  'When to use it',
  'What it will not do',
  "It's working if",
  'Where it fits',
];

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

/**
 * For findings, which name paths and list sections. Asserting them whole would
 * make every wording change a test edit, and a case nobody dares touch stops
 * being read. The count is asserted too, so a second, unexpected finding
 * cannot hide behind the expected one.
 */
function expectFinding(name, actual, count, ...wanted) {
  ran += 1;
  const joined = actual.join('\n');
  const ok = actual.length === count && wanted.every((w) => joined.includes(w));
  if (!ok) failures += 1;
  console.log(`${ok ? 'ok  ' : 'FAIL'}  ${name}`);
  if (!ok) {
    console.log(`        wanted ${count}, with all of ${JSON.stringify(wanted)}`);
    console.log(`        got    ${JSON.stringify(actual)}`);
  }
}

// --- fixtures

const WHERE = { skills: 'skills', pages: 'docs/skills', index: 'docs/skills/README.md' };

/** A page with the given sections, each with a line of prose under it. */
const page = (name, heads) => {
  const body = heads.flatMap((h) => ['', `## ${h}`, '', 'Prose.']);
  return [`# \`${name}\``, '', 'What it is for.', ...body].join('\n') + '\n';
};

/** An index with a table row linking each page. */
const index = (names) => {
  const rows = names.map((n) => `| now | [\`${n}\`](${n}.md) |`);
  return ['# The skills', '', '| When | Skill |', '|---|---|', ...rows].join('\n') + '\n';
};

const pagesFor = (names) => Object.fromEntries(names.map((n) => [n, page(n, WANTED)]));

const ONE = ['alpha'];
const TWO = ['alpha', 'beta'];

/** The five with one renamed, two swapped, or a section of the page's own. */
const RENAMED = [...WANTED.slice(0, 2), "What it won't do", ...WANTED.slice(3)];
const SWAPPED = [WANTED[1], WANTED[0], ...WANTED.slice(2)];
const OWN = [...WANTED.slice(0, 3), 'Keeping it running', ...WANTED.slice(3)];

/** One skill, one page with the given sections, and an index linking it. */
const withSections = (heads) =>
  pageFindings(ONE, { alpha: page('alpha', heads) }, index(ONE), WHERE);

const crlf = (text) => text.replace(/\n/g, '\r\n');

// --- the decision itself

expect('the section set is the five decided on, in order', SECTIONS, WANTED);

// --- legitimate cases: nothing to report

expect(
  'every skill with its page, the five sections, and a link',
  pageFindings(TWO, pagesFor(TWO), index(TWO), WHERE),
  []
);

expect('a section of its own between the five is allowed', withSections(OWN), []);

expect(
  'Windows line endings read the same as Unix ones',
  pageFindings(ONE, { alpha: crlf(page('alpha', WANTED)) }, crlf(index(ONE)), WHERE),
  []
);

expect(
  'an index link carrying an anchor still links the page',
  pageFindings(ONE, pagesFor(ONE), '# Skills\n\nSee [`alpha`](alpha.md#what-it-does).\n', WHERE),
  []
);

// --- violations

expectFinding(
  'a skill with no page is a finding',
  pageFindings(TWO, pagesFor(ONE), index(ONE), WHERE),
  1,
  'skills/beta has no page'
);

expectFinding(
  'a page with no skill behind it is a finding',
  pageFindings(ONE, pagesFor(TWO), index(TWO), WHERE),
  1,
  'docs/skills/beta.md describes no skill'
);

expectFinding(
  'a page missing a section is a finding',
  withSections(WANTED.slice(0, 4)),
  1,
  'alpha.md lacks',
  'Where it fits'
);

expectFinding('a renamed section is a missing one', withSections(RENAMED), 1, 'What it will not do');

expectFinding(
  'the five out of order is a finding',
  withSections(SWAPPED),
  1,
  'alpha.md lacks, or has out of order'
);

expectFinding(
  'a page the index does not link is a finding',
  pageFindings(TWO, pagesFor(TWO), index(ONE), WHERE),
  1,
  'does not link beta.md'
);

expectFinding(
  'an index that cannot be read is a finding, not a pass',
  pageFindings(ONE, pagesFor(ONE), null, WHERE),
  1,
  'docs/skills/README.md could not be read'
);

expectFinding(
  'no skills at all is a finding, not a pass',
  pageFindings([], pagesFor(ONE), index(ONE), WHERE),
  1,
  'no skills were found'
);

expectFinding(
  'no pages at all is a finding, not a pass',
  pageFindings(ONE, {}, index([]), WHERE),
  1,
  'no pages were found'
);

// --- what the scan reads, and what it must not

expect(
  'a `##` inside a fence is not a section',
  sections('# `alpha`\n\n## What it does\n\n```text\n## Where it fits\n```\n'),
  ['What it does']
);

expect(
  'a third-level heading is not a section',
  sections('# `alpha`\n\n### What it does\n\n## When to use it\n'),
  ['When to use it']
);

expect(
  'a link inside a fence does not link the page',
  [...linkedPages('# Index\n\n```md\n[x](alpha.md)\n```\n')],
  []
);

expect(
  'a section found only earlier than its place is missing from it',
  missingInOrder([WANTED[4], ...WANTED.slice(0, 4)]),
  [WANTED[4]]
);

console.log(`\n${ran} cases, ${failures} failed`);
process.exit(failures ? 1 : 0);
