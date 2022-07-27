import { createEffect, createEvent, createStore, sample } from 'effector';
import { Tag } from '@/types/types';
import { API } from '@/api';

const getTagsForCurrentCategoryFx = createEffect(async (url: string) => {
  const params = {
    filters: {
      single_pages: {
        url: {
          $eq: url,
        },
      },
    },
    populate: ['tags'],
  };
  const { data } = await API.getCategories(params);
  return data.data[0];
});

export const $sidebarActiveTab = createStore<string>('');
export const $tagsListForCategory = createStore<Tag[]>([]);

export const setSidebarActiveTab = createEvent<string>();
export const getCategoryTagsForSinglePage = createEvent<string>('');
export const getCategoryTags = createEvent<any>({});

$sidebarActiveTab.on(setSidebarActiveTab, (_, tabName) => tabName);

$tagsListForCategory.on(getTagsForCurrentCategoryFx.doneData, (_, data) => {
  return data.attributes.tags.data.map((tag: any) => ({
    id: tag.id,
    tagName: tag.attributes.tagName,
    sysname: tag.attributes.sysname,
    link: `/${data.attributes.sysname}`,
  }));
});

$tagsListForCategory.on(getCategoryTags, (_, data) => {
  return data.tags.map((tag: any) => ({
    ...tag,
    link: `/${data.categorySysname}`,
  }));
});

sample({
  source: getCategoryTagsForSinglePage,
  fn: url => url,
  target: getTagsForCurrentCategoryFx,
});
