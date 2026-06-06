---
id: documentation
title: Documentation
---

The aMule documentation is maintained as Markdown files in the [amule-org.github.io](https://github.com/amule-org/amule-org.github.io) repository and published with [Docusaurus v3](https://docusaurus.io/).

## Repository Structure

```
amule-org.github.io/
├── docs/                        # English documentation (source of truth)
│   ├── index.md                 # Docs landing page
│   ├── quickstart-guide.md
│   ├── manual/                  # User Manual (install, configure, use, troubleshoot, FAQ)
│   ├── developer/               # Developer Guide
│   ├── p2p-networks/            # eD2k & Kademlia protocol reference
│   └── contributing/
├── blog/                        # Blog posts
├── changelog/                   # Changelog (per-version release notes)
├── i18n/
│   └── es/                      # Spanish translations
│       ├── code.json            # UI strings (navbar, sidebar labels, etc.)
│       └── docusaurus-plugin-content-docs/current/
│           └── ...              # Mirrors docs/ structure with translated content
├── static/
│   └── img/
│       └── docs/                # Images used in documentation pages
├── src/
│   ├── pages/                   # Homepage (index.tsx) and Download page (download.tsx)
│   └── components/              # Homepage section components
├── sidebars.ts                  # Sidebar navigation structure
└── docusaurus.config.ts         # Site configuration
```

## Adding or Editing a Page

### Prerequisites

[Node.js](https://nodejs.org/) ≥ 24 is required. Install dependencies once after cloning:

```sh
git clone https://github.com/amule-org/amule-org.github.io.git
cd amule-org.github.io
npm install
```

### Development Server

```sh
npm run start
```

This starts a local server at `http://localhost:3000` with live reload. Changes to Markdown files are reflected immediately without rebuilding.

:::note
The local dev server does not include the full-text search index. Search only works in the production build (`npm run build` + `npm run serve`).
:::

### Editing an Existing Page

1. Open the relevant `.md` file under `docs/`.
2. Edit the content using standard Markdown (GitHub-flavored, rendered with CommonMark).
3. Verify your changes look correct in the dev server.
4. Commit and open a pull request.

### Adding a New Page

1. Create a new `.md` file in the appropriate `docs/` subfolder.

2. Add a front-matter block at the top of the file:

   ```markdown
   ---
   id: my-page
   title: My Page Title
   ---
   ```

   The `id` must be unique within its folder and match the filename (without extension).

3. Register the page in `sidebars.ts` so it appears in the sidebar. Find the relevant category and add the doc ID:

   ```ts
   // Example: adding 'developer/my-page' to the Developer Guide category
   {
     type: 'category',
     label: 'Developer Guide',
     items: [
       'developer/my-page',   // ← add this line
       ...
     ],
   }
   ```

4. Run `npm run build` to verify there are no broken links or build errors before submitting the pull request.

### Adding a New Category (Subsection)

To add a new subcategory with its own landing page:

1. Create a new folder under `docs/` (e.g. `docs/developer/new-section/`).

2. Create an `index.md` inside it with the category title.

3. Add the category to `sidebars.ts`:

   ```ts
   {
     type: 'category',
     label: 'New Section',
     link: { type: 'doc', id: 'developer/new-section/index' },
     items: [
       'developer/new-section/page-one',
       'developer/new-section/page-two',
     ],
   }
   ```

## Writing Guidelines

### Tone and Style

- Write in **clear, technical English**. The audience is software users and developers familiar with technical terminology.
- Use precise terms. Prefer "aMule terminates with a segmentation fault" over "aMule crashes".
- Keep paragraphs short and focused. Use headings to structure long pages.
- Do not use emojis in documentation.

### Code Blocks

Use fenced code blocks with a language identifier for syntax highlighting:

````markdown
```sh
cmake -B build -DBUILD_DAEMON=YES
cmake --build build -j"$(nproc)"
```
````

Use `sh` for shell commands, `cpp` for C++, `py` for Python, `ini` for configuration files, and so on.

### Admonitions

Docusaurus supports the following admonition types:

```markdown
:::note
Supplementary information that is useful but not critical.
:::

:::tip
A helpful suggestion or best practice.
:::

:::info
Context or background that helps the reader understand.
:::

:::warning
Something the reader must be careful about.
:::

:::danger
An action that can cause data loss, security problems, or other serious consequences.
:::
```

### Images

Place images in `static/img/docs/` and reference them as:

```markdown
![Alt text](/img/docs/image-name.png)
```

All images must have meaningful `alt` text for accessibility. Documentation images should be in **PNG** format and placed inside the `static/img/docs/` folder. Before committing them to git, optimize them and strip their metadata with [`optipng`](https://optipng.sourceforge.net/):

```sh
optipng -strip all *.png
```

Click-to-zoom is applied **automatically** — always write images in plain Markdown as shown above. A custom remark plugin (`plugins/remark-zoom-large-images.js`) inspects every image at build time and lets readers click to enlarge only the **large** ones — those with a real width of **850px or more** (wider than the ~750px content column, so the browser downscales them). Icons, thumbnails and narrow dialogs are left untouched.

Always reference images in Markdown rather than with a hardcoded HTML `<img>` tag: Docusaurus validates Markdown image paths and **fails the build** if a referenced file is missing, but it does **not** check paths inside HTML `<img>` tags.

### Links

**Internal links** — use relative paths to other `.md` files:

```markdown
[Compilation guide](../compilation/index.md)
```

**External links** — use full URLs:

```markdown
[GitHub repository](https://github.com/amule-org/amule)
```

**Links to generated files** (feeds, sitemaps) — use the `pathname://` protocol to bypass the broken-link checker:

```markdown
[Atom feed](pathname:///blog/atom.xml)
```

### Terminology

Use consistent terminology throughout the documentation:

| Preferred | Avoid |
|---|---|
| aMule (project name) | `Amule`, `AMule`, `amule` (when naming the project) |
| `amule` (binary / module) | `aMule`, `AMule` (in code or command contexts) |
| `amuled` | `AMuled`, `amule daemon` |
| `amulegui` | `AMuleGUI` |
| `amuleweb` | `AMuleWeb`, `amule web` |
| `amulecmd` | `AMuleCMD`, `amule cmd` |
| eD2k | ed2k (in prose) |
| Kademlia | kad (in prose) |
| [High ID / Low ID](../p2p-networks/ed2k/high-id.md) | HighID, LowID, highid |

## Translations

The default locale is English (`en`). The only currently supported additional locale is Spanish (`es`).

### Adding or Updating a Translation

Documentation translations live in `i18n/es/docusaurus-plugin-content-docs/current/`. The folder structure mirrors `docs/`.

After adding a new English page, run:

```sh
npm run write-translations -- --locale es
```

This adds any new translation keys and preserves existing ones. Then translate the new content.

### Adding a New Locale

To add a language beyond the existing ones:

1. Register the locale in `docusaurus.config.ts` (`i18n.locales` and `localeConfigs`):

   ```ts
   i18n: {
     defaultLocale: 'en',
     locales: ['en', 'es', 'fr'],   // add your locale code here
     localeConfigs: {
       fr: {label: 'Français'},
     },
   },
   ```

2. Add the same locale code to the `language` array of the `@easyops-cn/docusaurus-search-local` theme in the same file:

   ```ts
   themes: [
     [
       require.resolve('@easyops-cn/docusaurus-search-local'),
       {
         language: ['en', 'es', 'fr'],   // add your locale code here
         // ...
       },
     ],
   ],
   ```

   :::note
   The search plugin uses the language code for tokenization. Check its [supported languages](https://github.com/easyops-cn/docusaurus-search-local?tab=readme-ov-file#supported-languages) list — if your locale is not supported, omit it from the `language` array and the search index falls back to basic tokenization.
   :::

3. Generate the translation files and translate them as described above.

4. Preview the new locale locally:

   ```sh
   npm run start -- --locale fr
   ```

### UI Strings

React component strings (navbar, sidebar labels, homepage text) are in `i18n/es/code.json`. Each entry has a `message` field (translate this) and a `description` field (context for the translator — do not translate this).

### Translation Fidelity

Translations must faithfully reflect the English original. Do not paraphrase or simplify. Technical terms (hash, changelog, peer, release, etc.) should remain in English when a translated equivalent would be less precise or less commonly used.

## Submitting a Contribution

1. Fork the repository on GitHub.
2. Create a feature branch: `git checkout -b docs/my-improvement`
3. Make your changes, verify with `npm run build`.
4. Commit with a clear, descriptive message.
5. Open a pull request against the `main` branch.

The pull request description should explain what was changed and why. For substantial additions, a brief summary of the content helps reviewers.
