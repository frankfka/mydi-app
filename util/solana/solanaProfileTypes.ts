import { PublicKey } from '@solana/web3.js';
import { AuthorityScope, ProfileNamespace } from '../profile/profileNamespaces';
import { BN } from '@project-serum/anchor';

/**
 * Identifies a PDA
 */
export type KeyAndBump = [PublicKey, number];

/*
Data
 */

export type GetProfileDataParams = {
  userKey: PublicKey;
  namespace: ProfileNamespace;
};

export type CreateProfileDataParams = GetProfileDataParams & {
  authorityKey?: PublicKey;
  metadataUri: string;
};

export type UpdateProfileDataParams = CreateProfileDataParams;

export type DeleteProfileDataParams = Omit<
  CreateProfileDataParams,
  'metadataUri'
>;

export type SolanaProfileData = {
  authority: PublicKey;
  lastUpdated: BN;
  metadataUri: string;
};

/*
Authority
 */

export type GetProfileAuthorityParams = {
  userKey: PublicKey;
  authorityKey: PublicKey;
  scope: AuthorityScope;
};

export type CreateProfileAuthorityParams = GetProfileAuthorityParams;

export type DeleteProfileAuthorityParams = GetProfileAuthorityParams;

export type ProfileAuthority = {
  lastAuthorized: BN;
};
