import { createBrowserRouter } from 'react-router-dom';

import { privateRoutes } from './private-routes';
import { publicRoutes } from './public-routes';

const router = createBrowserRouter([...publicRoutes, ...privateRoutes]);

export default router;
