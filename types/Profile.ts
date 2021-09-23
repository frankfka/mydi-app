import {
  ProfileCaptchaMetadata,
  ProfileGeneralMetadata,
  ProfileSocialAccountMetadata,
} from './ProfileMetadata';
import { ProfileSocialNamespace } from '../util/profile/profileNamespaces';

/**
 * Represents all the data types for each namespace
 */
export type ProfileDataRecordTypes =
  | ProfileGeneralMetadata
  | ProfileCaptchaMetadata
  | ProfileSocialAccountMetadata;

/**
 * A wrapper for a profile data record
 */
export type ProfileDataRecord<T extends ProfileDataRecordTypes> = {
  data: T;
  lastUpdated: number;
  authority: string;
  metadataUri: string;
};

export type ProfileSocialDataRecords = {
  [k in ProfileSocialNamespace]?: ProfileDataRecord<ProfileSocialAccountMetadata>;
};

/**
 * Represents a decoded user profile
 */
export type Profile = {
  authorities: {
    [authority: string]: {
      scope: string;
      lastAuthorized: number;
    };
  };
  data: {
    // This is required
    general: ProfileDataRecord<ProfileGeneralMetadata>;
    // Optional properties
    captcha?: ProfileDataRecord<ProfileCaptchaMetadata>;
  } & ProfileSocialDataRecords;
};
