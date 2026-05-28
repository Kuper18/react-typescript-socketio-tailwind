import { CheckCircle2, Loader2, XCircle } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { CLIENT_ROUTES } from '@/constants/client-routes';

import AuthLayout from '../components/auth-layout';
import useVerifyEmail from '../hooks/use-verify-email';

const VerifyEmailPage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') ?? '';

  const { isPending, isFetching, isSuccess, isError, error } =
    useVerifyEmail(token);

  const isLoading = isPending && isFetching;
  const isInvalidToken = !token;
  const errorMessage = isInvalidToken
    ? 'Invalid or missing verification link.'
    : (error?.response?.data.message ?? 'Email verification failed.');

  return (
    <AuthLayout title="Email verification">
      <div className="flex flex-col items-center gap-4 text-center">
        {isLoading && (
          <>
            <Loader2
              className="h-12 w-12 animate-spin text-muted-foreground"
              aria-hidden="true"
            />
            <p className="text-sm text-muted-foreground">
              Verifying your email&hellip;
            </p>
          </>
        )}

        {isSuccess && (
          <>
            <CheckCircle2
              className="h-12 w-12 text-green-500"
              aria-hidden="true"
            />
            <p className="text-sm text-muted-foreground">
              Your email has been verified successfully.
            </p>
            <Button asChild className="w-full">
              <Link to={CLIENT_ROUTES.login}>Sign in</Link>
            </Button>
          </>
        )}

        {(isError || isInvalidToken) && (
          <>
            <XCircle
              className="h-12 w-12 text-destructive"
              aria-hidden="true"
            />
            <p className="text-sm text-muted-foreground">{errorMessage}</p>
            <Button asChild variant="outline" className="w-full">
              <Link to={CLIENT_ROUTES.login}>Back to sign in</Link>
            </Button>
          </>
        )}
      </div>
    </AuthLayout>
  );
};

export default VerifyEmailPage;
