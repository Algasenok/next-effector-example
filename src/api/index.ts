import { Api } from '@/axios/Api';
import { AxiosPromise } from 'axios';
import { API_CRM_URL_DEV } from 'config/index';
import qs from 'qs';

const apiUrl = API_CRM_URL_DEV;

const defaultParams = {
  populate: '*',
};

export class API {
  static getSinglePageItem = (url: string): AxiosPromise => {
    const query = qs.stringify(
      {
        ...defaultParams,
        filters: {
          url: {
            $eq: url,
          },
        },
      },
      {
        encodeValuesOnly: true,
      },
    );
    return Api.get(`${apiUrl}/api/single-pages?${query}`);
  };
  static getAboutPagesList = (): AxiosPromise => {
    const query = qs.stringify(
      {
        filters: {
          category: {
            sysname: {
              $eq: 'about',
            },
          },
        },
        fields: ['url', 'title'],
      },
      {
        encodeValuesOnly: true,
      },
    );
    return Api.get(`${apiUrl}/api/single-pages?${query}`);
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
