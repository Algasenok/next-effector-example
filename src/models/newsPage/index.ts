import { combine, createEffect, createEvent, createStore, sample } from 'effector';
import { API } from '@/api';
import { API_CRM_URL_DEV } from 'config';
import { getCategoryTags } from '@/models/menu';
import { Category, blogPageCard } from '@/types/types';
import { useRouter } from 'next/router';

interface getPagesProps {
  category: string;
  page?: number;
  tag?: string;
  type?: string;
}

interface ParamsTypes {
  filters: {
    category: any;
    type: any;
    tags?: any;
  };
  populate: string[];
  sort: string[];
  pagination: any;
}

export const getPagesForCategoryFx = createEffect(
  async ({ category, page = 1, tag = '', type = 'Blog' }: getPagesProps) => {
    const params: ParamsTypes = {
      filters: {
        category: {
          sysname: {
            $eq: category,
          },
        },
        type: {
          $eq: type,
        },
      },
      populate: ['img', 'tags'],
      sort: ['publishedAt:asc'],
      pagination: {
        page,
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

export const $pagesForCategoryPage = createStore<blogPageCard[]>([]);
export const $paginationData = createStore<any>({});
export const $currentCategory = createStore<Category | null>(null);

$pagesForCategoryPage.on(getPagesForCategoryFx.doneData, (_, data) => {
  return data.data.map((page: any) => ({
    ...page.attributes,
    id: page.id,
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
  fn: (params: any) => {
    const query = params?.query ? params?.query : {};
    return { category: 'knowledge', ...query };
  },
  target: [getPagesForCategoryFx, getCategoryInfoFx],
});

export const $categoryPageData = combine({
  loading: getPagesForCategoryFx.pending,
  data: $pagesForCategoryPage,
});
