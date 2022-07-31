import { ReactNode } from 'react';
import {string} from "prop-types";

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
  href: string;
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

export interface BreadcrumbsTypes {
  breadcrumb: string;
  href: string;
  isLastElement: boolean;
}

export interface Tab {
  name: string;
  sysname: string;
  isActive: boolean;
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
