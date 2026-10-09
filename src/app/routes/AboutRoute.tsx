import { useParams } from 'react-router-dom';

import { getLocale } from '../i18n';
import { aboutContent, aboutFacts, aboutSources } from '../../content/about';
import { portraitImage } from '../../content/gallery';

export function AboutRoute() {
  const { locale: localeParam } = useParams();
  const locale = getLocale(localeParam);

  return (
    <article className="about-page">
      <header className="about-hero">
        <div className="about-hero__content">
          <h1>{aboutContent.title[locale]}</h1>
          <p>{aboutContent.summary[locale]}</p>
        </div>
        <figure className="about-hero__portrait">
          <img
            src={portraitImage.large}
            alt={portraitImage.alt[locale]}
            fetchPriority="high"
            decoding="async"
          />
        </figure>
      </header>

      <div className="about-layout">
        <section className="about-biography" aria-label={aboutContent.title[locale]}>
          {aboutContent.biography[locale].map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </section>

        <aside className="about-sidebar">
          <section className="about-panel" aria-labelledby="about-facts-title">
            <h2 id="about-facts-title">{aboutContent.factsTitle[locale]}</h2>
            <dl className="about-facts">
              {aboutFacts.map((fact) => (
                <div key={fact.label.en}>
                  <dt>{fact.label[locale]}</dt>
                  <dd>{fact.value[locale]}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="about-panel about-panel--note" aria-labelledby="about-note-title">
            <h2 id="about-note-title">{aboutContent.noteTitle[locale]}</h2>
            <p>{aboutContent.note[locale]}</p>
          </section>

          <section className="about-panel" aria-labelledby="about-sources-title">
            <h2 id="about-sources-title">{aboutContent.sourcesTitle[locale]}</h2>
            <ul className="about-sources">
              {aboutSources.map((source) => (
                <li key={source.href}>
                  <a href={source.href} target="_blank" rel="noreferrer">
                    {source.label}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </aside>
      </div>
    </article>
  );
}
