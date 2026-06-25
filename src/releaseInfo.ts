// Single source of truth for aMule releases.
//
// When publishing a new version, edit ONLY this file:
//   1. Move the current {version, date} to the top of PREV_RELEASES.
//   2. Update LATEST_VERSION and LATEST_DATE with the new release.
// Consumed by the homepage (release banner) and the download page.

export const LATEST_VERSION = '3.0.1';
export const LATEST_DATE = '2026-06-24';
export const CHANGELOG_URL = `/changelog/${LATEST_VERSION}`;

// Generic releases page (version-number link, footer links).
export const RELEASES_URL = 'https://github.com/amule-org/amule/releases/latest';
// Per-artifact download bases, derived from the version number.
export const ASSET_BASE = `https://github.com/amule-org/amule/releases/download/${LATEST_VERSION}`;
export const SOURCE_ARCHIVE_BASE = `https://github.com/amule-org/amule/archive/refs/tags/${LATEST_VERSION}`;

// Archived releases (most recent first). URLs are derived from the version number.
export const PREV_RELEASES = [
  {version: '3.0.0', date: '2026-06-08'},
  {version: '2.3.3', date: '2021-02-07'},
  {version: '2.3.2', date: '2016-09-16'},
  {version: '2.3.1', date: '2011-11-11'},
];
