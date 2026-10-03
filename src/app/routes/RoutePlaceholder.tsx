import { useParams } from 'react-router-dom';

import { getLocale, type Locale } from '../i18n';

type RoutePlaceholderProps = {
  label: Record<Locale, string>;
};

export function RoutePlaceholder({ label }: RoutePlaceholderProps) {
  const { locale: localeParam } = useParams();
  const locale = getLocale(localeParam);
  const copy = {
    eyebrow: {
      de: 'Bereich',
      en: 'Section',
    },
    body: {
      de: 'Dieser Bereich ist in Vorbereitung.',
      en: 'This section is in preparation.',
    },
  };

  return (
    <div className="page-frame">
      <section className="route-placeholder" aria-labelledby="page-title">
        <p className="route-placeholder__eyebrow">{copy.eyebrow[locale]}</p>
        <h1 className="route-placeholder__title" id="page-title">
          {label[locale]}
        </h1>
        <p className="route-placeholder__copy">{copy.body[locale]}</p>
      </section>
    </div>
  );
}
