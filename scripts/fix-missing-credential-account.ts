/**
 * Fix Missing Credential Account Script
 * 
 * This script helps fix the "Credential account not found" error by:
 * 1. Finding users without credential accounts
 * 2. Creating credential accounts with temporary passwords
 * 
 * Usage: bun scripts/fix-missing-credential-account.ts <email> [password]
 */

import { PrismaClient } from '@prisma/client';
import { hashPassword } from 'better-auth/crypto';

const prisma = new PrismaClient();

async function fixCredentialAccount(email: string, password?: string) {
  try {
    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      console.error(`❌ User not found: ${email}`);
      process.exit(1);
    }

    console.log(`✅ User found: ${user.email}`);

    // Check if credential account already exists
    const existingAccount = await prisma.account.findFirst({
      where: {
        userId: user.id,
        providerId: 'credential'
      }
    });

    if (existingAccount) {
      console.log(`⚠️  Credential account already exists for ${email}`);
      
      if (password) {
        console.log('Updating password...');
        const hashedPassword = await hashPassword(password);
        
        await prisma.account.update({
          where: { id: existingAccount.id },
          data: { password: hashedPassword }
        });
        
        console.log('✅ Password updated successfully!');
      }
      return;
    }

    // Generate temporary password if not provided
    const tempPassword = password || `Temp${Math.random().toString(36).slice(2, 10)}!`;
    const hashedPassword = await hashPassword(tempPassword);

    // Create credential account
    await prisma.account.create({
      data: {
        accountId: user.id,
        providerId: 'credential',
        userId: user.id,
        password: hashedPassword,
      }
    });

    console.log('\n✅ Credential account created successfully!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📧 Email:', email);
    console.log('🔑 Password:', tempPassword);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('\n⚠️  IMPORTANT: Please have the user change this password immediately after signing in.');

  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Get command line arguments
const email = process.argv[2];
const password = process.argv[3];

if (!email) {
  console.error('Usage: bun scripts/fix-missing-credential-account.ts <email> [password]');
  console.error('Example: bun scripts/fix-missing-credential-account.ts user@example.com MyPassword123!');
  process.exit(1);
}

fixCredentialAccount(email, password);
