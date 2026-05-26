import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    {type: 'doc', id: 'index', label: 'Overview'},
    {type: 'doc', id: 'quickstart-guide/index', label: 'Quick Start'},
    {
      type: 'category',
      label: 'User Guide',
      link: {type: 'doc', id: 'user-guide/index'},
      items: [
        {
          type: 'category',
          label: 'Installation',
          link: {type: 'doc', id: 'user-guide/installation/index'},
          items: [],
        },
        {
          type: 'category',
          label: 'Configuration',
          link: {type: 'doc', id: 'user-guide/configuration/index'},
          items: [],
        },
        {
          type: 'category',
          label: 'Usage',
          link: {type: 'doc', id: 'user-guide/usage/index'},
          items: [],
        },
        {
          type: 'category',
          label: 'aMule Modules',
          link: {type: 'doc', id: 'user-guide/amule-components/index'},
          items: [
            'user-guide/amule-components/amule',
            'user-guide/amule-components/amuled',
            'user-guide/amule-components/amulegui',
            'user-guide/amule-components/amuleweb',
            'user-guide/amule-components/amulecmd',
            'user-guide/amule-components/ed2k-cli',
            'user-guide/amule-components/alc-alcc',
            'user-guide/amule-components/cas-wxcas',
          ],
        },
        {
          type: 'category',
          label: 'aMule Files',
          link: {type: 'doc', id: 'user-guide/amule-files/index'},
          items: [
            'user-guide/amule-files/amule-conf',
            'user-guide/amule-files/remote-conf',
            'user-guide/amule-files/nodes-dat',
            'user-guide/amule-files/server-met',
            'user-guide/amule-files/clients-met',
            'user-guide/amule-files/emfriends-met',
            'user-guide/amule-files/part-met',
            'user-guide/amule-files/amulesig-dat',
            'user-guide/amule-files/cas',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'eD2k & Kademlia',
      link: {type: 'doc', id: 'ed2k/index'},
      items: [
        'ed2k/ed2k-network',
        'ed2k/ed2k-servers',
        'ed2k/ed2k-clients',
        'ed2k/ed2k-links',
        'ed2k/kademlia',
        'ed2k/aich',
        'ed2k/secure-user-identification',
        'ed2k/concepts',
      ],
    },
    {
      type: 'category',
      label: 'Development',
      link: {type: 'doc', id: 'development/index'},
      items: [
        'development/code-style',
        'development/ec-protocol',
        'development/debugging',
        'development/testing',
        {
          type: 'category',
          label: 'Compilation',
          link: {type: 'doc', id: 'development/compilation/index'},
          items: [
            'development/compilation/linux',
            'development/compilation/macos',
            'development/compilation/windows',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Contributing',
      link: {type: 'doc', id: 'contributing/index'},
      items: [
        'contributing/bug-reports',
        'contributing/translations',
        'contributing/documentation',
      ],
    },
    {
      type: 'category',
      label: 'Troubleshooting',
      link: {type: 'doc', id: 'troubleshooting/index'},
      items: [
        'troubleshooting/common-problems',
        'troubleshooting/slow-speeds',
        'troubleshooting/fake-files-and-servers',
        'troubleshooting/remote-access',
      ],
    },
    {
      type: 'category',
      label: 'FAQ',
      link: {type: 'doc', id: 'faq/index'},
      items: [
        'faq/general',
        'faq/network',
        'faq/remote-access',
      ],
    },
    {type: 'doc', id: 'changelogs/index', label: 'Changelogs'},
  ],
};

export default sidebars;
