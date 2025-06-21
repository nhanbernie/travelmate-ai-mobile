import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';
const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      {/* <Provider store={store}> */}
      <ThemeProvider>{children}</ThemeProvider>
      {/* </Provider> */}
    </SafeAreaProvider>
  );
};
export default AppProvider;
