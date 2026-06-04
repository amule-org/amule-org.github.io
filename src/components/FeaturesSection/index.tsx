import React from 'react';
import Link from '@docusaurus/Link';
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
    title: <Translate id="homepage.features.networks.title">eD2k + Kademlia</Translate>,
    desc: (
      <Translate id="homepage.features.networks.desc">
        Connect to both the traditional eD2k server network and the serverless Kademlia DHT simultaneously, maximizing your reach and file availability.
      </Translate>
    ),
  },
  {
    icon: '🔗',
    title: <Translate id="homepage.features.emuleCompatible.title">eMule Compatible</Translate>,
    desc: (
      <Translate id="homepage.features.emuleCompatible.desc">
        Fully wire-compatible with eMule and all *Mule clients. Share files with the same sources, connect to the same servers, and open standard ed2k:// links.
      </Translate>
    ),
  },
  {
    icon: '🔍',
    title: <Translate id="homepage.features.search.title">Powerful Search</Translate>,
    desc: (
      <Translate id="homepage.features.search.desc">
        Search across eD2k servers (local and global) and Kademlia nodes. Filter by type, size, and availability. Boolean operators (AND, OR, NOT) supported.
      </Translate>
    ),
  },
  {
    icon: '🔄',
    title: <Translate id="homepage.features.sourceExchange.title">Source Exchange</Translate>,
    desc: (
      <Translate id="homepage.features.sourceExchange.desc">
        Automatically exchange source lists with connected peers to discover more sources for your downloads without querying the server repeatedly.
      </Translate>
    ),
  },
  {
    icon: '⭐',
    title: <Translate id="homepage.features.creditSystem.title">Credit System</Translate>,
    desc: (
      <Translate id="homepage.features.creditSystem.desc">
        A built-in credit and scoring system rewards users who actively upload. The more you share, the higher your score — resulting in faster downloads.
      </Translate>
    ),
  },
  {
    icon: '🛡️',
    title: <Translate id="homepage.features.ipFiltering.title">IP Filtering</Translate>,
    desc: (
      <Translate id="homepage.features.ipFiltering.desc">
        Block unwanted IP addresses using standard IP filter lists. Keep aggressive, malicious, or spy peers from connecting to your client.
      </Translate>
    ),
  },
  {
    icon: '▶️',
    title: <Translate id="homepage.features.preview.title">Preview Before Complete</Translate>,
    desc: (
      <Translate id="homepage.features.preview.desc">
        Play videos and audio files before a download finishes. Compatible with MPlayer, VLC, and other media players.
      </Translate>
    ),
  },
  {
    icon: '📂',
    title: <Translate id="homepage.features.categories.title">Download Categories</Translate>,
    desc: (
      <Translate id="homepage.features.categories.desc">
        Organize downloads into categories with custom save paths and priorities. Apply rules per category to keep your library tidy automatically.
      </Translate>
    ),
  },
  {
    icon: '⚙️',
    title: <Translate id="homepage.features.daemon.title">aMule Daemon</Translate>,
    desc: (
      <Translate id="homepage.features.daemon.desc">
        Run aMule as a lightweight headless process (amuled) on servers, NAS devices, or VPS instances — no graphical display required.
      </Translate>
    ),
  },
  {
    icon: '🖥️',
    title: <Translate id="homepage.features.remoteInterfaces.title">Remote Interfaces</Translate>,
    desc: (
      <Translate id="homepage.features.remoteInterfaces.desc">
        Control aMule from anywhere: a native remote GUI (amulegui), a browser-based web interface (amuleweb), or a command-line tool (amulecmd).
      </Translate>
    ),
  },
  {
    icon: '🔐',
    title: <Translate id="homepage.features.secureIdentification.title">Secure Identification</Translate>,
    desc: (
      <Translate id="homepage.features.secureIdentification.desc">
        Cryptographic secure user identification prevents your client hash from being stolen or spoofed by other peers on the network.
      </Translate>
    ),
  },
  {
    icon: '🔀',
    title: <Translate id="homepage.features.proxy.title">Proxy Support</Translate>,
    desc: (
      <Translate id="homepage.features.proxy.desc">
        Route connections through SOCKS4, SOCKS5, or HTTP proxies for privacy or to work around network restrictions.
      </Translate>
    ),
  },
  {
    icon: '💬',
    title: <Translate id="homepage.features.messaging.title">Messaging & Friends</Translate>,
    desc: (
      <Translate id="homepage.features.messaging.desc">
        Exchange messages directly with other aMule users and maintain a friends list to stay connected with your regular sharing partners.
      </Translate>
    ),
  },
  {
    icon: '📖',
    title: <Translate id="homepage.features.openSource.title">Free & Open Source</Translate>,
    desc: (
      <Translate id="homepage.features.openSource.desc">
        GPL-2.0 licensed with no telemetry, no advertisements, and no vendor lock-in. Your data is yours — inspect and contribute to the source code.
      </Translate>
    ),
  },
  {
    icon: '📦',
    title: <Translate id="homepage.features.nativePackages.title">Native Packages</Translate>,
    desc: (
      <Translate id="homepage.features.nativePackages.desc">
        Installer and portable .zip for Windows, Universal2 .dmg for macOS, AppImage and Flatpak on Linux. Available for both x64 and ARM64.
      </Translate>
    ),
  },
  {
    icon: '🛠️',
    title: <Translate id="homepage.features.corruptionHandling.title">Corruption Handling</Translate>,
    desc: (
      <Translate id="homepage.features.corruptionHandling.desc">
        The Intelligent Corruption Handler (ICH) and AICH automatically detect and repair corrupted download chunks, ensuring complete, intact files without restarting.
      </Translate>
    ),
  },
  {
    icon: '🗣️',
    title: <Translate id="homepage.features.languages.title">37 Interface Languages</Translate>,
    desc: (
      <Translate id="homepage.features.languages.desc">
        The full aMule interface is translated into 37 languages. Download and share files in your native language — the UI adapts automatically to your locale.
      </Translate>
    ),
  },
  {
    icon: '⚡',
    title: <Translate id="homepage.features.compressedTransfers.title">Compressed Transfers</Translate>,
    desc: (
      <Translate id="homepage.features.compressedTransfers.desc">
        File data and server communication are compressed with zlib, reducing bandwidth usage for compressible files and lowering the load on eD2k servers.
      </Translate>
    ),
  },
  {
    icon: '🖱️',
    title: <Translate id="homepage.features.ed2kLinks.title">ed2k:// Link Integration</Translate>,
    desc: (
      <Translate id="homepage.features.ed2kLinks.desc">
        Click ed2k:// links in your browser to start downloads instantly in aMule. The link handler integrates with your desktop for a seamless one-click experience.
      </Translate>
    ),
  },
  {
    icon: '🎛️',
    title: <Translate id="homepage.features.slotAllocation.title">Slot Allocation</Translate>,
    desc: (
      <Translate id="homepage.features.slotAllocation.desc">
        Control exactly how many clients you upload to at once and set per-slot bandwidth targets, giving you fine-grained control over your upload capacity.
      </Translate>
    ),
  },
  {
    icon: '🚦',
    title: <Translate id="homepage.features.bandwidthControl.title">Bandwidth Control</Translate>,
    desc: (
      <Translate id="homepage.features.bandwidthControl.desc">
        Set hard upload and download speed limits, enforced by precise token-bucket limiters. Cap aMule so it never saturates your connection — or let it run full-throttle when you're away.
      </Translate>
    ),
  },
  {
    icon: '📁',
    title: <Translate id="homepage.features.folderRescan.title">Automatic Folder Rescan</Translate>,
    desc: (
      <Translate id="homepage.features.folderRescan.desc">
        aMule watches your shared and Incoming folders and picks up new, changed, or removed files automatically — no manual reload needed when your library changes.
      </Translate>
    ),
  },
  {
    icon: '🔔',
    title: <Translate id="homepage.features.systemTray.title">System Tray</Translate>,
    desc: (
      <Translate id="homepage.features.systemTray.desc">
        Minimize aMule to the system tray and let it run quietly in the background. Works across Windows, macOS, and all major Linux desktops.
      </Translate>
    ),
  },
  {
    icon: '🚀',
    title: <Translate id="homepage.features.powerShare.title">Release Priority</Translate>,
    desc: (
      <Translate id="homepage.features.powerShare.desc">
        Give your own released files top priority in the upload queue so they spread across the network as fast as possible — ideal for sharing new content. In eMule this feature is known as PowerShare.
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
        <div className={styles.docsCta}>
          <Link className={styles.docsLink} to="/docs">
            <Translate id="homepage.features.docsLink">Browse the full documentation →</Translate>
          </Link>
        </div>
      </div>
    </section>
  );
}
