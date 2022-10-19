// import axios, { AxiosInstance, AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';
import axios from 'axios';
import { CMS_URL } from 'config/index';

const API_URL = CMS_URL;

export const axiosInstance = axios.create({
  timeout: 30000,
  baseURL: API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

/*
type QueueType = {
  resolve: <T>(value: T) => void;
  reject: <E>(reason?: E) => void;
};

let isRefreshing = false;
let failedQueue: QueueType[] = [];

const processQueue = (error: AxiosError | null, token: string): void => {
  failedQueue.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

export const setTokenInterceptors = (instance: AxiosInstance) => {
  instance.interceptors.response.use(
    response => response,
    async error => {
      const originalRequest: AxiosRequestConfig & { _retry?: boolean } = error.config;
      if (
        error.response?.status &&
        error.response['status'] === 401 &&
        !originalRequest._retry &&
        originalRequest.url !== REFRESH_TOKEN_URL
      ) {
        if (typeof window !== 'undefined') {
          if (cookies.get('refreshToken')) {
            if (isRefreshing) {
              return new Promise((resolve, reject) => {
                failedQueue.push({ resolve, reject });
              })
                .then(token => {
                  // @ts-ignore
                  originalRequest.headers.Authorization = `Bearer ${token}`;
                  return instance(originalRequest);
                })
                .catch(err => {
                  return Promise.reject(err);
                });
            }
            originalRequest._retry = true;
            isRefreshing = true;
            const refreshToken = cookies.get('refreshToken');

            return new Promise((resolve, reject) => {
              instance
                .post(REFRESH_TOKEN_URL, { refresh_token: refreshToken })
                .then(
                  ({ data }: AxiosResponse<{ access_token: string; refresh_token: string }>) => {
                    if (typeof window !== 'undefined') {
                      const authData = cookies.get('auth');
                      setAuthData({ ...authData, ...data });
                    }
                    instance.defaults.headers.common.Authorization = `Bearer ${data.access_token}`;
                    // @ts-ignore
                    originalRequest.headers.Authorization = `Bearer ${data.access_token}`;
                    processQueue(null, data.access_token);
                    resolve(instance(originalRequest));
                  },
                )
                .catch(async err => {
                  await logOutFx();
                  processQueue(err, '');
                  reject(err);
                })
                .then(() => {
                  // eslint-disable-next-line no-unused-vars
                  isRefreshing = false;
                });
            });
          }
        }
      }
      if (
        error.response?.status &&
        error.response['status'] === 403 &&
        !originalRequest._retry &&
        originalRequest.url !== REFRESH_TOKEN_URL
      ) {
        if (error.response.data.detail.code) {
          await logOutFx();
        }
      }
      return Promise.reject(error);
    },
  );
};
 */
