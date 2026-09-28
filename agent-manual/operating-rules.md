<!--
Copy to your project root as CLAUDE.md (or AGENTS.md, or both — one of them a
pointer to the other, never two full copies).

Placeholders look like «this». Delete every section that does not apply; an
inherited heading with nothing under it teaches the next agent that the topic
was considered and found empty, which is worse than silence.

Keep this file short. Every line here is read on every task, whether or not it
is relevant to that task — it is a standing cost, not free discipline. Anything
conditional belongs in a procedure the agent loads when it needs it.
-->

# «Project»

This file holds the **stable operating rules**, not the current state. Where we
stand is in «state artefact»; what was decided is in «decisions artefact».
«state artefact» is always the same place, is brought current before a session
ends, and names a **single** clearest next step — not everything outstanding.

## What this is

«Two or three sentences: what the project is, who it is for, and the one thing
that would make it a failure. Name the bar it has to clear — scale, correctness,
legal exposure, longevity — because every trade-off below refers back to it.»

## Commands

«The commands an agent actually needs, with the aggregate one first. If the
project has no build chain, delete this section rather than inventing one.»

```bash
«cmd» check      # the full local definition-of-done chain
«cmd» test
«cmd» lint
```

## Structure

«A map, not a description: where things live and which boundaries must not be
crossed. Point at the decisions that own each boundary rather than restating
them — a decision restated here is a second authority for the same fact.»

## Working conventions specific to this project

«This section is the project layer, and it is the part nobody else can write for
you: the domain constraints, the rules that exist because of a bug you actually
hit, the things that are true here and nowhere else. Everything below this
section is the transferable core.»

- **Bugs before features** — fixing a defect outranks new work.

## Decisions

- Anything a later change could silently reverse gets written down **before** it
  is built. Routine implementation work does not.
- An accepted decision is **immutable**. Change it by an amendment a decider
  explicitly authorises — recorded in the decision itself, with the superseded
  wording quoted verbatim — or by a later decision that supersedes it. Never by
  editing.
- **Accepted means decided, not built.** Implementation state lives in «state
  artefact», on its own scale. Never infer progress from a decision's status.

## Delivery

- **Every change goes on a branch and through review. Never write to «trunk»
  directly, and never merge your own work.** There is no exception — not for a
  status flip, not for a log file, not for a change that looks mechanical.
- «Delete if you never work from a plan.» **Approving a plan is the same
  boundary, not an exception to it.** For one session, «who approves plans» may
  approve a closed list of tasks, each with what finishes it and what it may
  merge, and within it you merge your own changes. Only an explicit yes in this
  conversation grants it; it ends with the session and when the list is done —
  then present the next list and wait, even if «state artefact» names a next
  step. Anything not on the list is outside the grant, including a task that
  grew. A question for a person parks its task; never answer it to keep going.
  Each change lists its **judgement calls**, and the closing report collects
  them: that list is what gets reviewed. The grant never lowers a platform
  setting — a change the platform says needs an approval waits for one.
- **What the reviewer decides is direction and coherence**: does this move
  towards the goal, and does it fit what already exists rather than working by
  making an exception to it. Line-level correctness is not theirs — that is the
  definition of done below. A gate defined as *read every line* stops being a
  gate as soon as the volume rises.
- **One concern per change.** Do not fold refactors, formatting churn or
  dependency bumps into unrelated work. A change too large to answer those two
  questions about is a change that gets waved through.
- **A pull request takes the shape in «pull-request template»**: What, Why and
  Verified always answered; Open questions and Follow-ups deleted when there
  are none. The template carries the shape; every instruction about it is here,
  because a description written from a file never opens the template.
- «Commit and branch conventions: message format, branch prefixes.»
- **Agent assistance is disclosed in the commit**, as an `Assisted-by:` trailer
  naming what assisted. A trailer survives a squash merge and cannot be edited
  afterwards; a line in a description can be, which makes it a claim rather than
  a record.
- **Definition of done:** «the local chain» is green; anything with observable
  behaviour has been **exercised**, not merely built; docs changed in the same
  commit; the change's own CI is green. **Report outcomes faithfully**,
  including failures and skipped steps.
- **Hand work back only when you believe it is correct, complete and safe.**
  Below that bar, keep working or name the specific uncertainty — what exactly
  is unverified, and what would settle it.

## Working with the people who decide

«Name who that is: a maintainer, whoever owns the area, the team. If different
kinds of decision belong to different people, say so here — an agent that has to
guess who to ask will guess the nearest person or nobody.»

- **Surface decisions that belong to a person rather than to the agent before
  acting**: direction and sequencing, anything legal or contractual, anything
  outward-facing, anything expensive to reverse. Number them `O1..On`,
  recommend a default for each, and **do not answer them yourself**.
- **Where an answer is written down depends on what holds the question.** In a
  decision record, rewrite `O1..On` in place as `R1..Rn` with what was decided
  and why: the record is the artefact, and its history is the file's history. In
  a pull request or an issue, the answer is a **comment** naming the
  `O`-number, and the description is not touched — not to record the answer,
  not to point at it. An answer edited over its own question destroys it, and
  has no permalink and no timestamp except a typed one.
- **An answer given somewhere else** — in conversation, in a meeting — reaches
  the pull request or issue as a comment by whoever next works on it, quoting
  the answer and saying when and where it was given. Until then the question
  stands there unanswered, which is true.
- **Stop and ask** in particular before: «amending an accepted decision · going
  outward-facing (publishing, deploying, changing a public URL) · introducing
  external network calls, secrets or telemetry · a major dependency upgrade».
- **Verify external facts from primary sources** and cite them. Do not assert
  capabilities, limits, terms or deadlines from memory.
- **Scale decisions to the project's actual stage.** Prefer the smaller, more
  boring solution; record deferred concerns so nothing is lost silently.
- **Language — two separate decisions.** All repository artefacts are written in
  «language», «spelling standard», and this is machine-checked. **Conversation
  with a person happens in that person's own language**; where the team spans
  languages, each person speaks theirs and the artefacts stay in the one
  everybody reads. User-facing output is neither: it is a product decision,
  handled through localisation and never by writing project documents in the
  product's language.

## Documentation

- Documentation is **self-supporting**: a session *begins* with this repository
  and nothing else — no earlier conversation, no recollection of why a rule
  exists. Everything needed to do the work correctly is written here. (This is
  about the seam between sessions, not about working memory: keep the context
  you build up *within* a session, and write down whatever the next one will
  need.)
- **Every fact has exactly one authority.** Refer to it; do not restate it. A
  fact duplicated away from its authority degrades into an assertion.
- **When an authority moves, the references to it move in the same change.** A
  reference is only load-bearing while it resolves.
- **Docs change in the same commit as what they describe.** Stale documentation
  is a defect, and the most expensive kind: it does not fail, it misinforms
  every future session.
- Comments explain **why**, not what. Verbose is fine — clarity for an agent
  with no context outweighs brevity.
- «method-log artefact» records *why the way we work looks like this*:
  corrections and their reasoning, workflow experiments, mistakes that produced
  a rule. Write an entry only for a genuinely methodological moment. The test:
  would an agent with no memory of that session decide worse without it?

## Tickets

Agents write the tickets too; hold them to the same bar as the work.

- **Ready:** a scoped title; the problem or goal and *why* it exists; concrete
  scope — decisions to make, or testable acceptance criteria; links to the
  parent and to related decisions; any constraints.
- **Done:** acceptance criteria met **and verified**; work and docs updated
  together; CI green; the change merged; the ticket closed from the change
  description — and its state **read after the merge**, not assumed from what
  the description said.
- **A closing keyword is read by a parser, not by a person.** Where the
  platform closes tickets from text, the keyword is read wherever the platform
  reads it — on GitHub, in commit messages as well as the description — and
  the sentence around it is not read at all: *nothing here closes #12* closes
  #12, and so does a quotation of it. Write the keyword once, where you mean
  it; refer to any other ticket without one. A closed ticket looks exactly like
  a finished one, so a wrong close surfaces only if someone checks.

## Session rituals

«If you use them, name them and say what each is for. The invariants:
bring-up reads «state artefact» before anything else and ends with a question,
never an action · the seam after a merged change keeps your context and
re-verifies the *external* state · wind-down brings «state artefact» current and
parks unfinished work visibly rather than leaving it dangling.»

## Guardrails

- **Read before writing.** Check «state artefact» and the owning decision(s)
  before changing anything. Do not invent structures no decision covers.
- **Do not implement ahead of a decision.** If a task would settle in code
  something a still-open decision owns, write the decision first.
- **Do not restate a fact that has an authority.** Read it from there.
- **If a claim is checkable by a command, run the command before writing the
  claim.**
- «Never commit real personal data, secrets or credentials — use obvious fakes.»
