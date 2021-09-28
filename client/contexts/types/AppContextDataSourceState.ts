import { Wallet } from '../../../types/Wallet';
import { Profile } from '../../../util/profile/Profile';
import {
  ClientUpsertUserDataParams,
  CreateUserProfileParams,
} from './UserMutationParamTypes';
import { ProfileNamespace } from '../../../util/profile/profileNamespaces';

/*
Model for common state and functions that different adapters (Solana, Terra, etc.) must adhere to
 */
export default interface AppContextDataSourceState {
  isLoading: boolean;
  isError: boolean;
  connectedWallet?: Wallet;
  profile?: Profile;
  appAuthorityEnabled: boolean; // Whether our app is authorized to make profile changes
  nonExistentProfile: boolean; // Should prompt user to create a user
  /*
  Allowed functions
   */
  createUserProfile(params: CreateUserProfileParams): Promise<string>;
  refreshUserProfile(): Promise<void>;
  upsertUserData(params: ClientUpsertUserDataParams): Promise<string>; // For a specific namespace
  deleteUserData(namespace: ProfileNamespace): Promise<string | undefined>; // Undefined txn ID if there's no data to delete
  createAppAuthority(): Promise<string>; // Requests authorization for our app with "all" scope
  deleteAppAuthority(): Promise<string | undefined>;
}
