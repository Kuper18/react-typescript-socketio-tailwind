import { CLIENT_ROUTES } from '@/constants/client-routes';

import AuthLayout from '../components/auth-layout';
import ResendEmailForm from '../components/resend-email-form';
import SocialAuthFooter from '../components/social-auth-footer';

const ResendEmailPage = () => {
  return (
    <AuthLayout
      title="Resend verification email"
      description="Enter your email and we'll send you a new verification link"
    >
      <ResendEmailForm />
      <SocialAuthFooter
        footerText="Remember your password?"
        footerLinkText="Sign in"
        footerLinkTo={CLIENT_ROUTES.login}
      />
    </AuthLayout>
  );
};

export default ResendEmailPage;
