# `session-start`

Tells you where the project stands, and asks what to do next.

## What it does

It reads your project fresh — not from memory, not from the last session — and
gives you a short briefing:

- what the project is, and the rules that shape how work is done in it;
- the last few changes that were merged;
- what is open: branches, changes waiting for review, the tree's state;
- where the project stands, from the [state file](../glossary.md), and the one
  next step it names;
- any maintenance that has come due.

It also checks whether the last session ended properly. If the state file is
behind — changes merged that it does not mention, a plan left half-done — it
tells you, and suggests bringing the file up to date as the first job.

Then it asks whether to carry on as planned or change direction, and waits.

## When to use it

Every time you start a session on the project. It takes a minute and replaces
the "where were we?" conversation.

## What it will not do

- **Start work.** It ends with a question. Starting work would choose the
  session's direction for you.
- **Change anything.** No commits, no branches, no edits — not even to repair a
  state file it finds out of date. It reports; the repair is work.
- **Invent what it could not read.** A missing file is reported as missing.

## It's working if

- The briefing is short, and you did not have to explain anything.
- It told you something you had forgotten: a change waiting for review, a
  parked branch.
- It stopped and asked.

## Where it fits

The first of the daily three. After it, you work; when a change lands,
[`after-merge`](after-merge.md); when you stop, [`session-end`](session-end.md).

Carries out [S1](../../method/rules.md#s1), [S2](../../method/rules.md#s2),
[S3](../../method/rules.md#s3) and [H1](../../method/rules.md#h1). The
procedure:
[`SKILL.md`](../../plugins/agent-method/skills/session-start/SKILL.md).
