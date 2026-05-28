import { RouterProvider } from 'react-router-dom';

import router from '@/routes/index';

import QueryClientProvider from './providers/query-client-provider';
import { ThemeProvider } from './providers/theme-provider';

export const App = () => {
  return (
    <ThemeProvider>
      <QueryClientProvider>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
