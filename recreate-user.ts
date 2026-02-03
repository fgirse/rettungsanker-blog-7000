import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function recreateUser(email: string, password: string, name: string) {
  try {
    console.log(`🔄 Recreating user: ${email}\n`);

    // Find and delete existing user
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      console.log('Deleting existing user...');
      await prisma.user.delete({ where: { email } });
    }

    // Create via Better Auth API
    console.log('Creating user via Better Auth sign-up API...\n');
    const response = await fetch('http://localhost:3000/api/auth/sign-up/email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name })
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('❌ Sign-up failed:', error);
      process.exit(1);
    }

    const data = await response.json();
    console.log('✅ User created successfully!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📧 Email:', email);
    console.log('🔑 Password:', password);
    console.log('👤 Name:', name);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    // Test sign-in
    console.log('\n🧪 Testing sign-in...');
    const signInResp = await fetch('http://localhost:3000/api/auth/sign-in/email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    if (signInResp.ok) {
      console.log('✅ Sign-in works!');
    } else {
      console.log('❌ Sign-in failed:', await signInResp.text());
    }

  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

const [email, password, name] = process.argv.slice(2);
if (!email || !password) {
  console.error('Usage: bun recreate-user.ts <email> <password> [name]');
  process.exit(1);
}

recreateUser(email, password, name || email.split('@')[0]);
