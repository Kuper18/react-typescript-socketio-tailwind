import { XCircle } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { CLIENT_ROUTES } from '@/constants/client-routes';

import { AuthLayout } from './auth-layout';
import ResetPasswordForm from './reset-password-form';

const ResetPasswordPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') ?? '';

  if (!token) {
    return (
      <AuthLayout title="Reset password">
        <div className="flex flex-col items-center gap-4 text-center">
          <XCircle className="h-12 w-12 text-destructive" aria-hidden="true" />
          <p className="text-sm text-muted-foreground">
            Invalid or missing reset link.
          </p>
          <Button asChild variant="outline" className="w-full">
            <Link to={CLIENT_ROUTES.login}>Back to sign in</Link>
          </Button>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Reset password"
      description="Enter your new password below"
    >
      <ResetPasswordForm token={token} />
    </AuthLayout>
  );
};

export default ResetPasswordPage;
