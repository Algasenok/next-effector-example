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
  href: string;
  className?: string;
  needHover?: boolean;
  needArrow?: boolean;
}

export interface LinkProps {
  text: string;
  link: string;
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
