import { CLIENT_ROUTES } from '@/constants/client-routes';

import AuthLayout from '../components/auth-layout';
import { SignupForm } from '../components/signup-form';
import SocialAuthFooter from '../components/social-auth-footer';

const SignupPage = () => {
  return (
    <AuthLayout
      title="Create an account"
      description="Start chatting in seconds"
    >
      <SignupForm />
      <SocialAuthFooter
        footerText="Already have an account?"
        footerLinkText="Sign in"
        footerLinkTo={CLIENT_ROUTES.login}
      />
    </AuthLayout>
  );
};

export default SignupPage;
