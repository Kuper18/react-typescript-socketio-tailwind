import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

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
import useCooldown from '../hooks/use-cooldown';
import useSignup from '../hooks/use-signup';
import { type SignupFormValues, signupSchema } from '../schemas';

export const SignupForm = () => {
  const { cooldown, triggerCooldown } = useCooldown();

  const navigate = useNavigate();
  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const { mutate: signup, isPending, isSuccess } = useSignup(form);

  const onSubmit = ({
    confirmPassword: _,
    ...data
  }: SignupFormValues): void => {
    signup(data, { onSuccess: () => triggerCooldown() });
  };

  return (
    <form
      noValidate
      aria-label="Create account"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <FieldGroup>
        <div className="grid grid-cols-2 gap-4">
          <Controller
            name="firstName"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="signup-first-name">First name</FieldLabel>
                <Input
                  id="signup-first-name"
                  type="text"
                  placeholder="John"
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
            name="lastName"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="signup-last-name">Last name</FieldLabel>
                <Input
                  id="signup-last-name"
                  type="text"
                  placeholder="Doe"
                  aria-invalid={fieldState.invalid}
                  {...field}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </div>

        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="signup-email">Email</FieldLabel>
              <Input
                id="signup-email"
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
              <FieldLabel htmlFor="signup-password">Password</FieldLabel>
              <PasswordInput
                id="signup-password"
                placeholder="••••••••"
                aria-invalid={fieldState.invalid}
                {...field}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="confirmPassword"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="signup-confirm-password">
                Confirm password
              </FieldLabel>
              <PasswordInput
                id="signup-confirm-password"
                placeholder="••••••••"
                aria-invalid={fieldState.invalid}
                {...field}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Button type="submit" className="w-full" disabled={isPending}>
          Create account
          {isPending && <Spinner />}
        </Button>

        {isSuccess && (
          <p className="text-center text-sm text-muted-foreground">
            Didn't receive a verification email?{' '}
            <Button
              type="button"
              variant="link"
              className="h-auto p-0 text-sm font-normal"
              disabled={cooldown > 0}
              onClick={() => navigate(CLIENT_ROUTES.resendEmail)}
            >
              Resend it {cooldown > 0 && `(${cooldown}s)`}
            </Button>
          </p>
        )}
      </FieldGroup>
    </form>
  );
};
