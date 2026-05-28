import type { UseFormReturn } from 'react-hook-form';

import useAppMutation from '@/hooks/use-app-mutation';

import { AuthApi } from '../api';
import type { SignupFormValues } from '../schemas';

const useSignup = (form: UseFormReturn<SignupFormValues>) => {
  return useAppMutation({
    mutationFn: (data: Omit<SignupFormValues, 'confirmPassword'>) =>
      AuthApi.signup(data),
    onSuccess: () => form.reset(),
  });
};

export default useSignup;
