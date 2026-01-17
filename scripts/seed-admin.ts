import { getPayload } from 'payload'
import config from '@payload-config'

async function seed() {
  const payload = await getPayload({ config })

  try {
    // Check if admin user already exists
    const existingUsers = await payload.find({
      collection: 'user',
      where: {
        email: {
          equals: 'admin@example.com'
        }
      }
    })

    if (existingUsers.docs.length > 0) {
      console.log('✅ Admin user already exists')
      return
    }

    // Create admin user
    const user = await payload.create({
      collection: 'user',
      data: {
        email: 'admin@example.com',
        password: 'admin123', // Change this password after first login!
        name: 'Admin User',
        role: 'admin',
        emailVerified: true,
      }
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
