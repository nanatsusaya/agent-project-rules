# `session-end`

Leaves the project at an honest stopping point, with a clear next step.

## What it does

- **Tidies the branches.** Anything unfinished is either finished, parked on a
  branch with a clear note, or named in the handoff — never left lying around.
- **Finishes what can be finished**, by the project's own definition of done.
  What is not done is not called done: it is parked, with what exactly is
  unverified and what would settle it.
- **Updates the [state file](../glossary.md)** — but only with what no change
  already carried: parked work, changes waiting for review, a next step that
  moved.
- **Asks the method-log question**: would a future session without today's
  memory decide worse without an entry? It writes one only if the answer is
  yes, and says which it was.
- **Runs maintenance** that has come due, if the project keeps a list.
- **Gives a short handoff**: what was done, what is open, the one next step.

## When to use it

When you stop for the day, or hand the project to someone else.

## What it will not do

- **Start new work.** A task that comes up is written down, not begun.
- **Merge**, or write to the main branch.
- **Round a partial result up to a finished one.** "This part is not done" is
  one sentence; pretending otherwise costs the next session much more.

## It's working if

- The next [`session-start`](session-start.md) finds nothing it has to report
  as missing.
- The handoff names one next step, not a list.
- The method log grows rarely — but when it does, the entry would have changed
  a decision.

## Where it fits

The last of the daily three, after [`session-start`](session-start.md) and
[`after-merge`](after-merge.md). It also ends a run of
[`autopilot`](autopilot.md).

Carries out [S1](../../method/rules.md#s1), [S3](../../method/rules.md#s3),
[M1](../../method/rules.md#m1), [W1](../../method/rules.md#w1) and
[H1](../../method/rules.md#h1). The procedure:
[`SKILL.md`](../../plugins/agent-method/skills/session-end/SKILL.md).
