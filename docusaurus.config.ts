import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import remarkZoomLargeImages from './plugins/remark-zoom-large-images';

const url = process.env.DOCUSAURUS_URL ?? 'https://amule-org.github.io';
const baseUrl = process.env.DOCUSAURUS_BASE_URL ?? '/';


const config: Config = {
  title: 'aMule',
  tagline: 'All-platform eMule-compatible eD2k/Kad client',
  url,
  baseUrl,
  organizationName: 'aMule Org',
  projectName: 'aMule',
  trailingSlash: false,
  onBrokenLinks: 'throw',
  onBrokenAnchors: 'warn',
  future: {
    // Required by faster.ssgWorkerThreads. These are forward-compatibility
    // flags towards Docusaurus v4, stable in 3.10.
    v4: {
      removeLegacyPostBuildHeadAttribute: true,
    },
    // Enables all build-acceleration flags: rspackBundler,
    // rspackPersistentCache, swcJsLoader/swcJsMinimizer, swcHtmlMinimizer,
    // lightningCssMinimizer, mdxCrossCompilerCache, ssgWorkerThreads.
    faster: true,
  },
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'throw',
    },
  },
  favicon: 'img/favicon.ico',
  headTags: [
    {tagName: 'link', attributes: {rel: 'icon', type: 'image/png', sizes: '16x16', href: `${baseUrl}img/favicon-16x16.png`}},
    {tagName: 'link', attributes: {rel: 'icon', type: 'image/png', sizes: '32x32', href: `${baseUrl}img/favicon-32x32.png`}},
    {tagName: 'link', attributes: {rel: 'icon', type: 'image/png', sizes: '48x48', href: `${baseUrl}img/favicon-48x48.png`}},
    {tagName: 'link', attributes: {rel: 'apple-touch-icon', sizes: '180x180', href: `${baseUrl}img/apple-touch-icon.png`}},
    {tagName: 'link', attributes: {rel: 'manifest', href: `${baseUrl}manifest.webmanifest`}},
    // Browser UI color, matching the navbar background in each color mode
    {tagName: 'meta', attributes: {name: 'theme-color', media: '(prefers-color-scheme: light)', content: '#ffffff'}},
    {tagName: 'meta', attributes: {name: 'theme-color', media: '(prefers-color-scheme: dark)', content: '#242526'}},
  ],

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'ca', 'es', 'fr', 'it', 'lv', 'pt-BR', 'ru', 'tr'],
    localeConfigs: {
      en: {label: 'English'},
      ca: {label: 'Català'},
      es: {label: 'Español'},
      fr: {label: 'français'},
      it: {label: 'Italiano'},
      lv: {label: 'Latviešu'},
      'pt-BR': {label: 'Português (Brasil)'},
      ru: {label: 'Русский'},
      tr: {label: 'Türkçe'},
    },
  },

  presets: [
    [
      'classic',
      {
        // Registered below through plugins/docs-untranslated (English-only docs).
        docs: false,
        blog: {
          blogTitle: 'Blog',
          blogDescription: 'News and announcements from the aMule project.',
          blogSidebarTitle: 'Recent posts',
          blogSidebarCount: 'ALL',
          postsPerPage: 5,
          onUntruncatedBlogPosts: 'ignore',
          feedOptions: {
            type: 'all',
            copyright: 'aMule developers',
          },
          remarkPlugins: [remarkZoomLargeImages],
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    [
      require.resolve('./plugins/docs-untranslated'),
      {
        sidebarPath: './sidebars.ts',
        editUrl: 'https://github.com/amule-org/amule-org.github.io/edit/main/',
        remarkPlugins: [remarkZoomLargeImages],
      },
    ],
    [
      require.resolve('./plugins/blog-changelog'),
      {
        id: 'changelog',
        path: './changelog',
        routeBasePath: '/changelog',
        blogTitle: 'Changelog',
        blogDescription: 'Release notes for every aMule version: new features, improvements and bug fixes.',
        blogSidebarTitle: 'Versions',
        blogSidebarCount: 'ALL',
        postsPerPage: 5,
        onUntruncatedBlogPosts: 'ignore',
        feedOptions: {
          type: 'all',
          copyright: 'aMule developers',
        },
        remarkPlugins: [remarkZoomLargeImages],
      },
    ],
    'docusaurus-plugin-image-zoom',
  ],

  themes: [
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
        // Docs are English-only, so every locale's index uses the English stemmer.
        language: ['en'],
        indexDocs: true,
        indexBlog: false,
        indexPages: false,
        docsRouteBasePath: '/docs',
      },
    ],
  ],

  themeConfig: {
    image: 'img/social-card.png',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    tableOfContents: {
      minHeadingLevel: 2,
      maxHeadingLevel: 4,
    },
    zoom: {
      // home-zoom: homepage feature screenshots (src/components/FeaturesSection)
      selector: '.markdown img.enable-zoom, img.home-zoom',
      background: {
        light: 'rgb(255, 255, 255)',
        dark: 'rgb(36, 37, 38)',
      },
    },
    navbar: {
      title: 'aMule',
      logo: {
        alt: 'aMule logo',
        src: 'img/amule-logo.svg',
      },
      items: [
        {to: '/download', label: 'Download', position: 'left'},
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          label: 'Documentation',
          position: 'left',
        },
        {to: '/changelog', label: 'Changelog', position: 'left'},
        {to: '/blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/amule-org/amule',
          label: 'GitHub',
          position: 'left',
        },
        {
          href: 'https://github.com/amule-org/amule/discussions',
          label: 'Discussions',
          position: 'left',
        },
        {
          type: 'localeDropdown',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'light',
      links: [
        {items: [{label: 'Source code', href: 'https://github.com/amule-org/amule'}]},
        {items: [{label: 'Releases', href: 'https://github.com/amule-org/amule/releases'}]},
        {items: [{label: 'Changelog RSS', href: 'pathname:///changelog/atom.xml'}]},
        {items: [{label: 'Blog RSS', href: 'pathname:///blog/atom.xml'}]},
      ],
      copyright:
        'aMule is free software released under the GNU GPL v2. The aMule developers have no control over what other peers transfer through eD2k/Kad and cannot be held liable for non-personal copyright infringement or other illegal activity by third parties. Share responsibly.',
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
