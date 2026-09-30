# Agent Project Rules

**Rules and skills that help an AI agent pick up where the last session left
off.**

[![CC BY 4.0](https://img.shields.io/badge/method-CC_BY_4.0-blue)](LICENSE)
[![MIT](https://img.shields.io/badge/code-MIT-blue)](checks/LICENSE)
[![Node 18+](https://img.shields.io/badge/node-18+-blue)](package.json)
[![deps: none](https://img.shields.io/badge/deps-none-blue)](package.json)

An AI agent forgets everything when a session ends. The next session knows only
what is written in your repository. This project is a set of rules for what to
write down, where, and when — and eight skills that do the routine parts for
you.

It works for code and for projects with no code at all. Nothing in it assumes
one maintainer, but team use is still [untested](docs/faq.md).

## What goes wrong without it

### 1. The next session guesses

**Problem.** You explained why something is the way it is — in the chat. The
chat is gone. The next session does not know, and it does not say so. It
guesses, and the guess sounds right.

**Fix.** Write decisions down before building them
([D1](method/rules.md#d1)). Keep one file that says where the project stands
([S3](method/rules.md#s3)). Start every session by reading it:
`session-start` does that for you.

### 2. The agent decides things it should not

**Problem.** An agent asked to finish a task answers every open question
itself, because answering is faster than asking. Some answers are wrong, and you
never saw the question.

**Fix.** Questions go to a person, with a recommended answer
([G2](method/rules.md#g2)). A person approves every change before it becomes
permanent ([G1](method/rules.md#g1)). `interview` asks all the questions up
front, in rounds.

### 3. The docs say one thing and the files another

**Problem.** The same fact is written in three places. One gets updated. The
agent reads another.

**Fix.** Every fact has one home ([C2](method/rules.md#c2)). Docs change in the
same commit as what they describe ([C4](method/rules.md#c4)). A
[check](docs/checking.md) reports where your setup and your files disagree.

## Quick start

**1. Install the skills.** Pick one way — installing both gives you every skill
twice.

<details>
<summary>
<strong>Claude Code plugin</strong> — managed, updates as one unit
</summary>

Inside Claude Code:

```
/plugin marketplace add nanatsusaya/agent-project-rules
/plugin install agent-method@agent-project-rules
```

The skills are then `/agent-method:session-start` and so on.

</details>

<details>
<summary>
<strong>Files you own</strong> — any agent, editable
</summary>

In your project:

```bash
npx skills add nanatsusaya/agent-project-rules
```

The skills are then `/session-start` and so on.

</details>

Other ways, updates, and what to do where `/plugin` is not available:
[the plugin README](plugins/agent-method/README.md#installing-them).

**2. Set up your project.** Run `kickoff` for a new project, or `adopt` for one
that already exists. Both propose; you decide.

**3. Work as usual.** `session-start` when you sit down, `after-merge` when a
change lands, `session-end` when you stop.

You can also skip the skills and copy the rules by hand — see
[getting started](docs/getting-started.md).

## The skills

| Skill | What it does |
|---|---|
| [`session-start`](docs/skills/session-start.md) | Reads where the project stands and tells you. Ends with a question, never with work. |
| [`after-merge`](docs/skills/after-merge.md) | After a change lands: tidies up, checks what changed, and starts the next task only if it needs no decision. |
| [`session-end`](docs/skills/session-end.md) | Parks unfinished work visibly and leaves a clear next step for next time. |
| [`kickoff`](docs/skills/kickoff.md) | Turns a description of a new project into its first rules, decisions and tasks. |
| [`adopt`](docs/skills/adopt.md) | Fits the rules to a project that already exists. |
| [`interview`](docs/skills/interview.md) | Asks the decisions a piece of work needs, in rounds, each with a recommended answer. |
| [`decision-record`](docs/skills/decision-record.md) | Writes a decision down and takes it from proposed to accepted. |
| [`autopilot`](docs/skills/autopilot.md) | Works through a plan you approved in advance, without asking per change. Stops when the plan is done. |

Each is plain Markdown your agent reads. More on each, and how to rename them
into your own language: [the skills](docs/skills/README.md).

## The rules

Thirty-three rules in eleven groups: who approves changes, where facts live,
how a session starts and ends, what "done" means, and more. They are a starting
point, not a checklist — drop or reshape what does not fit, and write down what
you changed.

- [The rules at a glance](docs/rules.md) — the groups, and how to read a rule.
- [`method/rules.md`](method/rules.md) — every rule in full.

## Learn more

- [The idea](docs/the-idea.md) — why this exists.
- [Getting started](docs/getting-started.md) — with the skills or by hand.
- [Glossary](docs/glossary.md) — the words used here.
- [Questions people ask](docs/faq.md)
- [All documentation](docs/README.md)

## Projects using this

Two public adoptions, as pointers for anyone deciding whether to try it. No
rule rests on them.

- **[dot-panic](https://github.com/nanatsusaya/dot-panic)** — a browser toy in
  TypeScript, with a build and tests.
- **[lumora](https://github.com/nanatsusaya/lumora)** — the Obsidian vault
  behind a novel, with no code at all.

## Contributing

The most useful contributions are a rule that did not hold up in practice, a
kind of project the rules do not fit, or a check that raises false alarms.
[Discussions](https://github.com/nanatsusaya/agent-project-rules/discussions)
for arguments, issues for concrete corrections. See
[CONTRIBUTING.md](.github/CONTRIBUTING.md).

## Licence

The written method is under [CC BY 4.0](LICENSE): copy and adapt it, with
credit. The code in [`checks/`](checks/README.md) is under
[MIT](checks/LICENSE).
Copyright © 2026 Daniel Wagner.
