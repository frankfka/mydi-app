import React, { useState } from 'react';
import {
  Alert,
  AlertProps,
  AlertTitle,
  Button,
  CircularProgress,
} from '@mui/material';
import { useAppContext } from '../../../contexts/AppContext';
import { getLogger } from '../../../../util/logger';

const logger = getLogger('ProfileNoAppAuthorityAlert');

const ProfileNoAppAuthorityAlert: React.FC<AlertProps> = (props) => {
  const appContext = useAppContext();
  const [loadingAuth, setIsLoadingAuth] = useState(false);

  const onAuthorizeClicked = async () => {
    if (loadingAuth) {
      logger.warn('Already loading auth request!');
      return;
    }
    setIsLoadingAuth(true);
    try {
      await appContext.solanaProfileState.createAppAuthority();
    } catch (err) {
      logger.warn('Error creating app authority', err);
      // TODO: Global error toasts?
    }
    setIsLoadingAuth(false);
  };

  return (
    <Alert
      severity="warning"
      action={
        <Button
          onClick={onAuthorizeClicked}
          color="primary"
          startIcon={
            loadingAuth ? (
              <CircularProgress color="inherit" size={10} />
            ) : undefined
          }
          disabled={loadingAuth}
        >
          Authorize
        </Button>
      }
      {...props}
    >
      <AlertTitle>Not Authorized</AlertTitle>
      We don&apos;t have access to modify your profile. This is required to
      enable verification and social integration.
    </Alert>
  );
};

export default ProfileNoAppAuthorityAlert;
