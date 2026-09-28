# `decision-record`

Writes a decision down, and takes it from proposed to accepted.

## What it does

- **Reads first**: the state file, the existing decisions, the ticket, and
  every accepted decision this one touches.
- **Works out what kind of change it is**: a new decision, or a change to one
  already accepted. An accepted decision is never edited; changing it needs
  your explicit permission, or a new decision that replaces it.
- **Writes the record** on a branch, marked *proposed*, and adds it to the
  index in the same change.
- **Lists the open questions**, numbered `O1`, `O2` and so on, each with a
  recommended answer — and does not answer them itself.
- **After your answers**, folds them into the record, turns the open questions
  into resolved ones — `R1`, `R2` and so on, with what was decided and why —
  and marks the record *accepted* on the same branch. The merge is what
  accepts it.

## When to use it

When a choice is one a later session could quietly undo without noticing a
choice was made ([D1](../../method/rules.md#d1)). Routine work needs no record.

## What it will not do

- **Answer the open questions.** They exist because they are yours.
- **Edit an accepted decision.**
- **Build what the decision is still deciding.**
- **Turn into a design document.** A record says which choice was made and why
  the others were not.

## It's working if

- A record reads in a minute and says what was rejected, not only what was
  chosen.
- Your answers are in the record itself, where the next session will find them.

## Where it fits

[`kickoff`](kickoff.md) produces the first records of a new project, in this
shape. [`interview`](interview.md) is how several related questions get asked
before any record is written.

Carries out [D1](../../method/rules.md#d1), [D2](../../method/rules.md#d2),
[D3](../../method/rules.md#d3) and [G2](../../method/rules.md#g2). The
procedure:
[`SKILL.md`](../../plugins/agent-method/skills/decision-record/SKILL.md). The
template it fills:
[`agent-manual/decision-record.md`](../../agent-manual/decision-record.md).
