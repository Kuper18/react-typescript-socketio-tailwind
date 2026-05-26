import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';

import useCooldown from '../hooks/use-cooldown';
import useForgotPassword from '../hooks/use-forgot-password';
import {
  type ForgotPasswordFormValues,
  forgotPasswordSchema,
} from '../schemas';

const ForgotPasswordForm = () => {
  const { mutate: forgotPassword, isPending, isSuccess } = useForgotPassword();
  const { cooldown, triggerCooldown } = useCooldown();

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  });

  const onSubmit = ({ email }: ForgotPasswordFormValues): void => {
    forgotPassword(email, { onSuccess: () => triggerCooldown() });
  };

  const isDisabled = isPending || cooldown > 0;

  return (
    <form
      noValidate
      aria-label="Forgot password"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <FieldGroup>
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="forgot-password-email">Email</FieldLabel>
              <Input
                id="forgot-password-email"
                type="email"
                placeholder="you@example.com"
                aria-invalid={fieldState.invalid}
                {...field}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {isSuccess && (
          <p
            role="status"
            aria-live="polite"
            className="text-center text-sm text-green-600 dark:text-green-400"
          >
            Check your inbox for a password reset link.
          </p>
        )}

        <Button type="submit" className="w-full" disabled={isDisabled}>
          Send reset link
          {isPending && <Spinner />}
        </Button>

        {cooldown > 0 && (
          <p className="text-xs text-center text-primary">{`Resend in ${cooldown}s`}</p>
        )}
      </FieldGroup>
    </form>
  );
};

export default ForgotPasswordForm;
