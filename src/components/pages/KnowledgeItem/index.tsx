import styles from './KnowledgeItem.module.scss';
import { useStore } from 'effector-react';
import { NewsLayout } from '@/layouts/NewsLayout';
import { $singlePageData } from '@/models/singlePage';

export function KnowledgeItem() {
  const { data: post } = useStore($singlePageData);

  if (!Object.keys(post)) {
    return null;
  }

  return (
    <NewsLayout title={post.category.name} description={post.category.description} place="news">
      <div>{post.title}</div>
      <div className={styles.KnowledgeItem}>{post.content}</div>
    </NewsLayout>
  );
}
