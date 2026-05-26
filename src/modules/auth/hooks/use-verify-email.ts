import { AUTH_QUERY_KEYS } from '@/constants/query-keys';
import useAppQuery from '@/hooks/use-app-query';

import { AuthApi } from '../api';
import type { AuthApiResponse } from '../types';

const useVerifyEmail = (token: string) => {
  return useAppQuery<AuthApiResponse>({
    queryKey: [AUTH_QUERY_KEYS.verifyEmail, token],
    queryFn: () => AuthApi.verifyEmail(token),
    enabled: !!token,
    retry: false,
  });
};

export default useVerifyEmail;
