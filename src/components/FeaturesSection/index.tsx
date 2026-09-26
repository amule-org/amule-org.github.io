import React from 'react';
import Link from '@docusaurus/Link';
import Translate, {translate} from '@docusaurus/Translate';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

interface Feature {
  title: React.ReactNode;
  desc: React.ReactNode;
}

const F = {
  networks: {
    title: <Translate id="homepage.features.networks.title" description="Title of the 'eD2k + Kademlia' feature">eD2k + Kademlia</Translate>,
    desc: (
      <Translate id="homepage.features.networks.desc" description="Body of the 'eD2k + Kademlia' feature">
        Connect to both the traditional eD2k server network and the serverless Kademlia DHT simultaneously, maximizing your reach and file availability.
      </Translate>
    ),
  },
  emuleCompatible: {
    title: <Translate id="homepage.features.emuleCompatible.title" description="Title of the 'eMule Compatible' feature">eMule Compatible</Translate>,
    desc: (
      <Translate id="homepage.features.emuleCompatible.desc" description="Body of the 'eMule Compatible' feature">
        Fully wire-compatible with eMule and all *Mule clients. Share files with the same sources, connect to the same servers, and open standard ed2k:// links.
      </Translate>
    ),
  },
  search: {
    title: <Translate id="homepage.features.search.title" description="Title of the 'Powerful Search' feature">Powerful Search</Translate>,
    desc: (
      <Translate id="homepage.features.search.desc" description="Body of the 'Powerful Search' feature">
        Search across eD2k servers (local and global) and Kademlia nodes. Filter by type, size, and availability. Boolean operators (AND, OR, NOT) supported.
      </Translate>
    ),
  },
  openSource: {
    title: <Translate id="homepage.features.openSource.title" description="Title of the 'Free & Open Source' feature">Free & Open Source</Translate>,
    desc: (
      <Translate id="homepage.features.openSource.desc" description="Body of the 'Free & Open Source' feature">
        GPL-2.0 licensed with no telemetry, no advertisements, and no vendor lock-in. Your data is yours — inspect and contribute to the source code.
      </Translate>
    ),
  },
  nativePackages: {
    title: <Translate id="homepage.features.nativePackages.title" description="Title of the 'Native Packages' feature">Native Packages</Translate>,
    desc: (
      <Translate id="homepage.features.nativePackages.desc" description="Body of the 'Native Packages' feature">
        Installer and portable .zip for Windows, Universal2 .dmg for macOS, AppImage and Flatpak on Linux, for both x64 and ARM64 — plus fully static headless binaries for Linux servers.
      </Translate>
    ),
  },
  sourceExchange: {
    title: <Translate id="homepage.features.sourceExchange.title" description="Title of the 'Source Exchange' feature">Source Exchange</Translate>,
    desc: (
      <Translate id="homepage.features.sourceExchange.desc" description="Body of the 'Source Exchange' feature">
        Automatically exchange source lists with connected peers to discover more sources for your downloads without querying the server repeatedly.
      </Translate>
    ),
  },
  creditSystem: {
    title: <Translate id="homepage.features.creditSystem.title" description="Title of the 'Credit System' feature">Credit System</Translate>,
    desc: (
      <Translate id="homepage.features.creditSystem.desc" description="Body of the 'Credit System' feature">
        A built-in credit and scoring system rewards users who actively upload. The more you share, the higher your score — resulting in faster downloads.
      </Translate>
    ),
  },
  corruptionHandling: {
    title: <Translate id="homepage.features.corruptionHandling.title" description="Title of the 'Corruption Handling' feature">Corruption Handling</Translate>,
    desc: (
      <Translate id="homepage.features.corruptionHandling.desc" description="Body of the 'Corruption Handling' feature">
        The Intelligent Corruption Handler (ICH) and AICH automatically detect and repair corrupted download chunks, ensuring complete, intact files without restarting.
      </Translate>
    ),
  },
  bandwidthControl: {
    title: <Translate id="homepage.features.bandwidthControl.title" description="Title of the 'Bandwidth Control' feature">Bandwidth Control</Translate>,
    desc: (
      <Translate id="homepage.features.bandwidthControl.desc" description="Body of the 'Bandwidth Control' feature">
        Set hard upload and download speed limits, enforced by precise token-bucket limiters. Cap aMule so it never saturates your connection — or let it run full-throttle when you're away.
      </Translate>
    ),
  },
  categories: {
    title: <Translate id="homepage.features.categories.title" description="Title of the 'Download Categories' feature">Download Categories</Translate>,
    desc: (
      <Translate id="homepage.features.categories.desc" description="Body of the 'Download Categories' feature">
        Organize downloads into categories with custom save paths and priorities. Apply rules per category to keep your library tidy automatically.
      </Translate>
    ),
  },
  preview: {
    title: <Translate id="homepage.features.preview.title" description="Title of the 'Preview Before Complete' feature">Preview Before Complete</Translate>,
    desc: (
      <Translate id="homepage.features.preview.desc" description="Body of the 'Preview Before Complete' feature">
        Play videos and audio files before a download finishes. Compatible with MPlayer, VLC, and other media players.
      </Translate>
    ),
  },
  ed2kLinks: {
    title: <Translate id="homepage.features.ed2kLinks.title" description="Title of the 'One-Click Links' feature (ed2k://, magnet: links and .emulecollection files)">One-Click Links</Translate>,
    desc: (
      <Translate id="homepage.features.ed2kLinks.desc" description="Body of the 'One-Click Links' feature (ed2k://, magnet: links and .emulecollection files)">
        Click ed2k:// and magnet: links in your browser, or open .emulecollection files, to start downloads instantly. aMule registers itself as their handler on Windows, macOS, Linux, and BSD.
      </Translate>
    ),
  },
  remoteInterfaces: {
    title: <Translate id="homepage.features.remoteInterfaces.title" description="Title of the 'Remote Interfaces' feature">Remote Interfaces</Translate>,
    desc: (
      <Translate id="homepage.features.remoteInterfaces.desc" description="Body of the 'Remote Interfaces' feature">
        Control aMule from anywhere: a native remote GUI (amulegui), a REST API and modern browser Web UI (amuleapi), a command-line tool (amulecmd), or the legacy WebUI (amuleweb).
      </Translate>
    ),
  },
  daemon: {
    title: <Translate id="homepage.features.daemon.title" description="Title of the 'aMule Daemon' feature">aMule Daemon</Translate>,
    desc: (
      <Translate id="homepage.features.daemon.desc" description="Body of the 'aMule Daemon' feature">
        Run aMule as a lightweight headless process (amuled) on servers, NAS devices, or VPS instances — no graphical display required.
      </Translate>
    ),
  },
  ipFiltering: {
    title: <Translate id="homepage.features.ipFiltering.title" description="Title of the 'IP Filtering' feature">IP Filtering</Translate>,
    desc: (
      <Translate id="homepage.features.ipFiltering.desc" description="Body of the 'IP Filtering' feature">
        Block unwanted IP addresses using standard IP filter lists. Keep aggressive, malicious, or spy peers from connecting to your client.
      </Translate>
    ),
  },
  secureIdentification: {
    title: <Translate id="homepage.features.secureIdentification.title" description="Title of the 'Secure Identification' feature">Secure Identification</Translate>,
    desc: (
      <Translate id="homepage.features.secureIdentification.desc" description="Body of the 'Secure Identification' feature">
        Cryptographic secure user identification prevents your client hash from being stolen or spoofed by other peers on the network.
      </Translate>
    ),
  },
  slotAllocation: {
    title: <Translate id="homepage.features.slotAllocation.title" description="Title of the 'Slot Allocation' feature">Slot Allocation</Translate>,
    desc: (
      <Translate id="homepage.features.slotAllocation.desc" description="Body of the 'Slot Allocation' feature">
        Control exactly how many clients you upload to at once and set per-slot bandwidth targets, giving you fine-grained control over your upload capacity.
      </Translate>
    ),
  },
  powerShare: {
    title: <Translate id="homepage.features.powerShare.title" description="Title of the 'Release Priority' feature (PowerShare in eMule)">Release Priority</Translate>,
    desc: (
      <Translate id="homepage.features.powerShare.desc" description="Body of the 'Release Priority' feature (PowerShare in eMule)">
        Give your own released files top priority in the upload queue so they spread across the network as fast as possible — ideal for sharing new content. In eMule this feature is known as PowerShare.
      </Translate>
    ),
  },
  compressedTransfers: {
    title: <Translate id="homepage.features.compressedTransfers.title" description="Title of the 'Compressed Transfers' feature">Compressed Transfers</Translate>,
    desc: (
      <Translate id="homepage.features.compressedTransfers.desc" description="Body of the 'Compressed Transfers' feature">
        File data and server communication are compressed with zlib, reducing bandwidth usage for compressible files and lowering the load on eD2k servers.
      </Translate>
    ),
  },
  folderRescan: {
    title: <Translate id="homepage.features.folderRescan.title" description="Title of the 'Automatic Folder Rescan' feature">Automatic Folder Rescan</Translate>,
    desc: (
      <Translate id="homepage.features.folderRescan.desc" description="Body of the 'Automatic Folder Rescan' feature">
        aMule watches your shared and Incoming folders and picks up new, changed, or removed files automatically — no manual reload needed when your library changes.
      </Translate>
    ),
  },
  systemTray: {
    title: <Translate id="homepage.features.systemTray.title" description="Title of the 'System Tray' feature">System Tray</Translate>,
    desc: (
      <Translate id="homepage.features.systemTray.desc" description="Body of the 'System Tray' feature">
        Minimize aMule to the system tray and let it run quietly in the background. Works across Windows, macOS, and all major Linux desktops.
      </Translate>
    ),
  },
  messaging: {
    title: <Translate id="homepage.features.messaging.title" description="Title of the 'Messaging & Friends' feature">Messaging & Friends</Translate>,
    desc: (
      <Translate id="homepage.features.messaging.desc" description="Body of the 'Messaging & Friends' feature">
        Exchange messages directly with other aMule users and maintain a friends list to stay connected with your regular sharing partners.
      </Translate>
    ),
  },
  proxy: {
    title: <Translate id="homepage.features.proxy.title" description="Title of the 'Proxy Support' feature">Proxy Support</Translate>,
    desc: (
      <Translate id="homepage.features.proxy.desc" description="Body of the 'Proxy Support' feature">
        Route connections through SOCKS4, SOCKS5, or HTTP proxies for privacy or to work around network restrictions.
      </Translate>
    ),
  },
  languages: {
    title: <Translate id="homepage.features.languages.title" description="Title of the '37 Interface Languages' feature">37 Interface Languages</Translate>,
    desc: (
      <Translate id="homepage.features.languages.desc" description="Body of the '37 Interface Languages' feature">
        The full aMule interface is translated into 37 languages. Download and share files in your native language — the UI adapts automatically to your locale.
      </Translate>
    ),
  },
  endgame: {
    title: <Translate id="homepage.features.endgame.title" description="Title of the 'Endgame Mode' feature">Endgame Mode</Translate>,
    desc: (
      <Translate id="homepage.features.endgame.desc" description="Body of the 'Endgame Mode' feature">
        Near the end of a download, a fast source takes over the blocks held by a much slower one, so files do not stall at 99% behind one slow peer.
      </Translate>
    ),
  },
  verifyLocalData: {
    title: <Translate id="homepage.features.verifyLocalData.title" description="Title of the 'Verify Local Data' feature">Verify Local Data</Translate>,
    desc: (
      <Translate id="homepage.features.verifyLocalData.desc" description="Body of the 'Verify Local Data' feature">
        Re-hash shared files on demand to check that the data on disk is still intact.
      </Translate>
    ),
  },
  encryptedRemote: {
    title: <Translate id="homepage.features.encryptedRemote.title" description="Title of the 'Encrypted Remote Control' feature">Encrypted Remote Control</Translate>,
    desc: (
      <Translate id="homepage.features.encryptedRemote.desc" description="Body of the 'Encrypted Remote Control' feature; 'core' is the aMule process being controlled">
        Remote interfaces encrypt their connection to the core, new installations accept it only from the local machine, and failed logins are throttled.
      </Translate>
    ),
  },
  interfaceBinding: {
    title: <Translate id="homepage.features.interfaceBinding.title" description="Title of the 'Network Interface Binding' feature">Network Interface Binding</Translate>,
    desc: (
      <Translate id="homepage.features.interfaceBinding.desc" description="Body of the 'Network Interface Binding' feature">
        Pin aMule's traffic to one network interface, such as a VPN, so it does not leave through the default route while that interface exists (not available on BSD).
      </Translate>
    ),
  },
  appearance: {
    title: <Translate id="homepage.features.appearance.title" description="Title of the 'Light and Dark Appearance' feature">Light and Dark Appearance</Translate>,
    desc: (
      <Translate id="homepage.features.appearance.desc" description="Body of the 'Light and Dark Appearance' feature">
        The interface follows your system's light or dark theme, with sharp icons on high-resolution displays.
      </Translate>
    ),
  },
} satisfies Record<string, Feature>;

interface Showcase {
  title: React.ReactNode;
  lead: React.ReactNode;
  img: string;
  width: number;
  height: number;
  alt: string;
  features: Feature[];
}

// Screenshots are crops of the docs screenshots (static/img/docs/).
const SHOWCASES: Showcase[] = [
  {
    title: <Translate id="homepage.showcase.networks.title" description="Heading of the homepage showcase row about the eD2k and Kademlia networks">Two networks, one client</Translate>,
    lead: (
      <Translate id="homepage.showcase.networks.lead" description="Intro sentence of the homepage showcase row about the eD2k and Kademlia networks">
        aMule speaks eD2k and Kademlia at the same time, so every download draws on server-based and serverless peers alike.
      </Translate>
    ),
    img: 'networks.png',
    width: 848,
    height: 430,
    alt: translate({id: 'homepage.showcase.networks.alt', message: 'Networks tab with the eD2k server list', description: 'Alt text for the Networks-tab screenshot on the homepage'}),
    features: [F.networks, F.emuleCompatible, F.sourceExchange],
  },
  {
    title: <Translate id="homepage.showcase.search.title" description="Heading of the homepage showcase row about searching">Find what you are looking for</Translate>,
    lead: (
      <Translate id="homepage.showcase.search.lead" description="Intro sentence of the homepage showcase row about searching">
        Query eD2k servers and the Kad network in one go, then send the results straight to your download queue.
      </Translate>
    ),
    img: 'searches.png',
    width: 850,
    height: 522,
    alt: translate({id: 'homepage.showcase.search.alt', message: 'Searches tab with results', description: 'Alt text for the Searches-tab screenshot on the homepage'}),
    features: [F.search, F.ed2kLinks, F.categories],
  },
  {
    title: <Translate id="homepage.showcase.integrity.title" description="Heading of the homepage showcase row about download integrity">Downloads you can trust</Translate>,
    lead: (
      <Translate id="homepage.showcase.integrity.lead" description="Intro sentence of the homepage showcase row about download integrity">
        Every chunk is hashed and verified, so corrupted data is detected and downloaded again automatically.
      </Translate>
    ),
    img: 'downloads-list.png',
    width: 850,
    height: 412,
    alt: translate({id: 'homepage.showcase.integrity.alt', message: 'Downloads tab with the progress of each file', description: 'Alt text for the Downloads-tab screenshot in the download integrity row of the homepage'}),
    features: [F.corruptionHandling, F.endgame, F.verifyLocalData],
  },
  {
    title: <Translate id="homepage.showcase.remote.title" description="Heading of the homepage showcase row about remote control">Control it from anywhere</Translate>,
    lead: (
      <Translate id="homepage.showcase.remote.lead" description="Intro sentence of the homepage showcase row about remote control">
        Run aMule on a server or NAS and manage it from your desktop, your browser, or your phone.
      </Translate>
    ),
    img: 'webui-downloads.png',
    width: 882,
    height: 420,
    alt: translate({id: 'homepage.showcase.remote.alt', message: 'amuleapi Web UI showing the downloads list', description: 'Alt text for the amuleapi Web UI screenshot on the homepage'}),
    features: [F.remoteInterfaces, F.daemon, F.encryptedRemote],
  },
  {
    title: <Translate id="homepage.showcase.bandwidth.title" description="Heading of the homepage showcase row about bandwidth and upload management">Your bandwidth, your rules</Translate>,
    lead: (
      <Translate id="homepage.showcase.bandwidth.lead" description="Intro sentence of the homepage showcase row about bandwidth and upload management">
        Decide exactly how much of your connection aMule uses and who gets your upload.
      </Translate>
    ),
    img: 'statistics.png',
    width: 788,
    height: 434,
    alt: translate({id: 'homepage.showcase.bandwidth.alt', message: 'Statistics tab with the download speed graph', description: 'Alt text for the Statistics-tab screenshot on the homepage'}),
    features: [F.bandwidthControl, F.slotAllocation, F.creditSystem, F.powerShare],
  },
  {
    title: <Translate id="homepage.showcase.security.title" description="Heading of the homepage showcase row about security and privacy">Security and privacy built in</Translate>,
    lead: (
      <Translate id="homepage.showcase.security.lead" description="Intro sentence of the homepage showcase row about security and privacy">
        Keep unwanted peers out and your identity safe with IP filters, cryptographic identification, and proxy support.
      </Translate>
    ),
    img: 'preferences-security.png',
    width: 705,
    height: 470,
    alt: translate({id: 'homepage.showcase.security.alt', message: 'Security preferences with IP filtering options', description: 'Alt text for the Security-preferences screenshot on the homepage'}),
    features: [F.ipFiltering, F.secureIdentification, F.proxy, F.interfaceBinding],
  },
];

const MORE: (Feature & {icon: string})[] = [
  {icon: '📦', ...F.nativePackages},
  {icon: '📖', ...F.openSource},
  {icon: '🗣️', ...F.languages},
  {icon: '🌓', ...F.appearance},
  {icon: '🔔', ...F.systemTray},
  {icon: '💬', ...F.messaging},
  {icon: '📁', ...F.folderRescan},
  {icon: '⚡', ...F.compressedTransfers},
  {icon: '▶️', ...F.preview},
];

export default function FeaturesSection(): React.JSX.Element {
  const imgBase = useBaseUrl('/img/screenshots/');
  return (
    <>
      <section className={styles.showcases}>
        {SHOWCASES.map((s) => (
          <div key={s.img} className={`${styles.row} ${styles.reveal}`}>
            <div className={styles.media}>
              {/* home-zoom: click-to-zoom via docusaurus-plugin-image-zoom (docusaurus.config.ts) */}
              <img
                src={imgBase + s.img}
                alt={s.alt}
                width={s.width}
                height={s.height}
                loading="lazy"
                className={`home-zoom ${styles.shot}`}
              />
            </div>
            <div className={styles.text}>
              <h2 className={styles.rowTitle}>{s.title}</h2>
              <p className={styles.rowLead}>{s.lead}</p>
              <ul className={styles.list}>
                {s.features.map((f, i) => (
                  <li key={i}>
                    <h3 className={styles.itemTitle}>{f.title}</h3>
                    <p className={styles.itemDesc}>{f.desc}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </section>
      <section className={`${styles.more} ${styles.reveal}`}>
        <h2 className={styles.moreTitle}>
          <Translate id="homepage.more.title" description="Heading of the compact feature grid near the end of the homepage">And much more</Translate>
        </h2>
        <div className={styles.grid}>
          {MORE.map((f, i) => (
            <div key={i} className={styles.card}>
              <span className={styles.icon} aria-hidden="true">{f.icon}</span>
              <h3 className={styles.itemTitle}>{f.title}</h3>
              <p className={styles.itemDesc}>{f.desc}</p>
            </div>
          ))}
        </div>
        <Link className={styles.docsLink} to="/docs">
          <Translate id="homepage.features.docsLink" description="Link to the documentation below the feature grid on the homepage">Browse the full documentation →</Translate>
        </Link>
      </section>
    </>
  );
}
