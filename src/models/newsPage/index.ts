import { combine, createEffect, createEvent, createStore, sample } from 'effector';
import { API } from '@/api';
import { API_CRM_URL_DEV } from 'config';
import { getCategoryTags } from '@/models/menu';
import {Category} from "@/types/types";

export const getPagesForCategoryFx = createEffect(async (category: string) => {
  const params = {
    filters: {
      category: {
        sysname: {
          $eq: category,
        },
      },
    },
    populate: ['img', 'tags'],
    sort: ['publishedAt:asc'],
    pagination: {
      page: 1,
      pageSize: 10,
    },
  };
  const { data } = await API.getPagesForCategory(params);
  return { data: data.data, category };
});

const getCategoryInfoFx = createEffect(async (category: string) => {
  const params = {
    filters: {
      sysname: {
        $eq: category,
      },
    },
    populate: ['tags'],
  };
  const { data } = await API.getCategories(params);
  return data.data[0];
});

export const initNewsPage = createEvent();
export const changeCurrentCategory = createEvent<string>('');

const $pagesForCategoryPage = createStore<any>({});
export const $currentCategory = createStore<Category>({});

$pagesForCategoryPage.on(getPagesForCategoryFx.doneData, (_, data) => {
  return data.data.map((page: any) => ({
    ...page.attributes,
    id: page.id,
    // TODO Убрать это после того как картинки будут храниться в яндекс клауде
    img: `${API_CRM_URL_DEV}${page.attributes.img.data.attributes.url}`,
    url: `/${data.category}/${page.attributes.url}`,
    tags: page.attributes.tags.data.map((tag: any) => ({ id: tag.id, ...tag.attributes })),
  }));
});

$currentCategory.on(getCategoryInfoFx.doneData, (_, data) => {
  const formattedData = {
    ...data.attributes,
    id: data.id,
    tags: data.attributes.tags.data.map((tag: any) => ({
      ...tag.attributes,
      id: tag.id,
    })),
  };
  getCategoryTags({ tags: formattedData.tags, categorySysname: formattedData.sysname });
  return formattedData;
});

sample({
  source: initNewsPage,
  fn: () => 'knowledge',
  target: [getPagesForCategoryFx, getCategoryInfoFx],
});

export const $categoryPageData = combine({
  loading: getPagesForCategoryFx.pending,
  data: $pagesForCategoryPage,
});
