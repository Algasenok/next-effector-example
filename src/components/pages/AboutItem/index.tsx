import styles from './AboutItem.module.scss';
import { NewsLayout } from '@/layouts/NewsLayout';
import { LinkProps, BlogPage } from '@/types/types';
import ReactHtmlParser from 'react-html-parser';
import { API_CRM_URL_DEV } from 'config';
import { PagePrevAndNextButton, Faq } from '@/components';
import cn from 'classnames';

interface Props {
  pageItem: BlogPage;
  pagesForCategory: LinkProps[];
}

export function AboutItem({ pageItem, pagesForCategory }: Props) {
  const post = pageItem;
  // TODO Убрать это после того как фотки будут храниться в яндекс клауде
  post.content = post.content.replace('/uploads/', `${API_CRM_URL_DEV}/uploads/`);

  const indexCurrentPost = pagesForCategory.findIndex((link: LinkProps) => link.link === post.url);
  const prevPage = indexCurrentPost >= 1 ? pagesForCategory[indexCurrentPost - 1] : null;
  const nextPage =
    indexCurrentPost < pagesForCategory.length - 1 && indexCurrentPost >= 0
      ? pagesForCategory[indexCurrentPost + 1]
      : null;

  return (
    <NewsLayout
      title={post.h1}
      description={post.introduction}
      categories={pagesForCategory}
      place="about"
    >
      <h1 className={styles.aboutPageItemTitle}>{post.h1}</h1>
      <div className={cn(styles.aboutPageItemContent, 'blogPage')}>
        {ReactHtmlParser(post.content)}
      </div>
      {post.faq && post.faq.faqItems ? <Faq data={post.faq} /> : null}
      <PagePrevAndNextButton prevPage={prevPage} nextPage={nextPage} />
    </NewsLayout>
  );
}
