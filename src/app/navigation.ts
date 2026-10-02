export type NavigationItem = {
  label: string;
  path: string;
};

export const primaryNavigation: NavigationItem[] = [
  { label: 'Home', path: '/' },
  { label: 'Works', path: '/works' },
  { label: 'Dates', path: '/dates' },
  { label: 'News', path: '/news' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];
