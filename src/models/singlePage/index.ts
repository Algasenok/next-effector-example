import { combine, createEffect, createEvent, createStore, restore, sample } from 'effector';
import { SinglePage } from '@/types/types';
import { API } from '@/api';
import { StaticPageContext } from 'nextjs-effector';
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
  const { data } = await API.getSinglePageItem(params);
  return data.data[0];
});

export const getSinglePageItem = createEvent<StaticPageContext<{ url: string }>>();

$singlePage.on(getSinglePageFx.doneData, (_, data) => {
  const formattedData = {
    ...data.attributes,
    id: data.id,
    // TODO Убрать это после того как картинки будут храниться в яндекс клауде
    img: `${API_CRM_URL_DEV}${data.attributes.img.data.attributes.url}`,
    tags: data.attributes.tags.data.map((tag: any) => ({ id: tag.id, ...tag.attributes })),
    category: { id: data.attributes.category.data.id, ...data.attributes.category.data.attributes },
  };
  return formattedData;
});

sample({
  source: getSinglePageItem,
  fn: ({ params }) => params!.url,
  target: [getSinglePageFx, getCategoryTagsForSinglePage],
});

const $fetchGetSinglePageError = restore(getSinglePageFx.failData, null);

export const $singlePageData = combine({
  loading: getSinglePageFx.pending,
  data: $singlePage,
  error: $fetchGetSinglePageError,
});
