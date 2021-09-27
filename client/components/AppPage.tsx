import React from 'react';
import { Box, BoxProps } from '@mui/material';
import NavBar, { NavBarProps } from './NavBar';

type Props = {
  hideNavBar?: boolean;
  navBarProps?: NavBarProps;
} & BoxProps;

const AppPage: React.FC<Props> = ({
  hideNavBar,
  navBarProps,
  children,
  ...rest
}) => {
  return (
    <div>
      {/*Nav Bar*/}
      {!hideNavBar && <NavBar {...navBarProps} />}
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
