import { GoogleSignin, statusCodes } from "@react-native-google-signin/google-signin";
import { ENV } from "@/utils/env";

export class GoogleSignInService {
  private static isConfigured = false;

  static configure() {
    if (this.isConfigured) return;

    try {
      const webClientId = ENV.AUTH.GOOGLE.WEB_CLIENT_ID;

      if (!webClientId) {
        throw new Error(
          "Google Web Client ID is not configured. Please add EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID to your .env file"
        );
      }

      GoogleSignin.configure({
        webClientId: webClientId,
        iosClientId: ENV.AUTH.GOOGLE.IOS_CLIENT_ID,
        offlineAccess: true,
        forceCodeForRefreshToken: true,
      });

      this.isConfigured = true;
    } catch (error) {
      console.error("Failed to configure Google Sign-In:", error);
      throw error;
    }
  }

  static async signIn(): Promise<{ idToken: string }> {
    try {
      // Ensure Google Sign-In is configured
      this.configure();

      // Check if device has Google Play Services (Android only)
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });

      // Perform sign-in
      const userInfo = await GoogleSignin.signIn();

      // Get ID token
      const tokens = await GoogleSignin.getTokens();

      if (!tokens.idToken) {
        throw new Error("Failed to get ID token from Google");
      }

      return {
        idToken: tokens.idToken,
      };
    } catch (error: any) {
      // Handle specific error codes
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        throw new Error("CANCELLED");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        throw new Error("Sign-in is already in progress");
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        throw new Error("Google Play Services not available");
      } else {
        console.error("Google Sign-In error:", error);
        throw new Error(error.message || "Failed to sign in with Google");
      }
    }
  }

  static async signOut(): Promise<void> {
    try {
      await GoogleSignin.signOut();
    } catch (error) {
      console.error("Failed to sign out from Google:", error);
      throw error;
    }
  }

  static async getCurrentUser() {
    try {
      return await GoogleSignin.getCurrentUser();
    } catch (error) {
      console.error("Failed to get current Google user:", error);
      return null;
    }
  }
}
