import { Stack } from 'expo-router';
import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter';
import '../src/i18n';
import '../global.css';
import AppProvider from '@/provider/AppProvider';
import { AuthProvider } from '@/contexts/AuthContext';
import { configureReanimatedLogger } from '@/utils/reanimatedConfig';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

configureReanimatedLogger();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'Inter-Regular': Inter_400Regular,
    'Inter-SemiBold': Inter_600SemiBold,
    'Inter-Bold': Inter_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(main)" />
          <Stack.Screen name="+not-found" />
        </Stack>
      </AppProvider>
    </GestureHandlerRootView>
  );
}
