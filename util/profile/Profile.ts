import {
  ProfileCaptchaMetadata,
  ProfileGeneralMetadata,
  ProfileSocialAccountMetadata,
} from './ProfileMetadata';
import { ProfileSocialNamespace } from './profileNamespaces';

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

// All data records for general data
export type ProfileGeneralDataRecords = {
  // This is required
  general: ProfileDataRecord<ProfileGeneralMetadata>;
  // Optional properties
  captcha?: ProfileDataRecord<ProfileCaptchaMetadata>;
};

// All data records for social data
export type ProfileSocialDataRecords = {
  [k in ProfileSocialNamespace]?: ProfileDataRecord<ProfileSocialAccountMetadata>;
};

// All possible data records
export type ProfileDataRecords = ProfileGeneralDataRecords &
  ProfileSocialDataRecords;

// Typing for an authority
export type AuthorityProfileRecord = {
  scope: string;
  lastAuthorized: number;
};

/**
 * Represents a decoded user profile
 */
export type Profile = {
  authorities: Record<string, AuthorityProfileRecord>;
  data: ProfileDataRecords;
};
