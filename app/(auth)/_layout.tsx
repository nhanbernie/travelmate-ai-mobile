import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Login routes */}
      <Stack.Screen name="login/index" options={{ title: 'Login' }} />

      {/* Register routes */}
      <Stack.Screen name="register/index" options={{ title: 'Register' }} />

      {/* Forgot password routes */}
      <Stack.Screen
        name="forgot-password/index"
        options={{ title: 'Forgot Password' }}
      />
      <Stack.Screen
        name="forgot-password/verify-otp"
        options={{ title: 'Verify OTP' }}
      />
      <Stack.Screen
        name="forgot-password/reset-password"
        options={{ title: 'Reset Password' }}
      />

      {/* Static pages */}
      <Stack.Screen name="privacy" options={{ title: 'Privacy Policy' }} />
      <Stack.Screen name="terms" options={{ title: 'Terms of Service' }} />
    </Stack>
  );
}
