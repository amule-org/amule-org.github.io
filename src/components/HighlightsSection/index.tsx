import React from 'react';
import Link from '@docusaurus/Link';
import Translate, {translate} from '@docusaurus/Translate';
import styles from './styles.module.css';

interface WhatsNew {
  tag: string;
  labelId: string;
  labelDefault: string;
  detailId: string;
  detailDefault: string;
}

const WHATS_NEW: WhatsNew[] = [
  {
    tag: 'CMake',
    labelId: 'homepage.highlights.hl3.label',
    labelDefault: 'Modern build system',
    detailId: 'homepage.highlights.hl3.detail',
    detailDefault: 'Autotools removed entirely. Single CMake build, minimum CMake 3.10, minimum wxWidgets 3.2.0.',
  },
  {
    tag: 'Packages',
    labelId: 'homepage.highlights.hl4.label',
    labelDefault: 'Binaries for every desktop',
    detailId: 'homepage.highlights.hl4.detail',
    detailDefault: 'Windows portable .zip, macOS Universal2 .dmg, AppImage, Flatpak — x86_64 and ARM64 where supported.',
  },
  {
    tag: 'HTTPS',
    labelId: 'homepage.highlights.hl5.label',
    labelDefault: 'Server lists & version checks',
    detailId: 'homepage.highlights.hl5.detail',
    detailDefault: 'Hand-rolled TLS replaced with <code>wxWebRequest</code>. Server-met downloads from modern HTTPS endpoints work again.',
  },
  {
    tag: 'Bandwidth',
    labelId: 'homepage.highlights.hl6.label',
    labelDefault: 'Bandwidth limiting that works',
    detailId: 'homepage.highlights.hl6.detail',
    detailDefault: 'Upload and download throttlers rewritten as proper token-bucket limiters. <code>MaxUpload=0</code> means literal unlimited.',
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
            to="https://github.com/amule-org/amule/blob/master/docs/CHANGELOG.md"
          >
            <Translate id="homepage.highlights.changelog">Full changelog →</Translate>
          </Link>
        </div>
        <div className={styles.strip}>
          {WHATS_NEW.map((item) => (
            <div key={item.labelDefault} className={styles.item}>
              <span className={styles.tag}>{item.tag}</span>
              <div className={styles.itemLabel}>
                <Translate id={item.labelId}>{item.labelDefault}</Translate>
              </div>
              <div
                className={styles.itemDetail}
                dangerouslySetInnerHTML={{
                  __html: translate({id: item.detailId, message: item.detailDefault}),
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
