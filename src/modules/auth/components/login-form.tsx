import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { CLIENT_ROUTES } from '@/constants/client-routes';

import { PasswordInput } from '../../../components/ui/password-input';
import useLogin from '../hooks/use-login';
import { type LoginFormValues, loginSchema } from '../schemas';

const LoginForm = () => {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const { mutate: login, isPending } = useLogin();

  const onSubmit = (data: LoginFormValues): void => {
    login(data);
  };

  return (
    <form
      noValidate
      aria-label="Sign in"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <FieldGroup>
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="login-email">Email</FieldLabel>
              <Input
                id="login-email"
                type="email"
                placeholder="you@example.com"
                aria-invalid={fieldState.invalid}
                {...field}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <div className="flex items-center justify-between">
                <FieldLabel htmlFor="login-password">Password</FieldLabel>
                <Button
                  type="button"
                  variant="link"
                  className="h-auto p-0 text-xs font-normal
                    text-muted-foreground"
                  asChild
                >
                  <Link to={CLIENT_ROUTES.forgotPassword}>
                    Forgot password?
                  </Link>
                </Button>
              </div>
              <PasswordInput
                id="login-password"
                placeholder="••••••••"
                aria-invalid={fieldState.invalid}
                {...field}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Button type="submit" className="w-full" disabled={isPending}>
          Sign in
          {isPending && <Spinner />}
        </Button>

        <Button
          type="button"
          variant="link"
          className="h-auto w-fit mx-auto p-0 text-xs font-normal text-primary"
          asChild
        >
          <Link to={CLIENT_ROUTES.resendEmail}>Verify email</Link>
        </Button>
      </FieldGroup>
    </form>
  );
};

export default LoginForm;
