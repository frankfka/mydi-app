import React from 'react';
import ProfileOnboardingWizard from './ProfileOnboarding/ProfileOnboardingWizard';
import {
  Dialog,
  DialogContent,
  DialogProps,
  useMediaQuery,
  useTheme,
} from '@mui/material';

type Props = {
  onDoneOnboardingClicked(): void;
} & DialogProps;

const ProfileOnboardingDialog: React.FC<Props> = ({
  onDoneOnboardingClicked,
  ...rest
}) => {
  const theme = useTheme();
  // TODO: Close button when mobile
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Dialog {...rest} fullWidth maxWidth="sm" fullScreen={fullScreen}>
      <DialogContent
        sx={{
          padding: (theme) => theme.spacing(8),
        }}
      >
        <ProfileOnboardingWizard
          onDoneOnboardingClicked={onDoneOnboardingClicked}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ProfileOnboardingDialog;
