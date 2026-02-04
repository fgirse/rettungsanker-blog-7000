// src/collections/Sessions
import type { CollectionConfig } from 'payload'

export const Sessions: CollectionConfig = {
  slug: 'session',
  admin: {
    useAsTitle: 'token',
  },
  fields: [
    {
      name: 'expiresAt',
      type: 'date',
      required: true,
    },
    {
      name: 'token',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'ipAddress',
      type: 'text',
    },
    {
      name: 'userAgent',
      type: 'text',
    },
    {
      name: 'userId',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      hasMany: false,
    },
  ],
}
