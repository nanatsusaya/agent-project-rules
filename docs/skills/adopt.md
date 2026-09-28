# `adopt`

Fits the rules to a project that already exists — or reviews how well they fit.

## What it does

- **Reads the project first**: what it is, who it is for, what would make it
  fail, whether it has code, what files already exist.
- **Maps your existing files onto the four [roles](../glossary.md)** — rules,
  decisions, state, method log. It prefers a file you already have over
  creating a new one. A role you do not use is marked as unused, with the
  reason.
- **Proposes which rules to reshape** for your kind of project, each with a
  reason a stranger could act on.
- **Shows you the proposal and waits.** Only after your yes does it write the
  `method.json` and adapt the missing files, in your words.
- **Runs the check**, and reports what it could not verify as well as what it
  found.

If the project already has a `method.json`, it reviews the fit instead.

## When to use it

Once, when you bring the method into a project that has been running for a
while. Again later, if you want to know whether the fit still holds.

## What it will not do

- **Decide for you.** Adopting is a proposal about how your project will be
  worked; that is yours to decide.
- **Create empty structure.** A project with no decision records gets that
  noted, not a new empty folder.
- **Copy a rule it cannot justify for your project.**
- **Claim the check passed without running it.**

## It's working if

- Most roles are bound to files you already had.
- Every rule it proposes to drop has a reason you agree with.

## Where it fits

[`kickoff`](kickoff.md) is the same job for a project that does not exist yet.
If you would rather do it by hand, see
[getting started](../getting-started.md#by-hand).

Carries out [A1](../../method/rules.md#a1), [A2](../../method/rules.md#a2) and
[C1](../../method/rules.md#c1). The procedure:
[`SKILL.md`](../../plugins/agent-method/skills/adopt/SKILL.md).
