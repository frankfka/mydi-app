import React, { useState } from 'react';
import { ProfileSocialNamespace } from '../../../../../util/profile/profileNamespaces';
import { ProfileDataRecord } from '../../../../../util/profile/Profile';
import { ProfileSocialAccountMetadata } from '../../../../../util/profile/ProfileMetadata';
import {
  Avatar,
  Button,
  Collapse,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tooltip,
} from '@mui/material';
import { SocialIcon } from 'react-social-icons';
import { ExpandLess, ExpandMore, Sync as SyncIcon } from '@mui/icons-material';
import SocialProfileSectionRowDataList from './SocialProfileSectionRowDataList';
import {
  oAuthTypeToDisplayName,
  socialNamespaceToOauthType,
} from '../../../../util/socialLogin/socialLoginUtils';
import SpacingContainer from '../../../../components/SpacingContainer';

type Props = {
  namespace: ProfileSocialNamespace;
  // If undefined, then a record has not been created
  dataRecord?: ProfileDataRecord<ProfileSocialAccountMetadata>;
  hasAppAuthority?: boolean;
};

// Maps the namespace to the network name expected by `react-social-icons`
const socialNamespaceToNetworkName: Record<ProfileSocialNamespace, string> = {
  'social.github': 'github',
  'social.discord': 'discord',
};

// TODO: need to disable this if no app authroity
const SocialProfileSectionRow: React.FC<Props> = ({
  namespace,
  dataRecord,
  hasAppAuthority,
}) => {
  const oAuthType = socialNamespaceToOauthType[namespace];
  const namespaceDisplayName = oAuthTypeToDisplayName[oAuthType];

  const [openDetails, setOpenDetails] = useState(false);
  const onToggleOpenDetails = () => {
    setOpenDetails(!openDetails);
  };

  // Open the oAuth workflow in a new tab with the provider specified
  const openOAuthTab = () => {
    window.open(`/profile/oauth?type=${oAuthType}`, '_blank');
  };

  // Secondary action at the end of the row
  const secondaryAction =
    dataRecord != null ? (
      // Has data
      <SpacingContainer direction="row" alignItems="center">
        {/*Re-sync button*/}
        <Tooltip title="Reconnect to update data">
          <IconButton
            onClick={openOAuthTab}
            size="small"
            color="secondary"
            disabled={!hasAppAuthority}
          >
            <SyncIcon />
          </IconButton>
        </Tooltip>
        {/*Expand details button*/}
        <IconButton edge="end" onClick={onToggleOpenDetails} color="primary">
          {openDetails ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
      </SpacingContainer>
    ) : (
      // Prompt to connect
      <Button
        onClick={openOAuthTab}
        variant="outlined"
        disabled={!hasAppAuthority}
      >
        Connect
      </Button>
    );

  return (
    <div>
      <ListItem sx={{ padding: 2 }} secondaryAction={secondaryAction}>
        {/*Avatar*/}
        <ListItemAvatar>
          <Avatar>
            <SocialIcon
              network={socialNamespaceToNetworkName[namespace]}
              fgColor="#fff"
            />
          </Avatar>
        </ListItemAvatar>
        {/*Name*/}
        <ListItemText>{namespaceDisplayName}</ListItemText>
      </ListItem>
      {/*Collapsable section for namespace data*/}
      {dataRecord != null && (
        <Collapse
          in={openDetails}
          timeout="auto"
          unmountOnExit
          sx={{
            pl: 4,
          }}
        >
          <SocialProfileSectionRowDataList
            metadata={dataRecord.data}
            onRefreshClicked={openOAuthTab}
          />
        </Collapse>
      )}
    </div>
  );
};

export default SocialProfileSectionRow;
