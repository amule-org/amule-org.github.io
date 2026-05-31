import React from 'react';
import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';
import styles from './styles.module.css';

interface WhatsNew {
  tag: string;
  label: React.ReactNode;
  detail: React.ReactNode;
}

const WHATS_NEW: WhatsNew[] = [
  {
    tag: 'Performance',
    label: <Translate id="homepage.highlights.hl1.label">Dramatically faster transfers</Translate>,
    detail: (
      <Translate id="homepage.highlights.hl1.detail">
        Disk I/O moved off the main thread and the network layer overhauled. Peer-to-peer downloads see ~100–380× speedups over 2.3.3 across macOS, Linux, and Windows.
      </Translate>
    ),
  },
  {
    tag: 'Packages',
    label: <Translate id="homepage.highlights.hl4.label">Binaries for every desktop</Translate>,
    detail: (
      <Translate id="homepage.highlights.hl4.detail">
        Windows installer and portable .zip, macOS Universal2 .dmg, AppImage, Flatpak — x86_64 and ARM64 where supported.
      </Translate>
    ),
  },
  {
    tag: 'Bandwidth',
    label: <Translate id="homepage.highlights.hl6.label">Bandwidth limiting that works</Translate>,
    detail: (
      <Translate id="homepage.highlights.hl6.detail" values={{code: <code>MaxUpload=0</code>}}>
        {'Upload and download throttlers rewritten as proper token-bucket limiters. {code} means literal unlimited.'}
      </Translate>
    ),
  },
  {
    tag: 'CMake',
    label: <Translate id="homepage.highlights.hl3.label">Modern build system</Translate>,
    detail: (
      <Translate id="homepage.highlights.hl3.detail">
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
            <Translate id="homepage.highlights.title">What's new in 3.0.0</Translate>
          </h2>
          <Link
            className={styles.changelogLink}
            to="/changelog/3.0.0"
          >
            <Translate id="homepage.highlights.changelog">Full changelog →</Translate>
          </Link>
        </div>
        <p className={styles.intro}>
          <Translate id="homepage.whatisamule.p2">
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
