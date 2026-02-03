/**
 * Diagnose Authentication Issues
 * 
 * This script checks for common authentication issues:
 * - Users without credential accounts
 * - Invalid password hashes
 * - Missing user data
 * 
 * Usage: bun scripts/diagnose-auth-issues.ts
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function diagnoseAuthIssues() {
  try {
    console.log('🔍 Diagnosing authentication issues...\n');

    // Get all users
    const users = await prisma.user.findMany({
      include: {
        accounts: true
      }
    });

    console.log(`📊 Total users: ${users.length}\n`);

    const issues: string[] = [];

    for (const user of users) {
      console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
      console.log(`📧 Email: ${user.email}`);
      console.log(`👤 Name: ${user.name || 'N/A'}`);
      console.log(`✉️  Email Verified: ${user.emailVerified}`);
      console.log(`📅 Created: ${user.createdAt.toISOString()}`);

      // Check for credential account
      const credentialAccount = user.accounts.find(
        acc => acc.providerId === 'credential'
      );

      if (!credentialAccount) {
        console.log(`❌ Missing credential account`);
        issues.push(`${user.email}: Missing credential account`);
      } else {
        console.log(`✅ Credential account exists`);
        
        // Check password format
        if (credentialAccount.password) {
          const isBetterAuthHash = /^[0-9a-f]{32}:[0-9a-f]{128}$/i.test(credentialAccount.password);
          
          if (isBetterAuthHash) {
            console.log(`✅ Password: Valid Better Auth hash`);
          } else {
            console.log(`⚠️  Password: Invalid format (expected Better Auth hash)`);
            issues.push(`${user.email}: Invalid password format`);
          }
        } else {
          console.log(`❌ Password: Missing`);
          issues.push(`${user.email}: Missing password`);
        }
      }

      // Check for other providers
      const otherAccounts = user.accounts.filter(
        acc => acc.providerId !== 'credential'
      );

      if (otherAccounts.length > 0) {
        console.log(`🔗 Other providers: ${otherAccounts.map(a => a.providerId).join(', ')}`);
      }

      console.log('');
    }

    // Summary
    console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
    console.log(`📋 SUMMARY\n`);

    if (issues.length === 0) {
      console.log(`✅ No issues found! All users have valid credential accounts.`);
    } else {
      console.log(`⚠️  Found ${issues.length} issue(s):\n`);
      issues.forEach((issue, index) => {
        console.log(`${index + 1}. ${issue}`);
      });
      console.log('\n💡 Run: bun scripts/fix-user-credential.ts <email> <new-password>');
    }

  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

diagnoseAuthIssues();
