import { useCallback, useState } from "react";
import { useGoogleLoginMutation } from "@/services/auth/auth.service";
import { GoogleSignInService } from "@/services/auth/google.service";
import { toastService } from "@/services/toast/toastService";
import { useRouter } from "expo-router";
import { useAppDispatch } from "@/redux/hooks";
import { setCredentials } from "@/redux/slices/auth.slice";
import { SecureStorageService } from "@/services/storage/secureStorage.service";

export const useGoogleSignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [googleLogin] = useGoogleLoginMutation();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleGoogleSignIn = useCallback(async () => {
    setIsLoading(true);

    try {
      // Step 1: Sign in with Google and get ID token
      const { idToken } = await GoogleSignInService.signIn();

      // Step 2: Send ID token to backend for verification
      const response = await googleLogin({
        idToken,
      }).unwrap();

      // Step 3: Store credentials in Redux and SecureStorage
      if (response.success && response.data) {
        // Save tokens to SecureStorage
        await SecureStorageService.setTokenData({
          access_token: response.data.access_token,
          refresh_token: response.data.refresh_token,
          expires_in: response.data.expires_in || 900,
        });

        // Save login method as google
        await SecureStorageService.setLoginMethod('google');

        // Save user data to SecureStorage
        await SecureStorageService.setUserData(response.data.user);

        // Update Redux state
        dispatch(
          setCredentials({
            user: response.data.user,
            access_token: response.data.access_token,
            refresh_token: response.data.refresh_token,
          })
        );

        // Step 4: Show success message and navigate
        toastService.success("Welcome!", `Signed in as ${response.data.user.email}`);

        // Navigate to home screen
        router.replace("/(main)");
      }
    } catch (error: any) {
      // Handle user cancellation silently
      if (error.message === "CANCELLED") {
        return;
      }

      // Show error toast for other errors
      // toastService.error(
      //   "Sign-In Failed",
      //   error.data?.message || error.message || "Failed to sign in with Google"
      // );
    } finally {
      setIsLoading(false);
    }
  }, [googleLogin, dispatch, router]);

  return {
    handleGoogleSignIn,
    isLoading,
  };
};
