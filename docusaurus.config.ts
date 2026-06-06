import path from 'path';
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
  markdown: {
    hooks: {
      // When a relative link in a translated page points to a page that hasn't
      // been translated yet, redirect to the English version instead of failing
      // the build. This also handles English fallback docs processed during a
      // non-English build. Links in the English build still throw as normal.
      onBrokenMarkdownLinks: ({sourceFilePath, url}) => {
        const currentLocale = process.env.DOCUSAURUS_CURRENT_LOCALE ?? 'en';
        if (currentLocale === 'en') {
          throw new Error(`Broken markdown link: "${url}" in ${sourceFilePath}`);
        }
        const normalized = sourceFilePath.replace(/\\/g, '/');
        const i18nMatch = normalized.match(
          /i18n\/[^/]+\/docusaurus-plugin-content-docs\/[^/]+\/(.*)/
        );
        const docsMatch = normalized.match(/(?:^|\/)docs\/(.*)/);
        const relativeDocPath = i18nMatch?.[1] ?? docsMatch?.[1];
        if (!relativeDocPath) {
          throw new Error(`Broken markdown link: "${url}" in ${sourceFilePath}`);
        }
        const [urlWithoutHash, hash] = url.split('#');
        const cleanUrl = urlWithoutHash.replace(/\.mdx?$/, '');
        const sourceDir = path.posix.dirname(relativeDocPath);
        const targetPath = path.posix.normalize(path.posix.join(sourceDir, cleanUrl));
        return `pathname:///docs/${targetPath}${hash ? `#${hash}` : ''}`;
      },
    },
  },
  favicon: 'img/favicon.ico',
  headTags: [
    {tagName: 'link', attributes: {rel: 'icon', type: 'image/png', sizes: '16x16', href: `${baseUrl}img/favicon-16x16.png`}},
    {tagName: 'link', attributes: {rel: 'icon', type: 'image/png', sizes: '32x32', href: `${baseUrl}img/favicon-32x32.png`}},
    {tagName: 'link', attributes: {rel: 'icon', type: 'image/png', sizes: '48x48', href: `${baseUrl}img/favicon-48x48.png`}},
  ],

  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es'],
    localeConfigs: {
      en: {label: 'English'},
      es: {label: 'Español'},
    },
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl: 'https://github.com/amule-org/amule-org.github.io/edit/main/',
          remarkPlugins: [remarkZoomLargeImages],
        },
        blog: {
          blogTitle: 'Blog',
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
      '@docusaurus/plugin-content-blog',
      {
        id: 'changelog',
        path: './changelog',
        routeBasePath: '/changelog',
        blogTitle: 'Changelog',
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
        language: ['en', 'es'],
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
      selector: '.markdown img.enable-zoom',
      background: {
        light: 'rgb(255, 255, 255)',
        dark: 'rgb(36, 37, 38)',
      },
    },
    navbar: {
      title: 'aMule',
      logo: {
        alt: 'aMule logo',
        src: 'img/amule-logo.png',
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
      style: 'dark',
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
