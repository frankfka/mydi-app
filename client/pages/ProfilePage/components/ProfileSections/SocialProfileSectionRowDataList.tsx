import React from 'react';
import { ProfileSocialAccountMetadata } from '../../../../../util/profile/ProfileMetadata';
import { List, ListItem, ListItemText } from '@mui/material';
import { socialLoginDataToDisplayName } from '../../../../util/socialLogin/socialLoginUtils';
import { SocialLoginDataKey } from '../../../../../util/profile/socialLoginData';

type Props = {
  metadata: ProfileSocialAccountMetadata;
  onRefreshClicked(): void;
};

const SocialProfileSectionRowDataList: React.FC<Props> = ({
  metadata,
  onRefreshClicked,
}) => {
  const allDataKeys = Object.keys(metadata) as SocialLoginDataKey[];
  return (
    <List>
      {allDataKeys.map((dataKey) => {
        const displayableKeyName = socialLoginDataToDisplayName[dataKey];
        const dataValue = metadata[dataKey];
        return (
          <ListItem key={dataKey} disablePadding>
            <ListItemText
              primaryTypographyProps={{
                variant: 'body2',
              }}
              primary={
                <>
                  <strong>{displayableKeyName}:</strong>{' '}
                  {dataValue ?? <em>None</em>}
                </>
              }
            />
          </ListItem>
        );
      })}
    </List>
  );
};

export default SocialProfileSectionRowDataList;
