import { combine, createEffect, createEvent, createStore, restore, sample } from 'effector';
import { BlogPage } from '@/types/types';
import { API } from '@/api';
import { API_CRM_URL_DEV } from 'config';
import { changeBreadcrumb, getCategoryTagsForBlogPage } from '@/models/menu';

export const $blogPage = createStore<BlogPage | null>(null);

const getblogPageFx = createEffect(async (url: string) => {
  const params = {
    populate: 'deep',
    filters: {
      url: {
        $eq: url,
      },
    },
  };
  // TODO Переписать этот кусок. Скорее всего я не мог получить автора из за populate -
  //  проблема решена и можно уложиться в один запрос
  const paramsAuthor = {
    populate: ['avatar'],
    filters: {
      blog_pages: {
        url: {
          $eq: url,
        },
      },
    },
  };
  const response = await Promise.all([
    API.getBlogPageItem(params),
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
    API.getBlogPageItem({ ...paramsAnother, ...paramsPrev }),
    API.getBlogPageItem({ ...paramsAnother, ...paramsNext }),
  ]);
  return {
    data: response[0].data.data[0],
    author: response[1].data.data[0],
    prevPage: response2[0].data.data[0],
    nextPage: response2[1].data.data[0],
  };
});

export const getBlogPageItem = createEvent();

$blogPage.on(getblogPageFx.doneData, (_, data) => {
  // TODO Исправить урл после того как картинки будут храниться в яндекс клауде
  if (data.data && data.data.attributes) {
    const formattedData = {
      ...data.data.attributes,
      id: data.data.id,
      img: `${API_CRM_URL_DEV}${data.data.attributes.img.data.attributes.url}`,
      tags: data.data.attributes.tags.data.map((tag: any) => ({ id: tag.id, ...tag.attributes })),
      category: {
        id: data.data.attributes.category.data.id,
        ...data.data.attributes.category.data.attributes,
      },
      url: `/${data.data.attributes.category.data.attributes.sysname}/${data.data.attributes.url}`,
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
  source: getBlogPageItem,
  fn: ({ params }: any) => params!.url,
  target: [getblogPageFx, getCategoryTagsForBlogPage],
});

const $fetchGetblogPageError = restore(getblogPageFx.failData, null);

export const $blogPageData = combine({
  loading: getblogPageFx.pending,
  data: $blogPage,
  error: $fetchGetblogPageError,
});
