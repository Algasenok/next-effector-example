import { combine, createEffect, createEvent, createStore, sample } from 'effector';
import { API } from '@/api';
import { API_CRM_URL_DEV } from 'config';
import { getCategoryTags } from '@/models/menu';
import { Category, SinglePageCard } from '@/types/types';

interface getPagesProps {
  category: string;
  pageNumber?: number;
  tag?: string;
}

export const getPagesForCategoryFx = createEffect(
  async ({ category, pageNumber = 1, tag = '' }: getPagesProps) => {
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
        page: pageNumber,
        pageSize: 10,
      },
    };
    if (tag) {
      params.filters.tags = {
        sysname: {
          $eq: tag,
        },
      };
    }
    const { data } = await API.getPagesForCategory(params);
    return { data: data.data, pagination: data.meta, category };
  },
);

const getCategoryInfoFx = createEffect(async ({ category }: any) => {
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
export const changePageNumber = createEvent<number>();
export const changeCurrentTag = createEvent<string>();

export const $pagesForCategoryPage = createStore<SinglePageCard[]>([]);
export const $paginationData = createStore<any>({});
export const $currentCategory = createStore<Category | null>(null);

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

$paginationData.on(getPagesForCategoryFx.doneData, (_, { pagination }) => pagination.pagination);

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
  fn: () => ({ category: 'knowledge' }),
  target: [getPagesForCategoryFx, getCategoryInfoFx],
});

sample({
  source: changePageNumber,
  fn: page => ({ category: 'knowledge', pageNumber: page }),
  target: [getPagesForCategoryFx],
});

sample({
  source: changeCurrentTag,
  fn: tag => ({ category: 'knowledge', tag }),
  target: [getPagesForCategoryFx],
});

export const $categoryPageData = combine({
  loading: getPagesForCategoryFx.pending,
  data: $pagesForCategoryPage,
});
