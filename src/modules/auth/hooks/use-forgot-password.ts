import useAppMutation from '@/hooks/use-app-mutation';

import { AuthApi } from '../api';
import type { AuthApiResponse } from '../types';

const useForgotPassword = () => {
  return useAppMutation<AuthApiResponse, string>({
    mutationFn: (email: string) => AuthApi.forgotPassword(email),
  });
};

export default useForgotPassword;
