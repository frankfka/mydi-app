import React from 'react';
import AppLogo from './AppLogo';
import { AppBar, Box, Button, Toolbar } from '@mui/material';
import SpacingContainer from './SpacingContainer';

import NextLink from 'next/link';
import { AppBarProps } from '@mui/material/AppBar/AppBar';
import ColorModeToggle from './ColorModeToggle';
import { useRouter } from 'next/router';

export type NavBarProps = AppBarProps;

const NavBar: React.FC<NavBarProps> = (props) => {
  const router = useRouter();

  const isOnProfilePage = router.pathname.startsWith('/profile');

  return (
    <>
      <AppBar
        position="fixed"
        color="inherit"
        {...props}
        sx={{
          padding: (theme) => theme.spacing(0, 4),
        }}
      >
        <Toolbar>
          <SpacingContainer
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            {/*Logo*/}
            <Box sx={{ cursor: 'pointer ' }}>
              <NextLink href="/" passHref>
                <AppLogo height={50} width={50} />
              </NextLink>
            </Box>

            {/*Nav*/}
            <SpacingContainer
              direction="row"
              justifyContent="end"
              alignItems="center"
              spacing={4}
            >
              <NextLink href="/profile" passHref>
                <Button
                  variant="outlined"
                  color={isOnProfilePage ? 'secondary' : 'inherit'}
                >
                  Your Profile
                </Button>
              </NextLink>
              <ColorModeToggle />
            </SpacingContainer>
          </SpacingContainer>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
};

export default NavBar;
