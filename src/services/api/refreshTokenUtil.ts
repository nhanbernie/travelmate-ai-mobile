import { ENV } from '@/utils/env';
import { API_ENDPOINTS } from './config';
// import { API_ENDPOINTS } from './endpoints';

export interface TokenData {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

export const refreshTokenUtil = async (
  refreshToken: string
): Promise<TokenData | null> => {
  try {
    console.log('Attempting to refresh token...');

    const response = await fetch(
      `${ENV.API.BASE_URL}${API_ENDPOINTS.AUTH.REFRESH}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          refresh_token: refreshToken,
        }),
      }
    );

    console.log('Refresh token response status:', response.status);

    if (!response.ok) {
      console.log('Refresh token request failed:', response.status);
      return null;
    }

    const result = await response.json();
    console.log('Refresh token response:', result);

    if (result && result.success && result.data) {
      return {
        access_token: result.data.access_token,
        refresh_token: result.data.refresh_token || refreshToken,
        expires_in: result.data.expires_in || 3600,
      };
    }

    console.log('Invalid refresh response structure');
    return null;
  } catch (error) {
    console.error('Error refreshing token:', error);
    return null;
  }
};
