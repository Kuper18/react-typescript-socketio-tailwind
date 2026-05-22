import { RouterProvider } from 'react-router-dom';

import router from '@/routes/index';

import { ThemeProvider } from './components/theme-provider';

export const App = () => {
  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;
