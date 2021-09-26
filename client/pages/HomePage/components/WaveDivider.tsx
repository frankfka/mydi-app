import WaveDividerSvg from '../assets/homepage_wave_divider.svg';

import React from 'react';
import Image from 'next/image';

const WaveDivider = () => {
  return <Image src={WaveDividerSvg} layout="responsive" alt="divider" />;
};

export default WaveDivider;
