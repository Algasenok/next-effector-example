import { combine, createEffect, createEvent, createStore, restore, sample } from 'effector';
import { StaticPageContext } from 'nextjs-effector';
import { API } from '@/api';
import { LinkProps, SinglePage } from '@/types/types';
import { setSidebarActiveTab } from '@/models/menu';

const getAboutPageItemFx = createEffect(async (url: string) => {
  // TODO Поменять апи запрос
  const { data } = await API.getSinglePageItem(url);
  return { id: data.data[0].id, ...data.data[0].attributes };
});

const getAboutPagesFx = createEffect(async () => {
  const { data } = await API.getAboutPagesList();
  return data.data;
});

export const getAboutPageItem = createEvent<StaticPageContext<{ url: string }>>();
export const getAboutPagesList = createEvent();

export const $aboutPageItem = createStore<SinglePage>({});
$aboutPageItem.on(getAboutPageItemFx.doneData, (_, data) => {
  setSidebarActiveTab(data.title);
  return data;
});

export const $aboutPages = createStore<LinkProps[]>([]);
$aboutPages.on(getAboutPagesFx.doneData, (_, data) => {
  const aboutPages = data.map((itemPage: any) => {
    return {
      text: itemPage.attributes.title,
      link: `/about/${itemPage.attributes.url}`,
    };
  });
  return aboutPages;
});

const $fetchGetAboutPagesError = restore(getAboutPageItemFx.failData, null);

sample({
  source: getAboutPageItem,
  fn: ({ params }) => params!.url,
  target: [getAboutPageItemFx, getAboutPagesFx],
});

sample({
  source: getAboutPagesList,
  target: getAboutPagesFx,
});

export const $aboutPageData = combine({
  loading: getAboutPageItemFx.pending,
  data: $aboutPageItem,
  error: $fetchGetAboutPagesError,
});

export const $aboutPagesList = combine({
  loading: getAboutPagesFx.pending,
  data: $aboutPages,
});
