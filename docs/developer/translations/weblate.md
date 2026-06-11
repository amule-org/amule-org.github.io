---
id: weblate
title: Weblate
---

aMule translations live in git — the repository is the source of truth. [Weblate](https://hosted.weblate.org/projects/amule/) is a translation tool connected to the repositories: it reads the English source strings from git and commits translations back to it, so changes flow in both directions. Weblate is organized into independent **modules**, one per translatable part of the project. This page documents how each module is set up.

Using Weblate is optional: translations can also be contributed by opening a pull request to the relevant repository. Both options are equally valid and edit the same files — see the [Translations](./index.md) guide for the manual workflow.

Weblate components follow one of two models, matching how each part of the project stores its translations. The application and man-page components are *bilingual*: each gettext `.po` file contains both the English source string and its translation, and the `.pot` template lists the source strings. The website components are *monolingual*: an English **base file** lists the source strings, plus one translation file per language.

The modules span two repositories — the application and man pages are in [amule-org/amule](https://github.com/amule-org/amule), and the website and its documentation are in [amule-org/amule-org.github.io](https://github.com/amule-org/amule-org.github.io):

- **[aMule application](#amule-application)** — the application interface strings, including the Windows installer strings.
- **[Man pages](#man-pages)** — the command-line manual pages.
- **[Website](#website)** — the project website (UI strings and documentation).

## For Weblate administrators

Set up **one Weblate component per file** in the git repository. Every component must be configured with:

- **Settings → Version control → Version control system**: *GitHub pull request* — Weblate proposes its changes as pull requests instead of committing directly to the branch.
- **Settings → Files → File format**:
  - *gettext PO file* for the application and man-page catalogs. This is the bilingual variant — do **not** use *gettext PO file (monolingual)*, which does not match how aMule's `.po` files are laid out.
  - *WebExtension JSON file* for the Docusaurus JSON files. Docusaurus stores each entry as `{"key": {"message": "…", "description": "…"}}`, which is exactly the WebExtension `messages.json` shape: Weblate translates the `message` value and uses `description` as the source context.
  - *Markdown* for the documentation pages.
- **Workspace → Settings → Adding new translation**: *Contact maintainers* — translators cannot create new languages directly; they request them from the maintainers, who register the locale in the repository first.

For each JSON component, set **Settings → Files → JSON indentation** to `2`, matching the indentation Docusaurus uses so Weblate does not reformat the files.

For each gettext component, set **Settings → Files → Long lines wrapping** to *Only wrap lines at newlines (like 'xgettext --no-wrap')* — the `.po` files in git are stored unwrapped, and any other value would make Weblate re-wrap every file it touches.

At the project level, enable the **Remove blank strings** add-on. It removes untranslated (blank) strings from the translation files, so the Docusaurus JSON files never end up with empty `message` values.

Also enable the **Squash Git commits** add-on, with **Commit squashing** set to *All commits into one* and **Append trailers to squashed commit message** enabled. This keeps each Weblate pull request to a single, clean commit while preserving the per-translator attribution trailers.

Also at the project level, under **aMule → Settings → Workflow**:

- **Enable reviews** is turned on: anyone on Weblate can propose suggestions, but changes must be approved by a reviewer before they are accepted.
- **Translation quality filter** is set to *Only include approved translations*: only reviewer-approved translations are written to the files and included in Weblate's pull requests.

### Adding reviewers

Reviewers are added in **aMule → Operations → Users → Teams → Review**. A reviewer can be *global* (able to approve every language) or restricted to *specific languages*. Prefer restricting each reviewer to specific languages: Weblate then lists them in the UI for those languages, so contributors can see and contact the reviewer responsible for a given language.

### Synchronizing with git

Weblate synchronizes with the Git repository in both directions from **aMule → Operations → Repository maintenance**:

- **Pushing to git.** By default Weblate does not commit to Git on its own. First press **Commit** to commit the pending changes — only approved translations are included in the commit; entries listed as *skipped* are not yet approved. Then press **Push** to make Weblate open a pull request with the committed translations.
- **Pulling from git.** Weblate detects changes in Git automatically. To pull manually, press **Update**. If Weblate and the repository ever get out of sync, press **Reset and reapply** to discard Weblate's local state and re-pull from Git — this is the last resort.

The per-module sections below list the file masks and base files for each component.

## aMule application

The aMule interface strings are managed with GNU gettext (`.po` files in `po/`). See [Code Translations](./index.md#code-translations) for the manual workflow. The same `.po` catalogs also contain the [Windows installer strings](./index.md#windows-installer-strings), so they are covered by this module.

| Component name | File mask | Template | Format |
|---|---|---|---|
| `Application` | `po/*.po` | `po/amule.pot` | gettext PO file |

The template `po/amule.pot` is regenerated in git by [`./scripts/update-po.sh`](./index.md#updating-an-existing-translation), which also merges the new and changed strings into every `.po` file; Weblate imports the result when it pulls from git.

## Man pages

The man pages are translated with po4a (`.po` files in `docs/man/po/`). See [Man Page Translations](./index.md#man-page-translations) for the manual workflow.

| Component name | File mask | Template | Format |
|---|---|---|---|
| `Application Man Pages` | `docs/man/po/manpages-*.po` | `docs/man/po/manpages.pot` | gettext PO file |

The template `docs/man/po/manpages.pot` is regenerated in git by [`./scripts/update-manpages-po.sh`](./index.md#updating-the-template-after-editing-an-english-master), which also merges the new and changed strings into every `manpages-*.po` file; Weblate imports the result when it pulls from git. The po4a addenda (`docs/man/po/manpages-*.add`, the translator-credit blocks) are not managed by Weblate — they are edited directly in git.

The rendered translated man pages are not tracked in git — the build renders them from the `.po` files at build time — so a Weblate pull request touching only the `manpages-*.po` files is complete by itself.

## Website

The website (this site) covers two kinds of content: the UI strings of the React components and the documentation pages. Both are managed in Weblate.

The English UI strings live in code (`<Translate>` / `translate()` defaults) and in `docusaurus.config.ts`, not in a JSON file, so the base files are generated into `i18n/en/` with:

```sh
npm run write-translations
```

This writes `i18n/en/code.json` and the matching `docusaurus-theme-classic/`, `docusaurus-plugin-content-docs/`, and blog/changelog JSON files. These files are committed so Weblate has a stable base to read from. They are safe for the site — Docusaurus uses them for the `en` locale and their values equal the in-code defaults, so the rendered output is unchanged.

:::warning
The `i18n/en/` base files must stay in sync with the source strings. After adding or changing any `<Translate>` string, regenerate them with `npm run write-translations` and commit the result. The `Build Check` CI workflow runs the same command and fails the pull request if `i18n/en/` is out of date.
:::

### Components

Configure one Weblate component per source file. All component names are prefixed `Website:` so this site's components stay grouped within the Weblate project.

| Component name | File mask | Monolingual base file | Format |
|---|---|---|---|
| `Website: Web` | `i18n/*/code.json` | `i18n/en/code.json` | WebExtension JSON file |
| `Website: Navbar` | `i18n/*/docusaurus-theme-classic/navbar.json` | `i18n/en/docusaurus-theme-classic/navbar.json` | WebExtension JSON file |
| `Website: Footer` | `i18n/*/docusaurus-theme-classic/footer.json` | `i18n/en/docusaurus-theme-classic/footer.json` | WebExtension JSON file |
| `Website: Blog Sidebar` | `i18n/*/docusaurus-plugin-content-blog/options.json` | `i18n/en/docusaurus-plugin-content-blog/options.json` | WebExtension JSON file |
| `Website: Changelog Sidebar` | `i18n/*/docusaurus-plugin-content-blog-changelog/options.json` | `i18n/en/docusaurus-plugin-content-blog-changelog/options.json` | WebExtension JSON file |
| `Website: Docs Sidebar` | `i18n/*/docusaurus-plugin-content-docs/current.json` | `i18n/en/docusaurus-plugin-content-docs/current.json` | WebExtension JSON file |
| `Website: Docs` | `i18n/*/docusaurus-plugin-content-docs/current/**.md` | corresponding `docs/**.md` | Markdown |

Each Docusaurus JSON entry is an object (`{"message": "...", "description": "..."}`), which matches the **WebExtension JSON file** format: Weblate translates the `message` value and shows `description` as its context. The `Website: Docs` component covers many Markdown files — use Weblate's **component discovery** add-on to create them automatically from the file mask.

### Conventions

- **Descriptions are context, not translated.** With the WebExtension JSON format, each `description` is presented to translators as the source string's context and is never written into the locale files (which only contain `message`).
- **Git stays editable.** Components track the repository in both directions: Weblate proposes translations via GitHub pull requests, and changes committed to git are imported into Weblate.
- **Markdown caveat.** Weblate's Markdown support is still under development. Edits made directly in git to a translated `.md` file may not be imported back into Weblate reliably — for the `Website: Docs` component, prefer editing translations in Weblate.
