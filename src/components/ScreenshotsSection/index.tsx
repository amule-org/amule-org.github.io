import React, {useState, useEffect, useCallback} from 'react';
import Translate, {translate} from '@docusaurus/Translate';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

interface Screenshot {
  src: string;
  altId: string;
  altDefault: string;
  captionId: string;
  captionDefault: string;
}

const SCREENSHOTS: Screenshot[] = [
  {
    src: 'screenshots/networks.png',
    altId: 'homepage.screenshots.networks.alt', altDefault: 'Networks tab — server list and Kademlia status',
    captionId: 'homepage.screenshots.networks.caption', captionDefault: 'Networks — eD2k servers and Kad status',
  },
  {
    src: 'screenshots/search.png',
    altId: 'homepage.screenshots.search.alt', altDefault: 'Search tab with results',
    captionId: 'homepage.screenshots.search.caption', captionDefault: 'Search — eD2k + Kad search results',
  },
  {
    src: 'screenshots/downloads.png',
    altId: 'homepage.screenshots.downloads.alt', altDefault: 'Transfers tab with active downloads',
    captionId: 'homepage.screenshots.downloads.caption', captionDefault: 'Transfers — per-file progress with availability bars',
  },
  {
    src: 'screenshots/shared.png',
    altId: 'homepage.screenshots.shared.alt', altDefault: 'Shared files tab',
    captionId: 'homepage.screenshots.shared.caption', captionDefault: 'Shared files',
  },
];

export default function ScreenshotsSection(): React.JSX.Element {
  const imgBase = useBaseUrl('/img/');
  const [lightbox, setLightbox] = useState({open: false, index: 0});

  const open = useCallback((index: number) => setLightbox({open: true, index}), []);
  const close = useCallback(() => setLightbox((s) => ({...s, open: false})), []);
  const prev = useCallback(
    () =>
      setLightbox((s) => ({
        open: true,
        index: (s.index - 1 + SCREENSHOTS.length) % SCREENSHOTS.length,
      })),
    [],
  );
  const next = useCallback(
    () =>
      setLightbox((s) => ({
        open: true,
        index: (s.index + 1) % SCREENSHOTS.length,
      })),
    [],
  );

  useEffect(() => {
    if (!lightbox.open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      else if (e.key === 'ArrowLeft') prev();
      else if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox.open, close, prev, next]);

  const current = SCREENSHOTS[lightbox.index];

  return (
    <section className={styles.section}>
      <h2>
        <Translate id="homepage.screenshots.title">Screenshots</Translate>
      </h2>
      <p
        className={styles.ssLead}
        dangerouslySetInnerHTML={{
          __html: translate({
            id: 'homepage.screenshots.lead',
            message:
              'aMule 3.0.0 GUI — same look on Windows, macOS, and Linux. Click any screenshot to enlarge; use <kbd>←</kbd> <kbd>→</kbd> to navigate, <kbd>Esc</kbd> to close.',
          }),
        }}
      />
      <div className={styles.ssGrid}>
        {SCREENSHOTS.map((s, i) => (
          <figure
            key={s.src}
            className={styles.ssFigure}
            onClick={() => open(i)}
          >
            <img
              src={imgBase + s.src}
              alt={translate({id: s.altId, message: s.altDefault})}
              loading="lazy"
              className={styles.ssImg}
            />
            <figcaption className={styles.ssCaption}>
              <Translate id={s.captionId}>{s.captionDefault}</Translate>
            </figcaption>
          </figure>
        ))}
      </div>

      {lightbox.open && (
        <div
          className={styles.modal}
          role="dialog"
          aria-modal="true"
          onClick={close}
        >
          <button
            className={`${styles.modalBtn} ${styles.modalClose}`}
            onClick={close}
            aria-label={translate({id: 'homepage.screenshots.lightbox.close', message: 'Close (Esc)'})}
          >
            ×
          </button>
          <button
            className={`${styles.modalBtn} ${styles.modalPrev}`}
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label={translate({id: 'homepage.screenshots.lightbox.prev', message: 'Previous (←)'})}
          >
            ❮
          </button>
          <button
            className={`${styles.modalBtn} ${styles.modalNext}`}
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            aria-label={translate({id: 'homepage.screenshots.lightbox.next', message: 'Next (→)'})}
          >
            ❯
          </button>
          <figure
            className={styles.modalFigure}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={imgBase + current.src}
              alt={translate({id: current.altId, message: current.altDefault})}
              className={styles.modalImg}
            />
            <figcaption className={styles.modalCaption}>
              <Translate id={current.captionId}>{current.captionDefault}</Translate>
            </figcaption>
          </figure>
          <div className={styles.modalCounter}>
            {lightbox.index + 1} / {SCREENSHOTS.length}
          </div>
        </div>
      )}
    </section>
  );
}
