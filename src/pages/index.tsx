import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Translate, {translate} from '@docusaurus/Translate';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import HighlightsSection from '@site/src/components/HighlightsSection';
import FeaturesSection from '@site/src/components/FeaturesSection';
import ScreenshotsSection from '@site/src/components/ScreenshotsSection';
import styles from './index.module.css';

export default function Home(): React.JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  const logoSrc = useBaseUrl('/img/amule-logo.png');
  const screenshotSrc = useBaseUrl('/img/screenshots/downloads.png');
  return (
    <Layout
      title={siteConfig.title}
      description={translate({
        id: 'homepage.description',
        message: 'aMule is a free, all-platform eMule-compatible eD2k/Kad client for Windows, macOS, and Linux.',
      })}
    >
      <header className={styles.hero}>
        <div className={styles.heroText}>
          <img src={logoSrc} alt={translate({id: 'homepage.hero.logo.alt', message: 'aMule logo'})} className={styles.heroIcon} />
          <h1 className={styles.heroTitle}>aMule</h1>
          <p className={styles.tagline}>
            <Translate id="homepage.tagline">All-platform eMule-compatible eD2k/Kad client</Translate>
          </p>
          <div className={styles.ctaRow}>
            <Link
              className={`button button--lg ${styles.buttonDownload}`}
              to="/download"
            >
              <Translate id="homepage.hero.cta.download">Download</Translate>
            </Link>
            <Link
              className="button button--secondary button--lg"
              to="/docs/quickstart-guide"
            >
              <Translate id="homepage.hero.cta.quickstart">Quick Start</Translate>
            </Link>
          </div>
        </div>
      </header>
      <main className={styles.homepageMain}>
        <section className={styles.whatIsSection}>
          <h2>
            <Translate id="homepage.whatisamule.title">What is aMule?</Translate>
          </h2>
          <p
            dangerouslySetInnerHTML={{
              __html: translate({
                id: 'homepage.whatisamule.p1',
                message:
                  "aMule is a free, GPL-licensed peer-to-peer file-sharing client for the <strong>eD2k</strong> and <strong>Kademlia</strong> networks. It's compatible with eMule and runs natively on Windows, macOS, and Linux. The same on-disk state, the same protocol, one binary per major desktop.",
              }),
            }}
          />
          <p
            dangerouslySetInnerHTML={{
              __html: translate({
                id: 'homepage.whatisamule.p2',
                message:
                  'After years of quiet, the project is back under active maintenance. The 3.0.0 release brings a modernized build system, fresh native packages for every major desktop, and an updated codebase ready for current systems — without breaking the protocol compatibility that lets aMule work alongside any eMule-based client.',
              }),
            }}
          />
        </section>
        <div className={styles.screenshotWrapper}>
          <img
            src={screenshotSrc}
            alt={translate({id: 'homepage.hero.screenshot.alt', message: 'aMule transfers tab'})}
            className={styles.screenshot}
          />
        </div>
        <HighlightsSection />
        <FeaturesSection />
        <ScreenshotsSection />
      </main>
    </Layout>
  );
}
