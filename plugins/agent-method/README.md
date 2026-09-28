# agent-method

Seven procedures for
[agent-project-rules](https://github.com/nanatsusaya/agent-project-rules),
packaged as a Claude Code plugin. Most cover the moments a session turns over,
which is where the seam between sessions actually bites; one starts a project
from a description, and one asks the decisions a piece of work needs before it
starts.

| Skill | When |
|---|---|
| `/agent-method:session-start` | Session bring-up. Orients from the project's living documents and **ends with a question, never an action**. |
| `/agent-method:after-merge` | The seam after a merged change. Keep your context, re-verify the world, start the next task only if it is decision-free. |
| `/agent-method:session-end` | Session wind-down. Tidy the branches, finish or park work honestly, bring the state artefact current for what no change carried, ask the method-log question. |
| `/agent-method:decision-record` | Writing or reworking a decision record, and the cycle it goes through. |
| `/agent-method:adopt` | Introducing the method into a project, or reviewing how well an existing one fits. |
| `/agent-method:kickoff` | Starting a project from a description: an interview for every decision the foundation needs, then the foundation as one change for review. Only you start it; the agent never does on its own. |
| `/agent-method:interview` | The decisions a piece of work needs before it starts, asked in rounds. Other procedures call it; you can run it on its own. |

## What the skills assume

They read the project's `method.json` for two things. Which of its files answer
which question — and which systems it keeps outside the repository, under
`authorities`: where tasks live, where the review boundary is configured. Those
are addresses to know, never things to fetch. A procedure that has to retrieve
something before it can work is not self-supporting, which is what
[C3](https://github.com/nanatsusaya/agent-project-rules/blob/main/method/rules.md#c3)
forbids. Where there is no declaration they fall back to the conventional names.

They assume **nothing** about your stack, your domain or your tooling: anything
a procedure needs to know about your project it learns from your project. The
only command any of them names is the one in `adopt` for running this method's
own check.

They say **the decider** rather than "the human", because who decides varies —
a maintainer, whoever owns the area, the team — and a procedure that assumes
one person is useless the moment there are several.

## Rename them into your own language

The names above are English because everything committed here is English. That
is one half of rule
[L1](https://github.com/nanatsusaya/agent-project-rules/blob/main/method/rules.md#l1).
The other half is that you talk to an agent in your own language — and a skill
name is something you type in conversation, not something you read in a
document.

So the name is yours to change. Nothing depends on it: rename the directory,
and the `name:` field at the top of its `SKILL.md`. Something short and
colloquial works better than a translation, because you type it many times a
day:

| English | Deutsch | Español | Italiano |
|---|---|---|---|
| `session-start` | `moin` | `buenas` | `buondi` |
| `after-merge` | `weiterimtext` | `seguimos` | `avanti` |
| `session-end` | `feierabend` | `hasta-luego` | `stacco` |
| `decision-record` | `adr` | `adr` | `adr` |
| `adopt` | `passtdas` | `cuadra` | `torna` |
| `kickoff` | `dann-starten-wir-mal` | `arrancamos` | `partiamo` |
| `interview` | `interview` | `interview` | `interview` |

All seven, because a table covering some of them reads as though the others were
meant to keep their English names. Two rows are where the advice above does
not apply. `adr` is already what the thing is called out loud in every one of
these languages, and inventing a colloquialism for a term people already say
would cost recognition and buy nothing. `interview` keeps its name because
other procedures call it by that name: rename it, and they fall back to the few
sentences of it they carry, which is a poorer interview.

These are plain ASCII on purpose. Whether the runtime accepts accented
characters in a skill name is not something this repository has verified.

What the rule asks is only that the choice does not leak the other way. The
headings, the descriptions and every document stay in the one language
everybody reads.

## Installing them

None of this is required. There are two installers, and they are not two
spellings of the same thing:

- **The plugin is a subscription.** A managed, read-only copy in Claude Code's
  cache, replaced as a unit when its version changes — see
  [How updates reach you](#how-updates-reach-you).
- **The `skills` CLI gives you the files.** It writes the procedures into your
  own directories, where they are yours to edit and to rename as the section
  above suggests.

Pick one. With both, every skill is there twice.

What changes is the name you type. The `agent-method:` prefix is the plugin's
namespace, so only the plugin gives you `/agent-method:session-start`. A skill
installed any other way — by the CLI or by hand — is `/session-start`, because
a directory in `.claude/skills/` has no namespace.

### With the `skills` CLI

[`skills`](https://github.com/vercel-labs/skills) (MIT, by Vercel Labs)
installs skills from a git repository into the directories of Claude Code and
several dozen other agents:

```bash
npx skills add nanatsusaya/agent-project-rules
```

It finds the procedures through this repository's plugin manifests, so
nothing here is laid out for its sake. `--list` shows what it would install
without installing anything; run on 2026-09-28, it reported *Found 5 skills*
and listed all five. An install into an agent other than Claude Code has not
been tried here.

For Claude Code the skills land in `.claude/skills/`, or in `~/.claude/skills/`
with `-g`. By default each agent's directory links to one canonical copy;
`--copy` writes independent copies instead. `npx skills update` fetches what has
changed. All of that is from the project's own README (retrieved 2026-09-28,
[github.com/vercel-labs/skills](https://github.com/vercel-labs/skills)).

The CLI is a convenience, not a dependency. Copying the five directories under
[`skills/`](skills/) into `.claude/skills/` by hand gives the same result.

### As a plugin

Installing as a plugin is three steps, not two. Adding a marketplace registers
a catalogue and installs nothing, and an installed plugin is inert in the
running session until it is reloaded.

**1. Register this repository as a marketplace.**

```
/plugin marketplace add nanatsusaya/agent-project-rules
```

**2. Install the plugin.** This opens the plugin's details, where you choose a
scope: yourself across all projects, this repository for everyone, or this
repository for you alone.

```
/plugin install agent-method@agent-project-rules
```

**3. Activate it in the running session.**

```
/reload-plugins
```

One thing that looks like a failure and is not: `/reload-plugins` reports
`0 skills`. That counter covers a plugin's `commands/` directory only, and
these live in `skills/`.

**From Claude Code v2.1.275, steps 1 and 2 are one command.** It shows the
marketplace it resolved and asks you to confirm before adding it, then opens the
plugin's details as step 2 does:

```
/plugin install agent-method --marketplace nanatsusaya/agent-project-rules
```

From *Install and manage plugins* (retrieved 2026-09-28,
[code.claude.com/docs/en/plugins/install#add-a-marketplace-and-install-in-one-command](https://code.claude.com/docs/en/plugins/install#add-a-marketplace-and-install-in-one-command)):

> To install a plugin from a marketplace you haven't added yet, run
> `/plugin install` in a Claude Code session and name the marketplace source
> with `--marketplace`. Requires Claude Code v2.1.275 or later.

That is cited, not verified: the Claude Code this was written with is older
than that.

### Where `/plugin` is unavailable

`/plugin` opens an interactive terminal panel, and some environments answer
that it is not available. The same two steps exist as shell commands, which
need no panel and work wherever `claude` is on the `PATH`:

```bash
claude plugin marketplace add nanatsusaya/agent-project-rules
claude plugin install agent-method@agent-project-rules
```

**The scope is the part worth being deliberate about.** These install for you
across every project, which is what an adopter usually wants. `--scope project`
and `--scope local` bind the plugin to whichever directory you are standing in
instead — for everyone who clones it, or for you alone.

They also run outside any session, so nothing is loaded until one starts. In a
session that is already open, `/reload-plugins` still applies.

Both claims are from *Discover and install plugins* (retrieved 2026-08-05,
[code.claude.com/docs/en/discover-plugins#install-plugins](https://code.claude.com/docs/en/discover-plugins#install-plugins)):

> To install without an interactive step, use the `claude plugin install` shell
> command, which installs to user scope unless you pass `--scope`.

> The `claude plugin install` shell command doesn't run in a session, so Claude
> Code loads the plugins it installs the next time you start Claude Code, or
> when you run `/reload-plugins` in a session that's already open.

The desktop app has a plugin browser as well, and a cloud session takes an
`enabledPlugins` entry in `.claude/settings.json`.

## How updates reach you

**This plugin carries an explicit version rather than a commit SHA.** The
manifests currently declare `0.7.0`. A new version is one where that number
has changed, not every commit.

**And it reaches you when you ask for it.** Auto-update is off by default for
this marketplace, as for every marketplace that is not Anthropic's own or added
from claude.ai. Until you turn it on — in `/plugin`, on the **Marketplaces**
tab — a new version arrives when you run:

```bash
claude plugin update agent-method@agent-project-rules
```

or choose **Update now** on the plugin in `/plugin`. From *Install and manage
plugins* (retrieved 2026-09-28,
[code.claude.com/docs/en/plugins/install#keep-plugins-updated](https://code.claude.com/docs/en/plugins/install#keep-plugins-updated)):

> **Off by default**: every other marketplace, including the community
> marketplace, third-party marketplaces, and local development marketplaces.

The number moves when something that ships to users changes, which is before
the release carrying it exists — so the version and the newest release tag are
legitimately out of step for as long as that takes. Nothing here names the tag,
because a tag written into prose is one more number to keep true.

Version management in the plugins reference (retrieved 2026-07-31,
[code.claude.com/docs/en/plugins-reference#version-management](https://code.claude.com/docs/en/plugins-reference#version-management))
resolves the version from the first of: `plugin.json`, the marketplace entry,
the git commit SHA. It also says:

> If you set `version` in `plugin.json`, you must bump it every time you want
> users to receive changes. Pushing new commits alone is not enough, because
> Claude Code sees the same version string and keeps the cached copy.

**That is a promise somebody has to remember, and once nobody did.** Both
manifests said `0.2.0` while two procedures had changed under them, so everyone
who had installed the plugin went on running the old ones — silently, because a
cached copy looks exactly like a current one. For a while afterwards there was
no version here at all, which is the other strategy the same page documents and
which makes the failure structurally impossible.

The explicit version came back when the first release tag did, because a number
is worth having once there is something for it to name. What makes it safe this
time is not resolve: `checks/plugin-version.mjs` fails when anything that ships
to users has changed since the last release and the version has not. A `README`
under `plugins/` does not count — it is read by somebody deciding whether to
install, never by an agent that already has.

**Which number is this?** The release, and through it the
[catalogue](https://github.com/nanatsusaya/agent-project-rules/blob/main/method/VERSION).
The procedures here act out the catalogue's rules, so a rule change is the thing
most likely to change them; the checks are versioned separately because they
change on their own schedule. `method/README.md` has the full table.

## What is deliberately not in here

**The rule catalogue and the coherence check.** A plugin is copied into a cache
when it is installed, so bundling them would create a second copy of the
catalogue that drifts from the first — the exact defect rule
[C2](https://github.com/nanatsusaya/agent-project-rules/blob/main/method/rules.md#c2)
exists to prevent, shipped inside the tooling meant to enforce it.

So the catalogue stays in one place, and the check runs from a clone:

```bash
git clone https://github.com/nanatsusaya/agent-project-rules ../agent-project-rules
node ../agent-project-rules/checks/check-method.mjs <project-path>
```

Zero dependencies, Node 18 or later. The clone goes **beside** the project, not
into it: a copy of the method inside the project being checked is a directory
full of documents the reader does not own. The check recognises such a copy by
its contents and skips it, but the two are cleaner apart — the clone is not
part of your history.

That is a real convenience gap and it is recorded as one rather than papered
over.
