import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    {type: 'doc', id: 'index', label: 'Overview'},
    {type: 'doc', id: 'quickstart-guide', label: 'Quick Start'},
    {
      type: 'category',
      label: 'User Manual',
      collapsed: false,
      link: {type: 'doc', id: 'manual/index'},
      items: [
        {type: 'doc', id: 'manual/installation/index', label: 'Installation'},
        {
          type: 'category',
          label: 'Configuration',
          link: {type: 'doc', id: 'manual/configuration/index'},
          items: [
            {
              type: 'category',
              label: 'Configuration Files',
              link: {type: 'doc', id: 'manual/configuration/config-files/index'},
              items: [
                'manual/configuration/config-files/amule-conf',
                'manual/configuration/config-files/remote-conf',
              ],
            },
            'manual/configuration/download-folders',
            'manual/configuration/network-connectivity',
            'manual/configuration/firewall',
            'manual/configuration/upnp',
            'manual/configuration/proxy',
            'manual/configuration/events',
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
              link: {type: 'doc', id: 'manual/interfaces/gui/index'},
              items: [
                'manual/interfaces/gui/amule',
                'manual/interfaces/gui/amulegui',
                'manual/interfaces/gui/preferences',
                'manual/interfaces/gui/toolbar',
                'manual/interfaces/gui/statusbar',
                'manual/interfaces/gui/networks',
                'manual/interfaces/gui/searches',
                'manual/interfaces/gui/downloads',
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
          label: 'Utilities',
          link: {type: 'doc', id: 'manual/utilities/index'},
          items: [
            'manual/utilities/ed2k',
            'manual/utilities/alc-alcc',
            'manual/utilities/wxcas-cas',
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
        'developer/debugging',
        'developer/testing',
        'developer/translations',
        'developer/documentation',
        'developer/code-style',
        {
          type: 'category',
          label: 'File Formats',
          link: {type: 'doc', id: 'developer/file-formats/index'},
          items: [
            'developer/file-formats/fileview',
            'developer/file-formats/server-met',
            'developer/file-formats/nodes-dat',
            'developer/file-formats/clients-met',
            'developer/file-formats/emfriends-met',
            'developer/file-formats/part-met',
          ],
        },
        'developer/ec-protocol'
      ],
    },
    {
      type: 'category',
      label: 'P2P Networks',
      link: {type: 'doc', id: 'p2p-networks/index'},
      items: [
        {
          type: 'category',
          label: 'eD2k Network',
          link: {type: 'doc', id: 'p2p-networks/ed2k/index'},
          items: [
            'p2p-networks/ed2k/servers',
            'p2p-networks/ed2k/clients',
            'p2p-networks/ed2k/links',
            'p2p-networks/ed2k/high-id',
            'p2p-networks/ed2k/secure-user-identification',
            'p2p-networks/ed2k/aich',
          ],
        },
        'p2p-networks/kademlia',
        'p2p-networks/concepts',
        'p2p-networks/other-networks',
      ],
    },
    {
      type: 'category',
      label: 'Contributing',
      link: {type: 'doc', id: 'contributing/index'},
      items: [
        'contributing/bug-report',
      ],
    },
  ],
};

export default sidebars;
