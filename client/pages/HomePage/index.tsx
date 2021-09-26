import React from 'react';
import { Box, Button, Container, Grid, Stack, Typography } from '@mui/material';
import NextImage from 'next/image';

import HeaderImage from './assets/homepage_header_img.svg';
import SpacingContainer from '../../components/SpacingContainer';
import WaveDivider from './components/WaveDivider';

/**
 * Landing page
 */
const HomePage = () => {
  return (
    <div>
      {/*CTA + Header*/}
      <Container>
        <Grid
          container
          sx={{ minHeight: '60vh', padding: 8, paddingBottom: 0 }}
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
              <Button variant="contained" color="secondary" size="large">
                Try it Now
              </Button>
            </SpacingContainer>
          </Grid>
          <Grid item md={4}>
            <NextImage src={HeaderImage} />
          </Grid>
        </Grid>
      </Container>
      <WaveDivider />
      <Box sx={{ backgroundColor: (theme) => theme.palette.primary.dark }}>
        <Container>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 1, sm: 2, md: 4 }}
            justifyContent="center"
            alignItems="center"
          >
            <Typography>Item 1</Typography>
            <Typography>Item 2</Typography>
            <Typography>Item 3</Typography>
          </Stack>
        </Container>
      </Box>
    </div>
  );
};

export default HomePage;
