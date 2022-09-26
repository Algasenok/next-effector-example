import { NextPage } from 'next';
import { AboutItem } from '@/components';
import { createGIP } from '@/models/shared';
import { getAboutPageItem, $aboutPageItem, $aboutPages } from '@/models/about';
import { useStore } from 'effector-react/scope';
import { LinkProps, BlogPage, BreadcrumbsTypes } from '@/types/types';
import Head from 'next/head';
import ErrorPage from 'next/error';
import { getBreadcrumbList, getBreadcrumbsJsonLd, getFaqJsonLd, getJsonLd } from '@/utils';
import { $breadcrumb } from '@/models/menu';

const AboutRG: NextPage = () => {
  const pageItem = useStore<BlogPage | null>($aboutPageItem);
  const pagesForCategory = useStore<LinkProps[]>($aboutPages);
  const lastBreadcrumb = useStore<BreadcrumbsTypes>($breadcrumb);

  if (!pageItem) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <>
      <Head>
        <title>{pageItem?.title}</title>
        <meta name="description" content={pageItem?.description} />
        <meta httpEquiv="Last-Modified" content={new Date(pageItem?.updatedAt).toUTCString()} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(getJsonLd(pageItem)) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getBreadcrumbsJsonLd(getBreadcrumbList(lastBreadcrumb))),
          }}
        />
        {pageItem.faq ? (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(getFaqJsonLd(pageItem.faq)) }}
          />
        ) : null}
      </Head>
      <AboutItem pageItem={pageItem} pagesForCategory={pagesForCategory} />;
    </>
  );
};

AboutRG.getInitialProps = createGIP({
  pageEvent: getAboutPageItem,
});

export default AboutRG;
