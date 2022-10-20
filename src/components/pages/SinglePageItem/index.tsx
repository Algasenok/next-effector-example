import styles from './SinglePageItem.module.scss';
import { BlogPage } from '@/types/types';
import ReactHtmlParser from 'react-html-parser';
import { Faq, NewsTopBanner, BaseWrapper } from '@/components';
import cn from 'classnames';
import { BaseLayout } from '@/layouts/BaseLayout';

interface Props {
  pageItem: BlogPage;
}

export function SinglePageItem({ pageItem }: Props) {
  const post = pageItem;

  return (
    <BaseLayout>
      <NewsTopBanner title={post.title} description={post.description} />
      <BaseWrapper type="layout">
        <h1 className={styles.aboutPageItemTitle}>{post.h1}</h1>
        <div className={cn(styles.aboutPageItemContent, 'blogPage')}>
          {ReactHtmlParser(post.content)}
        </div>
        {post.faq && post.faq.faqItems ? <Faq data={post.faq} /> : null}
      </BaseWrapper>
    </BaseLayout>
  );
}
