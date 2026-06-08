import React from 'react';
import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';
import styles from './styles.module.css';

interface WhatsNew {
  tag: React.ReactNode;
  label: React.ReactNode;
  detail: React.ReactNode;
}

const WHATS_NEW: WhatsNew[] = [
  {
    tag: <Translate id="homepage.highlights.performance.tag" description="Category badge of the Performance card in the 'What's new in 3.0.0' section">Performance</Translate>,
    label: <Translate id="homepage.highlights.performance.label" description="Title of the Performance card in the 'What's new in 3.0.0' section">Dramatically faster transfers</Translate>,
    detail: (
      <Translate id="homepage.highlights.performance.detail" description="Body text of the Performance card in the 'What's new in 3.0.0' section">
        Disk I/O moved off the main thread and the network layer overhauled. Peer-to-peer downloads see ~100–380× speedups over 2.3.3 across macOS, Linux, and Windows.
      </Translate>
    ),
  },
  {
    tag: <Translate id="homepage.highlights.packages.tag" description="Category badge of the Packages card in the 'What's new in 3.0.0' section">Packages</Translate>,
    label: <Translate id="homepage.highlights.packages.label" description="Title of the Packages card in the 'What's new in 3.0.0' section">Binaries for every desktop</Translate>,
    detail: (
      <Translate id="homepage.highlights.packages.detail" description="Body text of the Packages card in the 'What's new in 3.0.0' section">
        Windows installer and portable .zip, macOS Universal2 .dmg, AppImage, Flatpak — x64 and ARM64 where supported.
      </Translate>
    ),
  },
  {
    tag: <Translate id="homepage.highlights.bandwidth.tag" description="Category badge of the Bandwidth card in the 'What's new in 3.0.0' section">Bandwidth</Translate>,
    label: <Translate id="homepage.highlights.bandwidth.label" description="Title of the Bandwidth card in the 'What's new in 3.0.0' section">Bandwidth limiting that works</Translate>,
    detail: (
      <Translate id="homepage.highlights.bandwidth.detail" description="Body text of the Bandwidth card in the 'What's new in 3.0.0' section; {code} is the MaxUpload=0 setting in monospace" values={{code: <code>MaxUpload=0</code>}}>
        {'Upload and download throttlers rewritten as proper token-bucket limiters. {code} means literal unlimited.'}
      </Translate>
    ),
  },
  {
    tag: <Translate id="homepage.highlights.buildSystem.tag" description="Category badge of the build-system card in the 'What's new in 3.0.0' section">CMake</Translate>,
    label: <Translate id="homepage.highlights.buildSystem.label" description="Title of the build-system card in the 'What's new in 3.0.0' section">Modern build system</Translate>,
    detail: (
      <Translate id="homepage.highlights.buildSystem.detail" description="Body text of the build-system card in the 'What's new in 3.0.0' section">
        Autotools removed entirely. Single CMake build, minimum CMake 3.10, minimum wxWidgets 3.2.0.
      </Translate>
    ),
  },
];

export default function HighlightsSection(): React.JSX.Element {
  return (
    <section className={styles.wrapper}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            <Translate id="homepage.highlights.title" description="Heading of the release-highlights section on the homepage">What's new in 3.0.0</Translate>
          </h2>
          <Link
            className={styles.changelogLink}
            to="/changelog/3.0.0"
          >
            <Translate id="homepage.highlights.changelog" description="Link to the full 3.0.0 changelog in the release-highlights section">Full changelog →</Translate>
          </Link>
        </div>
        <p className={styles.intro}>
          <Translate id="homepage.whatisamule.p2" description="Intro paragraph above the release-highlights cards on the homepage">
            After years of quiet, the project is back under active maintenance. The 3.0.0 release brings dramatic throughput improvements, a modernized build system, fresh native packages for every major desktop, and an updated codebase ready for current systems — without breaking the protocol compatibility that lets aMule work alongside any eMule-based client.
          </Translate>
        </p>
        <div className={styles.strip}>
          {WHATS_NEW.map((item, i) => (
            <div key={i} className={styles.item}>
              <span className={styles.tag}>{item.tag}</span>
              <div className={styles.itemLabel}>{item.label}</div>
              <div className={styles.itemDetail}>{item.detail}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
