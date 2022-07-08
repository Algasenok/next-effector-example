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
}

export interface breadcrumbsTypes {
  breadcrumb: string;
  href: string;
  isLastElement: boolean;
}

export interface tab {
  name: string;
  sysname: string;
  isActive: boolean;
}

export interface BaseTitleProps {
  children: ReactNode;
  size?: string;
  className?: string;
}
