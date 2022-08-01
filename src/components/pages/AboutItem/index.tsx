import styles from './AboutItem.module.scss';
import { NewsLayout } from '@/layouts/NewsLayout';
import { LinkProps, SinglePage } from '@/types/types';
import ReactHtmlParser from 'react-html-parser';
import { API_CRM_URL_DEV } from 'config';
import { PagePrevAndNextButton } from '@/components';
import cn from 'classnames';

interface Props {
  pageItem: SinglePage | null;
  pagesForCategory: LinkProps[];
}

export function AboutItem({ pageItem, pagesForCategory }: Props) {
  const post = pageItem;

  if (!post) {
    return <div />;
  }
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
      title={post.title}
      description={post.description}
      categories={pagesForCategory}
      place="about"
    >
      <h1 className={styles.aboutPageItemTitle}>{post.title}</h1>
      <div className={cn(styles.aboutPageItemContent, 'singlePage')}>
        {ReactHtmlParser(post.content)}
      </div>
      <PagePrevAndNextButton prevPage={prevPage} nextPage={nextPage} />
    </NewsLayout>
  );
}
