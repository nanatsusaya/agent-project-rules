# The rules at a glance

Thirty-three rules in eleven groups. The full text of every rule is in
[`method/rules.md`](../method/rules.md), the only place rules are stated. This
page is a map.

A rule gets in only if it holds for any kind of project — a software product as
much as a knowledge base with no code in it. That bar is what keeps the list
short.

| Group | In plain words | Rules |
|---|---|---|
| **G** — The gate | A person approves changes, and decides the open questions. | [G1](../method/rules.md#g1) · [G2](../method/rules.md#g2) · [G3](../method/rules.md#g3) · [G4](../method/rules.md#g4) |
| **D** — Decisions | Choices are written down before they are built, and stay readable later. | [D1](../method/rules.md#d1) · [D2](../method/rules.md#d2) · [D3](../method/rules.md#d3) · [D4](../method/rules.md#d4) |
| **C** — Documentation | Every fact has one home, and the docs stay true. | [C1](../method/rules.md#c1) · [C2](../method/rules.md#c2) · [C3](../method/rules.md#c3) · [C4](../method/rules.md#c4) · [C5](../method/rules.md#c5) |
| **M** — Method memory | You record why your way of working changed. | [M1](../method/rules.md#m1) · [M2](../method/rules.md#m2) |
| **E** — Enforcement | Rules become commands where they can, and a check says what it did not check. | [E1](../method/rules.md#e1) · [E2](../method/rules.md#e2) · [E3](../method/rules.md#e3) |
| **H** — Honesty | The agent reports what really happened, and hands work back only when it is sure. | [H1](../method/rules.md#h1) · [H2](../method/rules.md#h2) · [H3](../method/rules.md#h3) · [H4](../method/rules.md#h4) · [H5](../method/rules.md#h5) |
| **L** — Language | One language in the repository; your own in conversation. | [L1](../method/rules.md#l1) · [L2](../method/rules.md#l2) |
| **S** — Sessions | How a session starts, continues after a merge, and ends. | [S1](../method/rules.md#s1) · [S2](../method/rules.md#s2) · [S3](../method/rules.md#s3) |
| **W** — Work | What "done" means is fixed before the work starts. | [W1](../method/rules.md#w1) |
| **P** — What never enters | No secrets or personal data in the repository. | [P1](../method/rules.md#p1) |
| **A** — Adaptation | You change the rules on purpose, and write down what you changed. | [A1](../method/rules.md#a1) · [A2](../method/rules.md#a2) · [A3](../method/rules.md#a3) |

## How a rule reads

Here is one in full:

> ### C4 — Documentation changes in the same commit
>
> When behaviour changes, the documents that describe it change in the same
> commit. Stale documentation is a defect, not untidiness.
>
> **Why.** It is the most expensive kind of error, because it does not fail: it
> silently misinforms every future session, and each then produces work
> consistent with something untrue.
>
> **Check:** `manual`

Every rule has the same parts:

- **the rule** itself, in a sentence or two;
- **Why** — the failure it prevents. A rule whose reason is lost gets dropped
  by the first session that finds it inconvenient;
- **Check** — whether a command can decide it (`automated`) or a person has to
  (`manual`). So you can see how much of the method is really enforced;
- **Binding**, on some rules — a common concrete form. That part is a
  suggestion; the rule is not.

A rule's identifier, such as `C4`, never changes and is never reused. Your
project can point at one and it keeps meaning the same thing.

## You do not have to take them all

The list is a starting point, not a checklist ([A1](../method/rules.md#a1)).
Drop or reshape what does not fit, and write down what you changed and why.
[Getting started](getting-started.md) shows how, and
[`method/adapting.md`](../method/adapting.md) shows which rules change shape for
which kind of project.
