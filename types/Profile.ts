import { ProfileNamespace } from '../util/profile/profileNamespaces';

export type ProfileDataRecord<T> = {
  data: any;
  lastUpdated: number;
  authority: string;
};

/**
 * TODO: better typing
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
    general: ProfileDataRecord<any>;
  } & Partial<{
    [namespace in ProfileNamespace]: ProfileDataRecord<any>;
  }>;
};
