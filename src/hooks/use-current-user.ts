import { Api } from '@/api';
import { USER_QUERY_KEYS } from '@/constants/query-keys';
import type { User } from '@/types/user';

import useAppQuery from './use-app-query';

const useCurrentUser = () => {
  const { data: currentUser, ...rest } = useAppQuery<User | null>({
    queryKey: [USER_QUERY_KEYS.currentUser],
    queryFn: Api.getCurrentUser,
    retry: false,
    staleTime: Infinity,
    refetchOnMount: false,
  });

  return { currentUser, ...rest };
};

export default useCurrentUser;
