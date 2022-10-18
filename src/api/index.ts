import { Api } from '@/axios/Api';
import { AxiosPromise } from 'axios';
import { CMS_URL, API_LOTTERY_URL } from 'config/index';
import qs from 'qs';

const defaultParams = {
  populate: '*',
};

export class API {
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
    return Api.get(`${CMS_URL}/api/about-pages?${query}`);
  };

  static getSinglePages = (params: any): AxiosPromise => {
    const query = qs.stringify(
      {
        ...defaultParams,
        ...params,
      },
      {
        encodeValuesOnly: true,
      },
    );
    return Api.get(`${CMS_URL}/api/single-pages?${query}`);
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
    return Api.get(`${CMS_URL}/api/categories?${query}`);
  };

  static getAuthorCurrentPage = (params: any): AxiosPromise => {
    const query = qs.stringify(
      {
        ...defaultParams,
        ...params,
      },
      {
        encodeValuesOnly: true,
      },
    );
    return Api.get(`${CMS_URL}/api/authors?${query}`);
  };

  static getFooterMenu = (): AxiosPromise => {
    const query = qs.stringify(
      {
        ...defaultParams,
      },
      {
        encodeValuesOnly: true,
      },
    );
    return Api.get(`${CMS_URL}/api/footer-menu?${query}`);
  };

  static getHeaderMenu = (params: any): AxiosPromise => {
    const query = qs.stringify(
      {
        ...defaultParams,
        ...params,
      },
      {
        encodeValuesOnly: true,
      },
    );
    return Api.get(`${CMS_URL}/api/header-menu?${query}`);
  };

  static getLotteryItem = (params: any): AxiosPromise => {
    const query = qs.stringify(
      {
        ...defaultParams,
        ...params,
      },
      {
        encodeValuesOnly: true,
      },
    );
    return Api.get(`${CMS_URL}/api/lottery-pages?${query}`);
  };

  static getLotteryCountry = (params: any): AxiosPromise => {
    const query = qs.stringify(
      {
        ...defaultParams,
        ...params,
      },
      {
        encodeValuesOnly: true,
      },
    );
    return Api.get(`${CMS_URL}/api/lottery-countries?${query}`);
  };

  static getLotteryInfo = (params: any): AxiosPromise => {
    const query = qs.stringify({
      ...params,
    });

    return Api.get(
      `${API_LOTTERY_URL}/modules/lottery-hub/lottery/get.json?${query}`,
      {},
      {
        headers: {
          Authorization: 'd4cc2c44-1812-4b2e-b471-6d0e33d13e74',
        },
      },
    );
  };
  static getRobotsTxt = (): AxiosPromise => {
    const query = qs.stringify(
      {
        ...defaultParams,
      },
      {
        encodeValuesOnly: true,
      },
    );
    return Api.get(`${CMS_URL}/api/robots-txt?${query}`);
  };

  static getFile = (url: string): AxiosPromise => {
    return Api.get(url);
  };

  static getMainPage = (params: any): AxiosPromise => {
    const query = qs.stringify(
      {
        ...defaultParams,
        ...params,
      },
      {
        encodeValuesOnly: true,
      },
    );
    return Api.get(`${CMS_URL}/api/main-page?${query}`);
  };
}
