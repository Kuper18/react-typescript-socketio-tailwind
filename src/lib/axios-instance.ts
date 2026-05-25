import axios, {
  AxiosError,
  type AxiosRequestConfig,
  type InternalAxiosRequestConfig,
} from 'axios';

import { AUTH_API_ROUTES } from '@/constants/api-routes';
import router from '@/routes';

const API_CONFIG: AxiosRequestConfig = {
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
} as const;

const axiosInstance = axios.create(API_CONFIG);

let isRefreshing = false;
let refreshPromise: Promise<void> | null = null;

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => config,
  (error: AxiosError) => Promise.reject(error)
);

axiosInstance.interceptors.response.use((response) => response, handleError);

async function handleError(error: AxiosError) {
  const originalRequest = error.config as InternalAxiosRequestConfig & {
    _retried?: boolean;
  };

  if (error.response?.status === 401 && !originalRequest?._retried) {
    originalRequest._retried = true;

    if (isRefreshing && refreshPromise) {
      try {
        await refreshPromise;
        return axiosInstance(originalRequest);
      } catch (error) {
        return Promise.reject(error);
      }
    }

    isRefreshing = true;

    refreshPromise = (async () => {
      try {
        await axios.post(AUTH_API_ROUTES.refreshToken, {}, API_CONFIG);
      } catch (error) {
        router.navigate('/login');
        throw error;
      } finally {
        isRefreshing = false;
        refreshPromise = null;
      }
    })();

    try {
      await refreshPromise;
      return axiosInstance(originalRequest);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  return Promise.reject(error);
}

export default axiosInstance;
