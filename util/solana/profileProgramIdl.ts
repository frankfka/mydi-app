import { Idl } from '@project-serum/anchor';

export const profileProgramIdl: Idl = {
  version: '0.0.0',
  name: 'one_profile',
  instructions: [
    {
      name: 'createDataRecord',
      accounts: [
        {
          name: 'dataRecord',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'user',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'authority',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'authorityRecord',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'metadataUri',
          type: 'string',
        },
        {
          name: 'namespace',
          type: 'string',
        },
        {
          name: 'bump',
          type: 'u8',
        },
      ],
    },
    {
      name: 'updateDataRecord',
      accounts: [
        {
          name: 'dataRecord',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'user',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'authority',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'authorityRecord',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'metadataUri',
          type: 'string',
        },
        {
          name: 'namespace',
          type: 'string',
        },
        {
          name: 'bump',
          type: 'u8',
        },
      ],
    },
    {
      name: 'deleteDataRecord',
      accounts: [
        {
          name: 'dataRecord',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'user',
          isMut: false,
          isSigner: false,
        },
        {
          name: 'authority',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'authorityRecord',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'namespace',
          type: 'string',
        },
        {
          name: 'bump',
          type: 'u8',
        },
      ],
    },
    {
      name: 'createAuthorityRecord',
      accounts: [
        {
          name: 'authorityRecord',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'user',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'authority',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'systemProgram',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'scope',
          type: 'string',
        },
        {
          name: 'bump',
          type: 'u8',
        },
      ],
    },
    {
      name: 'deleteAuthorityRecord',
      accounts: [
        {
          name: 'user',
          isMut: true,
          isSigner: true,
        },
        {
          name: 'authorityRecord',
          isMut: true,
          isSigner: false,
        },
        {
          name: 'authority',
          isMut: false,
          isSigner: false,
        },
      ],
      args: [
        {
          name: 'scope',
          type: 'string',
        },
        {
          name: 'bump',
          type: 'u8',
        },
      ],
    },
  ],
  accounts: [
    {
      name: 'UserDataRecord',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'authority',
            type: 'publicKey',
          },
          {
            name: 'lastUpdated',
            type: 'i64',
          },
          {
            name: 'metadataUri',
            type: 'string',
          },
        ],
      },
    },
    {
      name: 'UserAuthorityRecord',
      type: {
        kind: 'struct',
        fields: [
          {
            name: 'lastAuthorized',
            type: 'i64',
          },
        ],
      },
    },
  ],
  errors: [
    {
      code: 300,
      name: 'Unauthorized',
      msg: 'The caller is unauthorized.',
    },
    {
      code: 301,
      name: 'MetadataUriOverflow',
      msg: 'The given metadata URI is too long to fit into storage.',
    },
  ],
};
