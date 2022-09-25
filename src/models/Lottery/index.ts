import { createEffect, createEvent, createStore, sample } from 'effector';
import { LinkProps, LotteryCardItem, LotteryPage, LotteryRegionPage } from '@/types/types';
import { API } from '@/api';
import { API_CRM_URL_DEV } from 'config';
import { getLotteryCardInfo } from '@/utils';
import { changeBreadcrumb } from '@/models/menu';

export const $lotteryPage = createStore<LotteryPage | null>(null);
export const $lotteryRegions = createStore<LinkProps[]>([]);
export const $lotteryRegionItem = createStore<LotteryRegionPage | null>(null);
export const $lotteryInfoItem = createStore<any | null>(null);
export const $lotteryRegionInfoItem = createStore<any[]>([]);
export const $lotteriesForMainPage = createStore<any[]>([]);
export const $lotteryPagesUrlList = createStore<any[]>([]);

const getLotteryPageFx = createEffect(async (url: string) => {
  const params = {
    filters: {
      url: {
        $eq: url,
      },
    },
    populate: {
      lottery_country: { populate: ['regions'] },
      img: { fields: ['url'] },
      faq: { populate: '*' },
    },
  };
  const { data } = await API.getLotteryItem(params);
  return data.data[0];
});

export const getLotteryInfoFx = createEffect(async (key: any) => {
  const params = {
    key,
    withHistory: 1,
    historyLimit: 10,
    withFullDataFromSource: 0,
  };
  const { data } = await API.getLotteryInfo(params);
  return data;
});

export const getLotteryRegionInfoFx = createEffect(async (source: any) => {
  const params = {
    withHistory: 0,
    historyLimit: 0,
    withFullDataFromSource: 0,
  };
  const { data } = await API.getLotteryInfo(params);
  return { data, source };
});

const getLotteryRegionItemFx = createEffect(async (urlParams: any) => {
  const params = {
    filters: {
      url: {
        $eq: urlParams.route.split('/')[1],
      },
    },
    populate: {
      regions: {
        filters: {
          url: {
            $eq: urlParams.params.url,
          },
        },
        populate: {
          faq: {
            populate: '*',
          },
        },
      },
      lottery_pages: {
        fields: ['lotteryKey', 'url'],
      },
    },
  };
  const { data } = await API.getLotteryCountry(params);
  return data.data[0];
});

const getLotteryRegionsListFx = createEffect(async (urlParams: any) => {
  const params = {
    filters: {
      url: {
        $eq: urlParams.route.split('/')[1],
      },
    },
    fields: ['url'],
    populate: {
      regions: {
        fields: ['url', 'h1'],
      },
    },
  };
  const { data } = await API.getLotteryCountry(params);
  return data.data[0];
});

const getLotteriesForMainPageFx = createEffect(async (lotteryKeys: string[]) => {
  const params = {
    withHistory: 0,
    historyLimit: 0,
    withFullDataFromSource: 0,
  };
  const listPromises: any[] = [];
  lotteryKeys.forEach(key => {
    listPromises.push(API.getLotteryInfo({ ...params, key }));
  });
  const data = await Promise.all(listPromises);
  return data;
});

const getLotteryPagesUrlFx = createEffect(async (lotteryKeys: string[]) => {
  const params = {
    filters: {
      lotteryKey: lotteryKeys,
    },
    fields: ['lotteryKey', 'url'],
  };
  const { data } = await API.getLotteryItem(params);
  return data.data;
});

export const getLotteryPageItem = createEvent();
export const getLotteryRegionItem = createEvent();
export const getLotteryCountry = createEvent();
export const getLotteriesForMainPage = createEvent<string[]>();
export const getLotteryPagesUrl = createEvent<string[]>();

$lotteryInfoItem.on(getLotteryInfoFx.doneData, (_, data) => {
  if (data.length) {
    return getLotteryCardInfo(data);
  }
  return null;
});

$lotteryRegionInfoItem.on(getLotteryRegionInfoFx.doneData, (_, data) => {
  if (data.data.length) {
    const lotteriesKeyList = data.data
      .filter((item: LotteryCardItem) => item.source === data.source)
      .map((item: LotteryCardItem) => item.key);
    return lotteriesKeyList
      .map((key: string) =>
        getLotteryCardInfo(
          data.data.filter((lotteryItem: LotteryCardItem) => lotteryItem.key === key),
        ),
      )
      .filter((item: LotteryCardItem | null) => item !== null);
  }
  return [];
});

$lotteryPage.on(getLotteryPageFx.doneData, (_, data) => {
  // TODO Исправить урл после того как картинки будут храниться в яндекс клауде
  if (data && data.attributes) {
    const formattedData = {
      ...data.attributes,
      id: data.id,
      url: `/lotteries/${data.attributes.url}`,
      img: `${API_CRM_URL_DEV}${data.attributes?.img?.data?.attributes?.url}`,
      // TODO Вернуться сюда
      // regions: data.attributes.regions?.data.map(region => )
    };
    changeBreadcrumb({
      breadcrumb: formattedData.breadcrumbName || formattedData.h1,
      href: formattedData.url,
      isLastElement: true,
    });
    return formattedData;
  }
  return null;
});

$lotteryRegions.on(getLotteryPageFx.doneData, (_, data) => {
  if (data && data.attributes.lottery_country) {
    const lotteryCountry = data.attributes.lottery_country.data.attributes || {};
    const formattedData = lotteryCountry.regions.data?.map((region: any) => ({
      text: region.attributes.h1,
      link: `/${lotteryCountry.url}/${region.attributes.url}`,
    }));
    return formattedData;
  }
  return [];
});

$lotteryRegions.on(getLotteryRegionsListFx.doneData, (_, data) => {
  const lotteryCountry = data.attributes;
  const formattedData = lotteryCountry.regions.data.map((region: any) => ({
    text: region.attributes.h1,
    link: `/${lotteryCountry.url}/${region.attributes.url}`,
  }));
  return formattedData;
});

$lotteryRegionItem.on(getLotteryRegionItemFx.doneData, (_, data) => {
  if (data && data.attributes) {
    changeBreadcrumb({
      breadcrumb:
        data.attributes.regions.data[0].attributes.breadcrumbName ||
        data.attributes.regions.data[0].attributes.h1,
      href: `/${data.attributes.url}/${data.attributes.regions.data[0].attributes.url}`,
      isLastElement: true,
    });
    return {
      id: data.id,
      ...data.attributes,
      region: {
        id: data.attributes.regions.data[0].id,
        ...data.attributes.regions.data[0].attributes,
      },
      lottery_pages: data.attributes.lottery_pages.data.map((lotteryPage: any) => ({
        url: `/lotteries/${lotteryPage.attributes.url}`,
        lotteryKey: lotteryPage.attributes.lotteryKey,
      })),
    };
  }
  return null;
});

$lotteriesForMainPage.on(getLotteriesForMainPageFx.doneData, (_, data) => {
  const formattedData: any[] = [];
  if (data.length) {
    data.forEach(lotteryItem => {
      if (lotteryItem.data.length) {
        formattedData.push(getLotteryCardInfo(lotteryItem.data));
      }
    });
  }
  return formattedData;
});

$lotteryPagesUrlList.on(getLotteryPagesUrlFx.doneData, (_, data) => {
  if (data && data.length) {
    const formattedData: any[] = [];
    data.forEach((lotteryPageItem: any) => {
      if (lotteryPageItem.attributes.lottery_country) {
        formattedData.push({
          lotteryKey: lotteryPageItem.attributes.lotteryKey,
          url: `${lotteryPageItem.attributes.lottery_country.data.attributes.url}/${lotteryPageItem.attributes.url}`,
        });
      }
    });
    return formattedData;
  }
  return [];
});

sample({
  source: getLotteryPageItem,
  fn: ({ params }: any) => params!.url,
  target: [getLotteryPageFx],
});

sample({
  source: getLotteryRegionItem,
  fn: context => context,
  target: [getLotteryRegionItemFx, getLotteryRegionsListFx],
});

sample({
  source: getLotteryCountry,
  fn: (context: any) => context,
  target: getLotteryRegionsListFx,
});

sample({
  clock: getLotteryPageFx.doneData,
  source: $lotteryPage,
  fn: page => {
    if (page) {
      return page.lotteryKey;
    }
    return '';
  },
  target: getLotteryInfoFx,
});

sample({
  clock: getLotteryRegionItemFx.doneData,
  source: $lotteryRegionItem,
  fn: page => {
    if (page) {
      return page.region.source;
    }
    return '';
  },
  target: getLotteryRegionInfoFx,
});

sample({
  source: getLotteriesForMainPage,
  fn: keysList => keysList,
  target: [getLotteriesForMainPageFx, getLotteryPagesUrlFx],
});
