import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import { ThemeProvider } from '@/contexts/ThemeContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import TravelMateToast from '@/components/feedback/TravelMateToast';

const toastConfig = {
  success: (props: any) => <TravelMateToast {...props} type="success" />,
  error: (props: any) => <TravelMateToast {...props} type="error" />,
  info: (props: any) => <TravelMateToast {...props} type="info" />,
  warning: (props: any) => <TravelMateToast {...props} type="warning" />,
};

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <Provider store={store}>
        <ThemeProvider>
          {children}
          <Toast config={toastConfig} />
        </ThemeProvider>
      </Provider>
    </SafeAreaProvider>
  );
};

export default AppProvider;
