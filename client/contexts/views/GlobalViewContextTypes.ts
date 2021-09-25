import { AlertProps } from '@mui/material';

export type SnackbarState = {
  type: AlertProps['severity'];
  message: string;
};
