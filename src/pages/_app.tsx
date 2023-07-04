import { ChakraProvider } from '@chakra-ui/react';
// import { Provider } from 'jotai';
import Head from 'next/head';
// import '../firebase/init';

import theme from '@/styles/theme';

import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Head>
        <title>ゆめみフロントエンド課題</title>
      </Head>
      <Component key={router.asPath} {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
