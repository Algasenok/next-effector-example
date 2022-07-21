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
}
