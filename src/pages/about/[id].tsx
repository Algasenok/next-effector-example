import styles from './Index.module.scss';
import { NewsLayout } from '@/layouts/NewsLayout';
import { getSinglePage, getPage, $pageData } from '@/models/singlePage';
import { useEffect, useState } from 'react';
import { useStore } from 'effector-react';

// export async function getServerSideProps(context) {
//   //getSinglePage(context.query.id);
//   await getPage(context.query.id);
//
//   return {
//     props: {},
//   };
// }

import { withStart } from 'effector-next';

const enhance = withStart(getSinglePage('first-page'));

function AboutRG() {
  const { data: pageData } = useStore($pageData);
  const [content, setContent] = useState('');

  useEffect(() => {
    if (pageData) {
      setContent(pageData.attributes.content);
    }
  }, [pageData]);

  // const content = pageData.attributes.content;
  console.log('pageData', pageData);
  console.log('content', content);
  return (
    <NewsLayout>
      <div className={styles.aboutContainer}>{content}</div>
    </NewsLayout>
  );
}

export default enhance(AboutRG);
