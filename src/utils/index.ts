import { MONTH_NAMES, MONTH_SHORT_NAMES, DAY_OF_WEEK_NAMES } from '@/utils/const';
import { LotteryCardItem } from '@/types/types';

export const getShortDate = (date: string): string => {
  const currentDate = new Date(date);
  const month = MONTH_SHORT_NAMES[currentDate.getMonth()];
  const day = currentDate.getDate();
  return `${month} ${day}`;
};

export const getLotteryCardInfo = (data: LotteryCardItem[]): any => {
  let lotteryInfo: LotteryCardItem = {
    datecreated: '',
    datemodified: '',
    key: '',
    name: '',
    logo: '',
    date: '',
    maindraw: [],
    bonusorgrand: null,
    nextdraw: '',
    jackpot: '',
    tags: {},
    history: [],
  };

  data.forEach((dataItem: LotteryCardItem) => {
    const keysList = Object.keys(lotteryInfo);
    keysList.forEach(key => {
      switch (key) {
        case 'maindraw':
        case 'history': {
          if (!lotteryInfo[key].length) {
            lotteryInfo[key] = dataItem[key];
          }
          break;
        }
        case 'tags': {
          const source = String(dataItem.source);
          const tag = dataItem.tag;
          if (source && tag) {
            lotteryInfo.tags[source] = tag;
          }
          break;
        }
        default: {
          if (!lotteryInfo[key as keyof LotteryCardItem]) {
            lotteryInfo = { ...lotteryInfo, [key]: dataItem[key as keyof LotteryCardItem] };
          }
          break;
        }
      }
    });
  });
  return lotteryInfo;
};

export const getDateForLottery = (date: string): string => {
  const currentDate = new Date(date);
  const month = MONTH_NAMES[currentDate.getMonth()];
  const day = currentDate.getDate();
  const year = currentDate.getFullYear();
  const dayOfWeek = DAY_OF_WEEK_NAMES[currentDate.getDay()];
  return `<b>${dayOfWeek}</b> | ${day} ${month} ${year}`;
};