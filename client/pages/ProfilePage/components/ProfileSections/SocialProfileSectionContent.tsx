import React from 'react';
import { Divider, List } from '@mui/material';
import { ProfileSocialDataRecords } from '../../../../../types/Profile';
import { profileSocialNamespaces } from '../../../../../util/profile/profileNamespaces';
import SocialProfileSectionRow from './SocialProfileSectionRow';

type Props = {
  dataRecords: ProfileSocialDataRecords;
};

const SocialProfileSectionContent: React.FC<Props> = ({ dataRecords }) => {
  const namespaceData = Object.values(profileSocialNamespaces);
  return (
    <List>
      {namespaceData.map((namespace, index) => {
        return (
          <div key={namespace}>
            <SocialProfileSectionRow
              namespace={namespace}
              dataRecord={dataRecords[namespace]}
            />
            {index < namespaceData.length - 1 && <Divider />}
          </div>
        );
      })}
    </List>
  );
};

export default SocialProfileSectionContent;
