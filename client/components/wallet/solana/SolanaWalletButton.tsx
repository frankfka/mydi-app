import React, { useState } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useWalletModal, WalletIcon } from '@solana/wallet-adapter-react-ui';
import { Button, ButtonProps } from '@mui/material';

type Props = ButtonProps;

const SolanaWalletButton: React.FC<Props> = (props) => {
  const [isHovering, setIsHovering] = useState(false);
  const { publicKey, wallet, connect, disconnect, connecting, disconnecting } =
    useWallet();
  const { setVisible } = useWalletModal();

  const isLoading = connecting || disconnecting;

  // Button properties
  let buttonText = '';
  let onButtonClick = () => {};

  if (publicKey != null) {
    onButtonClick = disconnect;
    // Has connected wallet
    if (isHovering) {
      buttonText = 'Disconnect';
    } else {
      const pubkeyString = publicKey.toString();
      buttonText = `${pubkeyString.slice(0, 5)}…${pubkeyString.slice(-5)}`;
    }
  } else if (wallet) {
    // Has selected wallet - prompt to connect
    onButtonClick = connect;
    buttonText = 'Connect';
  } else if (isLoading) {
    buttonText = 'Loading';
  } else {
    buttonText = 'Select a Wallet';
    onButtonClick = () => setVisible(true);
  }

  return (
    <Button
      startIcon={
        wallet ? (
          <WalletIcon wallet={wallet} height={24} width={24} />
        ) : undefined
      }
      disabled={isLoading}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={onButtonClick}
      color="secondary"
      variant="contained"
      size="large"
      {...props}
    >
      {buttonText}
    </Button>
  );
};

export default SolanaWalletButton;
