import { Navigate, createBrowserRouter } from 'react-router-dom';

import { SiteLayout } from './layout/SiteLayout';
import { WorkDetailRoute } from './routes/WorkDetailRoute';
import { WorksIndexRoute } from './routes/WorksIndexRoute';
import { RootRoute } from './routes/RootRoute';
import { RoutePlaceholder } from './routes/RoutePlaceholder';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/de" replace />,
  },
  {
    path: '/:locale',
    element: <SiteLayout />,
    children: [
      {
        index: true,
        element: <RootRoute />,
      },
      {
        path: 'works',
        element: <WorksIndexRoute />,
      },
      {
        path: 'works/:slug',
        element: <WorkDetailRoute />,
      },
      {
        path: 'dates',
        element: <RoutePlaceholder label={{ de: 'Termine', en: 'Dates' }} />,
      },
      {
        path: 'news',
        element: <RoutePlaceholder label={{ de: 'News', en: 'News' }} />,
      },
      {
        path: 'about',
        element: <RoutePlaceholder label={{ de: 'Ueber', en: 'About' }} />,
      },
      {
        path: 'contact',
        element: <RoutePlaceholder label={{ de: 'Kontakt', en: 'Contact' }} />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/de" replace />,
  },
]);
