import React from 'react';
import { Divider, List } from '@mui/material';
import { ProfileSocialDataRecords } from '../../../../../util/profile/Profile';
import { profileSocialNamespaces } from '../../../../../util/profile/profileNamespaces';
import SocialProfileSectionRow from './SocialProfileSectionRow';
import { useAppContext } from '../../../../contexts/AppContext';

type Props = {
  dataRecords: ProfileSocialDataRecords;
};

const SocialProfileSectionContent: React.FC<Props> = ({ dataRecords }) => {
  const appContext = useAppContext();
  const namespaceData = Object.values(profileSocialNamespaces);
  return (
    <List>
      {namespaceData.map((namespace, index) => {
        return (
          <div key={namespace}>
            <SocialProfileSectionRow
              namespace={namespace}
              dataRecord={dataRecords[namespace]}
              hasAppAuthority={appContext.appAuthorityEnabled}
            />
            {index < namespaceData.length - 1 && <Divider />}
          </div>
        );
      })}
    </List>
  );
};

export default SocialProfileSectionContent;
