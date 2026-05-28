import useAppMutation from '@/hooks/use-app-mutation';

import { AuthApi } from '../api';
import type { AuthApiResponse, ResetPasswordPayload } from '../types';

const useResetPassword = () => {
  return useAppMutation<AuthApiResponse, ResetPasswordPayload>({
    mutationFn: (payload: ResetPasswordPayload) =>
      AuthApi.resetPassword(payload),
  });
};

export default useResetPassword;
