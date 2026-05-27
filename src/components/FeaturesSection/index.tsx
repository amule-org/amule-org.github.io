import React from 'react';
import Translate from '@docusaurus/Translate';
import styles from './styles.module.css';

interface FeatureCard {
  icon: string;
  titleId: string;
  titleDefault: string;
  descId: string;
  descDefault: string;
}

const FEATURES: FeatureCard[] = [
  {
    icon: '🌐',
    titleId: 'homepage.features.card1.title',
    titleDefault: 'eD2k + Kademlia',
    descId: 'homepage.features.card1.desc',
    descDefault: 'Connect to both the traditional eD2k server network and the serverless Kademlia DHT simultaneously, maximizing your reach and file availability.',
  },
  {
    icon: '🔗',
    titleId: 'homepage.features.card2.title',
    titleDefault: 'eMule Compatible',
    descId: 'homepage.features.card2.desc',
    descDefault: 'Fully wire-compatible with eMule and all *Mule clients. Share files with the same sources, connect to the same servers, and open standard ed2k:// links.',
  },
  {
    icon: '🔍',
    titleId: 'homepage.features.card3.title',
    titleDefault: 'Powerful Search',
    descId: 'homepage.features.card3.desc',
    descDefault: 'Search across eD2k servers (local and global) and Kademlia nodes. Filter by type, size, and availability. Boolean operators (AND, OR, NOT) supported.',
  },
  {
    icon: '🔄',
    titleId: 'homepage.features.card4.title',
    titleDefault: 'Source Exchange',
    descId: 'homepage.features.card4.desc',
    descDefault: 'Automatically exchange source lists with connected peers to discover more sources for your downloads without querying the server repeatedly.',
  },
  {
    icon: '⭐',
    titleId: 'homepage.features.card5.title',
    titleDefault: 'Credit System',
    descId: 'homepage.features.card5.desc',
    descDefault: 'A built-in credit and scoring system rewards users who actively upload. The more you share, the higher your score — resulting in faster downloads.',
  },
  {
    icon: '🛡️',
    titleId: 'homepage.features.card6.title',
    titleDefault: 'IP Filtering',
    descId: 'homepage.features.card6.desc',
    descDefault: 'Block unwanted IP addresses using standard IP filter lists. Keep aggressive, malicious, or spy peers from connecting to your client.',
  },
  {
    icon: '▶️',
    titleId: 'homepage.features.card7.title',
    titleDefault: 'Preview Before Complete',
    descId: 'homepage.features.card7.desc',
    descDefault: 'Play videos and audio files before a download finishes. Compatible with MPlayer, VLC, and other media players.',
  },
  {
    icon: '📂',
    titleId: 'homepage.features.card8.title',
    titleDefault: 'Download Categories',
    descId: 'homepage.features.card8.desc',
    descDefault: 'Organize downloads into categories with custom save paths and priorities. Apply rules per category to keep your library tidy automatically.',
  },
  {
    icon: '⚙️',
    titleId: 'homepage.features.card9.title',
    titleDefault: 'aMule Daemon',
    descId: 'homepage.features.card9.desc',
    descDefault: 'Run aMule as a lightweight headless process (amuled) on servers, NAS devices, or VPS instances — no graphical display required.',
  },
  {
    icon: '🖥️',
    titleId: 'homepage.features.card10.title',
    titleDefault: 'Remote Interfaces',
    descId: 'homepage.features.card10.desc',
    descDefault: 'Control aMule from anywhere: a native remote GUI (amulegui), a browser-based web interface (amuleweb), or a command-line tool (amulecmd).',
  },
  {
    icon: '🔐',
    titleId: 'homepage.features.card11.title',
    titleDefault: 'Secure Identification',
    descId: 'homepage.features.card11.desc',
    descDefault: 'Cryptographic secure user identification prevents your client hash from being stolen or spoofed by other peers on the network.',
  },
  {
    icon: '🔀',
    titleId: 'homepage.features.card12.title',
    titleDefault: 'Proxy Support',
    descId: 'homepage.features.card12.desc',
    descDefault: 'Route connections through SOCKS4, SOCKS5, or HTTP proxies for privacy or to work around network restrictions.',
  },
  {
    icon: '💬',
    titleId: 'homepage.features.card13.title',
    titleDefault: 'Messaging & Friends',
    descId: 'homepage.features.card13.desc',
    descDefault: 'Exchange messages directly with other aMule users and maintain a friends list to stay connected with your regular sharing partners.',
  },
  {
    icon: '📖',
    titleId: 'homepage.features.card14.title',
    titleDefault: 'Free & Open Source',
    descId: 'homepage.features.card14.desc',
    descDefault: 'GPL-2.0 licensed with no telemetry, no advertisements, and no vendor lock-in. Your data is yours — inspect and contribute to the source code.',
  },
  {
    icon: '📦',
    titleId: 'homepage.features.card15.title',
    titleDefault: 'Native Packages',
    descId: 'homepage.features.card15.desc',
    descDefault: 'Portable .zip for Windows, Universal2 .dmg for macOS, AppImage and Flatpak on Linux. Available for both x86_64 and ARM64.',
  },
  {
    icon: '🛠️',
    titleId: 'homepage.features.card16.title',
    titleDefault: 'Corruption Handling',
    descId: 'homepage.features.card16.desc',
    descDefault: 'The Intelligent Corruption Handler (ICH) and AICH automatically detect and repair corrupted download chunks, ensuring complete, intact files without restarting.',
  },
  {
    icon: '🗣️',
    titleId: 'homepage.features.card17.title',
    titleDefault: '28 Interface Languages',
    descId: 'homepage.features.card17.desc',
    descDefault: 'The full aMule interface is translated into 28 languages. Download and share files in your native language — the UI adapts automatically to your locale.',
  },
  {
    icon: '⚡',
    titleId: 'homepage.features.card18.title',
    titleDefault: 'Compressed Transfers',
    descId: 'homepage.features.card18.desc',
    descDefault: 'File data and server communication are compressed with zlib, reducing bandwidth usage for compressible files and lowering the load on eD2k servers.',
  },
  {
    icon: '🖱️',
    titleId: 'homepage.features.card19.title',
    titleDefault: 'ed2k:// Link Integration',
    descId: 'homepage.features.card19.desc',
    descDefault: 'Click ed2k:// links in your browser to start downloads instantly in aMule. The link handler integrates with your desktop for a seamless one-click experience.',
  },
  {
    icon: '🎛️',
    titleId: 'homepage.features.card20.title',
    titleDefault: 'Slot Allocation',
    descId: 'homepage.features.card20.desc',
    descDefault: 'Control exactly how many clients you upload to at once and set per-slot bandwidth targets, giving you fine-grained control over your upload capacity.',
  },
];

export default function FeaturesSection(): React.JSX.Element {
  return (
    <section className={styles.wrapper}>
      <div className={styles.inner}>
        <h2 className={styles.title}>
          <Translate id="homepage.features.title">Features</Translate>
        </h2>
        <div className={styles.grid}>
          {FEATURES.map((f) => (
            <div key={f.titleId} className={styles.item}>
              <div className={styles.iconWrap} aria-hidden="true">
                {f.icon}
              </div>
              <div className={styles.itemBody}>
                <h3 className={styles.itemTitle}>
                  <Translate id={f.titleId}>{f.titleDefault}</Translate>
                </h3>
                <p className={styles.itemDesc}>
                  <Translate id={f.descId}>{f.descDefault}</Translate>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
