import type { Locale } from './i18n';

export type NavigationItem = {
  label: Record<Locale, string>;
  path: string;
};

export const primaryNavigation: NavigationItem[] = [
  { label: { de: 'Start', en: 'Home' }, path: '/' },
  { label: { de: 'Werke', en: 'Works' }, path: '/works' },
  { label: { de: 'Termine', en: 'Dates' }, path: '/dates' },
  { label: { de: 'News', en: 'News' }, path: '/news' },
  { label: { de: 'Ueber', en: 'About' }, path: '/about' },
  { label: { de: 'Kontakt', en: 'Contact' }, path: '/contact' },
];
