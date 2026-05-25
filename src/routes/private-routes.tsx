import type { RouteObject } from 'react-router-dom';
import { Navigate, Outlet } from 'react-router-dom';

import ChatPage from '@/modules/chat/components/chat-page';

const AuthGuard = () => {
  const isAuthenticated = true;

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export const privateRoutes: RouteObject[] = [
  {
    Component: AuthGuard,
    children: [{ path: '/', Component: ChatPage }],
  },
];
