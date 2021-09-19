import React from 'react';
import CenteredInfoContainer from './CenteredInfoContainer';
import { BoxProps, Typography } from '@mui/material';

type Props = Partial<BoxProps>;

const GenericErrorView: React.FC<Props> = (props) => {
  return (
    <CenteredInfoContainer {...props}>
      <Typography variant="h4" paragraph>
        Something went wrong.
      </Typography>
      <Typography variant="subtitle1">
        Please refresh the page and try again.
      </Typography>
    </CenteredInfoContainer>
  );
};

export default GenericErrorView;
