import type { RouteObject } from 'react-router-dom';
import { Navigate, Outlet } from 'react-router-dom';

import { CLIENT_ROUTES } from '@/constants/client-routes';
import ForgotPasswordPage from '@/modules/auth/components/forgot-password-page';
import LoginPage from '@/modules/auth/components/login-page';
import ResendEmailPage from '@/modules/auth/components/resend-email-page';
import ResetPasswordPage from '@/modules/auth/components/reset-password-page';
import SignupPage from '@/modules/auth/components/signup-page';
import VerifyEmailPage from '@/modules/auth/components/verify-email-page';

const PublicGuard = () => {
  const isAuthenticated = false;

  return isAuthenticated ? (
    <Navigate to={CLIENT_ROUTES.home} replace />
  ) : (
    <Outlet />
  );
};

export const publicRoutes: RouteObject[] = [
  {
    Component: PublicGuard,
    children: [
      { path: CLIENT_ROUTES.login, Component: LoginPage },
      { path: CLIENT_ROUTES.signup, Component: SignupPage },
      { path: CLIENT_ROUTES.verifyEmail, Component: VerifyEmailPage },
      { path: CLIENT_ROUTES.resendEmail, Component: ResendEmailPage },
      { path: CLIENT_ROUTES.forgotPassword, Component: ForgotPasswordPage },
      { path: CLIENT_ROUTES.resetPassword, Component: ResetPasswordPage },
    ],
  },
];
