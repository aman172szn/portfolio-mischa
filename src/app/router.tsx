import { createBrowserRouter } from 'react-router-dom';

import { RootRoute } from './routes/RootRoute';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootRoute />,
  },
]);
