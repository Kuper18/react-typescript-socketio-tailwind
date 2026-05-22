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
import { Separator } from '@/components/ui/separator';
import SvgIcon from '@/components/ui/svg-icon';

import { PasswordInput } from '../../../components/ui/password-input';
import { type LoginFormValues, loginSchema } from '../schemas';
import { AuthLayout } from './auth-layout';

export const LoginPage = () => {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = (_values: LoginFormValues): void => {};

  const handleGoogleAuth = (): void => {};

  return (
    <AuthLayout title="Welcome back" description="Sign in to your account">
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
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
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
                  >
                    Forgot password?
                  </Button>
                </div>
                <PasswordInput
                  id="login-password"
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

          <Button
            type="submit"
            className="w-full"
            disabled={form.formState.isSubmitting}
          >
            Sign in
          </Button>
        </FieldGroup>
      </form>

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
          to="/signup"
          className="text-foreground underline-offset-4 hover:underline"
        >
          Sign up
        </Link>
      </p>
    </AuthLayout>
  );
};
