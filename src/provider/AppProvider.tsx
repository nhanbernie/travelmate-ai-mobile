import { useEffect } from "react";
import { Provider } from "react-redux";
import { View } from "react-native";
import { store } from "@/redux/store";
import { ThemeProvider, useThemeContext } from "@/contexts/ThemeContext";
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

const ThemeWrapper = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useThemeContext();
  
  return (
    <View style={{ flex: 1 }} className={theme === "dark" ? "dark" : ""}>
      {children}
    </View>
  );
};

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    // Prevent SVG re-registration on hot reload
  }, []);

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <ThemeProvider>
          <ThemeWrapper>
            <AuthProvider>
              <ModalProvider>
                <ModalRenderer />
                {children}
                <Toast config={toastConfig} />
              </ModalProvider>
            </AuthProvider>
          </ThemeWrapper>
        </ThemeProvider>
      </SafeAreaProvider>
    </Provider>
  );
};

export default AppProvider;
