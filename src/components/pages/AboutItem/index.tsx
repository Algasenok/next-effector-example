import styles from './AboutItem.module.scss';
import { NewsLayout } from '@/layouts/NewsLayout';
import { LinkProps, SinglePage } from '@/types/types';

interface Props {
  pageItem: SinglePage | null;
  pagesForCategory: LinkProps[];
}

export function AboutItem({ pageItem, pagesForCategory }: Props) {
  const post = pageItem;

  if (!post) {
    return <div />;
  }
  return (
    <NewsLayout
      title={post.title}
      description={post.description}
      categories={pagesForCategory}
      place="about"
    >
      <div>{post.title}</div>
      <div className={styles.aboutPageItem}>{post.content}</div>
    </NewsLayout>
  );
}
