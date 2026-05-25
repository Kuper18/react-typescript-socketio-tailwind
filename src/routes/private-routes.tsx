import type { RouteObject } from 'react-router-dom';
import { Navigate, Outlet } from 'react-router-dom';

import { CLIENT_ROUTES } from '@/constants/client-routes';
import ChatPage from '@/modules/chat/components/chat-page';

const AuthGuard = () => {
  const isAuthenticated = true;

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to={CLIENT_ROUTES.login} replace />
  );
};

export const privateRoutes: RouteObject[] = [
  {
    Component: AuthGuard,
    children: [{ path: CLIENT_ROUTES.home, Component: ChatPage }],
  },
];
