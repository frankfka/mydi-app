import React from 'react';
import { Divider, List } from '@mui/material';
import { ProfileSocialDataRecords } from '../../../../../types/Profile';
import {
  ProfileSocialNamespace,
  profileSocialNamespaces,
} from '../../../../../util/profile/profileNamespaces';
import SocialProfileSectionRow from './SocialProfileSectionRow';

type Props = {
  dataRecords: ProfileSocialDataRecords;
};

const socialNamespaceToNetworkName: Record<ProfileSocialNamespace, string> = {
  'social.github': 'github',
  'social.discord': 'discord',
};

const SocialProfileSectionContent: React.FC<Props> = ({ dataRecords }) => {
  return (
    <List>
      {Object.values(profileSocialNamespaces).map((namespace) => {
        return (
          <div key={namespace}>
            <SocialProfileSectionRow
              namespace={namespace}
              dataRecord={dataRecords[namespace]}
            />
            <Divider />
          </div>
        );
      })}
    </List>
  );
};

export default SocialProfileSectionContent;
