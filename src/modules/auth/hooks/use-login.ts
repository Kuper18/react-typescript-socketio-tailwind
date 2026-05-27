import { useQueryClient } from '@tanstack/react-query';

import { USER_QUERY_KEYS } from '@/constants/query-keys';
import useAppMutation from '@/hooks/use-app-mutation';

import { AuthApi } from '../api';
import type { LoginFormValues } from '../schemas';

const useLogin = () => {
  const queryClient = useQueryClient();

  return useAppMutation({
    mutationFn: (data: LoginFormValues) => AuthApi.login(data),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [USER_QUERY_KEYS.currentUser],
      }),
  });
};

export default useLogin;
