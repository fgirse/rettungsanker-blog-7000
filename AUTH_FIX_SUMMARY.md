# Authentication Issue Fixed - Credential Account Not Found

## Problem
Users were getting the error: `ERROR [Better Auth]: Credential account not found { email: 'claudia.carneiro@web.de' }`

## Root Cause
The `User` records existed in the database, but they were missing corresponding `Account` records with `providerId: "credential"`. Better Auth requires an `Account` record for each authentication method.

This typically happens when:
- Users are created manually in the database
- Users are migrated from another authentication system
- Sign-up process didn't complete properly

## Solution
Created credential accounts for all affected users with temporary passwords.

### Fixed Users
1. **claudia.carneiro@web.de**
   - Password: `TempPassword123!`

2. **fgirse@bluewin.ch**
   - Password: `Temp1p9573w7!`

3. **simon.pannizi@web.de**
   - Password: `Tempk60j86y8!`

⚠️ **IMPORTANT**: All users should change their passwords immediately after signing in.

## Prevention
To prevent this issue in the future, ensure that:
1. Users are always created through the Better Auth sign-up flow
2. If creating users manually, always create a corresponding Account record
3. Use the diagnostic script regularly to check for issues

## Utility Scripts Created

### 1. Diagnose Auth Issues
```bash
bun scripts/diagnose-auth-issues.ts
```
Checks all users for authentication issues:
- Missing credential accounts
- Invalid password formats
- Account integrity

### 2. Fix Missing Credential Account
```bash
bun scripts/fix-missing-credential-account.ts <email> [password]
```
Creates a credential account for a user:
- Generates a temporary password if not provided
- Uses proper bcrypt hashing
- Verifies user exists before creating account

Examples:
```bash
# With auto-generated password
bun scripts/fix-missing-credential-account.ts user@example.com

# With custom password
bun scripts/fix-missing-credential-account.ts user@example.com MyPassword123!
```

## Database Structure
The account model requires:
```prisma
model Account {
  id         String @id @default(cuid())
  accountId  String  // User's email for credential provider
  providerId String  // "credential" for email/password auth
  userId     String  // Link to User model
  password   String? // Bcrypt hashed password
  // ... other fields
}
```

## Next Steps
1. ✅ All users now have valid credential accounts
2. 📧 Notify users to sign in with their temporary passwords
3. 🔐 Implement password reset functionality
4. 📝 Add password change flow after first login
