import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import { SolanaProfileContextProvider } from '../client/contexts/solana/SolanaAppContextDataSourceContext';
import { EmotionCache } from '@emotion/react';

import '../styles/global.css';
import { AppContextProvider } from '../client/contexts/AppContext';
import { AppThemeContextProvider } from '../client/contexts/views/AppThemeContext';
import { GlobalViewContextProvider } from '../client/contexts/views/GlobalViewContext';

// Dynamic import with disabled SSR to handle `window is undefined` errors
const SolanaWalletContextProvider = dynamic(
  () => import('../client/contexts/solana/SolanaWalletContext'),
  {
    ssr: false,
  }
);

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache, pageProps } = props;
  return (
    <AppThemeContextProvider emotionCache={emotionCache}>
      <GlobalViewContextProvider>
        <SolanaWalletContextProvider>
          <SolanaProfileContextProvider>
            <AppContextProvider>
              <Component {...pageProps} />
            </AppContextProvider>
          </SolanaProfileContextProvider>
        </SolanaWalletContextProvider>
      </GlobalViewContextProvider>
    </AppThemeContextProvider>
  );
}
