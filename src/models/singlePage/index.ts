import { combine, createEffect, createEvent, createStore, restore, sample } from 'effector';
import { SinglePage } from '@/types/types';
import { API } from '@/api';
import { API_CRM_URL_DEV } from 'config';
import { getCategoryTagsForSinglePage } from '@/models/menu';

export const $singlePage = createStore<SinglePage | null>(null);

const getSinglePageFx = createEffect(async (url: string) => {
  const params = {
    filters: {
      url: {
        $eq: url,
      },
    },
  };
  const paramsAuthor = {
    populate: ['avatar'],
    filters: {
      single_pages: {
        url: {
          $eq: url,
        },
      },
    },
  };
  const response = await Promise.all([
    API.getSinglePageItem(params),
    API.getAuthorCurrentPage(paramsAuthor),
  ]);
  const paramsAnother = {
    fields: ['url'],
    populate: ['category'],
    filters: {
      category: {
        sysname: {
          $eq: response[0].data.data[0].attributes.category.data.attributes.sysname,
        },
      },
    },
    pagination: {
      page: 1,
      pageSize: 1,
    },
  };
  const paramsPrev = {
    filters: {
      publishedAt: {
        $lt: response[0].data.data[0].attributes.publishedAt,
      },
    },
    sort: ['publishedAt:desc'],
  };
  const paramsNext = {
    filters: {
      publishedAt: {
        $gt: response[0].data.data[0].attributes.publishedAt,
      },
    },
    sort: ['publishedAt:asc'],
  };
  const response2 = await Promise.all([
    API.getSinglePageItem({ ...paramsAnother, ...paramsPrev }),
    API.getSinglePageItem({ ...paramsAnother, ...paramsNext }),
  ]);
  return {
    data: response[0].data.data[0],
    author: response[1].data.data[0],
    prevPage: response2[0].data.data[0],
    nextPage: response2[1].data.data[0],
  };
});

export const getSinglePageItem = createEvent();

$singlePage.on(getSinglePageFx.doneData, (_, data) => {
  // TODO Исправить урл после того как картинки будут храниться в яндекс клауде
  const formattedData = {
    ...data.data.attributes,
    id: data.data.id,
    img: `${API_CRM_URL_DEV}${data.data.attributes.img.data.attributes.url}`,
    tags: data.data.attributes.tags.data.map((tag: any) => ({ id: tag.id, ...tag.attributes })),
    category: {
      id: data.data.attributes.category.data.id,
      ...data.data.attributes.category.data.attributes,
    },
    author:
      data.author?.id && data.author.attributes
        ? {
            id: data.author.id,
            ...data.author.attributes,
            avatar: `${API_CRM_URL_DEV}${data.author?.attributes.avatar.data.attributes.url}`,
          }
        : {},
    prevPage: data.prevPage?.attributes?.url
      ? `/${data.prevPage.attributes.category.data.attributes.sysname}/${data.prevPage.attributes.url}`
      : null,
    nextPage: data.nextPage?.attributes?.url
      ? `/${data.nextPage.attributes.category.data.attributes.sysname}/${data.nextPage.attributes.url}`
      : null,
  };
  return formattedData;
});

sample({
  source: getSinglePageItem,
  fn: ({ params }: any) => params!.url,
  target: [getSinglePageFx, getCategoryTagsForSinglePage],
});

const $fetchGetSinglePageError = restore(getSinglePageFx.failData, null);

export const $singlePageData = combine({
  loading: getSinglePageFx.pending,
  data: $singlePage,
  error: $fetchGetSinglePageError,
});
