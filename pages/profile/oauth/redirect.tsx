import React from 'react';
import Head from 'next/head';
import OAuthRedirectPage from '../../../client/pages/OAuthPages/OAuthRedirectPage';

const OAuthRedirect = () => {
  return (
    <div>
      <Head>
        <title>Mydi</title>
      </Head>
      <OAuthRedirectPage />
    </div>
  );
};

export default OAuthRedirect;
