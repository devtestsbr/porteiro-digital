import '@/styles/global.css';
import styles from '@/pages/index.module.css';
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useState } from 'react';

export default function MyApp({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <div className={styles.container}>
          <Head>
            <title>Digital Intercom</title>
            <link rel='icon' href='/favicon.ico' />
          </Head>

          <h1 className='text-2xl mt-4 font-extrabold'>Digital Intercom</h1>
          <main>
            <Component {...pageProps} />
          </main>

          <footer className={styles.footer}>
            <a
              href='http://github.com/Noriller/'
              target='_blank'
              rel='noopener noreferrer'
            >
              Bruno Noriller
            </a>
          </footer>
        </div>
      </Hydrate>
    </QueryClientProvider>
  );
}
