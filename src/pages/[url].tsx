import { NextPage } from 'next';
import { SinglePageItem } from '@/components';
import { createGIP } from '@/models/shared';
import { useStore } from 'effector-react/scope';
import { BlogPage, BreadcrumbsTypes } from '@/types/types';
import Head from 'next/head';
import ErrorPage from 'next/error';
import { $singlePageItem, getSinglePageItem } from '@/models/singlePage';
import { getBreadcrumbList, getBreadcrumbsJsonLd, getFaqJsonLd, getJsonLd } from '@/utils';
import { $breadcrumb } from '@/models/menu';

const SinglePage: NextPage = () => {
  const pageItem = useStore<BlogPage | null>($singlePageItem);
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
      <SinglePageItem pageItem={pageItem} />;
    </>
  );
};

SinglePage.getInitialProps = createGIP({
  pageEvent: getSinglePageItem,
});

export default SinglePage;
