import React, { useState } from 'react';
import { Alert, AlertProps, AlertTitle } from '@mui/material';
import { useAppContext } from '../../../contexts/AppContext';
import { getLogger } from '../../../../util/logger';
import LoaderButton from '../../../components/LoaderButton';

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
        <LoaderButton
          onClick={onAuthorizeClicked}
          color="secondary"
          loading={loadingAuth}
          progressProps={{
            size: 10,
          }}
        >
          Authorize
        </LoaderButton>
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
