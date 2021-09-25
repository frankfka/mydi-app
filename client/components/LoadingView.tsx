import { BoxProps, CircularProgress, Typography } from '@mui/material';
import React from 'react';
import CenteredInfoContainer from './CenteredInfoContainer';
import SpacingContainer from './SpacingContainer';

type Props = Partial<BoxProps> & {
  label?: string;
};

const LoadingView: React.FC<Props> = ({ label, ...rest }) => {
  let progressIndicator = <CircularProgress color="secondary" />;
  if (!!label) {
    progressIndicator = (
      <SpacingContainer>
        {progressIndicator}
        <Typography variant="body1" color="secondary">
          {label}
        </Typography>
      </SpacingContainer>
    );
  }

  return (
    <CenteredInfoContainer {...rest}>{progressIndicator}</CenteredInfoContainer>
  );
};

export default LoadingView;
