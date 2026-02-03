/**
 * Fix User Credential with Better Auth Compatible Hash
 */

import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';

const prisma = new PrismaClient();

// Better Auth uses crypto.scrypt for password hashing
async function hashPassword(password: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const salt = crypto.randomBytes(16).toString('hex');
    crypto.scrypt(password, salt, 64, (err, derivedKey) => {
      if (err) reject(err);
      resolve(salt + ':' + derivedKey.toString('hex'));
    });
  });
}

async function fixUser(email: string, password: string) {
  try {
    console.log(`🔍 Fixing: ${email}\n`);

    const user = await prisma.user.findUnique({
      where: { email },
      include: { accounts: true }
    });

    if (!user) {
      console.error(`❌ User not found`);
      process.exit(1);
    }

    // Delete old credential accounts
    const oldCreds = user.accounts.filter(acc => acc.providerId === 'credential');
    for (const cred of oldCreds) {
      await prisma.account.delete({ where: { id: cred.id } });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create account
    await prisma.account.create({
      data: {
        accountId: user.id,
        providerId: 'credential',
        userId: user.id,
        password: hashedPassword,
      }
    });

    console.log('✅ Done!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📧', email);
    console.log('🔑', password);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

    // Test
    const resp = await fetch('http://localhost:3000/api/auth/sign-in/email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    console.log('\n🧪 Test:', resp.ok ? '✅ Success' : `❌ Failed (${resp.status})`);
    if (!resp.ok) {
      console.log(await resp.text());
    }

  } catch (error) {
    console.error('❌', error);
  } finally {
    await prisma.$disconnect();
  }
}

const [email, password] = process.argv.slice(2);
if (!email || !password) {
  console.error('Usage: bun scripts/fix-user-with-proper-hash.ts <email> <password>');
  process.exit(1);
}

fixUser(email, password);
