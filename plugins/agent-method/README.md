# agent-method

Eight skills for
[agent-project-rules](https://github.com/nanatsusaya/agent-project-rules),
packaged as a Claude Code plugin. What each one does, when to use it, and how
to rename them into your own language is in
[the documentation](../../docs/skills/README.md). This page is about installing
them and keeping them current.

| Skill | In one line |
|---|---|
| [`session-start`](../../docs/skills/session-start.md) | Where the project stands, and a question about what is next. |
| [`after-merge`](../../docs/skills/after-merge.md) | From a change that landed to the next task, if it needs no decision. |
| [`session-end`](../../docs/skills/session-end.md) | An honest stopping point and one next step. |
| [`kickoff`](../../docs/skills/kickoff.md) | A new project's foundation, from a description. |
| [`adopt`](../../docs/skills/adopt.md) | The rules fitted to a project that already exists. |
| [`decision-record`](../../docs/skills/decision-record.md) | A decision written down and taken to accepted. |
| [`interview`](../../docs/skills/interview.md) | The decisions work needs, asked in rounds. |
| [`autopilot`](../../docs/skills/autopilot.md) | A plan approved in advance, worked through until it is done. |

## Installing them

None of this is required. There are two installers, and they are not two
spellings of the same thing:

- **The plugin is a subscription.** A managed, read-only copy in Claude Code's
  cache, replaced as a unit when its version changes — see
  [How updates reach you](#how-updates-reach-you).
- **The `skills` CLI gives you the files.** It writes the procedures into your
  own directories, where they are yours to edit and to
  [rename](../../docs/skills/README.md#rename-them-into-your-own-language).

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
without installing anything; run on 2026-09-29 with `skills` 1.7.0, it
reported *Found 8 skills* and listed all eight, including the two that only a
person can start. An install into an agent other than Claude Code has not been
tried here.

For Claude Code the skills land in `.claude/skills/`, or in `~/.claude/skills/`
with `-g`. By default each agent's directory links to one canonical copy;
`--copy` writes independent copies instead. `npx skills update` fetches what has
changed. All of that is from the project's own README (retrieved 2026-09-28,
[github.com/vercel-labs/skills](https://github.com/vercel-labs/skills)).

The CLI is a convenience, not a dependency. Copying the directories under
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

Both claims are from *Install and manage plugins* (retrieved 2026-09-28,
[code.claude.com/docs/en/plugins/install#install-from-your-shell](https://code.claude.com/docs/en/plugins/install#install-from-your-shell)):

> **Scope**: user scope by default. Pass `--scope project` or `--scope local` to
> change it.

> **When the plugins load**: plugins it installs load the next time you start
> Claude Code, or when you run `/reload-plugins` in a session that's already
> open.

### In the desktop app, and in a cloud session

The desktop app has a plugin browser in its local and SSH sessions: **+** next
to the prompt box, then **Plugins**, then **Add plugin**. It has none in its
cloud sessions.

A cloud session loads none of what is described above. From the same page's
*Cloud session* tab (retrieved 2026-09-28,
[code.claude.com/docs/en/plugins/install#install-a-plugin](https://code.claude.com/docs/en/plugins/install#install-a-plugin)):

> A cloud session, including the browser at claude.ai/code, has no plugin
> browser and doesn't load the plugins you installed on your own machine or the
> ones your repository's `.claude/settings.json` turns on.

For plugins an organisation hands out to its members, the page points to
managed settings instead. Owning the files is the route that does reach a cloud
session, as long as they are installed into the project rather than with `-g`
and then committed. A cloud session starts from a fresh clone, and *Configure
cloud environments* lists the repository's `.claude/skills/` as carried over,
"Part of the clone" (retrieved 2026-09-28,
[code.claude.com/docs/en/cloud-environments#what-carries-over-from-your-setup](https://code.claude.com/docs/en/cloud-environments#what-carries-over-from-your-setup)).

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
