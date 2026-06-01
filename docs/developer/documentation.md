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

Node.js ≥ 24 is required. Install dependencies once after cloning:

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

```markdown
    ```sh
    cmake -B build -DBUILD_DAEMON=YES
    cmake --build build -j"$(nproc)"
    ```
```

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

All images must have meaningful `alt` text for accessibility. Prefer PNG for screenshots.

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
| `amule` | `aMule` in code contexts |
| `amuled` | `AMuled`, `amule daemon` |
| `amulegui` | `AMuleGUI` |
| `amuleweb` | `AMuleWeb`, `amule web` |
| `amulecmd` | `AMuleCMD`, `amule cmd` |
| eD2k | ed2k (in prose) |
| Kademlia | kad (in prose) |
| HighID / LowID | [High ID, Low ID](../p2p-networks/high-id-low-id.md) |

## Translations

The default locale is English (`en`). The only currently supported additional locale is Spanish (`es`).

### Adding or Updating a Translation

Documentation translations live in `i18n/es/docusaurus-plugin-content-docs/current/`. The folder structure mirrors `docs/`.

After adding a new English page, run:

```sh
npm run write-translations -- --locale es
```

This adds any new translation keys and preserves existing ones. Then translate the new content.

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
