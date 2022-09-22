import { createEffect, createEvent, createStore, sample } from 'effector';
import { LinkProps, HeaderMenu, BreadcrumbsTypes } from '@/types/types';
import { API } from '@/api';

const getTagsForCurrentCategoryFx = createEffect(async (url: string) => {
  const params = {
    filters: {
      blog_pages: {
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

const getFooterMenuFx = createEffect(async () => {
  const { data } = await API.getFooterMenu();
  return data.data;
});

const getHeaderMenuFx = createEffect(async () => {
  const params = {
    populate: {
      menu_category: { populate: ['links'] },
    },
  };
  const { data } = await API.getHeaderMenu(params);
  return data.data;
});

export const $sidebarActiveTab = createStore<string>('');
export const $tagsListForCategory = createStore<LinkProps[]>([]);
export const $footerMenu = createStore<LinkProps[]>([]);
export const $headerMenu = createStore<HeaderMenu[]>([]);
export const $breadcrumb = createStore<BreadcrumbsTypes>({
  breadcrumb: '',
  href: '',
  isLastElement: true,
});

export const setSidebarActiveTab = createEvent<string>();
export const getCategoryTagsForBlogPage = createEvent<string>('');
export const getCategoryTags = createEvent<any>({});
export const getMenu = createEvent();
export const changeBreadcrumb = createEvent<BreadcrumbsTypes>();

$sidebarActiveTab.on(setSidebarActiveTab, (_, tabName) => tabName);

$tagsListForCategory.on(getTagsForCurrentCategoryFx.doneData, (_, data) => {
  return data.attributes.tags.data.map((tag: any) => ({
    id: tag.id,
    text: tag.attributes.tagName,
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

$footerMenu.on(getFooterMenuFx.doneData, (_, data) => data.attributes.link);
$headerMenu.on(getHeaderMenuFx.doneData, (_, data) => data?.attributes?.menu_category);

$breadcrumb.on(changeBreadcrumb, (_, data) => data);

sample({
  source: getCategoryTagsForBlogPage,
  fn: url => url,
  target: getTagsForCurrentCategoryFx,
});

sample({
  clock: getMenu,
  target: [getFooterMenuFx, getHeaderMenuFx],
});
