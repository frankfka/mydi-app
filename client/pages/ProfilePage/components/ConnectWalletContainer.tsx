import React from 'react';
import { Typography } from '@mui/material';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import CenteredInfoContainer from '../../../components/CenteredInfoContainer';
import SpacingContainer from '../../../components/SpacingContainer';

const ConnectWalletContainer = () => {
  return (
    <CenteredInfoContainer>
      <SpacingContainer justifyContent="center" alignItems="center">
        <Typography variant="h4">Manage Your Web3 Profile</Typography>
        <Typography variant="subtitle1">
          Connect your Solana wallet to get started. We currently only support
          Phantom wallet.
        </Typography>
        <WalletMultiButton />
      </SpacingContainer>
    </CenteredInfoContainer>
  );
};

export default ConnectWalletContainer;
