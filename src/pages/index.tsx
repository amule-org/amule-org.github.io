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
        description: 'Homepage SEO meta description (HTML description tag)',
      })}
    >
      <header className={styles.hero}>
        <div className={styles.heroText}>
          <img src={logoSrc} alt={translate({id: 'homepage.hero.logo.alt', message: 'aMule logo', description: 'Alt text for the aMule logo in the homepage hero'})} className={styles.heroIcon} />
          <h1 className={styles.heroTitle}>aMule</h1>
          <p className={styles.tagline}>
            <Translate id="homepage.tagline" description="Tagline shown under the aMule title in the homepage hero">All-platform eMule-compatible eD2k/Kad client</Translate>
          </p>
          <div className={styles.ctaRow}>
            <Link
              className={`button button--lg ${styles.buttonDownload}`}
              to="/download"
            >
              <svg
                className={styles.downloadIcon}
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M12 3v12" />
                <path d="m7 11 5 5 5-5" />
                <path d="M5 21h14" />
              </svg>
              <Translate id="homepage.hero.cta.download" description="Label for the Download call-to-action button in the homepage hero">Download</Translate>
            </Link>
            <Link
              className={`button button--lg ${styles.buttonQuickstart}`}
              to="/docs/quickstart-guide"
            >
              <Translate id="homepage.hero.cta.quickstart" description="Label for the Quick Start call-to-action button in the homepage hero">Quick Start</Translate>
            </Link>
          </div>
        </div>
      </header>
      <main className={styles.homepageMain}>
        <section className={styles.whatIsSection}>
          <h2>
            <Translate id="homepage.whatisamule.title" description="Heading of the 'What is aMule?' section on the homepage">What is aMule?</Translate>
          </h2>
          <p>
            <Translate
              id="homepage.whatisamule.p1"
              description="First paragraph of the 'What is aMule?' homepage section; {ed2k} and {kad} are network names rendered in bold"
              values={{ed2k: <strong>eD2k</strong>, kad: <strong>Kademlia</strong>}}
            >
              {"aMule is a free, GPL-licensed peer-to-peer file-sharing client for the {ed2k} and {kad} networks. It's compatible with eMule and runs natively on Windows, macOS, and Linux. The same on-disk state, the same protocol, one binary per major desktop."}
            </Translate>
          </p>
        </section>
        <div className={styles.screenshotWrapper}>
          <img
            src={screenshotSrc}
            alt={translate({id: 'homepage.hero.screenshot.alt', message: 'aMule downloads tab', description: 'Alt text for the downloads-tab screenshot on the homepage'})}
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
