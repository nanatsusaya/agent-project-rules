# The skills

Eight written procedures your agent runs when you type their name. Each page
here explains one of them for you; the procedure itself is the `SKILL.md` it
links to, written for the agent.

How to install them is in the
[plugin README](../../plugins/agent-method/README.md#installing-them).

## The daily loop

Most of the time you use three, around every piece of work:

| When | Skill |
|---|---|
| You sit down | [`session-start`](session-start.md) — where do we stand, and what is next? |
| A change has landed | [`after-merge`](after-merge.md) — tidy up, check, and carry on only if nothing needs deciding. |
| You stop | [`session-end`](session-end.md) — park what is open, leave a clear next step. |

## Now and then

| When | Skill |
|---|---|
| A new project, with only a description | [`kickoff`](kickoff.md) |
| A project that already exists | [`adopt`](adopt.md) |
| A choice worth writing down | [`decision-record`](decision-record.md) |
| Several decisions before work can start | [`interview`](interview.md) |
| A planned list of tasks, worked without you | [`autopilot`](autopilot.md) |

## What they assume

They read your project's `method.json` for two things: which of your files
plays which [role](../glossary.md), and which systems you keep outside the
repository, under `authorities` — where tasks live, where the review boundary
is configured. Those are addresses to know, never things to fetch: a procedure
that has to retrieve something before it can work does not stand on its own,
which [C3](../../method/rules.md#c3) forbids. Without a `method.json` they fall
back to the usual file names.

They assume **nothing** about your stack, your domain or your tools. Anything a
procedure needs to know about your project, it learns from your project. The
only command any of them names is the one `adopt` uses to run this method's
check.

They say **the decider** rather than "the human", because who decides varies —
a maintainer, whoever owns the area, the team — and a procedure that assumes
one person is useless the moment there are several.

## Rename them into your own language

The names are English because everything committed here is English — one half
of rule [L1](../../method/rules.md#l1). The other half is that you talk to your
agent in your own language, and a skill name is something you type in
conversation.

So the name is yours to change. Rename the directory and the `name:` field at
the top of its `SKILL.md`. Something short and colloquial works better than a
translation, because you type it many times a day:

| English | Deutsch | Español | Italiano |
|---|---|---|---|
| `session-start` | `moin` | `buenas` | `buondi` |
| `after-merge` | `weiterimtext` | `seguimos` | `avanti` |
| `session-end` | `feierabend` | `hasta-luego` | `stacco` |
| `decision-record` | `adr` | `adr` | `adr` |
| `adopt` | `passtdas` | `cuadra` | `torna` |
| `kickoff` | `dann-starten-wir-mal` | `arrancamos` | `partiamo` |
| `autopilot` | `machsdirselbst` | `a-tu-aire` | `fai-da-te` |
| `interview` | `interview` | `interview` | `interview` |

All eight, because a table covering some of them reads as though the others
were meant to keep their English names. Two rows keep one name everywhere.
`adr` is already what the thing is called out loud in each of these languages.
`interview` keeps its name because other skills call it by that name: rename
it, and they fall back to the few sentences of it they carry, which is a poorer
interview.

The names are plain ASCII on purpose. Whether the runtime accepts accented
characters in a skill name has not been verified here.

Only the name changes. The headings, the descriptions and every document stay
in the one language everybody reads.
