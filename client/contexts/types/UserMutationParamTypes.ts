import { ProfileGeneralMetadata } from '../../../util/profile/ProfileMetadata';
import { ProfileNamespace } from '../../../util/profile/profileNamespaces';

export type CreateUserProfileParams = ProfileGeneralMetadata & {
  createAppAuthority: boolean; // Whether to add instruction to also create an authorization for our app
};

export type ClientUpsertUserDataParams = {
  data: any;
  namespace: ProfileNamespace;
};
