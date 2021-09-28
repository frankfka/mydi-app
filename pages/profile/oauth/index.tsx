import React from 'react';
import Head from 'next/head';
import OAuthEntrypointPage from '../../../client/pages/OAuthPages/OAuthEntrypointPage';

const SocialOAuthEntry = () => {
  return (
    <div>
      <Head>
        <title>Mydi | Connect Social Account</title>
      </Head>
      <OAuthEntrypointPage />
    </div>
  );
};

export default SocialOAuthEntry;
