import { createEffect, createEvent, createStore, sample } from 'effector';
import { API } from '@/api';
import { LinkProps, BlogPage } from '@/types/types';
import { changeBreadcrumb, setSidebarActiveTab } from '@/models/menu';

export const getAboutPageItemFx = createEffect(async (url: string) => {
  const params = {
    populate: 'deep',
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
    fields: ['url', 'h1'],
  };
  const { data } = await API.getAboutPages(params);
  return data.data;
});

export const getAboutPageItem = createEvent();
export const getAboutPagesList = createEvent();

export const $aboutPageItem = createStore<BlogPage | null>(null);
$aboutPageItem.on(getAboutPageItemFx.doneData, (_, data) => {
  if (data && data.attributes) {
    const formattedData = { id: data.id, ...data.attributes, url: `/about/${data.attributes.url}` };
    setSidebarActiveTab(formattedData.title);
    changeBreadcrumb({
      breadcrumb: formattedData.breadcrumbName || formattedData.h1,
      href: formattedData.url,
      isLastElement: true,
    });
    return formattedData;
  }
  return null;
});

export const $aboutPages = createStore<LinkProps[]>([]);
$aboutPages.on(getAboutPagesFx.doneData, (_, data) => {
  const aboutPages = data.map((itemPage: any) => {
    return {
      text: itemPage.attributes.h1,
      link: `/about/${itemPage.attributes.url}`,
    };
  });
  return aboutPages;
});

sample({
  source: getAboutPageItem,
  fn: ({ params }: any) => params.url,
  target: [getAboutPageItemFx, getAboutPagesFx],
});

sample({
  source: getAboutPagesList,
  target: getAboutPagesFx,
});
