import {
  ConnectionProvider,
  WalletProvider,
} from '@solana/wallet-adapter-react';
import { getPhantomWallet } from '@solana/wallet-adapter-wallets';
import { FC, useMemo } from 'react';
import { solanaNetworkEndpoint } from '../../../util/solana/solanaNetwork';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';

const SolanaWalletContextProvider: FC = ({ children }) => {
  const wallets = useMemo(
    () => [
      getPhantomWallet(),
      // TODO: Support other wallets
      // getSolflareWallet(),
      // getSlopeWallet(),
      // getTorusWallet({
      //   options: { clientId: 'Get a client ID @ https://developer.tor.us' },
      // }),
      // getLedgerWallet(),
      // getBloctoWallet({ network }),
      // getSolletWallet({ network }),
      // getSolletExtensionWallet({ network }),
    ],
    []
  );

  // TODO: Test this out
  // Passing autoconnect here seems to put us in an infinite loop, can maybe pass autoConnect for prod builds
  return (
    <ConnectionProvider endpoint={solanaNetworkEndpoint}>
      <WalletProvider
        wallets={wallets}
        autoConnect={process.env.NODE_ENV === 'production'}
      >
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default SolanaWalletContextProvider;
