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
        'ed2k/kademlia',
        'ed2k/ed2k-links',
        'ed2k/aich',
        'ed2k/secure-user-identification',
        'ed2k/ed2k-clients',
        {
          type: 'category',
          label: 'Concepts',
          link: {type: 'doc', id: 'ed2k/concepts/index'},
          items: [],
        },
      ],
    },
    {
      type: 'category',
      label: 'Development',
      link: {type: 'doc', id: 'development/index'},
      items: [
        {
          type: 'category',
          label: 'Compilation',
          link: {type: 'doc', id: 'development/compilation/index'},
          items: [],
        },
      ],
    },
    {
      type: 'category',
      label: 'Contributing',
      link: {type: 'doc', id: 'contributing/index'},
      items: [
        'contributing/translations',
        'contributing/documentation',
      ],
    },
    {type: 'doc', id: 'troubleshooting/index', label: 'Troubleshooting'},
    {type: 'doc', id: 'faq/index', label: 'FAQ'},
    {type: 'doc', id: 'changelogs/index', label: 'Changelogs'},
  ],
};

export default sidebars;
