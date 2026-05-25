import { useNavigate } from 'react-router-dom';

import { CLIENT_ROUTES } from '@/constants/client-routes';
import useAppMutation from '@/hooks/use-app-mutation';

import { AuthApi } from '../api';
import type { LoginFormValues } from '../schemas';

const useLogin = () => {
  const navigate = useNavigate();

  return useAppMutation({
    mutationFn: (data: LoginFormValues) => AuthApi.login(data),
    onSuccess: () => navigate(CLIENT_ROUTES.home),
  });
};

export default useLogin;
