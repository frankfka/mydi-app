import React from 'react';
import NextImage, { ImageProps } from 'next/image';
import Logo from '/public/logo.svg';

const AppLogo: React.FC<Omit<ImageProps, 'src'>> = (props) => {
  return <NextImage src={Logo} {...props} />;
};

export default AppLogo;
