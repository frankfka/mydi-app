import { CssBaseline, ThemeProvider } from '@mui/material';
import type { AppProps } from 'next/app';

import theme from '../client/theme/theme';
import dynamic from 'next/dynamic';
import { SolanaProfileContextProvider } from '../client/contexts/solana/SolanaProfileContext';
import { CacheProvider, EmotionCache } from '@emotion/react';
import createEmotionCache from '../client/theme/createEmotionCache';

import '../styles/global.css';
import { AppContextProvider } from '../client/contexts/AppContext';

// Dynamic import with disabled SSR to handle `window is undefined` errors
const SolanaWalletContextProvider = dynamic(
  () => import('../client/contexts/solana/SolanaWalletContext'),
  {
    ssr: false,
  }
);

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SolanaWalletContextProvider>
          <SolanaProfileContextProvider>
            <AppContextProvider>
              <Component {...pageProps} />
            </AppContextProvider>
          </SolanaProfileContextProvider>
        </SolanaWalletContextProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}
