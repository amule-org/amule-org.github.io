import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Translate, {translate} from '@docusaurus/Translate';
import useBaseUrl from '@docusaurus/useBaseUrl';
import ReleaseBanner from '@site/src/components/ReleaseBanner';
import FeaturesSection from '@site/src/components/FeaturesSection';
import styles from './index.module.css';

// Download + Quick Start buttons, shown in the hero and in the closing call-to-action.
function CtaButtons(): React.JSX.Element {
  return (
    <>
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
    </>
  );
}

export default function Home(): React.JSX.Element {
  const logoSrc = useBaseUrl('/img/amule-logo.svg');
  const screenshotSrc = useBaseUrl('/img/screenshots/downloads.png');
  const mobileSrc = useBaseUrl('/img/screenshots/webui-mobile.png');
  return (
    <Layout
      title={translate({id: 'homepage.tagline', message: 'All-platform eMule-compatible eD2k/Kad client', description: 'Tagline shown under the aMule title in the homepage hero'})}
      description={translate({
        id: 'homepage.description',
        message: 'aMule is a free, all-platform eMule-compatible eD2k/Kad client for Windows, macOS, and Linux.',
        description: 'Homepage SEO meta description (HTML description tag)',
      })}
    >
      <ReleaseBanner />
      <header className={styles.hero}>
        <div className={styles.heroText}>
          <div className={styles.brand}>
            <img src={logoSrc} alt={translate({id: 'homepage.hero.logo.alt', message: 'aMule logo', description: 'Alt text for the aMule logo in the homepage hero'})} className={styles.heroIcon} />
            <h1 className={styles.heroTitle}>aMule</h1>
          </div>
          <p className={styles.tagline}>
            <Translate id="homepage.tagline" description="Tagline shown under the aMule title in the homepage hero">All-platform eMule-compatible eD2k/Kad client</Translate>
          </p>
          <p className={styles.lead}>
            <Translate
              id="homepage.whatisamule.p1"
              description="Introductory paragraph in the homepage hero; {ed2k} and {kad} are network names rendered in bold"
              values={{ed2k: <strong>eD2k</strong>, kad: <strong>Kademlia</strong>}}
            >
              {"aMule is a free, GPL-licensed peer-to-peer file-sharing client for the {ed2k} and {kad} networks. It's compatible with eMule and runs natively on Windows, macOS, and Linux. The same on-disk state, the same protocol, one binary per major desktop."}
            </Translate>
          </p>
          <div className={styles.ctaRow}>
            <CtaButtons />
          </div>
        </div>
        <div className={styles.heroMedia}>
          <img
            src={screenshotSrc}
            alt={translate({id: 'homepage.hero.screenshot.alt', message: 'aMule downloads tab', description: 'Alt text for the downloads-tab screenshot on the homepage'})}
            width={1579}
            height={889}
            className={styles.heroShot}
          />
          <img
            src={mobileSrc}
            alt={translate({id: 'homepage.hero.mobile.alt', message: 'amuleapi Web UI on a smartphone', description: 'Alt text for the smartphone screenshot of the amuleapi Web UI in the homepage hero'})}
            width={394}
            height={707}
            className={styles.heroPhone}
          />
        </div>
      </header>
      <main>
        <FeaturesSection />
        <section className={styles.cta}>
          <h2 className={styles.ctaTitle}>
            <Translate id="homepage.cta.title" description="Heading of the call-to-action box at the end of the homepage">Ready to get started?</Translate>
          </h2>
          <p className={styles.ctaText}>
            <Translate id="homepage.cta.text" description="Text of the call-to-action box at the end of the homepage">
              Download aMule for your platform and follow the Quick Start guide to make your first download.
            </Translate>
          </p>
          <div className={styles.ctaRow}>
            <CtaButtons />
          </div>
        </section>
      </main>
    </Layout>
  );
}
