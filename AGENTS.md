# amule-org.github.io - AGENTS.md

**⚠️ EXCLUDED FOLDERS**: The following folders must be **EXCLUDED** from any analysis, reading, or modification: `node_modules/`, `build/`, `.docusaurus/`.

**⚠️ AGENTS.md** This document is for LLM use. Keep it short — preserve the format and use the minimum number of tokens.

**amule-org.github.io** is the aMule project website, built with Docusaurus v3. Internationalized (i18n).

## Main Libraries

- **Node.js**: `>=24`
- **Framework**: `@docusaurus/core`, `@docusaurus/preset-classic` (`^3.10`)
- **Language**: TypeScript (`tsx` components, `ts` config files)
- **React**: `^18`
- **Syntax highlighting**: `prism-react-renderer`
- **Search**: `@easyops-cn/docusaurus-search-local` — client-side, index built at compile time. Configured in `docusaurus.config.ts` (`themes` array). Add new locales to its `language` array when adding a new i18n locale. Search only works in the production build (`npm run build` + `npm run serve`), not in the dev server (`npm run start`).

## Architecture

**Static site**: `src/pages/index.tsx` (orchestrator) → `src/components/` (section components) → Docusaurus build → GitHub Pages.

**Key files**:
- `docusaurus.config.ts` — site config, navbar, footer, i18n locales, theme, plugins (changelog blog instance)
- `sidebars.ts` — docs sidebar definition
- `src/pages/index.tsx` — homepage, composes section components (Hero/What-is/screenshot inlined here)
- `src/pages/download.tsx` — Download page (`/download`)
- `src/components/<Name>/index.tsx` — one component per homepage section
- `src/components/<Name>/styles.module.css` — scoped styles per component
- `src/css/custom.css` — global CSS variable overrides (color palette)
- `docs/` — English documentation (Markdown)
- `blog/` — Blog posts (`/blog`); `changelog/` — Changelog posts (`/changelog`, second blog plugin instance)
- `i18n/<locale>/` — translations (`code.json` for UI strings; mirrored `docs/`, `blog/`, `changelog/` for content)
- `static/img/` — images (`amule-logo.png`, `social-card.png`, favicons, `screenshots/`, `docs/`)

## Documentation

`docsSidebar` (see `sidebars.ts`) opens with two standalone docs — Overview (`docs/index.md`) and Quick Start (`docs/quickstart-guide.md`) — then **four top-level categories** by audience. Keep them separate — never mix audiences.

- **User Manual** (`docs/manual/`) — install, configure, use, troubleshoot; for basic and expert users. Subdivided into `installation/`, `configuration/` (network config: `directories`, `network-connectivity`, `firewall`, `upnp`, `proxy`, `events`, `macos` + **editable text config files** in `config-files/`: `amule.conf`, `remote.conf`), `interfaces/` (GUI under `gui/`, plus `amuled`/`amuleweb`/`amulecmd`), `utilities/` (standalone helpers), `migration/`, `troubleshooting/`, `faq/`.
- **Developer Guide** (`docs/developer/`) — for aMule developers and advanced integrators: compilation (`compilation/`), debugging, testing, translations, documentation, code style, the **file-format reference** (`file-formats/`: byte layouts of `.met`/`.dat` files), and the **EC protocol**.
- **P2P Networks** (`docs/p2p-networks/`) — general **protocol** description and historical reference: eD2k (`ed2k/`), Kademlia (`kademlia`), `concepts`, `other-networks`. **Do not mix protocol with aMule's concrete implementation** — implementation details belong in the User Manual / Developer Guide and are linked, not embedded.
- **Contributing** (`docs/contributing/`) — `bug-report`.

## Homepage Components

The Hero (logo, tagline, CTA buttons), "What is aMule?" description and the full-width transfers screenshot are inlined in `src/pages/index.tsx`. The remaining sections are components:

| Component | Section |
|---|---|
| `HighlightsSection` | 3.0.0 release highlights grid |
| `FeaturesSection` | Bulleted feature list |
| `ScreenshotsSection` | Screenshot grid with lightbox |

## i18n

- Default locale: `en`. Additional locale: `es`.
- UI strings (React components): `i18n/<locale>/code.json` — each entry has `message` (translate this) and `description` (context, do not translate).
- Docs content: `i18n/<locale>/docusaurus-plugin-content-docs/current/` mirrors `docs/`.
- Blog/changelog content: `i18n/<locale>/docusaurus-plugin-content-blog/` mirrors `blog/`; `i18n/<locale>/docusaurus-plugin-content-blog-changelog/` mirrors `changelog/`.
- Sidebar labels: `i18n/<locale>/docusaurus-plugin-content-docs/current/current.json`.
- Add a new locale: register in `docusaurus.config.ts`, run `npm run write-translations -- --locale <code>`, then translate generated files.
- Update translations after English changes: run `npm run write-translations -- --locale <code>` (adds new keys, preserves existing ones), then translate new entries in `code.json` and update changed docs files manually.
- **All page/component text must be translatable**: wrap visible text in `<Translate id="...">text</Translate>` (JSX) or `translate({id, message})` (attributes). ID convention: `homepage.<section>.<key>`. The `id` and text **must be static string literals** — never `<Translate id={variable}>` nor `translate({id: variable})`, as `write-translations` extracts via static analysis and errors on dynamic values. In data-driven lists (`FEATURES`, `DOWNLOAD_OSES`, …) store the content as `<Translate>` nodes (typed `React.ReactNode`) or `translate({...})` calls **inside** the array, not as `*Id`/`*Default` fields.
- **Interpolation in `<Translate>`**: Docusaurus only supports `{varName}` placeholders — **not** `<tag>chunks</tag>` (FormatJS/react-intl syntax). For inline markup (`<strong>`, `<code>`, `<kbd>`) or links use `values`, e.g. `values={{ code: <code>flag</code> }}` or `values={{ link: <Link to="..."><Translate id="...">text</Translate></Link> }}` with `{code}` / `{link}` in the message. Prefer this over `dangerouslySetInnerHTML`.
- **Translation reference**: English is always the source of truth. All translations must faithfully reflect the English original — do not paraphrase or simplify.
- **Precision over naturalness**: Translations must be as accurate as possible. Readers are software users familiar with technical terminology, so use technical language freely. Keep English terms (e.g. "hash", "changelog", "release", "peer") when a translated equivalent would be less precise or less commonly used in the target language.

## Naming Conventions

- **Project name**: Always write as "aMule" (not "Amule", "AMule", or "amule").
- **Module names**: Always lowercase, always in code format: `amule`, `amuled`, `amulegui`, `amuleweb`, `amulecmd`, `ed2k`, `alc`, `alcc`, `wxcas`, `cas`, `xas`.
- **Platform order**: When listing supported platforms in any enumeration, list, or table, always use the order **Windows, macOS, Linux, BSD** — ordered by popularity.

## Important Notes

- **Theming**: All styling must be theme-aware (light/dark). Use Infima CSS variables (`--ifm-background-color`, `--ifm-background-surface-color`, `--ifm-heading-color`, `--ifm-color-emphasis-*`, `--ifm-color-primary`) — never hardcoded hex colors or `rgba(255 255 255 / …)` overlays in page/component CSS modules. Exception: overlays over their own dark backdrop (e.g. the screenshots lightbox modal).
- **Markdown line wrapping**: Do **not** hard-wrap prose. Write each paragraph/sentence on a single line (no manual line breaks mid-sentence). Keep tables, code blocks and list items as-is.
- **Images in docs**: referenced as `/img/docs/<file>` (served from `static/`).
- **Image zoom**: always use plain Markdown (`![alt](/img/docs/<file>)`), never hardcoded HTML `<img>` (Markdown paths are build-validated, `<img>` paths are not). Click-to-zoom is added automatically to large images (width ≥ 850px) by `plugins/remark-zoom-large-images.js`.
- **Images in components**: referenced as `/img/<file>` (served from `static/`).
- **Social card**: `static/img/social-card.png` is a placeholder; replace with a proper 1200×630 image.
- **URLs to generated files**: For links to generated files (feeds, sitemaps) that the broken-links checker cannot verify, use the `pathname://` protocol: e.g. `pathname:///blog/atom.xml`. This bypasses the checker and renders as a correct relative path at runtime. Do **not** use absolute URLs with `url`/`baseUrl` — those break in local dev.

## Workflow

After any code change, before completing the task:

1. Run the build: `npm run build`
2. Fix any errors or warnings introduced by the change.
