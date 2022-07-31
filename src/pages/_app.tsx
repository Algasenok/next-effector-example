import '@/styles/globals.scss';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import * as effectorReact from 'effector-react/scope'
import { withEffector } from 'nextjs-effector'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default withEffector(MyApp, { effectorReact });
