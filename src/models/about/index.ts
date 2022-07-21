import { combine, createEffect, createEvent, createStore, restore, attach } from 'effector';
import { SinglePage } from '@/types/types';
import { API } from '@/api';

const $aboutPages = createStore<SinglePage[]>([]);

const getAboutPagesFx = createEffect(async (url: string) => {
  // TODO Поменять апи запрос
  const { data } = await API.getSinglePageItem(url);
  return data[0];
});

export const getSinglePage = createEvent<string>();

$aboutPages.on(getAboutPagesFx.doneData, (_, data) => data);

const getAboutPages = attach({
  effect: getAboutPagesFx,
  mapParams: url => url,
});

const $fetchGetAboutPagesError = restore(getAboutPagesFx.failData, []);

export const $aboutPageData = combine({
  loading: getAboutPagesFx.pending,
  data: $aboutPages,
  error: $fetchGetAboutPagesError,
});
