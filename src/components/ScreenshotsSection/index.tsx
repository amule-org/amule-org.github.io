import React, {useState, useEffect, useCallback} from 'react';
import Translate, {translate} from '@docusaurus/Translate';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

interface Screenshot {
  src: string;
  alt: string;
  caption: React.ReactNode;
}

const SCREENSHOTS: Screenshot[] = [
  {
    src: 'screenshots/networks.png',
    alt: translate({id: 'homepage.screenshots.networks.alt', message: 'Networks tab — server list and Kademlia status'}),
    caption: <Translate id="homepage.screenshots.networks.caption">Networks — eD2k servers and Kad status</Translate>,
  },
  {
    src: 'screenshots/search.png',
    alt: translate({id: 'homepage.screenshots.search.alt', message: 'Search tab with results'}),
    caption: <Translate id="homepage.screenshots.search.caption">Search — eD2k + Kad search results</Translate>,
  },
  {
    src: 'screenshots/downloads.png',
    alt: translate({id: 'homepage.screenshots.downloads.alt', message: 'Transfers tab with active downloads'}),
    caption: <Translate id="homepage.screenshots.downloads.caption">Transfers — per-file progress with availability bars</Translate>,
  },
  {
    src: 'screenshots/shared.png',
    alt: translate({id: 'homepage.screenshots.shared.alt', message: 'Shared files tab'}),
    caption: <Translate id="homepage.screenshots.shared.caption">Shared files</Translate>,
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
      <p className={styles.ssLead}>
        <Translate
          id="homepage.screenshots.lead"
          values={{
            left: <kbd>←</kbd>,
            right: <kbd>→</kbd>,
            esc: <kbd>Esc</kbd>,
          }}
        >
          {'aMule GUI — same look on Windows, macOS, and Linux. Click any screenshot to enlarge; use {left} {right} to navigate, {esc} to close.'}
        </Translate>
      </p>
      <div className={styles.ssGrid}>
        {SCREENSHOTS.map((s, i) => (
          <figure
            key={s.src}
            className={styles.ssFigure}
            onClick={() => open(i)}
          >
            <img
              src={imgBase + s.src}
              alt={s.alt}
              loading="lazy"
              className={styles.ssImg}
            />
            <figcaption className={styles.ssCaption}>{s.caption}</figcaption>
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
              alt={current.alt}
              className={styles.modalImg}
            />
            <figcaption className={styles.modalCaption}>{current.caption}</figcaption>
          </figure>
          <div className={styles.modalCounter}>
            {lightbox.index + 1} / {SCREENSHOTS.length}
          </div>
        </div>
      )}
    </section>
  );
}
