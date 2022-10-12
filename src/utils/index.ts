import { MONTH_NAMES, MONTH_SHORT_NAMES, DAY_OF_WEEK_NAMES } from '@/utils/const';
import { LotteryCardItem, FaqType, Microdata, BreadcrumbsTypes } from '@/types/types';
import { ROUTES_NAME } from '@/utils/const/routesName';
import { NextRouter, useRouter } from 'next/router';

export const getShortDate = (date: string): string => {
  const currentDate = new Date(date);
  const month = MONTH_SHORT_NAMES[currentDate.getMonth()];
  const day = currentDate.getDate();
  return `${month} ${day}`;
};

export const getLotteryCardInfo = (data: LotteryCardItem[]): any => {
  let lotteryInfo: LotteryCardItem = {
    datecreated: '',
    datemodified: '',
    key: '',
    name: '',
    logo: '',
    date: '',
    maindraw: [],
    bonusorgrand: null,
    nextdraw: '',
    jackpot: '',
    tags: {},
    history: [],
  };

  data.forEach((dataItem: LotteryCardItem) => {
    const keysList = Object.keys(lotteryInfo);
    keysList.forEach(key => {
      switch (key) {
        case 'maindraw':
        case 'history': {
          if (lotteryInfo[key] && !lotteryInfo[key].length) {
            lotteryInfo[key] = dataItem[key];
          }
          break;
        }
        case 'tags': {
          const source = String(dataItem.source);
          const tag = dataItem.tag;
          if (source && tag) {
            lotteryInfo.tags[source] = tag;
          }
          break;
        }
        default: {
          if (!lotteryInfo[key as keyof LotteryCardItem]) {
            lotteryInfo = { ...lotteryInfo, [key]: dataItem[key as keyof LotteryCardItem] };
          }
          break;
        }
      }
    });
  });
  if (
    lotteryInfo.datemodified &&
    lotteryInfo.datecreated &&
    lotteryInfo.jackpot &&
    lotteryInfo.nextdraw &&
    lotteryInfo.maindraw.length &&
    lotteryInfo.date &&
    lotteryInfo.name
  ) {
    return lotteryInfo;
  }
  return null;
};

export const getDateForLottery = (date: string): string => {
  const currentDate = new Date(date);
  const month = MONTH_NAMES[currentDate.getMonth()];
  const day = currentDate.getDate();
  const year = currentDate.getFullYear();
  const dayOfWeek = DAY_OF_WEEK_NAMES[currentDate.getDay()];
  return `<b>${dayOfWeek}</b> | ${day} ${month} ${year}`;
};

export const getBreadcrumbList = (lastBreadcrumb?: BreadcrumbsTypes): BreadcrumbsTypes[] => {
  const router = useRouter();
  const routesList = router.asPath.split('/');
  routesList.shift();

  const convertBreadcrumb = (pathName: string) => {
    const str = pathName.replace(/-/g, ' ');
    return str[0].toUpperCase() + str.slice(1);
  };

  const breadcrumsCount = routesList.length;
  const breadcrumbList = routesList.map((path, index) => {
    const [formattedPath] = path.split('?');
    const pathName = ROUTES_NAME[formattedPath]
      ? ROUTES_NAME[formattedPath]
      : convertBreadcrumb(formattedPath);
    const breadcrumb = {
      breadcrumb: pathName,
      href: `/${routesList.slice(0, index + 1).join('/')}`,
      isLastElement: breadcrumsCount - 1 === index,
    };
    if (lastBreadcrumb && breadcrumb.href === lastBreadcrumb.href && lastBreadcrumb.breadcrumb) {
      return lastBreadcrumb;
    }
    return breadcrumb;
  });
  return breadcrumbList;
};

export const getJsonLd = (page: Microdata): any => {
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: page.title || page.h1,
    description: page.description || page.introduction,
    image: [page.img],
    datePublished: new Date(page?.publishedAt).toUTCString(),
    dateModified: new Date(page?.updatedAt).toUTCString(),
    author: [
      {
        '@type': 'Person',
        name: page.author?.name ? page.author.name : 'Oliver Campbell',
      },
    ],
  };
};

export const getFaqJsonLd = (faq: FaqType): any => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [],
  };
  const mainEntity: any[] = [];
  faq.faqItems.forEach(item => {
    mainEntity.push({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    });
  });
  return {
    ...schema,
    mainEntity,
  };
};

export const getBreadcrumbsJsonLd = (breadcrumbList: BreadcrumbsTypes[]): any => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [],
  };
  const itemListElement: any[] = [];
  breadcrumbList.forEach((breadcrumb, index) => {
    const item =
      index !== breadcrumbList.length - 1
        ? {
            '@type': 'ListItem',
            position: index + 1,
            name: breadcrumb.breadcrumb,
            item: breadcrumb.href,
          }
        : {
            '@type': 'ListItem',
            position: index + 1,
            name: breadcrumb.breadcrumb,
          };
    itemListElement.push(item);
  });
  return {
    ...schema,
    itemListElement,
  };
};

// export const getOpenGraph = (page: BlogPage): any[] => {
//
// }
