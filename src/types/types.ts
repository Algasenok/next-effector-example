import { ReactNode } from 'react';
import { string } from 'prop-types';

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
  description: string;
  sysname: string;
  tags: Tag[];
}

export interface Author {
  id: number;
  name: string;
  avatar: string;
}

export interface SinglePage {
  id: number;
  title: string;
  url: string;
  description: string;
  publishedAt: string;
  img: string;
  content: string;
  tags: Tag[];
  category: Category;
  author: Author;
  prevPage: string;
  nextPage: string;
}

export interface LotteryCountry {
  id: number;
  title: string;
  url: string;
  description: string;
  publishedAt: string;
  region: any;
}

export interface LotteryPage {
  id: number;
  title: string;
  url: string;
  description: string;
  publishedAt: string;
  img: string;
  content: string;
  lotteryKey: string;
  lottery_country: LotteryCountry;
}

export interface LotteryRegionInfo {
  id: number;
  name: string;
  url: string;
  content: string;
  source: string;
}

export interface LotteryRegionPage {
  id: number;
  title: string;
  description: string;
  url: string;
  region: LotteryRegionInfo;
}

export interface SinglePageCard {
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
