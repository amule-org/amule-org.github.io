import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Translate, {translate} from '@docusaurus/Translate';
import styles from './download.module.css';

const LINUX_SVG =
  'M21.6127,19.27c-0.7038-0.2882-1.0049-0.6707-0.9757-1.2415c0.03-0.6662-0.348-1.1541-0.5275-1.3469 c0.1084-0.4142,0.4253-1.8471,0.0003-3.0918c-0.4567-1.3322-1.8511-3.3669-3.2898-5.3669c-0.589-0.8214-0.6168-1.7142-0.649-2.748 c-0.0308-0.9861-0.0656-2.1038-0.6155-3.3463C14.9575,0.7758,13.7578,0,12.2638,0c-0.8888,0-1.8011,0.2778-2.5032,0.762 c-1.4376,0.9922-1.2476,3.1554-1.1219,4.5869c0.0172,0.196,0.0334,0.3812,0.0429,0.5393c0.0837,1.4019,0.0076,2.1408-0.0921,2.3654 c-0.0644,0.1468-0.3817,0.5644-0.7175,1.0067c-0.3473,0.4573-0.7409,0.9757-1.0636,1.4588c-0.385,0.5813-0.6958,1.4698-0.9964,2.329 c-0.2199,0.6287-0.4277,1.2226-0.6299,1.5775c-0.3833,0.6827-0.2879,1.3193-0.2083,1.6135c-0.1451,0.1008-0.3547,0.2993-0.5317,0.6733 c-0.2139,0.4564-0.6478,0.7017-1.5503,0.8752c-0.4147,0.0848-0.7006,0.2592-0.8502,0.5182c-0.2176,0.377-0.0991,0.8507,0.009,1.1744 c0.1597,0.4759,0.0602,0.7771-0.1208,1.324c-0.0417,0.1262-0.089,0.2691-0.1369,0.4267c-0.0755,0.2487-0.0482,0.4749,0.0807,0.6722 c0.3408,0.521,1.3353,0.7047,2.359,0.8256c0.6113,0.0726,1.2803,0.317,1.9273,0.5536c0.634,0.2317,1.2896,0.4713,1.8855,0.544 c0.0906,0.0114,0.1803,0.0172,0.2668,0.0172c0.8997,0,1.3062-0.597,1.4351-0.8423c0.3232-0.0659,1.4378-0.2771,2.5866-0.3055 c1.147-0.0327,2.2567,0.1937,2.5711,0.2642c0.0988,0.1892,0.3594,0.6212,0.7747,0.8439c0.2283,0.1248,0.5459,0.1963,0.8713,0.1963 c0.0001,0,0,0,0.0001,0c0.3475,0,1.0086-0.0822,1.5318-0.6326c0.5219-0.553,1.8257-1.259,2.7779-1.7745c0.2125-0.115,0.4112-0.2227,0.5855-0.3199 c0.5348-0.2965,0.8267-0.7202,0.8007-1.1623C22.2253,19.7435,21.9823,19.4213,21.6127,19.27z M9.7723,19.1635 c-0.0666-0.469-0.6699-0.9341-1.3686-1.4727c-0.5713-0.4404-1.2188-0.9395-1.3972-1.3623c-0.3687-0.872-0.0781-2.4054,0.4286-3.1949 c0.2504-0.3953,0.4549-0.9949,0.6527-1.5746c0.2136-0.6261,0.4344-1.2733,0.6814-1.5567c0.3912-0.4424,0.7527-1.3032,0.8167-1.9815 c0.3663,0.3497,0.9345,0.7934,1.4594,0.7934c0.0808,0,0.1593-0.0105,0.2343-0.0317c0.3591-0.1037,0.8874-0.4089,1.3982-0.704 c0.4404-0.2545,0.9835-0.5683,1.1879-0.5969c0.3504,0.5031,2.3865,5.009,2.5945,6.456c0.1646,1.1449-0.0093,2.0914-0.0967,2.4621 c-0.0703-0.0096-0.1542-0.0174-0.2424-0.0174c-0.5671,0-0.7173,0.3096-0.7564,0.4944c-0.1006,0.4802-0.1112,2.0159-0.1123,2.3609 c-0.2051,0.2605-1.2421,1.4875-2.731,1.708c-0.6065,0.0881-1.1728,0.1328-1.6832,0.1328c-0.4363,0-0.7147-0.0337-0.8302-0.0512l-0.7482-0.8561 C9.5551,20.0255,9.8501,19.7181,9.7723,19.1635z M10.7217,5.0478c-0.0234,0.0101-0.0463,0.0209-0.0689,0.0323 c-0.0023-0.0507-0.0076-0.1021-0.0157-0.1536c-0.0817-0.4702-0.3934-0.8114-0.7412-0.8114c-0.0257,0-0.0516,0.002-0.08,0.0063 c-0.2069,0.0345-0.3691,0.1899-0.458,0.4102c0.078-0.4835,0.3519-0.8414,0.6769-0.8414c0.3816,0,0.704,0.5143,0.704,1.123 C10.7388,4.89,10.7332,4.9663,10.7217,5.0478z M13.6872,5.4103c0.0349-0.1113,0.0538-0.2317,0.0538-0.3566 c0-0.5519-0.3502-0.9843-0.7972-0.9843c-0.4369,0-0.7923,0.4415-0.7923,0.9843c0,0.037,0.0018,0.074,0.0053,0.111 c-0.0231-0.0089-0.0457-0.0175-0.0678-0.0259c-0.0503-0.1523-0.0757-0.3111-0.0757-0.4733c0-0.66,0.4218-1.1969,0.9403-1.1969 c0.5185,0,0.9403,0.537,0.9403,1.1969C13.894,4.9401,13.8182,5.2021,13.6872,5.4103z M13.3048,6.6949 c-0.0075,0.0334-0.0234,0.0482-0.1992,0.1396c-0.0888,0.0462-0.1992,0.1037-0.3375,0.1879l-0.0924,0.0559c-0.3713,0.2251-1.2405,0.7522-1.4765,0.7831 c-0.1603,0.0216-0.2594-0.0406-0.4824-0.1921c-0.0503-0.0342-0.1038-0.0706-0.1608-0.1072c-0.4019-0.2637-0.6604-0.5541-0.6896-0.6677 c0.131-0.1013,0.4558-0.3547,0.622-0.5048c0.3375-0.3138,0.6771-0.5247,0.8452-0.5247c0.0089,0,0.0169,0.0006,0.0253,0.0022 c0.1975,0.0349,0.6847,0.2293,1.0405,0.3713c0.1645,0.0656,0.3065,0.1223,0.4064,0.1582C13.1208,6.5048,13.2849,6.6431,13.3048,6.6949z M16.1335,21.3601c0.1776-0.8011,0.3822-1.891,0.3491-2.5335c-0.0076-0.146-0.0205-0.3048-0.033-0.4584 c-0.0234-0.2872-0.0581-0.7141-0.0223-0.8407c0.0071-0.0033,0.015-0.0061,0.0237-0.0086c0.0015,0.3673,0.0813,1.1,0.6672,1.3555 c0.1746,0.0762,0.3742,0.1147,0.5931,0.1147c0.5869,0,1.2382-0.2879,1.5049-0.5547c0.1571-0.1571,0.2892-0.3492,0.3817-0.5014 c0.0202,0.0593,0.0327,0.1367,0.0261,0.2365c-0.0349,0.5418,0.2284,1.2605,0.7295,1.5254l0.0729,0.0383c0.1785,0.0936,0.6525,0.3425,0.6601,0.4606 c-0.0001,0.0001-0.004,0.0139-0.0305,0.0385c-0.1187,0.1085-0.5367,0.3219-0.9408,0.5283c-0.7169,0.3661-1.5296,0.781-1.8945,1.1648 c-0.5138,0.5408-1.095,0.904-1.446,0.904c-0.0423,0-0.0807-0.0054-0.115-0.0162C16.2786,22.6944,15.9649,22.1444,16.1335,21.3601z M3.141,19.3163c-0.0389-0.1819-0.0696-0.3255-0.0366-0.4647c0.0239-0.1031,0.5328-0.2136,0.7501-0.2607c0.3055-0.0663,0.6216-0.1349,0.8282-0.2603 c0.2794-0.1693,0.4307-0.4814,0.5642-0.7568c0.0966-0.1992,0.1964-0.4051,0.3151-0.4727c0.0067-0.0039,0.0169-0.0085,0.0364-0.0085 c0.2225,0,0.6892,0.4676,0.9582,0.8862c0.0682,0.1055,0.1946,0.317,0.3408,0.5618c0.4373,0.7317,1.036,1.7338,1.3487,2.0696 c0.2818,0.3019,0.7379,0.8824,0.6257,1.3803c-0.0822,0.3863-0.5195,0.7004-0.6227,0.7699c-0.0375,0.0085-0.0838,0.0128-0.1383,0.0128 c-0.5985,0-1.7833-0.4979-2.4198-0.7655l-0.0942-0.0396c-0.3554-0.149-0.9357-0.2429-1.4968-0.3337c-0.4465-0.0723-1.0579-0.1712-1.1592-0.2606 c-0.0822-0.0921,0.0131-0.3917,0.0972-0.656c0.0605-0.19,0.123-0.3864,0.1572-0.592C3.244,19.7978,3.1868,19.5309,3.141,19.3163z';
const MACOS_SVG =
  'M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701';
const WINDOWS_SVG = 'M0,0H11.377V11.372H0ZM12.623,0H24V11.372H12.623ZM0,12.623H11.377V24H0Zm12.623,0H24V24H12.623';
const SOURCE_SVG = 'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm4 18H6V4h7v5h5v11z';

// Latest release. Update these three constants when a new version ships.
const LATEST_VERSION = '3.0.0';
const LATEST_DATE = '2026-06-01';
const CHANGELOG_URL = `/changelog/${LATEST_VERSION}`;

// All download buttons point to the GitHub releases page for now.
const RELEASES_URL = 'https://github.com/amule-org/amule/releases/latest';

interface DownloadFormat {
  // Binary type, e.g. "Installer (.exe)"
  label: React.ReactNode;
  // Supported architectures, e.g. "x64 · ARM64"
  arch: React.ReactNode;
}

interface DownloadOs {
  svg: string;
  name: React.ReactNode;
  // Supported platforms / minimum version line
  platform: React.ReactNode;
  formats: DownloadFormat[];
}

const DOWNLOAD_OSES: DownloadOs[] = [
  {
    svg: WINDOWS_SVG,
    name: <Translate id="homepage.download.windows.os">Windows</Translate>,
    platform: <Translate id="homepage.download.windows.platform">Windows 10 / 11 · x64 · ARM64</Translate>,
    formats: [
      {
        label: <Translate id="homepage.download.windows.installer.label">Installer (.exe)</Translate>,
        arch: <Translate id="homepage.download.windows.installer.arch">x64 · ARM64</Translate>,
      },
      {
        label: <Translate id="homepage.download.windows.portable.label">Portable (.zip)</Translate>,
        arch: <Translate id="homepage.download.windows.portable.arch">x64 · ARM64</Translate>,
      },
    ],
  },
  {
    svg: MACOS_SVG,
    name: <Translate id="homepage.download.macos.os">macOS</Translate>,
    platform: <Translate id="homepage.download.macos.platform">macOS 11.0+ · Apple Silicon · Intel</Translate>,
    formats: [
      {
        label: <Translate id="homepage.download.macos.dmg.label">Disk image (.dmg)</Translate>,
        arch: <Translate id="homepage.download.macos.dmg.arch">Universal2</Translate>,
      },
    ],
  },
  {
    svg: LINUX_SVG,
    name: <Translate id="homepage.download.linux.os">Linux</Translate>,
    platform: <Translate id="homepage.download.linux.platform">glibc ≥ 2.35 · x64 · ARM64</Translate>,
    formats: [
      {
        label: <Translate id="homepage.download.linux.appimage.label">AppImage</Translate>,
        arch: <Translate id="homepage.download.linux.appimage.arch">x64 · ARM64</Translate>,
      },
      {
        label: <Translate id="homepage.download.linux.flatpak.label">Flatpak</Translate>,
        arch: <Translate id="homepage.download.linux.flatpak.arch">x64 · ARM64</Translate>,
      },
    ],
  },
  {
    svg: SOURCE_SVG,
    name: <Translate id="homepage.download.source.os">Source</Translate>,
    platform: <Translate id="homepage.download.source.platform">Build it yourself</Translate>,
    formats: [
      {
        label: <Translate id="homepage.download.source.tarball.label">Source tarball (.tar.gz)</Translate>,
        arch: <Translate id="homepage.download.source.tarball.arch">all platforms</Translate>,
      },
    ],
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

          <div className={styles.versionHeader}>
            <div className={styles.versionRow}>
              <span className={styles.versionLabel}>
                <Translate id="homepage.download.version.label">Latest version</Translate>
              </span>
              <span className={styles.versionNumber}>{LATEST_VERSION}</span>
            </div>
            <div className={styles.versionMeta}>
              <span className={styles.versionDate}>
                <Translate
                  id="homepage.download.version.date"
                  values={{date: LATEST_DATE}}
                >
                  {'Released {date}'}
                </Translate>
              </span>
              <Link className={styles.changelogLink} to={CHANGELOG_URL}>
                <Translate id="homepage.download.version.changelog">Changelog</Translate>
              </Link>
            </div>
          </div>

          <p className={styles.dlLead}>
            <Translate id="homepage.download.lead">
              aMule is available for most major desktop platforms.
            </Translate>
          </p>

          <div className={styles.osList}>
            {DOWNLOAD_OSES.map((os, i) => (
              <div key={i} className={styles.osPanel}>
                <div className={styles.osHeader}>
                  <svg className={styles.osIcon} viewBox="0 0 24 24" aria-hidden="true">
                    <path fill="currentColor" d={os.svg} />
                  </svg>
                  <div className={styles.osHeaderText}>
                    <div className={styles.osName}>{os.name}</div>
                    <div className={styles.osPlatform}>{os.platform}</div>
                  </div>
                </div>
                <div className={styles.formatList}>
                  {os.formats.map((fmt, j) => (
                    <Link key={j} className={styles.formatRow} to={RELEASES_URL}>
                      <span className={styles.formatLabel}>{fmt.label}</span>
                      <span className={styles.formatArch}>{fmt.arch}</span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <p className={styles.dlFoot}>
            <Translate
              id="homepage.download.foot"
              values={{
                release: (
                  <Link to={RELEASES_URL}>
                    <Translate id="homepage.download.foot.link">latest release page</Translate>
                  </Link>
                ),
                distros: (
                  <Link to="/docs/manual/installation#distribution-packages">
                    <Translate id="homepage.download.distros.link">major Linux distributions</Translate>
                  </Link>
                ),
              }}
            >
              {'All artifacts are available on the {release}. aMule is also available in the repositories of the {distros}, though the packages may be outdated.'}
            </Translate>
          </p>
          <p className={styles.dlFoot}>
            <Translate
              id="homepage.download.install"
              values={{
                install: (
                  <Link to="/docs/manual/installation">
                    <Translate id="homepage.download.install.guide.link">Installation guide</Translate>
                  </Link>
                ),
                quickstart: (
                  <Link to="/docs/quickstart-guide">
                    <Translate id="homepage.download.install.link">Quick Start guide</Translate>
                  </Link>
                ),
              }}
            >
              {'The {install} covers every platform, and the {quickstart} walks you through setup and your first download.'}
            </Translate>
          </p>
          <p className={styles.dlFoot}>
            <Translate
              id="homepage.download.compile"
              values={{
                link: (
                  <Link to="/docs/developer/compilation">
                    <Translate id="homepage.download.compile.link">Compilation guide</Translate>
                  </Link>
                ),
              }}
            >
              {'The {link} has instructions for building aMule from source.'}
            </Translate>
          </p>

          <section className={styles.prevReleases}>
            <h3>
              <Translate id="homepage.download.previous.title">Previous releases</Translate>
            </h3>
            <p className={styles.dlFoot}>
              <Translate
                id="homepage.download.previous.body"
                values={{
                  link: (
                    <Link to="https://sourceforge.net/projects/amule/files/aMule/">
                      <Translate id="homepage.download.previous.link">SourceForge</Translate>
                    </Link>
                  ),
                }}
              >
                {'Releases before 3.0.0 are archived on {link}.'}
              </Translate>
            </p>
            <ul className={styles.prevList}>
              <li>
                <Link
                  className={styles.prevVersion}
                  to="https://sourceforge.net/projects/amule/files/aMule/2.3.3/"
                >
                  2.3.3
                </Link>
                <span className={styles.prevDate}>2021-02-07</span>
              </li>
            </ul>
          </section>
        </section>
      </main>
    </Layout>
  );
}
