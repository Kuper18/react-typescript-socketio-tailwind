import useAppMutation from '@/hooks/use-app-mutation';

import { AuthApi } from '../api';
import type { AuthApiResponse } from '../types';

const useResendEmail = () => {
  return useAppMutation<AuthApiResponse, string>({
    mutationFn: (email: string) => AuthApi.resendEmailVerification(email),
  });
};

export default useResendEmail;
