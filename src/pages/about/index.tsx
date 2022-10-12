import { NextPage } from 'next';
import { createGIP } from '@/models/shared';
import { getAboutPagesList, $aboutPages } from '@/models/about';
import { useStore } from 'effector-react/scope';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const About: NextPage = () => {
  const pages = useStore($aboutPages);
  const router = useRouter();

  useEffect(() => {
    if (pages.length) {
      const route = pages[0].link;
      router.push(route || '/');
    }
  }, []);

  return null;
};

About.getInitialProps = createGIP({
  pageEvent: getAboutPagesList,
});

export default About;
