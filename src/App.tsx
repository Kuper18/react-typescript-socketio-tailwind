import { RouterProvider } from 'react-router-dom';

import router from '@/routes/index';

import { ThemeProvider } from './components/theme-provider';
import QueryClientProvider from './providers/query-client-provider';

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
