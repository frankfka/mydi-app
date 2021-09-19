import React from 'react';
import { Box, BoxProps } from '@mui/material';

const AppPage: React.FC<BoxProps> = ({ children, ...rest }) => {
  return (
    <div>
      {/*Nav Bar*/}
      {/*Main content*/}
      <Box
        {...rest}
        sx={{
          padding: (theme) => theme.spacing(12, 12),
        }}
      >
        {children}
      </Box>
    </div>
  );
};

export default AppPage;
