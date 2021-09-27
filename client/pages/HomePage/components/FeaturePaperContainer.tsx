import React from 'react';
import { Typography } from '@mui/material';
import SpacingContainer from '../../../components/SpacingContainer';
import PaperSectionContainer from '../../../components/PaperSectionContainer';

type Props = {
  title: string;
  description: string;
};

const FeaturePaperContainer: React.FC<Props> = ({ title, description }) => {
  return (
    <PaperSectionContainer>
      <SpacingContainer>
        <Typography variant="h4">{title}</Typography>
        <Typography variant="body1">{description}</Typography>
      </SpacingContainer>
    </PaperSectionContainer>
  );
};

export default FeaturePaperContainer;
