import { NextPage } from 'next';
import { KnowledgePage } from '@/components';
import { createGSP } from '@/models/shared';
import { initNewsPage } from '@/models/newsPage';

const Knowledge: NextPage = () => {
  return <KnowledgePage />;
};

export const getStaticProps = createGSP({
  pageEvent: initNewsPage,
});

export default Knowledge;
