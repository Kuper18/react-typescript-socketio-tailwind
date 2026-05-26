import { CLIENT_ROUTES } from '@/constants/client-routes';

import AuthLayout from '../components/auth-layout';
import LoginForm from '../components/login-form';
import SocialAuthFooter from '../components/social-auth-footer';

const LoginPage = () => {
  return (
    <AuthLayout title="Welcome back" description="Sign in to your account">
      <LoginForm />
      <SocialAuthFooter
        footerText="Don't have an account?"
        footerLinkText="Sign up"
        footerLinkTo={CLIENT_ROUTES.signup}
      />
    </AuthLayout>
  );
};

export default LoginPage;
