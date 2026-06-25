import React from 'react';
import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';
import {LATEST_VERSION, CHANGELOG_URL} from '@site/src/releaseInfo';
import styles from './styles.module.css';

export default function ReleaseBanner(): React.JSX.Element {
  return (
    <div className={styles.banner} role="banner">
      <span className={styles.content}>
        <Translate
          id="homepage.banner.text"
          description="Top-of-homepage banner announcing the latest aMule release; {version} is the version number, {download} is the link to the download page, {changelog} is the link to the changelog"
          values={{
            version: LATEST_VERSION,
            download: (
              <Link className={styles.link} to="/download">
                <Translate id="homepage.banner.download" description="Download link label in the latest-release banner; lowercase, reads inline mid-sentence">download</Translate>
              </Link>
            ),
            changelog: (
              <Link className={styles.link} to={CHANGELOG_URL}>
                <Translate id="homepage.banner.changelog" description="Changelog link label in the latest-release banner">changelog →</Translate>
              </Link>
            ),
          }}
        >
          {'aMule {version} is out — {download} or read the {changelog}'}
        </Translate>
      </span>
    </div>
  );
}
