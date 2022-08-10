import styles from './KnowledgeItem.module.scss';
import { NewsLayout } from '@/layouts/NewsLayout';
import { LinkProps, SinglePage } from '@/types/types';
import ReactHtmlParser from 'react-html-parser';
import cn from 'classnames';
import { getShortDate } from '@/utils';
import { API_CRM_URL_DEV } from 'config';
import { useEffect, useState } from 'react';
import { PagePrevAndNextButton, PageSubheadings } from '@/components';

interface Props {
  singlePage: SinglePage | null;
  tags: LinkProps[];
}

export function KnowledgeItem({ singlePage, tags }: Props) {
  const post = singlePage;
  const [headingsList, setHeadingsList] = useState<any>([]);

  useEffect(() => {
    const headings = document.getElementsByTagName('H2');
    const list = Array.from(headings);
    setHeadingsList(list);
  }, []);

  const scrollToHeading = (element: any) => {
    element.scrollIntoView({ behavior: 'smooth' });
  };

  if (!post) {
    return <div />;
  }

  // TODO Убрать это после того как фотки будут храниться в яндекс клауде
  post.content = post.content.replace('/uploads/', `${API_CRM_URL_DEV}/uploads/`);

  return (
    <NewsLayout
      title={post.category.name}
      description={post.category.description}
      categories={tags}
      place="newsItem"
    >
      <h1 className={styles.knowledgeItemTitle}>{post.title}</h1>
      {Object.keys(post.author).length && (
        <div className={styles.knowledgeItemAuthorInfo}>
          <img
            src={post.author.avatar}
            alt={post.author.name}
            className={styles.knowledgeItemAuthorAvatar}
          />
          <div>
            <div className={styles.knowledgeItemAuthorName}>{post.author.name}</div>
            <div className={styles.knowledgeItemPageInfo}>
              <div className={styles.knowledgeItemDate}>
                <img src="/images/icons/time.svg" alt="" />
                {getShortDate(post.publishedAt)}
              </div>
              <div className={styles.knowledgeItemPageInfoDot} />
              <div className={styles.knowledgeItemReadTime}>
                {Math.ceil(post.content.length / 800)} min read
              </div>
            </div>
          </div>
        </div>
      )}
      <div className={styles.knowledgeItemHead}>
        <img src={post.img} alt="" className={styles.knowledgeItemTopImg} />
        {headingsList.length && (
          <PageSubheadings links={headingsList} onClickHandler={scrollToHeading} />
        )}
      </div>
      <div className={cn(styles.knowledgeItem, 'singlePage')}>{ReactHtmlParser(post.content)}</div>
      <div className={styles.knowledgeItemTags}>
        {post.tags.map(({ tagName }) => (
          <div key={`newsTag${tagName}`} className={styles.knowledgeItemTagItem}>
            {tagName}
          </div>
        ))}
      </div>
      <PagePrevAndNextButton
        prevPage={post.prevPage ? { text: 'Previous', link: post.prevPage } : null}
        nextPage={post.nextPage ? { text: 'Next', link: post.nextPage } : null}
      />
    </NewsLayout>
  );
}
