import { Link, useParams } from 'react-router-dom';

import { getLocale, localizePath } from '../i18n';
import { getNewsItems } from '../../content/news';

const copy = {
  title: {
    de: 'News',
    en: 'News',
  },
  intro: {
    de: 'Presse, Auszeichnungen und kritische Stimmen zu Mischa Tangians Musiktheater, orchestralen Arbeiten und transkulturellen Projekten.',
    en: 'Press, awards, and critical responses to Mischa Tangian\'s music theatre, orchestral writing, and transcultural projects.',
  },
  readMore: {
    de: 'Weiterlesen',
    en: 'Read more',
  },
  source: {
    de: 'Quelle',
    en: 'Source',
  },
} as const;

export function NewsIndexRoute() {
  const { locale: localeParam } = useParams();
  const locale = getLocale(localeParam);
  const items = getNewsItems();

  return <div className="news-page">
    <header className="news-intro">
      <h1>{copy.title[locale]}</h1>
      <p>{copy.intro[locale]}</p>
    </header>

    <div className="news-archive" aria-label={copy.title[locale]}>
      {items.map((item) => (
        <article className="news-archive__item" key={item.slug}>
          <div className="news-archive__meta">
            <span>{item.category[locale]}</span>
            <span>{item.source}</span>
          </div>
          <div className="news-archive__body">
            <p className="news-archive__context">{item.context[locale]}</p>
            <h2>
              <Link to={localizePath(`/news/${item.slug}`, locale)}>{item.title[locale]}</Link>
            </h2>
            <p>{item.excerpt[locale]}</p>
            <Link className="text-link" to={localizePath(`/news/${item.slug}`, locale)}>
              {copy.readMore[locale]}
            </Link>
          </div>
        </article>
      ))}
    </div>
  </div>;
}
