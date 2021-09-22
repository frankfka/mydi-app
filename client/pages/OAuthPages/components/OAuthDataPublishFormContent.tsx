import React, { useState } from 'react';
import { OAuthRedirectResult } from '@magic-ext/oauth';
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import { SocialLoginDataKey } from '../../../../util/profile/socialLoginData';
import {
  getSocialLoginData,
  oAuthTypeToDisplayName,
  socialLoginDataToDisplayName,
  SupportedOAuthType,
} from '../../../util/magicLogin/magicUtils';
import SpacingContainer from '../../../components/SpacingContainer';
import { pick, pull } from 'lodash';
import { callUpsertSocialDataApi } from '../../../util/upsertSocialDataApi';
import { getLogger } from '../../../../util/logger';

type Props = {
  oAuthResult: OAuthRedirectResult;
};

const logger = getLogger('OAuthDataPublishFormContent');

/**
 * After the redirect, after valid data has been retrieved, we render
 * this form to allow users to choose the data they want to publish
 */
const OAuthDataPublishFormContent: React.FC<Props> = ({ oAuthResult }) => {
  const [isPublishing, setIsPublishing] = useState(false);
  // TODO deal with these states
  const [publishSuccess, setPublishSuccess] = useState(false); // TODO maybe bring this out?
  const [publishError, setPublishError] = useState(false);

  const socialLoginData = getSocialLoginData(oAuthResult);
  const provider: SupportedOAuthType = oAuthResult.oauth
    .provider as SupportedOAuthType;

  const allDataKeys = Object.keys(socialLoginData) as SocialLoginDataKey[];
  const [dataKeysToSave, setDataKeysToSave] =
    useState<SocialLoginDataKey[]>(allDataKeys);

  const onPublishClicked = async () => {
    setIsPublishing(true);
    try {
      await callUpsertSocialDataApi(
        provider,
        pick(socialLoginData, dataKeysToSave)
      );
      setPublishSuccess(true);
    } catch (err) {
      setPublishError(true);
      logger.error('Error calling upsert social data', err);
    }
    setIsPublishing(false);
  };

  return (
    <SpacingContainer>
      <div>
        <Typography variant="h4">
          {oAuthTypeToDisplayName[provider]} Data
        </Typography>
        <Typography>
          Select the items that you would like to publish to your profile.
        </Typography>
      </div>
      {/*Editable ist of retrieved data items*/}
      <List>
        {allDataKeys.map((dataKey, index) => {
          const displayableKeyName = socialLoginDataToDisplayName[dataKey];
          const dataValue = socialLoginData[dataKey];
          const onCheckboxChange = (isChecked: boolean) => {
            if (isChecked) {
              setDataKeysToSave([...dataKeysToSave, dataKey]);
            } else {
              setDataKeysToSave([...pull(dataKeysToSave, dataKey)]);
            }
          };

          return (
            <div key={dataKey}>
              <ListItem
                sx={{ padding: 2 }}
                secondaryAction={
                  <Checkbox
                    edge="end"
                    onChange={(e, checked) => onCheckboxChange(checked)}
                    checked={dataKeysToSave.includes(dataKey)}
                  />
                }
              >
                <ListItemText
                  primary={
                    <>
                      <strong>{displayableKeyName}:</strong>{' '}
                      {dataValue ?? 'None'}
                    </>
                  }
                />
              </ListItem>
              {index < allDataKeys.length - 1 && <Divider />}
            </div>
          );
        })}
      </List>
      <Box
        sx={{
          textAlign: 'center',
        }}
      >
        <Button
          onClick={onPublishClicked}
          variant="contained"
          color="primary"
          startIcon={
            isPublishing ? (
              <CircularProgress color="primary" size={16} />
            ) : undefined
          }
          disabled={isPublishing || dataKeysToSave.length === 0}
        >
          Publish Now
        </Button>
      </Box>
    </SpacingContainer>
  );
};

export default OAuthDataPublishFormContent;
