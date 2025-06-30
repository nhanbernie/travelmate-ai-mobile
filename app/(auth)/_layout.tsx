import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login/index" options={{ title: 'Login' }} />
      <Stack.Screen name="signup/index" options={{ title: 'Signup' }} />
      <Stack.Screen
        name="forgot-password/index"
        options={{ title: 'Forgot Password' }}
      />
      
    </Stack>
  );
}
