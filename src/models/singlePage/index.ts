import { createEffect, createEvent, createStore, sample } from 'effector';
import { API } from '@/api';
import { BlogPage } from '@/types/types';
import { changeBreadcrumb } from '@/models/menu';

export const getSinglePageItemFx = createEffect(async (url: string) => {
  const params = {
    populate: 'deep',
    filters: {
      url: {
        $eq: url,
      },
    },
  };
  const { data } = await API.getSinglePages(params);
  return data.data[0];
});

export const getSinglePageItem = createEvent();

export const $singlePageItem = createStore<BlogPage | null>(null);
$singlePageItem.on(getSinglePageItemFx.doneData, (_, data) => {
  if (data && data.attributes) {
    const formattedData = { id: data.id, ...data.attributes, url: `/${data.attributes.url}` };
    changeBreadcrumb({
      breadcrumb: formattedData.breadcrumbName || formattedData.h1,
      href: formattedData.url,
      isLastElement: true,
    });
    return formattedData;
  }
  return null;
});

sample({
  source: getSinglePageItem,
  fn: ({ params }: any) => params.url,
  target: [getSinglePageItemFx],
});
