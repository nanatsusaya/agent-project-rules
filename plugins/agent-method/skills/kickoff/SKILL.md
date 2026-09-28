---
name: kickoff
description: >-
  Use at the very start of a project, when a person has a description of what they want — a file or
  pasted text — and nothing has been set up yet. Reads the description in full, settles first what
  would make the project a failure and which kind of project it is, interviews the person in rounds
  for every decision the foundation needs, sorts each answer into a decision record, a working
  convention or a task, and proposes the whole foundation as one change for review. Not for a
  project that already declares method.json — that is adopt or decision-record. Builds nothing;
  ends with a question.
disable-model-invocation: true
---

# Kickoff — from a description to a project's foundation

*Carries out rules G1, G2, D1, S3, W1 and A3. The
[catalogue](https://github.com/nanatsusaya/agent-project-rules/blob/main/method/rules.md)
is the authority; this file is only the procedure.*

A description says what someone wants. A project needs more than that before
the first line of work: how work is done here, what has been decided, where it
stands, what comes first. The gap between the two is made of decisions nobody
has taken yet, and an agent handed only the description takes them silently,
in plausible prose, with nothing to show that a choice was made. This procedure
finds those decisions, puts them to the person, and writes every answer where
the next session will find it.

**Guardrails (do not violate):**

- **Build nothing.** The foundation is documents and tasks. The first piece of
  actual work is the first task, started after the foundation has passed the
  gate.
- **Never answer a decision yourself.** It holds harder here than anywhere:
  every answer becomes a record that carries the person's authority.
- **Nothing agreed stays in the conversation.** Across sessions only the
  repository remembers.
- **Everything is a proposal**, and it reaches the trunk as one change through
  review — solo too.

## 0. Is this a kickoff?

- **`method.json` exists at the root:** stop. The project has been set up.
  Name `adopt` to review how well the method fits, or `decision-record` for a
  new decision.
- **The project already has substance but no `method.json`** — code, documents,
  a history: that is `adopt`'s case, *a project exists, does the method fit*.
  Say so and stop.
- **Nearly empty, and a description to start from:** carry on. If it is
  unclear which case this is, that is the first question you ask.

## 1. Facts first

Read before you ask anything:

- **The description, in full.** All of it, however long; a skipped paragraph is
  a decision you will later make on the person's behalf.
- **The working directory:** what is in it, whether it is a repository, whether
  it has a remote, and on which platform — where the review boundary and the
  tasks would live.
- **Whatever the description points to**, and the tooling it assumes, as far as
  it bears on a decision.

State what you found at the top of the first round instead of asking it.

## 2. The root of the tree

Two decisions come first, because they decide which of the others are worth
asking at all:

- **What would make this a failure?** The bar it has to clear — scale,
  correctness, legal exposure, longevity. Every trade-off after this refers back
  to it.
- **Which kind of project is it?** The archetypes in the method's
  [adaptation guide](https://github.com/nanatsusaya/agent-project-rules/blob/main/method/adapting.md):
  software with a build chain, a knowledge project with no code, a small
  project with a high correctness bar, a long-running effort, a team, solo and
  early — or a mix, named as one.

They open the first round, each with a recommended answer drawn from the
description. Everything else without a prerequisite joins them: who decides
what, if more than one person is involved; where the repository and its tasks
live, if the facts did not settle it.

## 3. The interview

Run the `interview` procedure through your skill tool, and keep its numbering
running on from the first round. In case it does not load, its essence:

> Ask in rounds: each round holds every question whose prerequisites are
> settled, and no question that depends on another in the same round. Number
> them `O1..On`, running on across rounds, each with a recommended default.
> Facts are looked up, never asked; decisions are the person's, and the
> interview ends only when nothing is left to ask and the person confirms.

What a foundation typically needs decided, once the root is settled — derive
the actual frontier from the tree, do not read this out as a questionnaire:

- which file plays each of the four roles, and whether one is not used at all;
- which rules this kind of project reshapes, and why, as a sentence a stranger
  could act on;
- the conventions the description implies that are true here and nowhere else;
- the commands that make up the definition of done, if there is a build chain;
- the first slice of work, and what finishes each task in it.

## 4. Sort every answer

Take each settled `O`-number through one test: *could a later agent undo this
without noticing that a choice was made?*

- **Yes** → a decision record, `Proposed`, one concern per record, in the shape
  the `decision-record` procedure gives.
- **No** → a working convention in the operating rules, or part of a task's
  definition of done.
- An answer about **how the work is done and why** — including why the project
  was set up this way at all — belongs in the method log.

Keep a table of every `O`-number and where its answer went. An answer with no
row is an answer that stayed in the conversation.

Count the records and report the number. **Ten or more is a warning, not a
success**
([A3](https://github.com/nanatsusaya/agent-project-rules/blob/main/method/rules.md#a3)):
the decision phase is running ahead of anything built. Say so, and propose which
records to defer until the first slice has taught something.

## 5. Write the foundation

In the project's own words, never pasted:

- **Operating rules**, written from what was agreed, in the shape of the
  method's
  [manual](https://github.com/nanatsusaya/agent-project-rules/blob/main/agent-manual/operating-rules.md).
  They state the rules rather than linking to them: a session working a task
  has this repository and nothing else.
- **`method.json`**, with every adaptation and its reason, written and then
  checked exactly as in the `adopt` procedure's last two steps.
- **The state artefact**, with the scale on which progress is measured and
  **one** next step — the first task, not a roadmap.
- **Method-log entry 0001**: why the project is set up as it is.
- **The decision records** from step 4.
- **The tasks for the first slice**, each with what finishes it. Where tasks
  live in a tracker outside the repository, draft them in the change and create
  them only once the person has said yes: creating them there is
  outward-facing.

No glossary, unless the interview exposed two words for one thing or one word
for two. Then it is a convention of this project, not a fifth role.

## 6. Propose it, and stop

- **One branch, one change**, through the project's review boundary, even
  where it requires no approving review. Never write to the trunk to get
  started. A repository with no commits yet has no trunk to branch from: an
  empty initial commit is then the one thing written there directly, and the
  report says so.
- **The description of the change** carries the table from step 4, the record
  count, and what the check reported, including what it could not verify.
- **End with a question**: whether the foundation is what was agreed, and
  whether the first task is the one to start once it is merged. Then stop and
  wait.
