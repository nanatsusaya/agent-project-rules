# Questions people ask

**Do I have to install anything?**
No. Reading the rules and copying what fits is a complete way to use this. The
skills save work; nothing depends on them. See
[getting started](getting-started.md#by-hand).

**Does this only work with Claude Code?**
The rules name no tool and no stack. The skills are packaged as a Claude Code
plugin because that is what the author uses, but they are plain Markdown: the
`skills` command installs them for Codex, Cursor and dozens of other agents
too. None of those has been tried here.

**Thirty-three rules sounds like a lot.**
It is a list to choose from, not a checklist. Every rule you adopt costs your
agent attention on every task, which is why the bar to get into the list is
high, and why [A1](../method/rules.md#a1) tells you to drop what does not fit.

**Does it work for a project with no code?**
Yes. Every rule has to hold for a knowledge base with no code in it as much as
for a software product. [`method/adapting.md`](../method/adapting.md) says which
rules change shape there.

**Does it work in a team?**
It is meant to, but that has not been tested yet. Nothing in the rules
assumes a single maintainer, and
[`method/adapting.md`](../method/adapting.md#a-team-rather-than-one-maintainer)
says which rules change shape with several people. What nobody has tried
is several people or agents working at the same time. The first place that
would show is the [state file](glossary.md): it names one next step, so two
changes made side by side both rewrite it, and the second has to be reconciled
with the first. The rationale lists this among the places the method is
[most likely wrong](../method/rationale.md#where-it-is-most-likely-wrong).

**What does it cost?**
Mainly review time: a person approves every change, and that caps how fast
work lands. [`method/rationale.md`](../method/rationale.md#what-it-costs) lists
every cost honestly, and says where the method is most likely wrong.

**Is this spec-driven development?**
No — see [what this is not](../method/rationale.md#what-this-is-not).

**Can I rename the skills into my own language?**
Yes, and it is encouraged: you type them many times a day. There is a
[table](skills/README.md#rename-them-into-your-own-language) with names in
German, Spanish and Italian.
