---
id: translating
title: Translating aMule
---

aMule is translated by volunteers on [Weblate](https://hosted.weblate.org/projects/amule/), a web-based translation tool. All you need is a Weblate account and a web browser — no programming knowledge and no git. This page explains how translating on Weblate works, why a translation you saved may not appear in aMule yet, and how to reach the developers.

Three parts of the project can be translated, each a group of *components* in Weblate: the application interface (`Application`, which also covers the Windows installer), the man pages (`Application Man Pages`), and this website (the `Website: …` components).

:::tip Prefer git?
Translations can also be submitted as a pull request, without Weblate. See the [Translations](../developer/translations/index.md) guide for the file formats and the manual workflow.
:::

## How a Translation Reaches aMule

Every translation is reviewed before it is used. Saving a string in Weblate is only the first step:

1. **You translate** a string and save it. It is stored as *Waiting for review*.
2. **A reviewer approves it.** Each language can have its own reviewers — fluent speakers who check the translations of other contributors. The maintainers can approve translations too.
3. **The maintainers export it.** Approved translations are sent from Weblate to the repository on GitHub as a pull request, which the maintainers merge.
4. **It ships** with the next aMule release (application and man pages) or the next website update.

Only **approved** translations leave Weblate. A translation that is still waiting for review stays inside Weblate: it is visible there, but aMule does not use it.

## Translation States

Weblate shows a state for every translated string. Only one of them reaches aMule:

| State | Meaning | Used by aMule |
|---|---|---|
| Not translated | There is no translation yet. | No — the English text is shown |
| Needs editing / Needs rewriting | A translation exists but must be checked, usually because the English source changed. | No — the English text is shown |
| Waiting for review | Translated and saved, not yet checked by a reviewer. | Not yet |
| Approved | Checked by a reviewer. Only reviewers can change it. | **Yes** |

Suggestions are not a state: they are proposals attached to a string, and they leave its state unchanged (see [Save or Suggest](#save-or-suggest)).

## Save or Suggest

The Weblate editor offers two ways to submit your text: **Save** (*Save and continue* / *Save and stay*) and **Suggest**. Prefer **Save**, and use **Suggest** when saving is not possible.

- **Save** stores your text as the translation of the string. It enters the review queue and, once approved, is used by aMule.
- **Suggest** only attaches a proposal to the string. It does not replace the current translation and does not enter the review queue: somebody has to accept it first.

Every translation is reviewed anyway, so saving is safe — there is no need to be cautious and suggest instead. **Suggest** is for strings that are already **Approved**: only reviewers can change those, so a reviewer for the language will accept your suggestion if it is better.

If you find good suggestions left by other people on a string that is not yet approved, accept them so they enter the review queue too.

## Why Is My Translation Not in aMule?

The most common reasons, in order:

- **It is waiting for review.** No reviewer has approved it yet. Some languages have no reviewer at all — if yours is one of them, consider [becoming a reviewer](#becoming-a-reviewer).
- **It is a suggestion**, not a translation. See [Save or Suggest](#save-or-suggest).
- **It was approved recently.** Approved translations are exported when a maintainer pushes them from Weblate, not instantly.
- **The man page is not translated enough.** A translated man page is only built when at least 80% of its strings are approved; below that, the English man page is installed.
- **No release has shipped since.** Application and man-page translations reach users with the next aMule release; website translations appear with the next website update.

To see what is pending for your language, open the language in Weblate and filter the strings waiting for review.

## Becoming a Reviewer

Reviewers are what makes translations reach aMule: a language without a reviewer cannot publish anything. If you speak a language fluently and want to take care of it, [open an issue](#contacting-the-developers) with:

- your Weblate username;
- the language (or languages) you want to review.

Having already contributed translations for that language on Weblate helps. The maintainers add you to the **Review** team for that language; from then on you can approve the translations of other contributors (select *Approved* as the review state before saving), mark your own as approved, change approved strings, and accept the suggestions other contributors leave on them.

## Adding a New Language

Translators cannot create a new language by themselves, because the language must also be registered in the repository first. Pressing **Start new translation** on Weblate sends a request to the maintainers; you can also [open an issue](#contacting-the-developers) asking for it. Once the language is added, it normally becomes available in every component.

## Translation Guidelines

- **Application strings: keep placeholders exactly as they are.** Format specifiers (`%s`, `%d`, `%u`, …) must appear unchanged and in the same order as in the English text — swapping `%s` and `%d` crashes aMule. Escape codes (`\n`, `\t`) must be preserved too. Weblate flags mismatches; do not ignore those warnings. The full rules are in the [Format Specifiers Reference](../developer/translations/index.md#format-specifiers-reference).
- **Application strings: keep the `&` accelerator** before the same letter as in the English text (when your script has no such letter, keep it before a suitable one), and keep leading and trailing spaces.
- **Man pages: keep the formatting markers** such as `B<…>` (bold) and `I<…>` (italic); translate only the text inside them. See [po4a Formatting Codes](../developer/translations/index.md#po4a-formatting-codes).
- **Website: keep `{name}` placeholders** (e.g. `{link}`, `{release}`) untranslated — they are replaced by links or values when the page is built. In documentation pages, keep the Markdown syntax, link targets, code (text in `backticks`) and admonition markers such as `:::tip` unchanged.
- **Translate faithfully.** Do not add or remove information. If the English text is wrong or unclear, [report it](#contacting-the-developers) instead of working around it.
- **Prefer precision over naturalness.** aMule users are familiar with technical terminology: keep English terms (e.g. "hash", "peer", "eD2k") when a translated equivalent would be less precise or less common in your language.

## Contacting the Developers

For anything related to translations, open an issue on the [aMule issue tracker](https://github.com/amule-org/amule/issues) (a GitHub account is required). This is the place to:

- ask to become a reviewer, or report that the translations for your language have been waiting for review for a long time;
- request a new language;
- report a problem in an English source string — a typo, an ambiguous text, or a string that cannot be translated correctly;
- ask for context: where a string appears and what it means.

Start the title with `[Translation]` and the language, e.g. `[Translation] German: request to become a reviewer`. When the issue is about a specific string, include its Weblate link — every string has its own URL, shown in the browser address bar while you edit it.
