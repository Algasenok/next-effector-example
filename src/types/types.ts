import { ReactNode } from 'react';

export interface BaseButtonsProps {
  children: ReactNode;
  href?: string;
  color?: string;
  size?: string;
  className?: string;
  onClickHandler?: (params: any) => void;
}

export interface BaseLinkProps {
  children: ReactNode;
  href: string | undefined;
  className?: string;
  needHover?: boolean;
  needArrow?: boolean;
  color?: string;
  onClickHandler?: (params: any) => void;
}

export interface LinkProps {
  text: string;
  link?: string;
  sysname?: string;
}

export interface HeaderMenu {
  name: string;
  links: LinkProps[];
}

export interface BreadcrumbsTypes {
  breadcrumb: string;
  href: string;
  isLastElement: boolean;
}

export interface Tab {
  name: string;
  sysname: string;
}

export interface BaseTitleProps {
  children: ReactNode;
  size?: string;
  className?: string;
}

export interface SupportCardProps {
  title: string;
  text: string;
  link: string;
}

export interface Tag {
  id?: number;
  tagName: string;
  sysname: string;
  link?: string;
}

export interface Category {
  name: string;
  introduction: string;
  title: string;
  description: string;
  sysname: string;
  tags: Tag[];
}

export interface Author {
  id: number;
  name: string;
  avatar: string;
}

interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

export interface FaqType {
  h2: string;
  faqItems: FaqItem[];
}

export interface BlogPage {
  id: number;
  title: string;
  url: string;
  description: string;
  h1: string;
  introduction: string;
  publishedAt: string;
  updatedAt: string;
  img: string;
  content: string;
  tags: Tag[];
  category: Category;
  author: Author;
  breadcrumbName: string;
  prevPage: string;
  nextPage: string;
  faq: FaqType;
}

export interface LotteryCountry {
  id: number;
  h1: string;
  url: string;
  introduction: string;
  publishedAt: string;
  updatedAt: string;
  regions: any;
}

export interface LotteryPage {
  id: number;
  title: string;
  url: string;
  description: string;
  h1: string;
  introduction: string;
  publishedAt: string;
  updatedAt: string;
  img: string;
  content: string;
  lotteryKey: string;
  lottery_country: LotteryCountry;
  faq: FaqType;
}

export interface LotteryRegionInfo {
  id: number;
  h1: string;
  url: string;
  content: string;
  source: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt: string;
  faq: FaqType;
}

export interface LotteryRegionPage {
  id: number;
  h1: string;
  introduction: string;
  url: string;
  region: LotteryRegionInfo;
  lottery_pages: any;
}

export interface blogPageCard {
  id: number;
  title: string;
  url: string;
  description: string;
  publishedAt: string;
  img: string;
  content: string;
  tags: Tag[];
  category: Category;
}

export interface LotteryCardItem {
  datecreated: string;
  datemodified: string;
  key: string;
  name: string;
  logo: string;
  date: string;
  maindraw: any[];
  bonusorgrand: number | null;
  nextdraw: string;
  jackpot: string;
  tags?: any;
  history: any[];
  tag?: number;
  source?: string;
}

export interface Microdata {
  title: string;
  description: string;
  h1: string;
  introduction: string;
  img?: string;
  publishedAt: string;
  updatedAt: string;
  author?: Author;
}

export interface MainPage {
  h1: string;
  introduction: string;
  title: string;
  description: string;
  content: string;
  lotteryKeys: string[];
  updatedAt: string;
  publishedAt: string;
}
