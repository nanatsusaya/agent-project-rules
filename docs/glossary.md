# Glossary

The words this project uses in a specific sense, each explained once. The rest
of the documentation links here instead of explaining them again.

**Session** — one conversation with an AI agent, from the moment you start it
to the moment it ends. Within a session the agent remembers what was said. The
next session starts with nothing but the repository.

**The seam** — the gap between two sessions. Whatever was only said in the
conversation does not cross it. Most of the rules exist to get things across.

**Gate** — the point where a person approves a change before it becomes
permanent, usually a pull request review. See [G1](../method/rules.md#g1).

**Plan approval** — a person approves a closed list of tasks for one session,
instead of each change on it. See [G4](../method/rules.md#g4).

**Open question** — a decision that belongs to a person, not to the agent. The
agent asks it with a recommended answer, numbered `O1`, `O2` and so on, and
waits. See [G2](../method/rules.md#g2).

**Decision record** — a short file that says what was decided, why, and what
was rejected. Often called an ADR. See [D1](../method/rules.md#d1).

**Rules file** — the file your agent reads at the start of every task, such as
`CLAUDE.md` or `AGENTS.md`. It says how work is done in your project. The
catalogue calls it the *operating-rules artefact*.

**State file** — one file that says where the project stands and what the next
step is, such as `STATUS.md`. The catalogue calls it the *state artefact*. See
[S3](../method/rules.md#s3).

**Method log** — a file that records why the way you work changed: a mistake
that produced a rule, an experiment and what came of it. It is not a progress
log. See [M1](../method/rules.md#m1).

**Role** — one of the four questions above that a file answers: rules,
decisions, state, method log. `method.json` says which of your files plays
which role.

**Adaptation** — a rule you changed or dropped on purpose, written down in
`method.json` with the reason. See [A2](../method/rules.md#a2).

**The catalogue** — the full list of rules, in
[`method/rules.md`](../method/rules.md). It is the only document here that
states rules; everything else explains them.

**Skill** — a written procedure your agent runs when you type its name, such as
`/session-start`. This project ships eight; see
[the skills](../README.md#the-skills).
