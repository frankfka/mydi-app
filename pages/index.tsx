import Head from 'next/head';
import React from 'react';
import HomePage from '../client/pages/HomePage';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Mydi</title>
      </Head>
      <HomePage />
    </div>
  );
}
