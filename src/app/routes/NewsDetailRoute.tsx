import { Link, Navigate, useParams } from 'react-router-dom';

import { getLocale, localizePath } from '../i18n';
import { getNewsItem } from '../../content/news';

const copy = {
  back: {
    de: 'Zurueck zum News-Archiv',
    en: 'Back to news archive',
  },
  source: {
    de: 'Quelle',
    en: 'Source',
  },
  context: {
    de: 'Kontext',
    en: 'Context',
  },
  external: {
    de: 'Quelle ansehen',
    en: 'View source',
  },
} as const;

export function NewsDetailRoute() {
  const { locale: localeParam, slug } = useParams();
  const locale = getLocale(localeParam);
  const item = getNewsItem(slug);

  if (!item) return <Navigate to={localizePath('/news', locale)} replace />;

  return <article className="news-detail">
    <Link className="text-link" to={localizePath('/news', locale)}>{copy.back[locale]}</Link>
    <header className="news-detail__header">
      <p className="news-detail__category">{item.category[locale]}</p>
      <h1>{item.title[locale]}</h1>
      <p>{item.excerpt[locale]}</p>
    </header>

    <dl className="news-detail__meta">
      <div>
        <dt>{copy.source[locale]}</dt>
        <dd>{item.source}</dd>
      </div>
      <div>
        <dt>{copy.context[locale]}</dt>
        <dd>{item.context[locale]}</dd>
      </div>
    </dl>

    <div className="news-detail__content">
      {item.body[locale].map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
    </div>

    {item.sourceUrl ? <a className="text-link text-link--strong" href={item.sourceUrl} target="_blank" rel="noreferrer">
      {copy.external[locale]}
    </a> : null}
  </article>;
}
