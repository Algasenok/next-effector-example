import { MONTH_SHORT_NAMES } from '@/utils/const';

export const getShortDate = (date: string): string => {
  const currentDate = new Date(date);
  const month = MONTH_SHORT_NAMES[currentDate.getMonth()];
  const day = currentDate.getMonth();
  return `${month} ${day}`;
};
