import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import SchedorynToast from "@/components/feedback/toast/SchedorynToast";
import { ModalProvider, ModalRenderer } from "@/components/modal";
import { AuthProvider } from "@/contexts/AuthContext";

const toastConfig = {
  success: (props: any) => <SchedorynToast {...props} type="success" />,
  error: (props: any) => <SchedorynToast {...props} type="error" />,
  info: (props: any) => <SchedorynToast {...props} type="info" />,
  warning: (props: any) => <SchedorynToast {...props} type="warning" />,
};

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <ModalProvider>
        <ModalRenderer />
        <SafeAreaProvider>
          <Provider store={store}>
            <ThemeProvider>
              {children}
              <Toast config={toastConfig} />
            </ThemeProvider>
          </Provider>
        </SafeAreaProvider>
      </ModalProvider>
    </AuthProvider>
  );
};

export default AppProvider;
