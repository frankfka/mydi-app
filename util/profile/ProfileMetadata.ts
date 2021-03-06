import { SocialLoginData } from './socialLoginData';

/*
Expected metadata structures for different namespaces
 */

export type ProfileGeneralMetadata = {
  displayName?: string;
  description?: string;
  imageUri?: string;
};

export type ProfileCaptchaMetadata = {};

export type ProfileSocialAccountMetadata = SocialLoginData;
