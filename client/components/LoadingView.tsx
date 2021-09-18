import { BoxProps, CircularProgress } from '@mui/material';
import React from 'react';
import CenteredInfoContainer from './CenteredInfoContainer';

type Props = Partial<BoxProps>;

const LoadingView: React.FC<Props> = (props) => {
  return (
    <CenteredInfoContainer {...props}>
      <CircularProgress color="primary" />
    </CenteredInfoContainer>
  );
};

export default LoadingView;
