import { createEffect, createEvent, createStore, sample } from 'effector';
import { LinkProps, LotteryPage, LotteryRegionPage } from '@/types/types';
import { API } from '@/api';
import { API_CRM_URL_DEV } from 'config';
import {getLotteryCardInfo} from "@/utils";

export const $lotteryPage = createStore<LotteryPage | null>(null);
export const $lotteryRegions = createStore<LinkProps[]>([]);
export const $lotteryRegionItem = createStore<LotteryRegionPage | null>(null);
export const $lotteryInfoItem = createStore<any | null>(null);

const getLotteryPageFx = createEffect(async (url: string) => {
  const params = {
    filters: {
      url: {
        $eq: url,
      },
    },
    populate: {
      lottery_country: { populate: ['region'] },
      img: { fields: ['url'] },
    },
  };
  const { data } = await API.getLotteryItem(params);
  // if (data.data[0] && data.data[0].attributes?.lotteryKey) {
  //   await getLotteryInfoFx(data.data[0].attributes?.lotteryKey);
  // }
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

const getLotteryRegionItemFx = createEffect(async (urlParams: any) => {
  const params = {
    filters: {
      url: {
        $eq: urlParams.route.split('/')[1],
      },
    },
    populate: {
      region: {
        filters: {
          url: {
            $eq: urlParams.params.url,
          },
        },
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
      region: {
        fields: ['url', 'name'],
      },
    },
  };
  const { data } = await API.getLotteryCountry(params);
  return data.data[0];
});

export const getLotteryPageItem = createEvent();
export const getLotteryRegionItem = createEvent();
export const getLotteryCountry = createEvent();

$lotteryInfoItem.on(getLotteryInfoFx.doneData, (_, data) => {
  if (data.length) {
    return getLotteryCardInfo(data);
  }
  return null;
});

$lotteryPage.on(getLotteryPageFx.doneData, (_, data) => {
  // TODO Исправить урл после того как картинки будут храниться в яндекс клауде
  if (data) {
    const formattedData = {
      ...data.attributes,
      id: data.id,
      img: `${API_CRM_URL_DEV}${data.attributes?.img?.data?.attributes?.url}`,
    };
    return formattedData;
  }
  return null;
});

$lotteryRegions.on(getLotteryPageFx.doneData, (_, data) => {
  if (data && data.attributes.lottery_country) {
    const lotteryCountry = data.attributes.lottery_country.data.attributes || {};
    const formattedData = lotteryCountry.region.map((region: any) => ({
      text: region.name,
      link: `/${lotteryCountry.url}/${region.url}`,
    }));
    return formattedData;
  }
  return [];
});

$lotteryRegions.on(getLotteryRegionsListFx.doneData, (_, data) => {
  const lotteryCountry = data.attributes;
  const formattedData = lotteryCountry.region.map((region: any) => ({
    text: region.name,
    link: `/${lotteryCountry.url}/${region.url}`,
  }));
  return formattedData;
});

$lotteryRegionItem.on(getLotteryRegionItemFx.doneData, (_, data) => {
  if (data) {
    return {
      id: data.id,
      ...data.attributes,
      region: data.attributes.region[0],
    };
  }
  return null;
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
