export const locales = ['de', 'en'] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'de';

export function isLocale(value: string | undefined): value is Locale {
  return value === 'de' || value === 'en';
}

export function getLocale(value: string | undefined): Locale {
  return isLocale(value) ? value : defaultLocale;
}

export function localizePath(path: string, locale: Locale): string {
  return path === '/' ? `/${locale}` : `/${locale}${path}`;
}

export function switchLocalePath(pathname: string, nextLocale: Locale): string {
  const segments = pathname.split('/').filter(Boolean);

  if (isLocale(segments[0])) {
    segments[0] = nextLocale;
    return `/${segments.join('/')}`;
  }

  return `/${nextLocale}${pathname === '/' ? '' : pathname}`;
}

type LocalizedText = Record<Locale, string>;

export const siteCopy = {
  footerNote: {
    de: 'Portfolio und digitales Archiv im Aufbau.',
    en: 'Portfolio and digital archive in progress.',
  },
  menu: {
    close: {
      de: 'Navigation schliessen',
      en: 'Close navigation menu',
    },
    open: {
      de: 'Navigation oeffnen',
      en: 'Open navigation menu',
    },
  },
} satisfies Record<string, LocalizedText | Record<string, LocalizedText>>;
