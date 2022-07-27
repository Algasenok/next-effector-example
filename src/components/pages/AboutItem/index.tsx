import styles from './AboutItem.module.scss';
import { useStore } from 'effector-react';
import { $singlePageData } from '@/models/singlePage';
import { NewsLayout } from '@/layouts/NewsLayout';

export function AboutItem() {
  const { data: post } = useStore($singlePageData);

  if (!Object.keys(post).length) {
    return null;
  }

  return (
    <NewsLayout
      title={post.category.name}
      description={post.category.description}
      place="news"
    >
      <div>{post.title}</div>
      <div className={styles.aboutPageItem}>{post.content}</div>
    </NewsLayout>
  );
}
