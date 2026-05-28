import { CLIENT_ROUTES } from '@/constants/client-routes';

import AuthLayout from '../components/auth-layout';
import ForgotPasswordForm from '../components/forgot-password-form';
import SocialAuthFooter from '../components/social-auth-footer';

const ForgotPasswordPage = () => {
  return (
    <AuthLayout
      title="Forgot password"
      description="Enter your email and we'll send you a reset link"
    >
      <ForgotPasswordForm />
      <SocialAuthFooter
        footerText="Remember your password?"
        footerLinkText="Sign in"
        footerLinkTo={CLIENT_ROUTES.login}
      />
    </AuthLayout>
  );
};

export default ForgotPasswordPage;
