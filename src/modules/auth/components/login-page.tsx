import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import SvgIcon from '@/components/ui/svg-icon';
import { CLIENT_ROUTES } from '@/constants/client-routes';

import { AuthLayout } from './auth-layout';
import { LoginForm } from './login-form';

export const LoginPage = () => {
  const handleGoogleAuth = (): void => {};

  return (
    <AuthLayout title="Welcome back" description="Sign in to your account">
      <LoginForm />

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator />
        </div>
        <div className="relative flex justify-center">
          <span className="bg-background px-3 text-xs text-muted-foreground">
            or
          </span>
        </div>
      </div>

      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={handleGoogleAuth}
      >
        <SvgIcon iconType="google" />
        Continue with Google
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{' '}
        <Link
          to={CLIENT_ROUTES.signup}
          className="text-foreground underline-offset-4 hover:underline"
        >
          Sign up
        </Link>
      </p>
    </AuthLayout>
  );
};
