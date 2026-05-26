import { z } from 'zod';

const emailSchema = z.email('Invalid email address');

const nameSchema = (name: string) =>
  z
    .string()
    .min(2, `${name} must be at least 2 characters`)
    .max(50, `${name} must be at most 50 characters`);

const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .max(20, 'Password must be at most 20 characters');

export const loginSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const signupSchema = z
  .object({
    firstName: nameSchema('First name'),
    lastName: nameSchema('Last name'),
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export type SignupFormValues = z.infer<typeof signupSchema>;

export const resendEmailSchema = z.object({
  email: emailSchema,
});

export type ResendEmailFormValues = z.infer<typeof resendEmailSchema>;
