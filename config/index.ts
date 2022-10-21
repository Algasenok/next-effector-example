export const CMS_URL =
  process.env.NODE_ENV === 'development'
    ? 'https://cms.lottery.stage.plat.agency'
    : 'https://cms.lottery.stage.plat.agency';

export const SPA_URL =
  process.env.NODE_ENV === 'development' ? 'https://spa.lottery.stage.plat.agency' : 'SPA_BASE_URL';

export const API_LOTTERY_URL = 'https://lotteryhub.bookieratings.net';
