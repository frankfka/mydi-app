import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import SpacingContainer from '../../../components/SpacingContainer';
import { WalletMultiButton } from '@solana/wallet-adapter-material-ui';
import PaperSectionContainer from '../../../components/PaperSectionContainer';

const useStyles = makeStyles((theme) => ({}));

const ConnectWalletContainer = () => {
  const classes = useStyles();

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
