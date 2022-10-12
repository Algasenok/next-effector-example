import { NextPage } from 'next';
import Head from 'next/head';
import { KnowledgeItem } from '@/components';
import { createGIP } from '@/models/shared';
import { getBlogPageItem, $blogPage } from '@/models/blogPage';
import { LinkProps, BlogPage, BreadcrumbsTypes } from '@/types/types';
import { useStore } from 'effector-react/scope';
import { $breadcrumb, $tagsListForCategory } from '@/models/menu';
import ErrorPage from 'next/error';
import { getJsonLd, getFaqJsonLd, getBreadcrumbsJsonLd, getBreadcrumbList } from '@/utils';

const KnowledgeItemPage: NextPage = () => {
  const blogPage = useStore<BlogPage | null>($blogPage);
  const tags = useStore<LinkProps[]>($tagsListForCategory);
  const lastBreadcrumb = useStore<BreadcrumbsTypes>($breadcrumb);

  if (!blogPage) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <>
      <Head>
        <title>{blogPage?.title}</title>
        <meta name="description" content={blogPage?.description} />
        <meta httpEquiv="Last-Modified" content={new Date(blogPage?.updatedAt).toUTCString()} />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(getJsonLd(blogPage)) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getBreadcrumbsJsonLd(getBreadcrumbList(lastBreadcrumb))),
          }}
        />
        {blogPage.faq ? (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(getFaqJsonLd(blogPage.faq)) }}
          />
        ) : null}
      </Head>
      <KnowledgeItem blogPage={blogPage} tags={tags} />
    </>
  );
};

KnowledgeItemPage.getInitialProps = createGIP({
  pageEvent: getBlogPageItem,
});

export default KnowledgeItemPage;
