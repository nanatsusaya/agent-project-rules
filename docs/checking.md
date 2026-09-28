# Checking that it still holds

A command reads your `method.json` and reports where it and your files
disagree. It changes nothing. It has no dependencies and needs Node 18 or later.

```bash
git clone https://github.com/nanatsusaya/agent-project-rules ../agent-project-rules
node ../agent-project-rules/checks/check-method.mjs .
```

The spelling standard comes from your `method.json`, so you do not pass it.

**No `method.json` yet?** Add `--lint --spelling british`. Then a missing
declaration is not reported as a problem, and the spelling standard is named on
the command line because there is no file to name it. Nothing else is
switched off: if a `method.json` is there, it is read and checked as usual.

## Read the end of the report

The most useful part is the list of what the check did **not** verify:

```
not verified here
  G1 — trunk protection is a hosting-platform setting; verify it there. Even
      then it proves a change arrived through review, not that anyone read it
  P1 — secret scanning belongs to the platform; this check does not look for
      credentials
  20 rule(s) in force are marked `manual` and depend on review
  role "method-log" is unbound — checks that depend on it were skipped
```

A report that says "no findings" without saying what it never looked at reads
as a clean bill of health. The check exists to prevent exactly that
([E2](../method/rules.md#e2)), so it does not do it itself.

## The details

Every check it runs, every option, and its known limits are in
[`checks/README.md`](../checks/README.md).
