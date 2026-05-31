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
                'manual/interfaces/gui/usage',
                'manual/interfaces/gui/toolbar',
                'manual/interfaces/gui/statusbar',
                'manual/interfaces/gui/networks',
                'manual/interfaces/gui/searches',
                'manual/interfaces/gui/transfers',
                'manual/interfaces/gui/shared-files',
                'manual/interfaces/gui/messages',
                'manual/interfaces/gui/statistics',
                'manual/interfaces/gui/file-details',
                'manual/interfaces/gui/client-details',
                'manual/interfaces/gui/comments',
                'manual/interfaces/gui/priority',
                'manual/interfaces/gui/shortcuts',
                'manual/interfaces/gui/tray-icon',
                'manual/interfaces/gui/skins',
                'manual/interfaces/gui/macos',
              ],
            },
            'manual/interfaces/amuled',
            'manual/interfaces/amuleweb',
            'manual/interfaces/amulecmd',
          ],
        },
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
              label: 'Files & directories',
              link: {type: 'doc', id: 'manual/core/files/index'},
              items: [
                'manual/core/files/amule-conf',
                'manual/core/files/remote-conf',
              ],
            },
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
      label: 'Developer Guide',
      link: {type: 'doc', id: 'developer/index'},
      items: [
        'developer/code-style',
        'developer/ec-protocol',
        'developer/debugging',
        'developer/testing',
        {
          type: 'category',
          label: 'Compilation',
          link: {type: 'doc', id: 'developer/compilation/index'},
          items: [
            'developer/compilation/windows',
            'developer/compilation/macos',
            'developer/compilation/linux',
            'developer/compilation/bsd',
          ],
        },
        {
          type: 'category',
          label: 'File Formats',
          link: {type: 'generated-index'},
          items: [
            'developer/file-formats/server-met',
            'developer/file-formats/nodes-dat',
            'developer/file-formats/clients-met',
            'developer/file-formats/emfriends-met',
            'developer/file-formats/part-met',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'P2P Networks (eD2k & Kademlia)',
      link: {type: 'doc', id: 'p2p-networks/index'},
      items: [
        {
          type: 'category',
          label: 'eD2k Protocol',
          link: {type: 'generated-index'},
          items: [
            'p2p-networks/ed2k/ed2k-network',
            'p2p-networks/ed2k/ed2k-servers',
            'p2p-networks/ed2k/ed2k-clients',
            'p2p-networks/ed2k/ed2k-links',
            'p2p-networks/ed2k/aich',
            'p2p-networks/ed2k/secure-user-identification',
          ],
        },
        'p2p-networks/kademlia',
        'p2p-networks/high-id-low-id',
        'p2p-networks/concepts',
        'p2p-networks/other-networks',
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
  ],
};

export default sidebars;
