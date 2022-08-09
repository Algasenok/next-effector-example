import { createEffect, createEvent, createStore, sample } from 'effector';
import { LinkProps, LotteryPage } from '@/types/types';
import { API } from '@/api';
import { API_CRM_URL_DEV } from 'config';

export const $lotteryPage = createStore<LotteryPage | null>(null);
export const $lotteryRegions = createStore<LinkProps[]>([]);

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
  return data.data[0];
});

export const getLotteryPageItem = createEvent();

$lotteryPage.on(getLotteryPageFx.doneData, (_, data) => {
  // TODO Исправить урл после того как картинки будут храниться в яндекс клауде
  const formattedData = {
    ...data.attributes,
    id: data.id,
    img: `${API_CRM_URL_DEV}${data.attributes.img.data.attributes.url}`,
  };
  return formattedData;
});

$lotteryRegions.on(getLotteryPageFx.doneData, (_, data) => {
  const lotteryCountry = data.attributes.lottery_country.data.attributes || {};
  const formattedData = lotteryCountry.region.map((region: any) => ({
    text: region.name,
    link: `/${lotteryCountry.url}/${region.url}`,
  }));
  return formattedData;
});

sample({
  source: getLotteryPageItem,
  fn: ({ params }: any) => params!.url,
  target: [getLotteryPageFx],
});
