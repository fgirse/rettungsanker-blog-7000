import type { CollectionConfig } from 'payload'

export const Accounts: CollectionConfig = {
    slug: 'account',
    fields: [
      {
        name: 'accountId',
        type: 'text',
        required: true,
      },
      {
        name: 'providerId',
        type: 'text',
        required: true,
      },
      {
        name: 'userId',
        type: 'relationship',
        relationTo: 'users',
        required: true,
        hasMany: false,
      },
      {
        name: 'accessToken',
        type: 'text',
      },
      {
        name: 'refreshToken',
        type: 'text',
      },
      {
        name: 'idToken',
        type: 'text',
      },
      {
        name: 'accessTokenExpiresAt',
        type: 'date',
      },
      {
        name: 'refreshTokenExpiresAt',
        type: 'date',
      },
      {
        name: 'scope',
        type: 'text',
      },
      {
        name: 'password',
        type: 'text',
      },
    ],
  }