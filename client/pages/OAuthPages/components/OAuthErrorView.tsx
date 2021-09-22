import React from 'react';
import ErrorInfoView from '../../../components/ErrorInfoView';

const OAuthErrorView = () => {
  return (
    <ErrorInfoView description="Please try again by requesting social integration on the Profile page." />
  );
};

export default OAuthErrorView;
