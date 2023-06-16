import Head from 'next/head';
import { ThemeProvider, StylesProvider } from '@material-ui/core/styles';
import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import Script from 'next/script';
import theme from '../style/muiTheme';
import '../style/index.css';
import { UserContextProvider } from 'contexts';
import { CronJob } from 'cron';

function App({ Component, pageProps }: AppProps) {
  new CronJob('5 * * * * *', async function () {
    console.log('GETTING!');
    const response = await fetch('/api/users/loguser', {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error('Error:', error));
    console.log('RESPONSE', response);
  });
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#342268" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-J3DKSV3EXD"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-J3DKSV3EXD');
        `}
      </Script>
      <StylesProvider injectFirst>
        <UserContextProvider>
          <ThemeProvider theme={theme}>
            <Component {...pageProps} />
          </ThemeProvider>
        </UserContextProvider>
      </StylesProvider>
    </>
  );
}

export default appWithTranslation(App);
