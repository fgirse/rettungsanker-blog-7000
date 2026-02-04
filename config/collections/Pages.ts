import type { CollectionConfig } from 'payload'

export const Pages: CollectionConfig = {
  slug: 'pages',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'hero',
      type: 'group',
      fields: [
        {
          name: 'Header_1',
          type: 'text',
          required: true,
        },
        {
          name: 'Header_2',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}
