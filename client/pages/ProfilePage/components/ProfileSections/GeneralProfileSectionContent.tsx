import React from 'react';
import { ProfileGeneralMetadata } from '../../../../../util/profile/ProfileMetadata';
import { TextField } from '@mui/material';
import SpacingContainer from '../../../../components/SpacingContainer';
import { ProfileDataRecord } from '../../../../../util/profile/Profile';

type Props = {
  dataRecord: ProfileDataRecord<ProfileGeneralMetadata>;
};

const GeneralProfileSectionContent: React.FC<Props> = ({ dataRecord }) => {
  const metadata = dataRecord.data;
  return (
    <SpacingContainer>
      <TextField
        label="Name"
        InputProps={{
          readOnly: true,
        }}
        defaultValue={metadata.displayName}
      />
      <TextField
        label="Bio"
        InputProps={{
          readOnly: true,
        }}
        multiline
        fullWidth
        rows={3}
        defaultValue={metadata.description}
      />
    </SpacingContainer>
  );
};

export default GeneralProfileSectionContent;
