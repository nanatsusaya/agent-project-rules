/**
 * The decision half of the skill-pages check.
 *
 * Split from the CLI the way lib/copied-templates.mjs is, so the cases can be
 * written as strings and lists rather than as a repository per case.
 *
 * Three claims live here, and each fails a reader differently:
 *
 *   1. every skill has a page, and every page has a skill — a skill without one
 *      is a procedure nobody deciding whether to install can read about, and a
 *      page without one describes something they cannot install;
 *   2. every page carries the five sections, in order — the pages are useful
 *      because each answers the same questions in the same place;
 *   3. the index links every page — a page nothing links to is a page nobody
 *      arrives at.
 *
 * The convention is in CLAUDE.md, under *Writing conventions*. This is the
 * command that decides whether it still holds, because a convention written
 * down and checked by nobody is the arrangement E1 argues against.
 */

import { blankFences, normaliseEol } from './markdown.mjs';

/**
 * The sections every page carries, in order.
 *
 * A page may carry a section of its own between them — `autopilot` explains
 * how a run is kept alive, which no other skill has — so the five are a
 * subsequence rather than the whole set. What a page may not do is drop one,
 * rename one, or move one: then the same question is answered in a different
 * place on different pages, which is the thing the shape exists to prevent.
 */
export const SECTIONS = [
  'What it does',
  'When to use it',
  'What it will not do',
  "It's working if",
  'Where it fits',
];

/**
 * The text of every second-level heading, in document order.
 *
 * Second-level only: the first-level heading is the skill's name, and the
 * sections are what is being held. Fences are blanked, because a page showing
 * a skill's output could show a `##` line that nobody meant as a section, and
 * reporting it would be a false alarm (E3).
 *
 * @param text  whole page
 * @returns array of heading texts
 */
export function sections(text) {
  return blankFences(normaliseEol(text))
    .split('\n')
    .filter((l) => /^##\s+\S/.test(l))
    .map((l) => l.replace(/^##\s+/, '').trim());
}

/**
 * Which of the five a page lacks, or carries out of order.
 *
 * Walked as a subsequence: each wanted section is looked for after the one
 * before it. A section that exists but earlier than it should counts as
 * missing from its place, which is what a reader meets.
 *
 * @param got  the page's section headings
 * @returns the wanted sections not found in order, empty when all are
 */
export function missingInOrder(got) {
  const missing = [];
  let from = 0;
  for (const want of SECTIONS) {
    const at = got.indexOf(want, from);
    if (at === -1) missing.push(want);
    else from = at + 1;
  }
  return missing;
}

/**
 * The pages an index links to, as file names.
 *
 * A relative link to a sibling `.md`, optionally with an anchor. Fences are
 * blanked: an example link inside one is not the index linking anything.
 *
 * @param text  docs/skills/README.md
 * @returns set of linked file names
 */
export function linkedPages(text) {
  const body = blankFences(normaliseEol(text));
  return new Set([...body.matchAll(/\]\(([a-z0-9-]+\.md)(?:#[^)]*)?\)/g)].map((m) => m[1]));
}

/**
 * Hold the pages to the skills, the shape and the index.
 *
 * @param skills  names of the skill directories
 * @param pages   `{ name: text }` for every page except the index, keyed by
 *                file name without `.md`
 * @param index   text of the index, or null when it could not be read
 * @param where   `{ skills, pages, index }` paths to name in findings
 * @returns array of finding strings, empty when every claim holds
 */
export function pageFindings(skills, pages, index, where) {
  const findings = [];
  const names = Object.keys(pages);

  // An empty list on either side is the silent no-op E3 exists for: nothing
  // compared, nothing reported, and the run reads exactly like agreement. A
  // moved directory is the likeliest way to get there.
  if (!skills.length) {
    findings.push(`no skills were found under ${where.skills}, so no page was held to one.`);
  }
  if (!names.length) {
    findings.push(`no pages were found in ${where.pages}, so no skill was held to one.`);
  }
  if (!skills.length || !names.length) return findings;

  for (const skill of skills) {
    if (!names.includes(skill)) {
      findings.push(`${where.skills}/${skill} has no page; add ${where.pages}/${skill}.md.`);
    }
  }
  for (const name of names) {
    if (!skills.includes(name)) {
      findings.push(`${where.pages}/${name}.md describes no skill under ${where.skills}.`);
    }
  }

  for (const name of names) {
    const missing = missingInOrder(sections(pages[name]));
    if (missing.length) {
      findings.push(
        `${where.pages}/${name}.md lacks, or has out of order: ${missing.join(' · ')}. ` +
          `The sections are ${SECTIONS.join(' · ')}.`
      );
    }
  }

  if (index === null) {
    findings.push(`${where.index} could not be read, so no page was checked for a link.`);
  } else {
    const linked = linkedPages(index);
    for (const name of names) {
      if (!linked.has(`${name}.md`)) {
        findings.push(`${where.index} does not link ${name}.md.`);
      }
    }
  }

  return findings;
}
