import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { CLIENT_ROUTES } from '@/constants/client-routes';
import useAppMutation from '@/hooks/use-app-mutation';

import { AuthApi } from '../api';

const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useAppMutation({
    mutationFn: AuthApi.logout,
    onSettled: () => {
      queryClient.clear();
      navigate(CLIENT_ROUTES.login, { replace: true });
    },
  });
};

export default useLogout;
