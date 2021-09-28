import Head from 'next/head';
import React from 'react';
import HomePage from '../client/pages/HomePage';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Mydi | Your Web3.0 Identity</title>
        <meta
          name="description"
          content="Mydi lets you create a public social profile for all of the decentralized web. We are currently live on Solana Devnet."
        />
      </Head>
      <HomePage />
    </div>
  );
}
