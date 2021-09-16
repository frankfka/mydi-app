import { PublicKey } from '@solana/web3.js';

/*
TODO: Delets:
pub struct DeleteDataRecord<'info> {
    // The Program Derived account to store the record
    #[account(
        mut,
        close = user,
        seeds = [user.key.as_ref(), b"data".as_ref(), namespace.as_bytes()],
        bump = bump,
    )]
    pub data_record: ProgramAccount<'info, UserDataRecord>,
    // The user for whom the record is deleted
    #[account(mut, signer)]
    pub user: AccountInfo<'info>,
}

#[instruction(scope: String, bump: u8)]
pub struct DeleteAuthorityRecord<'info> {
    // The user removing the record
    #[account(mut, signer)]
    pub user: AccountInfo<'info>,
    // The PDA record to remove
    #[account(
        mut,
        close = user,
        seeds = [user.key.as_ref(), b"authorities".as_ref(), authority.key.as_ref(), scope.as_bytes()],
        bump = bump,
    )]
    pub authority_record: ProgramAccount<'info, UserAuthorityRecord>,
    // The authority for which the record is being removed
    pub authority: AccountInfo<'info>,
}

 */

/**
 * Identifies a PDA
 */
export type KeyAndBump = [PublicKey, number];

/*
Data
 */

export type GetProfileDataParams = {
  userKey: PublicKey;
  namespace: string;
};

export type CreateProfileDataParams = GetProfileDataParams & {
  authorityKey?: PublicKey;
  metadataUri: string;
};

export type DeleteProfileDataParams = Omit<
  CreateProfileDataParams,
  'metadataUri'
>;

export type ProfileData = {
  authority: PublicKey;
  lastUpdated: number;
  metadataUri: string;
};

/*
Authority
 */

export type GetProfileAuthorityParams = {
  userKey: PublicKey;
  authorityKey: PublicKey;
  scope: string; // TODO: Type known scopes
};

export type CreateProfileAuthorityParams = GetProfileAuthorityParams;

export type DeleteProfileAuthorityParams = GetProfileAuthorityParams;

export type ProfileAuthority = {
  lastAuthorized: number;
};
