# aMule Project Website

Source for the aMule project website at [https://amule-org.github.io](https://amule-org.github.io).

The site is built with [Docusaurus](https://docusaurus.io/) and is internationalized (i18n).

## Requirements

[Node.js](https://nodejs.org/) 24 or later and npm.

## Working locally

Install dependencies:

```sh
npm install
```

Build the complete site into `build/`:

```sh
npm run build
```

Serve the complete built site locally at `http://localhost:3000` (all locales + search working):

```sh
npm run serve
```

> Use `npm run serve` instead of `npm run start` to preview the full site: it serves the production build with all languages and the local search index available. `npm run start` (dev server) is faster for component development but does not include the search index.

Serve the full site locally at `http://localhost:3000` (English):

```sh
npm run start
```

Serve the Spanish locale at `http://localhost:3000/es/`:

```sh
npm run start -- --locale es
```

## Updating translations after English changes

When you add, remove, or rename translatable strings in the English source (components or docs), existing locales need to be kept in sync.

### UI strings (React components)

Run the translation extractor for each locale. It adds any new keys and preserves existing translations:

```sh
npm run write-translations -- --locale es
```

Then open `i18n/es/code.json` and translate every entry whose `message` field is still in English (newly added keys come pre-filled with the English default).

### Documentation (Markdown)

`write-translations` does not touch Markdown files. For each changed page in `docs/`, manually update the corresponding file under `i18n/es/docusaurus-plugin-content-docs/current/`, keeping the same relative path.

If a new page is added to `docs/`, create the equivalent file in `i18n/es/docusaurus-plugin-content-docs/current/` with the translated content. If a page is deleted from `docs/`, delete the matching file from the locale folder too.

### Verify

After updating translations, run a full build to catch any broken references:

```sh
npm run build
```

## Adding a new language

1. **Register the locale** in `docusaurus.config.ts`:

   ```ts
   i18n: {
     defaultLocale: 'en',
     locales: ['en', 'es', 'fr'],   // add your locale code here
     localeConfigs: {
       fr: {label: 'Français'},
     },
   },
   ```

   Also add the locale code to the search plugin's `language` array in the same file:

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

   > The search plugin uses the language code for tokenization. Check the [supported languages](https://github.com/easyops-cn/docusaurus-search-local?tab=readme-ov-file#supported-languages) list — if your locale is not supported, omit it from the `language` array and the search index will fall back to basic tokenization.

2. **Generate the translation files** for the landing page:

   ```sh
   npm run write-translations -- --locale fr
   ```

   This creates `i18n/fr/code.json` with all translatable strings from the site's React components. Translate the `message` field of each entry.

3. **Translate the documentation** by creating Markdown files under `i18n/fr/docusaurus-plugin-content-docs/current/`, mirroring the structure of `docs/`:

   ```
   i18n/fr/
   ├── code.json
   └── docusaurus-plugin-content-docs/current/
       ├── current.json            # sidebar label translations
       ├── index.md
       └── user-guide/
           └── getting-started.md
   ```

   `current.json` translates sidebar category labels. Run the following to generate it with the default English values pre-filled:

   ```sh
   npm run write-translations -- --locale fr
   ```

4. **Preview the new locale** locally:

   ```sh
   npm run start -- --locale fr
   ```

## Documentation images

Documentation images should be in **PNG** format and placed inside the `static/img/docs/` folder. Before committing them to git, optimize them and strip their metadata with [`optipng`](https://optipng.sourceforge.net/):

```sh
optipng -strip all *.png
```

Always add images with plain Markdown (`![Alt text](/img/docs/image-name.png)`). Large images become click-to-zoom automatically, so there's nothing extra to do.

## Useful links

* aMule source code: [github.com/amule-org/amule](https://github.com/amule-org/amule)
* Latest release: [github.com/amule-org/amule/releases/latest](https://github.com/amule-org/amule/releases/latest)
* Wiki: [github.com/amule-org/amule/wiki](https://github.com/amule-org/amule/wiki)
* Discussions: [github.com/amule-org/amule/discussions](https://github.com/amule-org/amule/discussions)
