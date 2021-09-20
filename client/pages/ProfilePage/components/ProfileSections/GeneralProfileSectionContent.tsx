import React from 'react';
import { ProfileGeneralMetadata } from '../../../../../types/ProfileMetadata';
import { TextField } from '@mui/material';
import SpacingContainer from '../../../../components/SpacingContainer';
import { ProfileDataRecord } from '../../../../../types/Profile';

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
