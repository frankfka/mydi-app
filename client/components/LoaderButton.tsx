import React from 'react';
import {
  Button,
  ButtonProps,
  CircularProgress,
  CircularProgressProps,
} from '@mui/material';

type Props = ButtonProps & {
  loading?: boolean;
  progressProps?: CircularProgressProps;
};

const LoaderButton: React.FC<Props> = ({
  loading,
  progressProps,
  disabled,
  ...rest
}) => {
  return (
    <Button
      startIcon={
        loading ? (
          <CircularProgress size={16} color="inherit" {...progressProps} />
        ) : undefined
      }
      disabled={loading || disabled}
      {...rest}
    />
  );
};

export default LoaderButton;
