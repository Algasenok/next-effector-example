import { createEffect, createEvent, createStore, sample } from 'effector';
import { API } from '@/api';
import { API_CRM_URL_DEV } from 'config';
import { MainPage } from '@/types/types';
import { getLotteriesForMainPage } from '@/models/Lottery';

export const getRobotsTxtFx = createEffect(async () => {
  const { data } = await API.getRobotsTxt();
  let robotsUrl = null;
  let robotsText;
  if (data.data && data.data.attributes) {
    const robots = data.data.attributes.robots.data?.attributes.url;
    robotsUrl = robots ? API_CRM_URL_DEV + robots : null;
  }
  if (robotsUrl) {
    robotsText = await API.getFile(robotsUrl);
  }
  return robotsText?.data || null;
});

export const getRobotsTxt = createEvent();

export const $robotsText = createStore<string | null>(null);
$robotsText.on(getRobotsTxtFx.doneData, (_, data) => data || null);

sample({
  source: getRobotsTxt,
  target: [getRobotsTxtFx],
});

// /-/-/-/-/-/-/-/-/-/

const getMainPageFx = createEffect(async () => {
  const params = {
    populate: 'deep',
  };
  const { data } = await API.getMainPage(params);
  return data.data;
});

export const initMainPage = createEvent();

export const $mainPage = createStore<MainPage | null>(null);
$mainPage.on(getMainPageFx.doneData, (_, data) => {
  if (data && data.attributes) {
    const formattedData = {
      ...data.attributes,
      lotteryKeys: data.attributes.lotteryKeys.map((item: any) => item.lotteryKey),
    };
    return formattedData;
  }
  return null;
});

sample({
  source: initMainPage,
  target: [getMainPageFx],
});

sample({
  clock: getMainPageFx.doneData,
  source: $mainPage,
  fn: page => {
    return page ? page.lotteryKeys : [];
  },
  target: getLotteriesForMainPage,
});
