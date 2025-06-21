import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import { ThemeProvider } from '@/contexts/ThemeContext';
const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <ThemeProvider>{children}</ThemeProvider>
    </Provider>
  );
};
export default AppProvider;
