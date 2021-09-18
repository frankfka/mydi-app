import React from 'react';
import { Box, BoxProps, useMediaQuery, useTheme } from '@mui/material';

/*
Container for general help / error information. All items are centered
 */

type Props = {} & Partial<BoxProps>;

const CenteredInfoContainer: React.FC<Props> = ({ children, ...boxProps }) => {
  const theme = useTheme();
  const useLargePadding = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      width="100%"
      textAlign="center"
      px={useLargePadding ? 5 : 2}
      py={useLargePadding ? 15 : 5}
      {...boxProps}
    >
      {children}
    </Box>
  );
};

export default CenteredInfoContainer;
