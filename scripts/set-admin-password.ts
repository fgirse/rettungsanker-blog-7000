import { getPayload } from 'payload'
import config from '@payload-config'
import { hashPassword } from 'better-auth/crypto'
import prisma from '@/lib/prisma'

async function setAdminPassword() {
  const payload = await getPayload({ config })

  try {
    const email = process.argv[2] || 'admin@example.com'
    const password = process.argv[3] || 'admin123'

    const existingUsers = await payload.find({
      collection: 'users',
      where: {
        email: {
          equals: email,
        },
      },
      limit: 1,
    })

    if (existingUsers.docs.length === 0) {
      console.error(`❌ User not found: ${email}`)
      process.exit(1)
    }

    const user = existingUsers.docs[0]

    // Update emailVerified in Payload
    await payload.update({
      collection: 'users',
      id: user.id,
      data: {
        emailVerified: true,
      },
      overrideAccess: true,
    })

    // Update password in Prisma account
    const hashedPassword = await hashPassword(password)
    
    const existingAccount = await prisma.account.findFirst({
      where: {
        userId: user.id,
        providerId: 'credential',
      },
    })

    if (existingAccount) {
      await prisma.account.update({
        where: { id: existingAccount.id },
        data: { password: hashedPassword },
      })
    } else {
      await prisma.account.create({
        data: {
          accountId: user.id,
          providerId: 'credential',
          userId: user.id,
          password: hashedPassword,
        },
      })
    }

    console.log('✅ Password updated')
    console.log('Email:', email)
    console.log('Password:', password)
  } catch (error) {
    console.error('Error updating admin password:', error)
    process.exit(1)
  } finally {
    process.exit(0)
  }
}

setAdminPassword()
