import { CssBaseline, MuiThemeProvider } from '@material-ui/core';
import type { AppProps } from 'next/app';

import theme from '../client/theme/theme';
import dynamic from 'next/dynamic';
import { SolanaProfileContextProvider } from '../client/contexts/solana/SolanaProfileContext';

// Dynamic import with disabled SSR to handle `window is undefined` errors
const SolanaWalletContextProvider = dynamic(
  () => import('../client/contexts/solana/SolanaWalletContext'),
  {
    ssr: false,
  }
);

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <SolanaWalletContextProvider>
          <SolanaProfileContextProvider>
            <Component {...pageProps} />
          </SolanaProfileContextProvider>
        </SolanaWalletContextProvider>
      </MuiThemeProvider>
    </>
  );
}

export default App;
