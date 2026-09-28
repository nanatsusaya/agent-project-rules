# `interview`

Asks the decisions a piece of work needs, in rounds, before anything is built.

## What it does

Some work needs many decisions from you before it can start, and they depend on
each other. Asked one at a time, they take a session each. Asked all at once,
half of them guess at answers you have not given yet.

So it asks in **rounds**. Each round holds every question that can honestly be
asked now — because everything it depends on is already settled — and nothing
else. Then it waits.

- Each question is numbered, `O1`, `O2` and so on, and the numbers carry on
  across rounds. You answer by number: *"O5 yes, O6 the second option,
  because …"*.
- Each question comes with a **recommended answer** and why.
- **Facts are not asked.** Anything it can look up — in your files, in
  documentation — it looks up, sometimes in the background while you answer.
- **"I don't know" is an answer.** It is parked with what would settle it.
- It ends only when nothing is left to ask **and** you confirm the
  understanding is shared. Then it lists every answer and suggests where each
  should be written down.

## When to use it

When a piece of work needs several decisions from you before it can start: a
new project, a plan for a run, a large change whose shape is still open. Not for
a single question during a task — that is simply asked.

[`kickoff`](kickoff.md) and [`autopilot`](autopilot.md) run it for you. You can
also run it on its own.

## What it will not do

- **Decide for you.** It recommends; you decide.
- **Ask you for a fact** it could find itself.
- **Act on what was agreed.** It ends with shared understanding, not with work.

## It's working if

- Rounds are few, and later rounds ask things the first could not have.
- You pushed back on at least one recommendation. If you accepted every
  recommendation, the agent wrote the plan and you signed it — it will say so.
- The number of open questions shrinks from round to round. If it grows, the
  work is too big for one interview, and it will suggest splitting it.

## Where it fits

It is the one way this method asks questions in bulk. Other skills call it by
name, which is why it keeps the name `interview` in every language.

Carries out [G2](../../method/rules.md#g2), [H4](../../method/rules.md#h4) and
[H5](../../method/rules.md#h5). The procedure:
[`SKILL.md`](../../plugins/agent-method/skills/interview/SKILL.md).
