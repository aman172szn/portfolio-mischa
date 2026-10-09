import { Navigate, createBrowserRouter } from 'react-router-dom';

import { SiteLayout } from './layout/SiteLayout';
import { AboutRoute } from './routes/AboutRoute';
import { DatesIndexRoute } from './routes/DatesIndexRoute';
import { GalleryRoute } from './routes/GalleryRoute';
import { NewsDetailRoute } from './routes/NewsDetailRoute';
import { NewsIndexRoute } from './routes/NewsIndexRoute';
import { WorkDetailRoute } from './routes/WorkDetailRoute';
import { WorksIndexRoute } from './routes/WorksIndexRoute';
import { RootRoute } from './routes/RootRoute';
import { RoutePlaceholder } from './routes/RoutePlaceholder';
import { AdminRoute } from './admin/AdminRoute';

export const router = createBrowserRouter([
  {
    path: '/admin',
    element: <AdminRoute />,
  },
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
        element: <DatesIndexRoute />,
      },
      {
        path: 'gallery',
        element: <GalleryRoute />,
      },
      {
        path: 'news',
        element: <NewsIndexRoute />,
      },
      {
        path: 'news/:slug',
        element: <NewsDetailRoute />,
      },
      {
        path: 'about',
        element: <AboutRoute />,
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
