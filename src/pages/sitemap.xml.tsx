import { GetServerSideProps } from 'next';
import { API } from '@/api';

const Sitemap = () => {
  return null;
};

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const { data } = await API.getSitemap();
  res.setHeader('Content-Type', 'text/xml');
  res.write(data.replace('<?xml-stylesheet type="text/xsl" href="xsl/sitemap.xsl"?>', ''));
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;
