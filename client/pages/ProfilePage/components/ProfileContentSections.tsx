import React from 'react';
import { Profile } from '../../../../util/profile/Profile';
import GeneralProfileSectionContent from './ProfileSections/GeneralProfileSectionContent';
import PaperSectionContainer from '../../../components/PaperSectionContainer';
import { Typography } from '@mui/material';
import SpacingContainer from '../../../components/SpacingContainer';
import CaptchaProfileSectionContent from './ProfileSections/CaptchaProfileSectionContent';
import SocialProfileSectionContent from './ProfileSections/SocialProfileSectionContent';
import { pick } from 'lodash';

type Props = {
  profile: Profile;
};

/**
 * Wrapper component to create a paper section
 */
const ProfileSection: React.FC<{ title?: string }> = ({ title, children }) => {
  return (
    <PaperSectionContainer>
      <SpacingContainer>
        {title && (
          <Typography variant="h4" paragraph>
            {title}
          </Typography>
        )}
        {children}
      </SpacingContainer>
    </PaperSectionContainer>
  );
};

/**
 * Main content sections - we pass profile here to ensure that we have
 * a valid profile to render, but we still use the AppContext for all actions
 */
const ProfileContentSections: React.FC<Props> = ({ profile }) => {
  return (
    <SpacingContainer spacing={4}>
      <ProfileSection title="General">
        <GeneralProfileSectionContent dataRecord={profile.data.general} />
      </ProfileSection>
      <ProfileSection>
        <CaptchaProfileSectionContent dataRecord={profile.data.captcha} />
      </ProfileSection>
      <ProfileSection title="Social">
        <SocialProfileSectionContent
          dataRecords={pick(profile.data, 'social.discord', 'social.github')}
        />
      </ProfileSection>
    </SpacingContainer>
  );
};

export default ProfileContentSections;
