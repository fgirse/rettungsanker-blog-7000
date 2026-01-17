// src/collections/VerificationTokens.ts
import type { CollectionConfig } from 'payload'

export const VerificationTokens: CollectionConfig = {
  slug: 'verification',
  admin: {
    useAsTitle: 'identifier',
  },
  fields: [
    {
      name: 'identifier',
      type: 'text',
      required: true,
    },
    {
      name: 'value',
      type: 'text',
      required: true,
    },
    {
      name: 'expiresAt',
      type: 'date',
      required: true,
    },
  ],
}
