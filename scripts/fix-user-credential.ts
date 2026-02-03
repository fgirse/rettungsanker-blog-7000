/**
 * Fix User Credential Account
 * Uses Better Auth's internal password hashing
 */

import { PrismaClient } from '@prisma/client';
import { hashPassword } from 'better-auth/crypto';

const prisma = new PrismaClient();

async function fixUserCredential(email: string, password: string) {
  try {
    console.log(`🔍 Fixing credential for: ${email}\n`);

    const user = await prisma.user.findUnique({
      where: { email },
      include: { accounts: true }
    });

    if (!user) {
      console.error(`❌ User not found: ${email}`);
      process.exit(1);
    }

    console.log(`✅ User found: ${user.email}`);

    // Delete existing credential account if any
    const existingCred = user.accounts.find(acc => acc.providerId === 'credential');
    if (existingCred) {
      console.log('   Deleting old credential account...');
      await prisma.account.delete({ where: { id: existingCred.id } });
    }

    // Hash password using Better Auth's method
    console.log('   Hashing password with Better Auth...');
    const hashedPassword = await hashPassword(password);

    // Create new credential account
    console.log('   Creating credential account...');
    await prisma.account.create({
      data: {
        accountId: user.id, // Use user.id not email
        providerId: 'credential',
        userId: user.id,
        password: hashedPassword,
      }
    });

    console.log('\n✅ Credential account created successfully!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📧 Email:', email);
    console.log('🔑 Password:', password);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    // Test sign-in
    console.log('\n🧪 Testing sign-in via API...');
    const response = await fetch('http://localhost:3000/api/auth/sign-in/email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    if (response.ok) {
      const data = await response.json();
      console.log('✅ Sign-in successful!');
      console.log('   User:', data.user.name);
    } else {
      const error = await response.text();
      console.log('❌ Sign-in failed:', error);
    }

  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

const email = process.argv[2];
const password = process.argv[3];

if (!email || !password) {
  console.error('Usage: bun scripts/fix-user-credential.ts <email> <password>');
  console.error('Example: bun scripts/fix-user-credential.ts user@example.com Password123!');
  process.exit(1);
}

fixUserCredential(email, password);
