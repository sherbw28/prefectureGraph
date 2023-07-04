import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return initialProps;
  }

  render() {
    return (
      <Html lang="ja" dir="ltr">
        <Head>
          <meta name="application-name" content="ゆめみフロントエンド課題" />
          <meta name="theme-color" content="#000" />
          <meta name="description" content="各都道府県の人口推移グラフの表示" />
          {/* <link rel="icon" sizes="192x192" href="/icon-192x192.png" /> */}
          <link rel="icon" href="/favicon.ico" />
          {/* <link rel="manifest" href="/manifest.json" /> */}
          {/* <link rel="manifest" href="/manifest.json" /> */}
          {/* <link rel="apple-touch-icon" href="/icon.png"></link> */}
          <meta name="theme-color" content="#000" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&family=Noto+Sans+JP:wght@300;400;500;600;700;800;900&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
