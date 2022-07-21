import {
  attach,
  combine,
  createEffect,
  createEvent,
  createStore,
  forward,
  restore,
  sample,
} from 'effector-next';
import { SinglePage } from '@/types/types';
import { API } from '@/api';

const $singlePage = createStore<any | null>(null);
const $urlCurrentPage = createStore<string>('');

const getSinglePageFx = createEffect(async (url: string) => {
  const { data } = await API.getSinglePageItem(url);
  return data.data[0];
});

export const getSinglePage = createEvent<string>();

$singlePage.on(getSinglePageFx.doneData, (_, data) => data);
$urlCurrentPage.on(getSinglePage, (store, url) => url);

// sample({
//   clock: getSinglePage,
//   source: $urlCurrentPage,
//   target: getSinglePageFx,
// });

// export const getPage = attach({
//   effect: getSinglePageFx,
//   mapParams: url => url,
// });

forward({
  from: getSinglePage.map(url => url),
  to: getSinglePageFx,
});

const $fetchGetSinglePageError = restore(getSinglePageFx.failData, null);

export const $pageData = combine({
  loading: getSinglePageFx.pending,
  data: $singlePage,
  error: $fetchGetSinglePageError,
});
