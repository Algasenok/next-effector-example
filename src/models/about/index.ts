import { createEffect, createEvent, createStore, sample } from 'effector';
import { StaticPageContext } from 'nextjs-effector';
import { API } from '@/api';
import { LinkProps, SinglePage } from '@/types/types';
import { setSidebarActiveTab } from '@/models/menu';

export const getAboutPageItemFx = createEffect(async (url: string) => {
  const params = {
    filters: {
      url: {
        $eq: url,
      },
    },
  };
  const { data } = await API.getAboutPages(params);
  return data.data[0];
});

export const getAboutPagesFx = createEffect(async () => {
  const params = {
    fields: ['url', 'title'],
  };
  const { data } = await API.getAboutPages(params);
  return data.data;
});

export const getAboutPageItem = createEvent<StaticPageContext<{ url: string }>>();
export const getAboutPagesList = createEvent();

export const $aboutPageItem = createStore<SinglePage | null>(null);
$aboutPageItem.on(getAboutPageItemFx.doneData, (_, data) => {
  const formattedData = { id: data.id, ...data.attributes, url: `/about/${data.attributes.url}` };
  setSidebarActiveTab(formattedData.title);
  return formattedData;
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

sample({
  source: getAboutPageItem,
  fn: ({ params }) => params!.url,
  target: [getAboutPageItemFx, getAboutPagesFx],
});

sample({
  source: getAboutPagesList,
  target: getAboutPagesFx,
});
