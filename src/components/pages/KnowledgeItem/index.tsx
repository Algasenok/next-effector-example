import styles from './KnowledgeItem.module.scss';
import { useStore } from 'effector-react';
import { NewsLayout } from '@/layouts/NewsLayout';
import { $singlePageData } from '@/models/singlePage';
import { LinkProps, SinglePage } from '@/types/types';

interface Props {
  singlePage: SinglePage | null;
  tags: LinkProps[];
}

export function KnowledgeItem({ singlePage, tags }: Props) {
  const post = singlePage;

  if (!post) {
    return <div />;
  }

  return (
    <NewsLayout
      title={post.category.name}
      description={post.category.description}
      categories={tags}
      place="news"
    >
      <div>{post.title}</div>
      <div className={styles.KnowledgeItem}>{post.content}</div>
    </NewsLayout>
  );
}
