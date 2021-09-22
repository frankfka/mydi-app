import React from 'react';
import CenteredInfoContainer from './CenteredInfoContainer';
import { BoxProps, Typography } from '@mui/material';

type Props = Partial<BoxProps> & {
  title?: string;
  description?: string;
};

const ErrorInfoView: React.FC<Props> = ({ title, description, ...rest }) => {
  return (
    <CenteredInfoContainer {...rest}>
      <Typography variant="h4" paragraph>
        {title || 'Something Went Wrong'}
      </Typography>
      <Typography variant="subtitle1">
        {description || 'Please refresh the page and try again.'}
      </Typography>
    </CenteredInfoContainer>
  );
};

export default ErrorInfoView;
