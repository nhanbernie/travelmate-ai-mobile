import axios, {
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from 'axios';
import { HTTP_CODES } from '@/constants/common.constant';

export const apiClient = axios.create({
  // baseURL: API_CONFIG.BASE_URL,
  // timeout: API_CONFIG.TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    // Implement access token later
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    return response;
  },
  (error: AxiosError): Promise<any> => {
    const errorData = error.response?.data as any;

    if (error.response?.status === HTTP_CODES.UNAUTHORIZED) {
      // Auto logout on unauthorized (nếu có api logout)
    }

    return Promise.reject(errorData);
  }
);

export const apiRequest = {
  get: <T = any>(url: string, config = {}) => apiClient.get<T>(url, config),

  post: <T = any>(url: string, data = {}, config = {}) =>
    apiClient.post<T>(url, data, config),

  put: <T = any>(url: string, data = {}, config = {}) =>
    apiClient.put<T>(url, data, config),

  patch: <T = any>(url: string, data = {}, config = {}) =>
    apiClient.patch<T>(url, data, config),

  delete: <T = any>(url: string, config = {}) =>
    apiClient.delete<T>(url, config),
};

export default apiClient;
