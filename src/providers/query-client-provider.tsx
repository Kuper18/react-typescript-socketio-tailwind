import { QueryClientProvider as ClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import queryClient from '@/lib/react-query';

type Props = {
  children: React.ReactNode;
};

const QueryClientProvider: React.FC<Props> = ({ children }) => {
  return (
    <ClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </ClientProvider>
  );
};

export default QueryClientProvider;
