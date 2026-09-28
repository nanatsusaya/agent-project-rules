# Getting started

There are two ways in. Both end in the same place: your project has a
[rules file](glossary.md) in your own words, and you know which rules you
changed.

## With the skills

Install the skills first — see the [quick start](../README.md#quick-start).
Then, in your project:

- **A new project**, with only a description of what you want: run `kickoff`.
  It asks you every decision the project needs, in rounds, and proposes the
  whole foundation as one change for you to review.
- **A project that already exists**: run `adopt`. It finds which of your files
  already do the job, proposes which rules to reshape, and writes the
  `method.json`.

Neither writes anything to your main branch on its own. Both end with a
question.

## By hand

Nothing has to be installed.

1. **Copy the manual.**
   [`agent-manual/operating-rules.md`](../agent-manual/operating-rules.md) is
   the file your agent reads at the start of every task. Copy it into your
   project as `CLAUDE.md` or `AGENTS.md`, delete what does not apply, and
   rewrite the rest in your own words. It spells the rules out rather than
   linking here, because your agent should not need this repository to work
   ([C3](../method/rules.md#c3)).
2. **Optionally, write a `method.json`.** It says which of your files plays
   which [role](glossary.md), and lists the rules you changed:

   ```json
   {
     "method": "agent-project-rules",
     "version": "0.7",
     "artefacts": {
       "operating-rules": "CLAUDE.md",
       "decisions": "docs/adr/",
       "state": "docs/STATUS.md",
       "method-log": "docs/method-log.md"
     },
     "adaptations": []
   }
   ```

   Start from [the template](../agent-manual/method.json).
   [`method/adapting.md`](../method/adapting.md) explains every field, and
   which rules usually change for which kind of project.
3. **Optionally, run the check.** It compares your `method.json` with your
   files — see [checking](checking.md).

Step 1 alone is a complete way to use this. Steps 2 and 3 buy one thing: when a
rule here changes, you find out which of your projects still teaches the old
version, instead of discovering it two sessions later.

## Backing out

Each step undoes on its own, and nothing you keep depends on anything you drop.

- **Step 3.** Stop running the check. It writes nothing and reads nothing
  outside your project, so there is nothing to clean up.
- **Step 2.** Delete `method.json`. Your files stay exactly as they are; what
  you lose is being told when the rules change.
- **Step 1.** Your rules file is yours — in your words, about your project, and
  most of it was never ours. Keep it, cut it down, or throw it away.

If steps 2 and 3 are not paying for themselves, dropping them is the intended
use, not a failure.

## Keeping up

When a new version comes out, [`method/CHANGELOG.md`](../method/CHANGELOG.md)
says which rules moved and what you have to do about it. Rules that no longer
apply are listed in [`method/withdrawn.md`](../method/withdrawn.md), with what
replaced them.
