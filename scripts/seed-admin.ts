import { getPayload } from 'payload'
import config from '@payload-config'
import { hashPassword } from 'better-auth/crypto'
import prisma from '@/lib/prisma'

async function seed() {
  const payload = await getPayload({ config })

  try {
    // Check if admin user already exists
    const existingUsers = await payload.find({
      collection: 'users',
      where: {
        email: {
          equals: 'admin@example.com'
        }
      }
    })

    if (existingUsers.docs.length > 0) {
      const existing = existingUsers.docs[0]
      await payload.update({
        collection: 'users',
        id: existing.id,
        data: {
          name: existing.name || 'Admin User',
          role: existing.role?.length ? existing.role : ['admin'],
          emailVerified: true,
        },
        overrideAccess: true,
      })

      console.log('✅ Admin user updated')
      console.log('Email: admin@example.com')
      console.log('⚠️  Password was not changed - use reset-user-password.ts to update it')
      return
    }

    // Create admin user with password
    const user = await payload.create({
      collection: 'users',
      data: {
        email: 'admin@example.com',
        name: 'Admin User',
        role: ['admin'],
        emailVerified: true,
      },
      overrideAccess: true,
    })

    // Create the credential account in Prisma
    const hashedPassword = await hashPassword('admin123')
    
    await prisma.account.create({
      data: {
        accountId: user.id,
        providerId: 'credential',
        userId: user.id,
        password: hashedPassword,
      },
    })

    console.log('✅ Admin user created successfully!')
    console.log('Email: admin@example.com')
    console.log('Password: admin123')
    console.log('⚠️  Please change this password after first login!')
    console.log('\n🔗 Access Payload Admin at: http://localhost:3000/admin')
    
  } catch (error) {
    console.error('Error seeding admin user:', error)
  } finally {
    process.exit(0)
  }
}

seed()
