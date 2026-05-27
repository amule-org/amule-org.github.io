import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Translate, {translate} from '@docusaurus/Translate';
import styles from './download.module.css';

const LINUX_SVG =
  'M12.504 0c-.155 0-.315.008-.48.021-4.226.333-3.105 4.807-3.17 6.298-.076 1.092-.3 1.953-1.05 3.02-.885 1.051-2.127 2.75-2.716 4.521-.278.832-.41 1.684-.287 2.489a.424.424 0 00-.11.135c-.26.268-.45.6-.663.839-.199.199-.485.267-.797.4-.313.136-.658.269-.864.68-.09.189-.136.394-.132.602 0 .199.027.4.055.536.058.399.116.728.04.97-.249.68-.28 1.145-.106 1.484.174.334.535.47.94.601.81.2 1.91.135 2.774.6.926.466 1.866.67 2.616.47.526-.116.97-.464 1.208-.946.587-.003 1.23-.269 2.26-.334.699-.058 1.574.267 2.577.2.025.134.063.198.114.333l.003.003c.391.778 1.113 1.132 1.884 1.071.771-.06 1.592-.536 2.257-1.306.631-.765 1.683-1.084 2.378-1.503.348-.199.629-.469.649-.853.023-.4-.2-.811-.714-1.376v-.097l-.003-.003c-.17-.2-.25-.535-.338-.926-.085-.401-.182-.786-.492-1.046h-.003c-.059-.054-.123-.067-.188-.135a.357.357 0 00-.19-.064c.431-1.278.264-2.55-.173-3.694-.533-1.41-1.465-2.638-2.175-3.483-.796-1.005-1.576-1.957-1.56-3.368.026-2.152.236-6.133-3.544-6.139zm.529 3.405h.013c.213 0 .396.062.584.198.19.135.33.332.438.533.105.259.158.459.166.724 0-.02.006-.04.006-.06v.105a.086.086 0 01-.004-.021l-.004-.024a1.807 1.807 0 01-.15.706.953.953 0 01-.213.335.71.71 0 00-.088-.042c-.104-.045-.198-.064-.284-.133a1.312 1.312 0 00-.22-.066c.05-.06.146-.133.183-.198.053-.128.082-.264.088-.402v-.02a1.21 1.21 0 00-.061-.4c-.045-.134-.101-.2-.183-.333-.084-.066-.167-.132-.267-.132h-.016c-.093 0-.176.03-.262.132a.8.8 0 00-.205.334 1.18 1.18 0 00-.09.4v.019c.002.089.008.179.02.267-.193-.067-.438-.135-.607-.202a1.635 1.635 0 01-.018-.2v-.02a1.772 1.772 0 01.15-.768c.082-.22.232-.406.43-.533a.985.985 0 01.594-.2zm-2.962.059h.036c.142 0 .27.048.399.135.146.129.264.288.344.465.09.199.14.4.153.667v.004c.007.134.006.2-.002.266v.08c-.03.007-.056.018-.083.024-.152.055-.274.135-.393.2.012-.09.013-.18.003-.267v-.015c-.012-.133-.04-.2-.082-.333a.613.613 0 00-.166-.267.248.248 0 00-.183-.064h-.021c-.071.006-.13.04-.186.132a.552.552 0 00-.12.27.944.944 0 00-.023.33v.015c.012.135.037.2.08.334.058.13.144.206.224.275.053.048.092.077.1.146l.003.014v.01c0 .09-.003.18-.01.267-.03-.012-.064-.028-.098-.042-.15-.062-.292-.13-.398-.209-.025.046-.049.092-.07.14-.19.4-.224.88-.08 1.31-.1.114-.197.232-.282.358a2.136 2.136 0 01-.22-.488 2.962 2.962 0 01-.088-.816c0-.064.002-.13.006-.196-.037.022-.075.043-.112.063-.242.133-.466.27-.647.418.143.283.33.539.547.763-.017.02-.034.04-.05.061a.924.924 0 01-.468-.244 1.484 1.484 0 01-.348-.518 2.42 2.42 0 01-.139-.686c-.004-.058-.006-.116-.006-.174 0-.3.056-.588.161-.856.108-.272.27-.517.48-.718.217-.207.48-.37.77-.478.037.055.078.108.122.158-.018.03-.036.062-.053.095a1.82 1.82 0 00-.175.797c0 .09.007.18.02.267.064-.03.131-.058.2-.084.248-.094.505-.143.762-.143.093 0 .186.007.278.021.03-.084.064-.167.1-.247z';
const MACOS_SVG =
  'M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701';
const WINDOWS_SVG = 'M0,0H11.377V11.372H0ZM12.623,0H24V11.372H12.623ZM0,12.623H11.377V24H0Zm12.623,0H24V24H12.623';
const SOURCE_SVG = 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm4 18H6V4h7v5h5v11z';

interface DownloadPlatform {
  svg: string;
  osId: string;
  osDefault: string;
  fmtId: string;
  fmtDefault: string;
  archId: string;
  archDefault: string;
}

const DOWNLOAD_PLATFORMS: DownloadPlatform[] = [
  {
    svg: WINDOWS_SVG,
    osId: 'homepage.download.windows.os', osDefault: 'Windows',
    fmtId: 'homepage.download.windows.fmt', fmtDefault: 'portable .zip',
    archId: 'homepage.download.windows.arch', archDefault: 'x64 · ARM64',
  },
  {
    svg: MACOS_SVG,
    osId: 'homepage.download.macos.os', osDefault: 'macOS',
    fmtId: 'homepage.download.macos.fmt', fmtDefault: 'Universal2 .dmg',
    archId: 'homepage.download.macos.arch', archDefault: 'Apple Silicon · Intel',
  },
  {
    svg: LINUX_SVG,
    osId: 'homepage.download.linux.os', osDefault: 'Linux',
    fmtId: 'homepage.download.linux.fmt', fmtDefault: 'AppImage · Flatpak',
    archId: 'homepage.download.linux.arch', archDefault: 'x86_64 · aarch64',
  },
  {
    svg: SOURCE_SVG,
    osId: 'homepage.download.source.os', osDefault: 'Source',
    fmtId: 'homepage.download.source.fmt', fmtDefault: 'tar.gz',
    archId: 'homepage.download.source.arch', archDefault: 'build it yourself',
  },
];

export default function DownloadPage(): React.JSX.Element {
  return (
    <Layout
      title={translate({id: 'homepage.download.title', message: 'Download'})}
      description={translate({
        id: 'homepage.download.pageDescription',
        message: 'Download aMule for Windows, macOS, Linux or build from source.',
      })}
    >
      <main>
        <section className={styles.section} id="download">
          <h2>
            <Translate id="homepage.download.title">Download</Translate>
          </h2>
          <p className={styles.dlLead}>
            <Translate
              id="homepage.download.version"
              values={{
                link: (
                  <Link to="/blog/amule-3-0-0">
                    <Translate id="homepage.download.version.link">3.0.0</Translate>
                  </Link>
                ),
              }}
            >
              {'The latest version of aMule is {link}.'}
            </Translate>
          </p>
          <p className={styles.dlLead}>
            <Translate id="homepage.download.lead">
              aMule is available for most major desktop platforms.
            </Translate>
          </p>
          <div className={styles.dlGrid}>
            {DOWNLOAD_PLATFORMS.map((p) => (
              <Link
                key={p.osDefault}
                className={styles.dlCard}
                to="https://github.com/amule-org/amule/releases/latest"
              >
                <svg className={styles.dlIcon} viewBox="0 0 24 24" aria-hidden="true">
                  <path fill="currentColor" d={p.svg} />
                </svg>
                <div className={styles.dlOs}>
                  <Translate id={p.osId}>{p.osDefault}</Translate>
                </div>
                <div className={styles.dlFmt}>
                  <Translate id={p.fmtId}>{p.fmtDefault}</Translate>
                </div>
                <div className={styles.dlArch}>
                  <Translate id={p.archId}>{p.archDefault}</Translate>
                </div>
              </Link>
            ))}
          </div>
          <p className={styles.dlFoot}>
            <Translate
              id="homepage.download.foot"
              values={{
                link: (
                  <Link to="https://github.com/amule-org/amule/releases/latest">
                    <Translate id="homepage.download.foot.link">latest release page</Translate>
                  </Link>
                ),
              }}
            >
              {'All artifacts on the {link}.'}
            </Translate>
          </p>
          <p className={styles.dlFoot}>
            <Translate
              id="homepage.download.install"
              values={{
                link: (
                  <Link to="/docs/quickstart-guide">
                    <Translate id="homepage.download.install.link">Quick Start guide</Translate>
                  </Link>
                ),
              }}
            >
              {'New to aMule? The {link} walks you through setup and your first download.'}
            </Translate>
          </p>
        </section>
      </main>
    </Layout>
  );
}
