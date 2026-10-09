import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getLocale } from '../i18n';
import { getGalleryImages } from '../../content/gallery';

const copy = {
  title: {
    de: 'Galerie',
    en: 'Gallery',
  },
  intro: {
    de: 'Ausgewaehlte Portraets, Buehnenmomente, Proben und Ensemblebilder.',
    en: 'Selected portraits, stage moments, rehearsals, and ensemble images.',
  },
  loadMore: {
    de: 'Mehr Bilder laden',
    en: 'Load more images',
  },
} as const;

const batchSize = 8;

export function GalleryRoute() {
  const { locale: localeParam } = useParams();
  const locale = getLocale(localeParam);
  const images = getGalleryImages();
  const [visibleCount, setVisibleCount] = useState(batchSize);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const visibleImages = images.slice(0, visibleCount);
  const hasMore = visibleCount < images.length;

  useEffect(() => {
    if (!hasMore || !sentinelRef.current) return undefined;
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        setVisibleCount((current) => Math.min(current + batchSize, images.length));
      }
    }, { rootMargin: '640px 0px' });
    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [hasMore, images.length]);

  return <div className="gallery-page">
    <header className="gallery-intro">
      <h1>{copy.title[locale]}</h1>
      <p>{copy.intro[locale]}</p>
    </header>

    <div className="gallery-grid" aria-label={copy.title[locale]}>
      {visibleImages.map((image, index) => (
        <figure className="gallery-card" key={image.slug}>
          <a href={image.large} target="_blank" rel="noreferrer" aria-label={image.alt[locale]}>
            <img
              src={image.large}
              alt={image.alt[locale]}
              loading={index < 4 ? 'eager' : 'lazy'}
              decoding="async"
            />
          </a>
        </figure>
      ))}
    </div>

    {hasMore ? <div className="gallery-load" ref={sentinelRef}>
      <button className="text-link" type="button" onClick={() => setVisibleCount((current) => Math.min(current + batchSize, images.length))}>
        {copy.loadMore[locale]}
      </button>
    </div> : null}
  </div>;
}
