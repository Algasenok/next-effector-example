// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/ban-types */

import { AxiosInstance, AxiosPromise, AxiosRequestConfig } from 'axios';
import { axiosInstance } from './client';

export class Api {
  static instance: Api;
  axiosInstance: AxiosInstance;
  constructor() {
    this.axiosInstance = axiosInstance;
    // setTokenInterceptors(this.axiosInstance);
  }
  static getInstance(): InstanceType<typeof Api> {
    if (!Api.instance) {
      Api.instance = new Api();
    }
    return Api.instance;
  }
  static getAxios(): AxiosInstance {
    return Api.getInstance().axiosInstance;
  }
  static get<T = any>(
    url: string,
    params: object = {},
    config: AxiosRequestConfig = {},
  ): AxiosPromise<T> {
    return Api.getAxios().get(url, { params, ...config });
  }

  static delete<T = any>(
    url: string,
    params: object = {},
    config: AxiosRequestConfig = {},
  ): AxiosPromise<T> {
    return Api.getAxios().delete(url, { params, ...config });
  }

  static post<T = any>(url: string, data?: object, config?: AxiosRequestConfig): AxiosPromise<T> {
    return Api.getAxios().post(url, data, config);
  }

  static put<T = any>(url: string, data?: object, config?: AxiosRequestConfig): AxiosPromise<T> {
    return Api.getAxios().put(url, data, config);
  }

  static patch<T = any>(url: string, data?: object, config?: AxiosRequestConfig): AxiosPromise<T> {
    return Api.getAxios().patch(url, data, config);
  }

  static head<T = any>(url: string, data?: object): AxiosPromise<T> {
    return Api.getAxios().head(url, data);
  }
}
