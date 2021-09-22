import { BoxProps, CircularProgress, Typography } from '@mui/material';
import React from 'react';
import CenteredInfoContainer from './CenteredInfoContainer';
import SpacingContainer from './SpacingContainer';

type Props = Partial<BoxProps> & {
  label?: string;
};

const LoadingView: React.FC<Props> = ({ label, ...rest }) => {
  let progressIndicator = <CircularProgress color="primary" />;
  if (!!label) {
    progressIndicator = (
      <SpacingContainer>
        {progressIndicator}
        <Typography variant="body1" color="primary">
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
