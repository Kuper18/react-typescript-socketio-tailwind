import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle2 } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { PasswordInput } from '@/components/ui/password-input';
import { Spinner } from '@/components/ui/spinner';
import { CLIENT_ROUTES } from '@/constants/client-routes';

import useResetPassword from '../hooks/use-reset-password';
import { type ResetPasswordFormValues, resetPasswordSchema } from '../schemas';
import SocialAuthFooter from './social-auth-footer';

type Props = {
  token: string;
};

const ResetPasswordForm: React.FC<Props> = ({ token }) => {
  const { mutate: resetPassword, isPending, isSuccess } = useResetPassword();

  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: '', confirmPassword: '' },
  });

  const onSubmit = ({ password }: ResetPasswordFormValues): void => {
    resetPassword({ token, password });
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col items-center gap-4 text-center">
        <CheckCircle2 className="h-12 w-12 text-green-500" aria-hidden="true" />
        <p className="text-sm text-muted-foreground">
          Your password has been reset successfully.
        </p>
        <Button asChild className="w-full">
          <Link to={CLIENT_ROUTES.login}>Sign in</Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      <form
        noValidate
        aria-label="Reset password"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FieldGroup>
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="reset-password">New password</FieldLabel>
                <PasswordInput
                  id="reset-password"
                  placeholder="••••••••"
                  aria-invalid={fieldState.invalid}
                  {...field}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="confirmPassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="reset-confirm-password">
                  Confirm new password
                </FieldLabel>
                <PasswordInput
                  id="reset-confirm-password"
                  placeholder="••••••••"
                  aria-invalid={fieldState.invalid}
                  {...field}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Button type="submit" className="w-full" disabled={isPending}>
            Reset password
            {isPending && <Spinner />}
          </Button>
        </FieldGroup>
      </form>
      <SocialAuthFooter
        footerText="Remember your password?"
        footerLinkText="Sign in"
        footerLinkTo={CLIENT_ROUTES.login}
      />
    </>
  );
};

export default ResetPasswordForm;
