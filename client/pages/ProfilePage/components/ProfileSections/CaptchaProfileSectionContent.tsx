import React, { useState } from 'react';
import SpacingContainer from '../../../../components/SpacingContainer';
import { Typography } from '@mui/material';
import { ProfileDataRecord } from '../../../../../util/profile/Profile';
import { ProfileCaptchaMetadata } from '../../../../../util/profile/ProfileMetadata';
import { solanaAppAuthorityKey } from '../../../../../util/solana/solanaProgramUtils';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CaptchaVerifyButton from './CaptchaVerifyButton';
import { useAppContext } from '../../../../contexts/AppContext';
import { callVerifyCaptchaApi } from '../../../../util/verifyCaptchaApi';

type Props = {
  dataRecord?: ProfileDataRecord<ProfileCaptchaMetadata>;
};

const CaptchaProfileSectionContent: React.FC<Props> = ({ dataRecord }) => {
  const isVerified =
    dataRecord != null &&
    dataRecord.authority === solanaAppAuthorityKey.toString();

  const appContext = useAppContext();

  // Captcha Verification
  const [isLoadingVerification, setIsLoadingVerification] = useState(false);
  const onCaptchaVerified = async (captchaToken: string) => {
    setIsLoadingVerification(true);
    await callVerifyCaptchaApi(captchaToken);
    setIsLoadingVerification(false);
    // Now reload profile
    appContext.refreshUserProfile();
  };

  const verificationContent = isVerified ? (
    // Inline icon with verified text
    <Typography
      sx={{
        color: (theme) => theme.palette.success.main,
      }}
    >
      <CheckCircleIcon
        fontSize="inherit"
        sx={{
          position: 'relative',
          top: 2,
        }}
      />
      &nbsp;Verified
    </Typography>
  ) : (
    // Verification button
    <CaptchaVerifyButton
      onCaptchaVerified={onCaptchaVerified}
      loading={isLoadingVerification}
      disabled={isLoadingVerification || !appContext.appAuthorityEnabled}
    />
  );

  return (
    <SpacingContainer
      direction="row"
      alignItems="center"
      justifyContent="space-between"
    >
      <Typography variant="h6">Human Verification</Typography>
      {verificationContent}
    </SpacingContainer>
  );
};

export default CaptchaProfileSectionContent;
