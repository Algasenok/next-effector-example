import { NextPage } from 'next';
import { createGIP, createGSP } from '@/models/shared';
import { getAboutPagesList, $aboutPages } from '@/models/about';
import { useStore } from 'effector-react/scope';
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

  return <></>;
};

// export const getStaticProps = createGSP({
//   pageEvent: getAboutPagesList,
// });

About.getInitialProps = createGIP({
  pageEvent: getAboutPagesList,
});

export default About;
