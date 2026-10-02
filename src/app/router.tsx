import { createBrowserRouter } from 'react-router-dom';

import { SiteLayout } from './layout/SiteLayout';
import { RootRoute } from './routes/RootRoute';
import { RoutePlaceholder } from './routes/RoutePlaceholder';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <SiteLayout />,
    children: [
      {
        index: true,
        element: <RootRoute />,
      },
      {
        path: 'works',
        element: <RoutePlaceholder label="Works" />,
      },
      {
        path: 'dates',
        element: <RoutePlaceholder label="Dates" />,
      },
      {
        path: 'news',
        element: <RoutePlaceholder label="News" />,
      },
      {
        path: 'about',
        element: <RoutePlaceholder label="About" />,
      },
      {
        path: 'contact',
        element: <RoutePlaceholder label="Contact" />,
      },
    ],
  },
]);
