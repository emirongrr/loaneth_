import Head from 'next/head';
import { ThemeProvider, StylesProvider } from '@material-ui/core/styles';
import { appWithTranslation } from 'next-i18next';
import type { AppProps } from 'next/app';
import Script from 'next/script';
import theme from '../style/muiTheme';
import '../style/index.css';
import { UserContextProvider } from 'contexts';

import '@rainbow-me/rainbowkit/styles.css';
import {
  RainbowKitProvider,
  getDefaultWallets,
  connectorsForWallets,
} from '@rainbow-me/rainbowkit';
import {
  argentWallet,
  trustWallet,
  ledgerWallet,
} from '@rainbow-me/rainbowkit/wallets';
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  goerli,
} from 'wagmi/chains';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { publicProvider } from 'wagmi/providers/public';

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    mainnet,
    goerli,
    polygon,
    optimism,
    arbitrum,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [goerli] : []),
  ],
  [publicProvider()]
);

const projectId=process.env.WALLET_CONNECT_PROJECT_ID || "fe0cfc9ecda60398e5abfd83ef7bf18a"

const { wallets } = getDefaultWallets({
  appName: 'BIFROST',
  projectId,
  chains,
});

const AppInfo = {
  appName: 'BIFROST',
};

const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: 'Other',
    wallets: [
      argentWallet({ projectId, chains }),
      trustWallet({ projectId, chains }),
      ledgerWallet({ projectId, chains }),
    ],
  },
]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});



function App({ Component, pageProps }: AppProps) {
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
            <WagmiConfig config={wagmiConfig}>
              <RainbowKitProvider appInfo={AppInfo} chains={chains}>
                <Component {...pageProps} />
              </RainbowKitProvider>
            </WagmiConfig>
          </ThemeProvider>
        </UserContextProvider>
      </StylesProvider>
    </>
  );
}

export default appWithTranslation(App);
