import React from 'react';
import SpacingContainer from '../../../components/SpacingContainer';
import PaperSectionContainer from '../../../components/PaperSectionContainer';
import { Typography } from '@mui/material';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

const ConnectWalletContainer = () => {
  return (
    <PaperSectionContainer>
      <SpacingContainer justifyContent="center" alignItems="center">
        <Typography variant="h4">Manage Your Web3 Profile</Typography>
        <Typography variant="subtitle1">
          Connect your Solana wallet to get started. We currently only support
          Phantom wallet.
        </Typography>
        <WalletMultiButton />
      </SpacingContainer>
    </PaperSectionContainer>
  );
};

export default ConnectWalletContainer;
