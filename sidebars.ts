import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    {type: 'doc', id: 'index', label: 'Overview'},
    {type: 'doc', id: 'quickstart-guide', label: 'Quick Start'},
    {
      type: 'category',
      label: 'User Manual',
      link: {type: 'doc', id: 'manual/index'},
      items: [
        {type: 'doc', id: 'manual/installation/index', label: 'Installation'},
        {
          type: 'category',
          label: 'aMule Core',
          link: {type: 'doc', id: 'manual/core/index'},
          items: [
            'manual/core/get-high-id',
            'manual/core/download-folders',
            'manual/core/firewall',
            'manual/core/upnp',
            'manual/core/proxy',
            'manual/core/ipfilter',
            'manual/core/events',
            {
              type: 'category',
              label: 'Configuration files',
              link: {type: 'doc', id: 'manual/core/config-files/index'},
              items: [
                'manual/core/config-files/amule-conf',
                'manual/core/config-files/remote-conf',
              ],
            },
          ],
        },
        {
          type: 'category',
          label: 'Interfaces',
          link: {type: 'doc', id: 'manual/interfaces/index'},
          items: [
            {
              type: 'category',
              label: 'GUI',
              link: {type: 'generated-index'},
              items: [
                'manual/interfaces/gui/amule',
                'manual/interfaces/gui/amulegui',
                'manual/interfaces/gui/preferences',
                'manual/interfaces/gui/skins',
                {
                  type: 'category',
                  label: 'Usage',
                  link: {type: 'doc', id: 'manual/interfaces/gui/usage/index'},
                  items: [
                    'manual/interfaces/gui/usage/toolbar',
                    'manual/interfaces/gui/usage/statusbar',
                    'manual/interfaces/gui/usage/networks',
                    'manual/interfaces/gui/usage/searches',
                    'manual/interfaces/gui/usage/transfers',
                    'manual/interfaces/gui/usage/shared-files',
                    'manual/interfaces/gui/usage/messages',
                    'manual/interfaces/gui/usage/statistics',
                    'manual/interfaces/gui/usage/file-details',
                    'manual/interfaces/gui/usage/client-details',
                    'manual/interfaces/gui/usage/comments',
                    'manual/interfaces/gui/usage/priority',
                    'manual/interfaces/gui/usage/shortcuts',
                    'manual/interfaces/gui/usage/tray-icon',
                    'manual/interfaces/gui/usage/macos',
                  ],
                },
              ],
            },
            'manual/interfaces/amuled',
            'manual/interfaces/amuleweb',
            'manual/interfaces/amulecmd',
          ],
        },
        {
          type: 'category',
          label: 'Utilities',
          link: {type: 'generated-index'},
          items: [
            'manual/utilities/alc-alcc',
            'manual/utilities/ed2k',
            'manual/utilities/cas-wxcas',
            'manual/utilities/amulesig-dat',
            'manual/utilities/cas',
          ],
        },
        {
          type: 'category',
          label: 'Migration',
          link: {type: 'doc', id: 'manual/migration/index'},
          items: [
            'manual/migration/import',
            'manual/migration/migrate-from-emule',
            'manual/migration/import-export',
          ],
        },
        {
          type: 'category',
          label: 'Troubleshooting',
          link: {type: 'doc', id: 'manual/troubleshooting/index'},
          items: [
            'manual/troubleshooting/common-problems',
            'manual/troubleshooting/slow-speeds',
            'manual/troubleshooting/fake-files-and-servers',
            'manual/troubleshooting/remote-access',
          ],
        },
        {
          type: 'category',
          label: 'FAQ',
          link: {type: 'doc', id: 'manual/faq/index'},
          items: [
            'manual/faq/general',
            'manual/faq/network',
            'manual/faq/remote-access',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'P2P Networks (eD2k & Kademlia)',
      link: {type: 'doc', id: 'ed2k/index'},
      items: [
        'ed2k/ed2k-network',
        'ed2k/ed2k-servers',
        'ed2k/ed2k-clients',
        'ed2k/ed2k-links',
        'ed2k/kademlia',
        'ed2k/high-id-low-id',
        'ed2k/aich',
        'ed2k/secure-user-identification',
        'ed2k/concepts',
        'ed2k/other-networks',
      ],
    },
    {
      type: 'category',
      label: 'Developer Guide',
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
            'development/compilation/windows',
            'development/compilation/macos',
            'development/compilation/linux',
            'development/compilation/bsd',
          ],
        },
        {
          type: 'category',
          label: 'Binary File Formats',
          link: {type: 'generated-index'},
          items: [
            'development/file-formats/server-met',
            'development/file-formats/nodes-dat',
            'development/file-formats/clients-met',
            'development/file-formats/emfriends-met',
            'development/file-formats/part-met',
          ],
        },
        {
          type: 'category',
          label: 'Contributing',
          link: {type: 'doc', id: 'development/contributing/index'},
          items: [
            'development/contributing/bug-reports',
            'development/contributing/translations',
            'development/contributing/documentation',
          ],
        },
      ],
    },
  ],
};

export default sidebars;
