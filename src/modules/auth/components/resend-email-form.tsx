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
import useResendEmail from '../hooks/use-resend-email';
import { type ResendEmailFormValues, resendEmailSchema } from '../schemas';

const ResendEmailForm = () => {
  const { mutate: resend, isPending, isSuccess } = useResendEmail();
  const { cooldown, triggerCooldown } = useCooldown();

  const form = useForm<ResendEmailFormValues>({
    resolver: zodResolver(resendEmailSchema),
    defaultValues: { email: '' },
  });

  const onSubmit = ({ email }: ResendEmailFormValues): void => {
    resend(email, { onSuccess: () => triggerCooldown() });
  };

  const isDisabled = isPending || cooldown > 0;

  return (
    <form
      noValidate
      aria-label="Resend verification email"
      onSubmit={form.handleSubmit(onSubmit)}
    >
      <FieldGroup>
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="resend-email">Email</FieldLabel>
              <Input
                id="resend-email"
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
            Verification email sent! Check your inbox.
          </p>
        )}

        <Button type="submit" className="w-full" disabled={isDisabled}>
          Send verification email
          {isPending && <Spinner />}
        </Button>

        {cooldown > 0 && (
          <p className="text-xs text-center text-primary">{`Resend in ${cooldown}s`}</p>
        )}
      </FieldGroup>
    </form>
  );
};

export default ResendEmailForm;
