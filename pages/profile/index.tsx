import Head from 'next/head';
import React from 'react';
import ProfilePage from '../../client/pages/ProfilePage';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Mydi | Profile</title>
      </Head>
      <ProfilePage />
    </div>
  );
}
