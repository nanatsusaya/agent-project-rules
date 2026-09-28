#!/usr/bin/env node
/**
 * House-style check: does every skill have its page in docs/skills/, and does
 * every page carry the five sections?
 *
 * House style rather than method, like the others: it knows this
 * repository's own paths, and an adopting project has no docs/skills/ to hold.
 *
 * It exists because the convention it enforces is the kind that drifts
 * without anyone deciding it should. A new skill is written, merged and
 * installed; its page is the part a reviewer does not think to ask for. Nothing
 * fails, and the documentation quietly describes seven of eight procedures.
 *
 * Usage: node skill-pages.mjs [project-path]
 */

import { readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { SECTIONS, pageFindings } from './lib/skill-pages.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = process.argv[2] ?? join(HERE, '..');

const WHERE = {
  skills: 'plugins/agent-method/skills',
  pages: 'docs/skills',
  index: 'docs/skills/README.md',
};

const bar = '─'.repeat(72);
console.log(bar);
console.log('skill pages');
console.log('  claim:  every skill has a page in docs/skills/, every page a skill,');
console.log('          each page carries the five sections, and the index links it');
console.log(`  source: ${WHERE.skills} · ${WHERE.pages}`);
console.log(bar);

/** Entries of a directory, or an empty list rather than a throw. */
function list(rel) {
  try {
    return readdirSync(join(ROOT, rel));
  } catch {
    return [];
  }
}

/** Read a file, returning null rather than throwing. */
function read(rel) {
  try {
    return readFileSync(join(ROOT, rel), 'utf8');
  } catch {
    return null;
  }
}

// A skill is a directory with a SKILL.md in it. A stray file beside them, or a
// directory someone started and left empty, is not a procedure anybody can
// install, and asking for its page would be a false alarm.
const skills = list(WHERE.skills)
  .filter((d) => {
    try {
      return statSync(join(ROOT, WHERE.skills, d, 'SKILL.md')).isFile();
    } catch {
      return false;
    }
  })
  .sort();

const pages = {};
for (const f of list(WHERE.pages).sort()) {
  if (!f.endsWith('.md') || f === 'README.md') continue;
  const text = read(join(WHERE.pages, f));
  if (text !== null) pages[f.slice(0, -3)] = text;
}

const findings = pageFindings(skills, pages, read(WHERE.index), WHERE);

if (findings.length) {
  console.log('');
  for (const f of findings) console.log(`  ${f}`);
  console.log(`\n${bar}`);
  console.log(`FAIL · ${findings.length} finding(s)`);
  console.log(bar);
  process.exit(1);
}

console.log('');
for (const s of skills) console.log(`  ${s} · ${WHERE.pages}/${s}.md`);
console.log(`\n${bar}`);
console.log(
  `OK · ${skills.length} skill(s), each with its page and the ${SECTIONS.length} sections`
);
console.log(bar);
