import type { RouteObject } from 'react-router-dom';
import { Navigate, Outlet } from 'react-router-dom';

import { LoginPage } from '@/modules/auth/components/login-page';
import { SignupPage } from '@/modules/auth/components/signup-page';

const PublicGuard = () => {
  const isAuthenticated = false;

  return isAuthenticated ? <Navigate to="/" replace /> : <Outlet />;
};

export const publicRoutes: RouteObject[] = [
  {
    Component: PublicGuard,
    children: [
      { path: '/login', Component: LoginPage },
      { path: '/signup', Component: SignupPage },
    ],
  },
];
