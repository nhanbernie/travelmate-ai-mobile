import * as SecureStore from 'expo-secure-store';
import { refreshTokenUtil } from '@/services/api/refreshTokenUtil';

const STORAGE_KEYS = {
  ACCESS_TOKEN: 'access_token',
  REFRESH_TOKEN: 'refresh_token',
  USER_DATA: 'user_data',
  EXPIRES_AT: 'expires_at',
} as const;

// Interface cho token data
export interface TokenData {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

export interface StoredUserData {
  id: string;
  username: string;
  email: string;
  roles: string[];
  firstName?: string;
  lastName?: string;
  avatar?: string;
}

export class SecureStorageService {
  static async setAccessToken(token: string): Promise<void> {
    try {
      await SecureStore.setItemAsync(STORAGE_KEYS.ACCESS_TOKEN, token);
    } catch (error) {
      console.error('Error saving access token:', error);
      throw error;
    }
  }

  static async getAccessToken(): Promise<string | null> {
    try {
      return await SecureStore.getItemAsync(STORAGE_KEYS.ACCESS_TOKEN);
    } catch (error) {
      console.error('Error getting access token:', error);
      return null;
    }
  }

  static async setRefreshToken(token: string): Promise<void> {
    try {
      await SecureStore.setItemAsync(STORAGE_KEYS.REFRESH_TOKEN, token);
    } catch (error) {
      console.error('Error saving refresh token:', error);
      throw error;
    }
  }

  static async getRefreshToken(): Promise<string | null> {
    try {
      return await SecureStore.getItemAsync(STORAGE_KEYS.REFRESH_TOKEN);
    } catch (error) {
      console.error('Error getting refresh token:', error);
      return null;
    }
  }

  static async setTokenData(tokenData: TokenData): Promise<void> {
    try {
      await Promise.all([
        SecureStore.setItemAsync(
          STORAGE_KEYS.ACCESS_TOKEN,
          tokenData.access_token
        ),
        SecureStore.setItemAsync(
          STORAGE_KEYS.REFRESH_TOKEN,
          tokenData.refresh_token
        ),
        SecureStore.setItemAsync(
          STORAGE_KEYS.EXPIRES_AT,
          (Date.now() + tokenData.expires_in * 1000).toString()
        ),
      ]);
    } catch (error) {
      console.error('Error saving token data:', error);
      throw error;
    }
  }

  static async getTokenData(): Promise<TokenData | null> {
    try {
      const [access_token, refresh_token, expires_at] = await Promise.all([
        SecureStore.getItemAsync(STORAGE_KEYS.ACCESS_TOKEN),
        SecureStore.getItemAsync(STORAGE_KEYS.REFRESH_TOKEN),
        SecureStore.getItemAsync(STORAGE_KEYS.EXPIRES_AT),
      ]);

      if (!access_token || !refresh_token) {
        return null;
      }

      const expiresAtMs = expires_at
        ? parseInt(expires_at)
        : Date.now() + 3600000; // Default 1 hour
      const expires_in = Math.max(
        0,
        Math.floor((expiresAtMs - Date.now()) / 1000)
      );

      return {
        access_token,
        refresh_token,
        expires_in,
      };
    } catch (error) {
      console.error('Error getting token data:', error);
      return null;
    }
  }

  static async setUserData(userData: StoredUserData): Promise<void> {
    try {
      console.log(`Saving user data: ${JSON.stringify(userData)}`);

      await SecureStore.setItemAsync(
        STORAGE_KEYS.USER_DATA,
        JSON.stringify(userData)
      );
    } catch (error) {
      console.error('Error saving user data:', error);
      throw error;
    }
  }

  static async getUserData(): Promise<StoredUserData | null> {
    try {
      const userData = await SecureStore.getItemAsync(STORAGE_KEYS.USER_DATA);
      return userData ? JSON.parse(userData) : null;
    } catch (error) {
      console.error('Error getting user data:', error);
      return null;
    }
  }

  static async isTokenExpired(): Promise<boolean> {
    try {
      const expires_at = await SecureStore.getItemAsync(
        STORAGE_KEYS.EXPIRES_AT
      );
      console.log(`Checking token expiration, expires_at: ${expires_at}`);

      if (!expires_at) return true;

      return Date.now() >= parseInt(expires_at);
    } catch (error) {
      console.error('Error checking token expiration:', error);
      return true;
    }
  }

  static async clearAuthData(): Promise<void> {
    try {
      await Promise.all([
        SecureStore.deleteItemAsync(STORAGE_KEYS.ACCESS_TOKEN),
        SecureStore.deleteItemAsync(STORAGE_KEYS.REFRESH_TOKEN),
        SecureStore.deleteItemAsync(STORAGE_KEYS.USER_DATA),
        SecureStore.deleteItemAsync(STORAGE_KEYS.EXPIRES_AT),
      ]);
    } catch (error) {
      console.error('Error clearing auth data:', error);
    }
  }

  static async isAuthenticated(): Promise<boolean> {
    try {
      const tokenData = await this.getTokenData();
      const userData = await this.getUserData();
      const isExpired = await this.isTokenExpired();

      console.log(`Token data: ${JSON.stringify(tokenData)}`);
      console.log(`User data: ${JSON.stringify(userData)}`);
      console.log(`Is token expired: ${isExpired}`);

      if (!tokenData || !userData) {
        console.log('No token data or user data found');
        return false;
      }

      if (!isExpired) {
        console.log('Token is still valid');
        return true;
      }

      if (tokenData.refresh_token) {
        const { refreshTokenUtil } = await import(
          '@/services/api/refreshTokenUtil'
        );
        const newTokenData = await refreshTokenUtil(tokenData.refresh_token);

        if (newTokenData) {
          await this.setTokenData(newTokenData);
          console.log('Token refreshed successfully');
          return true;
        } else {
          console.log('Token refresh failed');
        }
      }

      console.log('Clearing auth data');
      await this.clearAuthData();
      return false;
    } catch (error) {
      console.error('Error checking authentication status:', error);
      return false;
    }
  }
}
