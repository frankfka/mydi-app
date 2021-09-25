import React, { useState } from 'react';
import { OAuthRedirectResult } from '@magic-ext/oauth';
import {
  Alert,
  Box,
  Checkbox,
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
} from '../../../util/socialLogin/socialLoginUtils';
import SpacingContainer from '../../../components/SpacingContainer';
import { pick, pull } from 'lodash';
import { callUpsertSocialDataApi } from '../../../util/upsertSocialDataApi';
import { getLogger } from '../../../../util/logger';
import LoaderButton from '../../../components/LoaderButton';

type Props = {
  oAuthResult: OAuthRedirectResult;
  onPublishSuccess(): void;
};

const logger = getLogger('OAuthDataPublishFormContent');

/**
 * After the redirect, after valid data has been retrieved, we render
 * this form to allow users to choose the data they want to publish
 */
const OAuthDataPublishFormContent: React.FC<Props> = ({
  oAuthResult,
  onPublishSuccess,
}) => {
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishError, setPublishError] = useState(false);

  const socialLoginData = getSocialLoginData(oAuthResult);
  const provider: SupportedOAuthType = oAuthResult.oauth
    .provider as SupportedOAuthType;

  const allDataKeys = Object.keys(socialLoginData) as SocialLoginDataKey[];
  // Don't save keys that do not have data
  const [dataKeysToSave, setDataKeysToSave] = useState<SocialLoginDataKey[]>(
    allDataKeys.filter((key) => socialLoginData[key] != null)
  );

  const onPublishClicked = async () => {
    setIsPublishing(true);
    try {
      await callUpsertSocialDataApi(
        provider,
        pick(socialLoginData, dataKeysToSave)
      );
      setIsPublishing(false);
      onPublishSuccess();
    } catch (err) {
      setIsPublishing(false);
      setPublishError(true);
      logger.error('Error calling upsert social data', err);
    }
  };

  return (
    <SpacingContainer>
      {publishError && (
        <Alert severity="error" onClose={() => setPublishError(false)}>
          Something went wrong. Please try again.
        </Alert>
      )}
      <div>
        <Typography variant="h4">
          {oAuthTypeToDisplayName[provider]} Data
        </Typography>
        <Typography>
          Select the items that you would like to publish to your profile.
        </Typography>
      </div>
      {/*Editable list of retrieved data items*/}
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
                sx={{ padding: 2, paddingLeft: 0 }}
                secondaryAction={
                  <Checkbox
                    edge="end"
                    onChange={(e, checked) => onCheckboxChange(checked)}
                    checked={dataKeysToSave.includes(dataKey)}
                    // Disable if there's no data
                    disabled={socialLoginData[dataKey] == null}
                  />
                }
              >
                <ListItemText
                  primary={
                    <>
                      <strong>{displayableKeyName}:</strong>{' '}
                      {dataValue ?? <em>None</em>}
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
        <LoaderButton
          onClick={onPublishClicked}
          variant="contained"
          color="primary"
          progressProps={{
            color: 'primary',
          }}
          loading={isPublishing}
          disabled={dataKeysToSave.length === 0}
        >
          Publish Now
        </LoaderButton>
      </Box>
    </SpacingContainer>
  );
};

export default OAuthDataPublishFormContent;
