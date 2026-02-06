import type { CollectionConfig } from 'payload'
import { hashPassword } from 'better-auth/crypto'
import prisma from '@/lib/prisma'

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
  hooks: {
    beforeChange: [
      ({ req, data }) => {
        if (data?.password) {
          req.context = {
            ...req.context,
            newUserPassword: data.password,
          }
        }
        return data
      },
    ],
    afterChange: [
      async ({ doc, operation, req }) => {
        if (operation !== 'create') return

        const password = req.context?.newUserPassword as string | undefined
        if (!password) return

        const existingAccount = await prisma.account.findFirst({
          where: {
            userId: doc.id,
            providerId: 'credential',
          },
        })

        if (existingAccount) return

        const userByEmail = await prisma.user.findUnique({
          where: { email: doc.email },
        })

        if (!userByEmail) {
          await prisma.user.create({
            data: {
              id: doc.id,
              email: doc.email,
              name: doc.name || undefined,
              emailVerified: !!doc.emailVerified,
              image: doc.image || undefined,
            },
          })
        }

        const hashedPassword = await hashPassword(password)

        await prisma.account.create({
          data: {
            accountId: doc.id,
            providerId: 'credential',
            userId: doc.id,
            password: hashedPassword,
          },
        })
      },
    ],
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
      name: 'isAdmin',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
      },
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