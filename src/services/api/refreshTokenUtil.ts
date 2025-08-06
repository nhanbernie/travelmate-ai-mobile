import { ApiResponse } from './types';
import { ENV } from '@/utils/env';
import { API_ENDPOINTS } from './config';
export interface TokenData {
  access_token: string;
  refresh_token: string;
  expires_in: number;
}

export const refreshTokenUtil = async (
  refreshToken: string
): Promise<TokenData | null> => {
  try {
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

    if (!response.ok) {
      return null;
    }

    const result = await response.json();

    if (result as ApiResponse) {
      return {
        access_token: result.data.access_token,
        refresh_token: result.data.refresh_token || refreshToken,
        expires_in: result.data.expires_in || 3600,
      };
    }

    return null;
  } catch (error) {
    console.error('Error refreshing token:', error);
    return null;
  }
};
