/**
 * Thin wrapper around @docusaurus/plugin-content-docs that strips its i18n
 * translation files.
 *
 * The documentation is English-only, so its sidebar labels are not translated
 * either: without `getTranslationFiles()`, `write-translations` generates no
 * `i18n/<locale>/docusaurus-plugin-content-docs/current.json`, and without
 * `translateContent()` every locale renders the English sidebar.
 */

const docsPlugin = require('@docusaurus/plugin-content-docs');

async function docsUntranslatedPlugin(context, options) {
  const plugin = await docsPlugin.default(context, options);
  delete plugin.getTranslationFiles;
  delete plugin.translateContent;
  return plugin;
}

module.exports = docsUntranslatedPlugin;
module.exports.validateOptions = docsPlugin.validateOptions;
