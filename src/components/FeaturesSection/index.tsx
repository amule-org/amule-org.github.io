import React from 'react';
import Translate from '@docusaurus/Translate';
import styles from './styles.module.css';

interface FeatureCard {
  icon: string;
  title: React.ReactNode;
  desc: React.ReactNode;
}

const FEATURES: FeatureCard[] = [
  {
    icon: '🌐',
    title: <Translate id="homepage.features.card1.title">eD2k + Kademlia</Translate>,
    desc: (
      <Translate id="homepage.features.card1.desc">
        Connect to both the traditional eD2k server network and the serverless Kademlia DHT simultaneously, maximizing your reach and file availability.
      </Translate>
    ),
  },
  {
    icon: '🔗',
    title: <Translate id="homepage.features.card2.title">eMule Compatible</Translate>,
    desc: (
      <Translate id="homepage.features.card2.desc">
        Fully wire-compatible with eMule and all *Mule clients. Share files with the same sources, connect to the same servers, and open standard ed2k:// links.
      </Translate>
    ),
  },
  {
    icon: '🔍',
    title: <Translate id="homepage.features.card3.title">Powerful Search</Translate>,
    desc: (
      <Translate id="homepage.features.card3.desc">
        Search across eD2k servers (local and global) and Kademlia nodes. Filter by type, size, and availability. Boolean operators (AND, OR, NOT) supported.
      </Translate>
    ),
  },
  {
    icon: '🔄',
    title: <Translate id="homepage.features.card4.title">Source Exchange</Translate>,
    desc: (
      <Translate id="homepage.features.card4.desc">
        Automatically exchange source lists with connected peers to discover more sources for your downloads without querying the server repeatedly.
      </Translate>
    ),
  },
  {
    icon: '⭐',
    title: <Translate id="homepage.features.card5.title">Credit System</Translate>,
    desc: (
      <Translate id="homepage.features.card5.desc">
        A built-in credit and scoring system rewards users who actively upload. The more you share, the higher your score — resulting in faster downloads.
      </Translate>
    ),
  },
  {
    icon: '🛡️',
    title: <Translate id="homepage.features.card6.title">IP Filtering</Translate>,
    desc: (
      <Translate id="homepage.features.card6.desc">
        Block unwanted IP addresses using standard IP filter lists. Keep aggressive, malicious, or spy peers from connecting to your client.
      </Translate>
    ),
  },
  {
    icon: '▶️',
    title: <Translate id="homepage.features.card7.title">Preview Before Complete</Translate>,
    desc: (
      <Translate id="homepage.features.card7.desc">
        Play videos and audio files before a download finishes. Compatible with MPlayer, VLC, and other media players.
      </Translate>
    ),
  },
  {
    icon: '📂',
    title: <Translate id="homepage.features.card8.title">Download Categories</Translate>,
    desc: (
      <Translate id="homepage.features.card8.desc">
        Organize downloads into categories with custom save paths and priorities. Apply rules per category to keep your library tidy automatically.
      </Translate>
    ),
  },
  {
    icon: '⚙️',
    title: <Translate id="homepage.features.card9.title">aMule Daemon</Translate>,
    desc: (
      <Translate id="homepage.features.card9.desc">
        Run aMule as a lightweight headless process (amuled) on servers, NAS devices, or VPS instances — no graphical display required.
      </Translate>
    ),
  },
  {
    icon: '🖥️',
    title: <Translate id="homepage.features.card10.title">Remote Interfaces</Translate>,
    desc: (
      <Translate id="homepage.features.card10.desc">
        Control aMule from anywhere: a native remote GUI (amulegui), a browser-based web interface (amuleweb), or a command-line tool (amulecmd).
      </Translate>
    ),
  },
  {
    icon: '🔐',
    title: <Translate id="homepage.features.card11.title">Secure Identification</Translate>,
    desc: (
      <Translate id="homepage.features.card11.desc">
        Cryptographic secure user identification prevents your client hash from being stolen or spoofed by other peers on the network.
      </Translate>
    ),
  },
  {
    icon: '🔀',
    title: <Translate id="homepage.features.card12.title">Proxy Support</Translate>,
    desc: (
      <Translate id="homepage.features.card12.desc">
        Route connections through SOCKS4, SOCKS5, or HTTP proxies for privacy or to work around network restrictions.
      </Translate>
    ),
  },
  {
    icon: '💬',
    title: <Translate id="homepage.features.card13.title">Messaging & Friends</Translate>,
    desc: (
      <Translate id="homepage.features.card13.desc">
        Exchange messages directly with other aMule users and maintain a friends list to stay connected with your regular sharing partners.
      </Translate>
    ),
  },
  {
    icon: '📖',
    title: <Translate id="homepage.features.card14.title">Free & Open Source</Translate>,
    desc: (
      <Translate id="homepage.features.card14.desc">
        GPL-2.0 licensed with no telemetry, no advertisements, and no vendor lock-in. Your data is yours — inspect and contribute to the source code.
      </Translate>
    ),
  },
  {
    icon: '📦',
    title: <Translate id="homepage.features.card15.title">Native Packages</Translate>,
    desc: (
      <Translate id="homepage.features.card15.desc">
        Portable .zip for Windows, Universal2 .dmg for macOS, AppImage and Flatpak on Linux. Available for both x86_64 and ARM64.
      </Translate>
    ),
  },
  {
    icon: '🛠️',
    title: <Translate id="homepage.features.card16.title">Corruption Handling</Translate>,
    desc: (
      <Translate id="homepage.features.card16.desc">
        The Intelligent Corruption Handler (ICH) and AICH automatically detect and repair corrupted download chunks, ensuring complete, intact files without restarting.
      </Translate>
    ),
  },
  {
    icon: '🗣️',
    title: <Translate id="homepage.features.card17.title">28 Interface Languages</Translate>,
    desc: (
      <Translate id="homepage.features.card17.desc">
        The full aMule interface is translated into 28 languages. Download and share files in your native language — the UI adapts automatically to your locale.
      </Translate>
    ),
  },
  {
    icon: '⚡',
    title: <Translate id="homepage.features.card18.title">Compressed Transfers</Translate>,
    desc: (
      <Translate id="homepage.features.card18.desc">
        File data and server communication are compressed with zlib, reducing bandwidth usage for compressible files and lowering the load on eD2k servers.
      </Translate>
    ),
  },
  {
    icon: '🖱️',
    title: <Translate id="homepage.features.card19.title">ed2k:// Link Integration</Translate>,
    desc: (
      <Translate id="homepage.features.card19.desc">
        Click ed2k:// links in your browser to start downloads instantly in aMule. The link handler integrates with your desktop for a seamless one-click experience.
      </Translate>
    ),
  },
  {
    icon: '🎛️',
    title: <Translate id="homepage.features.card20.title">Slot Allocation</Translate>,
    desc: (
      <Translate id="homepage.features.card20.desc">
        Control exactly how many clients you upload to at once and set per-slot bandwidth targets, giving you fine-grained control over your upload capacity.
      </Translate>
    ),
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
          {FEATURES.map((f, i) => (
            <div key={i} className={styles.item}>
              <div className={styles.iconWrap} aria-hidden="true">
                {f.icon}
              </div>
              <div className={styles.itemBody}>
                <h3 className={styles.itemTitle}>{f.title}</h3>
                <p className={styles.itemDesc}>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
