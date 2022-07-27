import { NextPage } from 'next';
import { createGSP } from '@/models/shared';
import { getAboutPagesList, $aboutPages } from '@/models/about';
import { useStore } from 'effector-react';
import Router from 'next/router';
import { useEffect } from 'react';

const About: NextPage = () => {
  const pages = useStore($aboutPages);

  useEffect(() => {
    if (pages.length) {
      const route = pages[0].link;
      Router.push(route || '/');
    }
  }, [pages]);

function AboutRG() {
  return (
    <NewsLayout>
      <div className={styles.aboutContainer}>
        Этой страницы вообще не будет - в middleware надо будет прописать редирект
      </div>
    </NewsLayout>
  );
}

export const getStaticProps = createGSP({
  pageEvent: getAboutPagesList,
});

export default About;
