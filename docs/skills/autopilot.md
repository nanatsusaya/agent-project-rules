# `autopilot`

Works through a plan you approved in advance, without asking per change — and
stops when the plan is done.

## What it does

Normally you approve every change. After good planning, that can mean the work
waits for you all day, and stands still overnight. Rule
[G4](../../method/rules.md#g4) lets you approve a **plan** instead, for one
session. This skill carries that out.

1. **Checks the start strictly**: main branch current, checks green, nothing
   waiting for your review, the state file up to date, and the tools the run
   needs allowed in advance — an unattended run stops at the first permission
   prompt.
2. **Reads every open task** and sorts it: ready, needs a decision, blocked.
3. **Asks every question up front**, with [`interview`](interview.md), so the
   run has nothing left to ask.
4. **Writes a closed plan**: each task, what finishes it, what it may merge;
   what is out of scope; a budget of changes or time; one change open at a
   time.
5. **Waits for your explicit yes.** Nothing else starts it.
6. **Works the list.** Each change lists its judgement calls — the choices you
   could have made differently. A task that hits a question is parked with the
   question in its ticket, and the run takes the next one.
7. **Lands** with a report: what merged, what is parked and why, and every
   judgement call in one list. That list is what you review.

## When to use it

When the planning is done and you want the work done while you are away, or
without approving each change.

## What it will not do

- **Extend the plan.** When the list is done, it stops and presents the next
  list — even if the next step looks obvious. That moment is exactly where a
  run goes wrong.
- **Answer your questions.** A question parks its task.
- **Merge past a review your platform requires**, or change any setting.
- **Touch a decision record**, force-push, or rewrite history.
- **Start on its own.** Only you can start it.

## Keeping it running

Optional, and not yet proven in a real stall. In Claude Code you can type a
`/goal` whose condition is the plan being done: the session then starts its
next turn by itself, and picks up again after a usage limit. Where that is not
available, a recurring prompt in the session can nudge it. The skill has the
exact text for both. A watch **outside** the session is not a safeguard: it can
only report, and cannot tell "waiting for you" from "stuck".

## It's working if

- Nothing was merged that is not on the list.
- The parked questions cost you a glance, not a meeting.
- You read the list of judgement calls, not the diffs — and it was enough.

## Where it fits

Run it after [`session-start`](session-start.md). It ends with
[`session-end`](session-end.md).

Carries out [G4](../../method/rules.md#g4), [G1](../../method/rules.md#g1),
[G2](../../method/rules.md#g2), [S2](../../method/rules.md#s2),
[S3](../../method/rules.md#s3), [W1](../../method/rules.md#w1) and
[H1](../../method/rules.md#h1). The procedure:
[`SKILL.md`](../../plugins/agent-method/skills/autopilot/SKILL.md).
