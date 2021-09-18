import React from 'react';
import { Paper, PaperProps } from '@mui/material';

const PaperSectionContainer: React.FC<PaperProps> = ({ children, ...rest }) => {
  return (
    <Paper
      sx={{
        padding: (theme) => theme.spacing(4, 4),
      }}
      {...rest}
    >
      {children}
    </Paper>
  );
};

export default PaperSectionContainer;
