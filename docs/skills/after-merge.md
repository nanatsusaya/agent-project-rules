# `after-merge`

Moves cleanly from a change that just landed to the next task.

## What it does

- **Checks the change really landed** — merged, not just approved or green. If
  it did not, it stops and says so.
- **Tidies up**: updates the main branch, deletes the merged branch.
- **Checks the [state file](../glossary.md)** says what is now true. The change
  that closed a task should already have updated it. If it did not, the gap is
  noted for the next change to fix — it does not open a change just for that.
- **Looks at the next task again**, because things may have moved: is it still
  the right one, is it already done, is everything it needs in place, does it
  need a decision?
- **Starts it only if it needs no decision.** Otherwise it tells you what needs
  deciding, with a recommendation, and waits.

It keeps everything the session has learned so far. What it re-checks is the
outside world — the repository, the open changes, the tickets — because other
people and other sessions move those while you work.

## When to use it

Each time one of your changes has been merged and you want to go on.

## What it will not do

- **Merge.** It runs after someone else has merged.
- **Start work that needs a decision**, or that is too big or unclear to start
  without agreeing its shape.
- **Write to the method log.** That is asked once, at the end of the session.

## It's working if

- You are on a fresh branch for the next task, or you have a clear question in
  front of you.
- It noticed when the next task had already been done by someone else.

## Where it fits

The middle of the daily three: after [`session-start`](session-start.md),
before [`session-end`](session-end.md), as often as changes land. Inside a run
of [`autopilot`](autopilot.md), the next entry on the approved list counts as
decided.

Carries out [S1](../../method/rules.md#s1), [S2](../../method/rules.md#s2),
[S3](../../method/rules.md#s3), [G1](../../method/rules.md#g1) and
[C4](../../method/rules.md#c4). The procedure:
[`SKILL.md`](../../plugins/agent-method/skills/after-merge/SKILL.md).
