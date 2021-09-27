import React from 'react';
import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import NextImage from 'next/image';
import NextLink from 'next/link';

import HeaderImage from './assets/homepage_header_img.svg';
import SpacingContainer from '../../components/SpacingContainer';
import WaveDivider from './components/WaveDivider';
import FeaturePaperContainer from './components/FeaturePaperContainer';

/**
 * Landing page
 */
const HomePage = () => {
  const theme = useTheme();
  const showHeaderImage = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <div>
      {/*CTA + Header*/}
      <Container>
        <Box
          sx={{
            minHeight: '60vh',
            padding: (theme) => theme.spacing(24, 12, 8, 12),
          }}
        >
          <Grid
            container
            spacing={4}
            alignItems="center"
            justifyContent="center"
          >
            <Grid item md={8}>
              <SpacingContainer>
                <Typography variant="h2">Craft Your Web3.0 Identity</Typography>
                <Typography variant="h6">
                  Mydi lets you create a public social profile for all of the
                  decentralized web.
                </Typography>
                <NextLink href="/profile" passHref>
                  <Button variant="contained" color="secondary" size="large">
                    Try it Now
                  </Button>
                </NextLink>
              </SpacingContainer>
            </Grid>
            {showHeaderImage && (
              <Grid item xs={4}>
                <NextImage src={HeaderImage} />
              </Grid>
            )}
          </Grid>
        </Box>
      </Container>
      {/*Divider with wave SVG*/}
      <WaveDivider />
      {/*Features container*/}
      <Box
        sx={{
          backgroundColor: (theme) => theme.palette.primary.dark,
          padding: (theme) => theme.spacing(14, 8),
        }}
      >
        <Container>
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            spacing={4}
            justifyContent="center"
            alignItems="stretch"
          >
            <FeaturePaperContainer
              title="One profile. Infinite applications."
              description="Use a common profile across all of Web 3.0. Your information is published onto the blockchain to be used by any dApp."
            />
            <FeaturePaperContainer
              title="You have complete power."
              description="Your data is owned by you and only you. Your wallet has complete control over what information you share on your profile."
            />
            <FeaturePaperContainer
              title="Your passport to the metaverse."
              description="Mydi's human authentication and social integration unlocks access to exclusive partner features, such as NFT whitelists."
            />
          </Stack>
        </Container>
      </Box>
    </div>
  );
};

export default HomePage;
