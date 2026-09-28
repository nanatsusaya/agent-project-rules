# `kickoff`

Turns a description of a new project into its foundation: rules, decisions,
state and first tasks.

## What it does

You give it a description of what you want — a file or pasted text — in an
empty or nearly empty folder.

- **Reads everything first**: the whole description, the folder, whether there
  is a repository and where it lives.
- **Settles two questions before any other**: what would make this project a
  failure, and what kind of project it is. Those decide which other questions
  are worth asking.
- **Interviews you** for every decision the foundation needs, using
  [`interview`](interview.md): in rounds, each question with a recommended
  answer.
- **Sorts every answer.** One a later session could quietly undo becomes a
  decision record. Anything else becomes a working rule or part of a task.
  Nothing stays only in the chat, and it shows you a table of where each answer
  went.
- **Writes the foundation** in your project's words: the rules file,
  `method.json`, the state file with one next step, the first method-log entry,
  the decision records, and the tasks for the first piece of work.
- **Proposes all of it as one change** for you to review, and asks whether the
  first task is the one to start.

## When to use it

At the very start, when you know what you want and nothing is set up yet.

## What it will not do

- **Build anything.** The first real work is the first task, after you have
  approved the foundation.
- **Answer its own questions.**
- **Run on an existing project.** If the folder already has substance, or a
  `method.json`, it stops and points you to [`adopt`](adopt.md).
- **Create tickets in an outside tracker** before you say yes. It drafts them
  in the change.
- **Start on its own.** Only you can start it.

## It's working if

- You disagreed with at least one recommendation. A kickoff where you accepted
  everything is a plan the agent wrote.
- Every answer you gave appears in the table, with a place.
- It produced a handful of decision records, not ten. Ten is a warning that the
  deciding is running ahead of the building ([A3](../../method/rules.md#a3)).

## Where it fits

[`adopt`](adopt.md) is the same job for a project that already exists. After
the foundation is merged, the daily loop starts with
[`session-start`](session-start.md).

Carries out [G1](../../method/rules.md#g1), [G2](../../method/rules.md#g2),
[D1](../../method/rules.md#d1), [S3](../../method/rules.md#s3),
[W1](../../method/rules.md#w1) and [A3](../../method/rules.md#a3). The
procedure:
[`SKILL.md`](../../plugins/agent-method/skills/kickoff/SKILL.md).
