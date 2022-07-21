import styles from './Index.module.scss';
import { NewsLayout } from '@/layouts/NewsLayout';

export async function getServerSideProps() {
  console.log('aboutPageGet');

  return {
    props: {},
  };
}

function AboutRG() {
  return (
    <NewsLayout>
      <div className={styles.aboutContainer}>
        Этой страницы вообще не будет - в middleware надо будет прописать редирект
      </div>
    </NewsLayout>
  );
}

export default AboutRG;
