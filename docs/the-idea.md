# The idea

## An agent forgets between sessions

> Within a session an agent remembers; across sessions, only the repository
> does.

You close the session. The next one — yours, a colleague's, or the same agent
tomorrow — starts from nothing. It reads the repository, and that is all it
reads.

Everything that lived only in the conversation is gone:

- why that odd workaround exists;
- which option you rejected, and what it would cost to revisit;
- what "finished" meant for the half-done work on the branch.

The agent does not tell you it is missing this. It fills the gap with a guess
that sounds right, and it does not say that it guessed.

Within a session, the agent's memory is fine and worth keeping. Nothing here
asks it to distrust itself. The problem is only the gap between sessions — the
[seam](glossary.md). Longer context windows and memory tools move that gap;
they do not remove it.

So the repository is not just where the work is stored. It is what every future
session reads first, and it has to be written for that reader.

## Three ideas do most of the work

**A person approves every change.** Agents propose; a person decides, with no
exception for changes the agent is sure are trivial
([G1](../method/rules.md#g1)). The person checks direction and fit, not every
line ([G3](../method/rules.md#g3)): an agent writes more in an hour than anyone
reads in an hour, so a review that means *read everything* stops working as
soon as the volume rises.

**Every fact has one home.** One file answers one question
([C1](../method/rules.md#c1)), and every fact is written in exactly one place
([C2](../method/rules.md#c2)). Two files answering the same question will
disagree sooner or later, and the agent believes whichever it read last.

**Decide before building.** A choice made in conversation and never written
down is not forgotten. The next session makes it again, differently
([D1](../method/rules.md#d1)) — and nobody can tell that from a new decision.

## Read on

- [`method/rationale.md`](../method/rationale.md) — what the method is not,
  what it costs, and where it is most likely wrong.
- [The rules at a glance](rules.md) — all thirty-three, grouped.
