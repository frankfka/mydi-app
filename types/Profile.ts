import { ProfileNamespace } from '../util/profile/profileNamespaces';
import {
  ProfileCaptchaMetadata,
  ProfileGeneralMetadata,
} from './ProfileMetadata';

/**
 * Represents all the data types for each namespace
 */
export type ProfileDataRecordTypes = {
  general: ProfileGeneralMetadata;
  captcha: ProfileCaptchaMetadata;
};

/**
 * A wrapper for a profile data record
 */
export type ProfileDataRecord<
  T extends ProfileDataRecordTypes[keyof ProfileDataRecordTypes]
> = {
  data: T;
  lastUpdated: number;
  authority: string;
  metadataUri: string;
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
  data: Partial<{
    [namespace in ProfileNamespace]: ProfileDataRecord<
      ProfileDataRecordTypes[namespace]
    >;
  }> & {
    // This is required
    general: ProfileDataRecord<ProfileGeneralMetadata>;
  };
};
