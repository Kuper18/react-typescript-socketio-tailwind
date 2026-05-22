import type { RouteObject } from 'react-router-dom';
import { Navigate, Outlet } from 'react-router-dom';

const AuthGuard = () => {
  const isAuthenticated = false;

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export const privateRoutes: RouteObject[] = [
  {
    Component: AuthGuard,
    children: [],
  },
];
