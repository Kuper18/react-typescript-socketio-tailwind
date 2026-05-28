import type { RouteObject } from 'react-router-dom';
import { Navigate, Outlet } from 'react-router-dom';

import { CLIENT_ROUTES } from '@/constants/client-routes';
import useCurrentUser from '@/hooks/use-current-user';
import ChatPage from '@/modules/chat/components/chat-page';

import AppSplash from '../components/shared/app-splash';

const AuthGuard = () => {
  const { currentUser, isPending } = useCurrentUser();

  if (isPending) return <AppSplash />;

  return currentUser ? (
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
