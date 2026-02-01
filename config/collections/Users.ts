import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    tokenExpiration: 7200, // 2 hours
  },
  access: {
    admin: ({ req }) => !!req.user,
    create: () => true,
    delete: ({ req }) => !!req.user,
    read: ({ req }) => !!req.user,
    update: ({ req }) => !!req.user,
  },
  admin: {
    defaultColumns: ['name', 'email', 'role'],
    useAsTitle: 'name',
  },
  
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'role',
      type: 'select',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'User', value: 'user' },
      ],
      defaultValue: 'user',
      required: true,
      hasMany: false,
    },
    {
      name: 'emailVerified',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'image',
      type: 'text',
      admin: {
        position: 'sidebar',
      },
    },
  ],
  timestamps: true,
}