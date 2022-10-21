import { createEffect, createEvent, createStore, sample } from 'effector';
import { LinkProps, LotteryCardItem, LotteryPage } from '@/types/types';
import { API } from '@/api';
import { getLotteryCardInfo } from '@/utils';
import { changeBreadcrumb } from '@/models/menu';

export const $lotteryPage = createStore<LotteryPage | null>(null);
export const $lotteryRegions = createStore<LinkProps[]>([]);
export const $lotteryInfoItems = createStore<LotteryCardItem[]>([]);
export const $lotteriesForMainPage = createStore<any[]>([]);
export const $lotteryPagesList = createStore<LinkProps[]>([]);

const getLotteryPageFx = createEffect(async (urlParams: any) => {
  const params = {
    filters: {
      url: {
        $eq: urlParams.params.url,
      },
    },
    populate: {
      img: { fields: ['url'] },
      faq: { populate: '*' },
      lottery_country: '*',
    },
  };
  const { data } = await API.getLotteryItem(params);
  return data.data[0];
});

export const getLotteryInfoFx = createEffect(async ({ key, isRegionPage }: any) => {
  const params = isRegionPage
    ? {
        withHistory: 0,
        historyLimit: 0,
        withFullDataFromSource: 0,
      }
    : {
        key,
        withHistory: 1,
        historyLimit: 10,
        withFullDataFromSource: 0,
      };
  const { data } = await API.getLotteryInfo(params);
  return { data, source: key, isRegionPage };
});

const getLotteryPagesListFx = createEffect(async (urlParams: any) => {
  const params = {
    filters: {
      $and: [
        {
          isRegionPage: {
            $eq: false,
          },
          lottery_country: {
            url: {
              $eq: urlParams.route.split('/')[1],
            },
          },
        },
      ],
    },
    fields: ['url', 'h1', 'lotteryKey'],
    populate: 'lottery_country',
  };
  const { data } = await API.getLotteryItem(params);
  return data.data;
});

const getLotteryRegionsListFx = createEffect(async (urlParams: any) => {
  const params = {
    filters: {
      $and: [
        {
          isRegionPage: {
            $eq: true,
          },
          lottery_country: {
            url: {
              $eq: urlParams.route.split('/')[1],
            },
          },
        },
      ],
    },
    fields: ['url', 'h1'],
    populate: 'lottery_country',
  };
  const { data } = await API.getLotteryItem(params);
  return data.data;
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
export const getLotteryCountry = createEvent();
export const getLotteriesForMainPage = createEvent<string[]>();

$lotteryInfoItems.on(getLotteryInfoFx.doneData, (_, data) => {
  if (data.data.length) {
    if (data.isRegionPage) {
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
    return [getLotteryCardInfo(data.data)];
  }
  return [];
});

$lotteryPage.on(getLotteryPageFx.doneData, (_, data) => {
  if (data && data.attributes) {
    const formattedData = {
      ...data.attributes,
      id: data.id,
      url: `/${data.attributes.lottery_country.data.attributes.url}/${data.attributes.url}`,
      img: data.attributes?.img?.data?.attributes?.url,
      lottery_country: data.attributes.lottery_country.data.attributes,
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

$lotteryRegions.on(getLotteryRegionsListFx.doneData, (_, data) => {
  return data.map((region: any) => ({
    text: region.attributes.h1,
    link: `/${region.attributes.lottery_country.data.attributes.url}/${region.attributes.url}`,
  }));
});

$lotteryPagesList
  .on(getLotteryPagesListFx.doneData, (_, data) => {
    if (data && data.length) {
      return data.map((region: any) => ({
        lotteryKey: region.attributes.lotteryKey,
        text: region.attributes.h1,
        link: `/${region.attributes.lottery_country.data.attributes.url}/${region.attributes.url}`,
      }));
    }
    return [];
  })
  .on(getLotteryPagesUrlFx.doneData, (_, data) => {
    if (data && data.length) {
      const formattedData: any[] = [];
      data.forEach((lotteryPageItem: any) => {
        if (lotteryPageItem.attributes.lottery_country) {
          formattedData.push({
            lotteryKey: lotteryPageItem.attributes.lotteryKey,
            link: `${lotteryPageItem.attributes.lottery_country.data.attributes.url}/${lotteryPageItem.attributes.url}`,
          });
        }
      });
      return formattedData;
    }
    return [];
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

sample({
  source: getLotteryPageItem,
  fn: context => context,
  target: [getLotteryPageFx, getLotteryRegionsListFx, getLotteryPagesListFx],
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
      return {
        key: page.isRegionPage ? page.source : page.lotteryKey,
        isRegionPage: page.isRegionPage,
      };
    }
    return { key: null, isRegionPage: false };
  },
  target: [getLotteryInfoFx],
});

sample({
  source: getLotteriesForMainPage,
  fn: keysList => keysList,
  target: [getLotteriesForMainPageFx, getLotteryPagesUrlFx],
});
