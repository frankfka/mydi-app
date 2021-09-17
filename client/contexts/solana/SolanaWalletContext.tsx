import {
  ConnectionProvider,
  WalletProvider,
} from '@solana/wallet-adapter-react';
import { getPhantomWallet } from '@solana/wallet-adapter-wallets';
import { FC, useMemo } from 'react';
import { WalletDialogProvider } from '@solana/wallet-adapter-material-ui';
import { solanaNetworkEndpoint } from '../../../util/solana/solanaNetwork';

const SolanaWalletContextProvider: FC = ({ children }) => {
  const wallets = useMemo(
    () => [
      getPhantomWallet(),
      // NOTE: Only Phantom currently supports message signing, so disabling other wallets
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

  // TODO: Passing autoconnect here seems to put us in an infinite loop, can maybe pass autoConnect for prod builds
  // Also - Can have custom dialog props passed in here
  // https://github.com/solana-labs/wallet-adapter/blob/f99da7e088cf95643cf983ebac133cb9f7c4e46a/packages/ui/material-ui/src/WalletDialog.tsx#L85
  return (
    <ConnectionProvider endpoint={solanaNetworkEndpoint}>
      <WalletProvider wallets={wallets}>
        <WalletDialogProvider>{children}</WalletDialogProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default SolanaWalletContextProvider;
