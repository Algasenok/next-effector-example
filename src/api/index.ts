import { Api } from '@/axios/Api';
import { AxiosPromise } from 'axios';
import { API_CRM_URL_DEV } from 'config/index';
import qs from 'qs';

const apiUrl = API_CRM_URL_DEV;

const defaultParams = {
  populate: '*',
};

export class API {
  static getSinglePageItem = (params: any): AxiosPromise => {
    const query = qs.stringify(
      {
        ...defaultParams,
        ...params,
      },
      {
        encodeValuesOnly: true,
      },
    );
    return Api.get(`${apiUrl}/api/single-pages?${query}`);
  };

  static getAboutPages = (params: any): AxiosPromise => {
    const query = qs.stringify(
      {
        ...defaultParams,
        ...params,
      },
      {
        encodeValuesOnly: true,
      },
    );
    return Api.get(`${apiUrl}/api/about-pages?${query}`);
  };

  static getPagesForCategory = (params: any): AxiosPromise => {
    const query = qs.stringify(
      {
        ...defaultParams,
        ...params,
      },
      {
        encodeValuesOnly: true,
      },
    );
    return Api.get(`${apiUrl}/api/single-pages?${query}`);
  };
  static getCategories = (params: any): AxiosPromise => {
    const query = qs.stringify(
      {
        ...defaultParams,
        ...params,
      },
      {
        encodeValuesOnly: true,
      },
    );
    return Api.get(`${apiUrl}/api/categories?${query}`);
  };
}
