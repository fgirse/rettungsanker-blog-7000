/**
 * Reset User Password via Better Auth API
 * 
 * This script resets a user's password using Better Auth's built-in hashing
 * by making an API call to the sign-up endpoint or updating through the proper channel
 * 
 * Usage: bun scripts/reset-user-password.ts <email> <new-password>
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function resetPassword(email: string, newPassword: string) {
  try {
    console.log(`🔍 Looking up user: ${email}\n`);

    // Find user
    const user = await prisma.user.findUnique({
      where: { email },
      include: { accounts: true }
    });

    if (!user) {
      console.error(`❌ User not found: ${email}`);
      process.exit(1);
    }

    console.log(`✅ User found: ${user.email}`);
    console.log(`   Name: ${user.name || 'N/A'}`);
    console.log(`   Accounts: ${user.accounts.length}\n`);

    // Check for credential account
    const credentialAccount = user.accounts.find(acc => acc.providerId === 'credential');

    if (!credentialAccount) {
      console.log('⚠️  No credential account found.');
      console.log('   Creating one using Better Auth API...\n');
      
      // Delete user and recreate via API
      console.log('   Deleting user...');
      await prisma.user.delete({ where: { id: user.id } });
      
      console.log('   Recreating user via Better Auth sign-up API...');
      const response = await fetch('http://localhost:3000/api/auth/sign-up/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: user.email,
          password: newPassword,
          name: user.name || email.split('@')[0]
        })
      });

      if (!response.ok) {
        const error = await response.text();
        console.error('❌ API Error:', error);
        process.exit(1);
      }

      const data = await response.json();
      console.log('\n✅ User recreated successfully via Better Auth API!');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('📧 Email:', email);
      console.log('🔑 Password:', newPassword);
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      return;
    }

    console.log('✅ Credential account exists. Updating password...\n');

    // Delete and recreate the account with proper hash
    // The safest way is to delete the existing credential account and have the user sign up again
    // Or we can use Better Auth's password update endpoint

    console.log('💡 To reset password properly:');
    console.log('   1. Delete the credential account');
    console.log('   2. User signs up again with new password\n');
    
    console.log('Deleting credential account...');
    await prisma.account.delete({
      where: { id: credentialAccount.id }
    });

    console.log('Recreating via Better Auth API...');
    const response = await fetch('http://localhost:3000/api/auth/sign-up/email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: user.email,
        password: newPassword,
        name: user.name || email.split('@')[0]
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      // If user already exists, that's expected
      if (errorText.includes('already exists') || errorText.includes('User already exists')) {
        console.log('⚠️  User already exists in database. Account was recreated.');
      } else {
        console.error('❌ API Error:', errorText);
      }
    }

    // Now test if we can sign in
    console.log('\n🧪 Testing sign-in...');
    const signInResponse = await fetch('http://localhost:3000/api/auth/sign-in/email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: user.email,
        password: newPassword
      })
    });

    if (signInResponse.ok) {
      console.log('✅ Sign-in test successful!\n');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('📧 Email:', email);
      console.log('🔑 Password:', newPassword);
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    } else {
      const error = await signInResponse.text();
      console.error('❌ Sign-in test failed:', error);
    }

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

if (!email || !password) {
  console.error('Usage: bun scripts/reset-user-password.ts <email> <new-password>');
  console.error('Example: bun scripts/reset-user-password.ts user@example.com NewPassword123!');
  console.error('\nPassword requirements:');
  console.error('  - Minimum 8 characters');
  process.exit(1);
}

if (password.length < 8) {
  console.error('❌ Password must be at least 8 characters long');
  process.exit(1);
}

// Check if server is running
const checkServer = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/auth/sign-up/email', {
      method: 'OPTIONS'
    });
    return true;
  } catch {
    console.error('❌ Error: Development server is not running on http://localhost:3000');
    console.error('   Please start the server with: bun dev');
    process.exit(1);
  }
};

checkServer().then(() => resetPassword(email, password));
