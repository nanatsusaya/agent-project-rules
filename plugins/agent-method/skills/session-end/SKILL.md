---
name: session-end
description: >-
  Use at the end of a working session to wind down cleanly: tidy the branch state, finish or safely
  park in-flight work at an honest stopping point, bring the state artefact current for what no change
  carried, ask whether the method log needs an entry, run any maintenance that has come due, then give a handoff summary. This is a wind-down, NOT a trigger to
  start new work. The counterpart to session-start.
---

# Session end — wind-down

*Carries out rules S1, S3, M1, W1 and H1. The
[catalogue](https://github.com/nanatsusaya/agent-project-rules/blob/main/method/rules.md)
is the authority; this file is only the procedure.*

Closing a session cleanly is a procedure. The goal is to leave the repository
and the handoff at an **honest stopping point**: everything genuinely finished
is finished, everything unfinished is parked visibly and handed off.

Work the steps in order and **report faithfully** — a skipped step or a red
check is stated plainly, never glossed. The next session has this repository and
nothing else; anything you leave unsaid is lost.

**Guardrails (do not violate):**

- **Start no new work.** If a task surfaces, record it. Do not begin it.
- **Never merge**, and never write to the trunk. Report what awaits review.
- **Do not round a partial result up to a finished one.** The cost of an honest
  "this part is not done" is one sentence; the alternative compounds.

## 1. Branch hygiene

- Check for uncommitted work. Anything in the tree is either **finished** (step
  2), **parked** on a branch with a clear work-in-progress commit, or explicitly
  named in the handoff. Never leave it dangling and unmentioned.
- If something merged this session: sync the trunk, delete the merged branch,
  prune.
- List every change still awaiting review, with its state, so the decider knows
  what is queued.
- End on the trunk with a clean tree — unless a branch is deliberately parked
  and named in the handoff.

## 2. Finish what is finishable

Apply the project's definition of done before calling anything done:

- The local check chain is green. Report any red honestly.
- Anything with observable behaviour has been **exercised**, not merely built. A
  passing build says the thing compiles.
- The work and its documentation changed together. Stale documentation is a
  defect.
- Claim a task done only if you believe it is correct, complete and safe. If
  you are not there, park it and hand off the **specific** uncertainty — what
  exactly is unverified, and what would settle it — rather than declaring it
  finished.

## 3. The state artefact and the method log

- **State artefact:** each change that closed a task this session should
  already have brought it current. What is left is what no change carried:
  parked work, changes awaiting review, a next step that moved. If any of it is
  missing, bring the artefact current — refresh the date, the *where we stand*
  section and the single clearest next step — in one change through review. If
  the last closing change left it true, write nothing.
- **Method log — ask every time, write only on a yes.** The question: would an
  agent with no memory of this session decide worse without an entry? Yes for a
  correction and its reasoning, a workflow experiment and its outcome, a
  mistake worth not repeating. No for routine execution — that is what the
  commit history is for. An entry goes into the same change as the state
  artefact, or a change of its own if the artefact needed nothing.
- **Memory**, if your tooling has one: save durable facts worth carrying
  forward. Not what the repository already records, and not what mattered only
  to this conversation.

## 4. Maintenance

If the project keeps a calendar-driven maintenance list, run anything whose
interval has elapsed and update its date. Unlike bring-up, running it here is
correct: the session is ending, and a task that depends on somebody noticing is
a task that does not happen.

## 5. Handoff and close

Give a concise recap: what was accomplished, what is open (changes awaiting
review, parked work), the single clearest next step for the next session, and
the answer from step 3 — the method-log entry, or *nothing for the method log*.

Then stop. Begin nothing new, and leave the session at a clean stopping point.
