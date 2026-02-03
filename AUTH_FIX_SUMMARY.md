# Authentication Issues Fixed

## Latest Fix - February 3, 2026

### Problem
Sign-in was failing with `{"code": "INVALID_EMAIL_OR_PASSWORD"}` even though credential accounts existed.

### Root Cause
Previous fix scripts used bcrypt for password hashing, but Better Auth uses `crypto.scrypt` with a different format (salt:hash). The password hashes were incompatible with Better Auth's verification process.

### Solution
Users must be created/recreated using Better Auth's built-in sign-up API to ensure proper password hashing.

### Current Working Users
1. **simon.pannizi@web.de**
   - Password: `NewPassword123!`
   - Status: ✅ Working (recreated via Better Auth API)

2. **testuser@example.com**
   - Password: `TestPassword123!`
   - Status: ✅ Working (test account)

3. **fgirse@bluewin.ch**
   - Status: Google OAuth only (no password)

⚠️ **IMPORTANT**: Users should change their passwords after first sign-in.

---

## Previous Issues - Credential Account Not Found

### Problem
Users were getting: `ERROR [Better Auth]: Credential account not found`

### Root Cause
`User` records existed without corresponding `Account` records with `providerId: "credential"`.

## Prevention
To prevent this issue in the future, ensure that:
1. Users are always created through the Better Auth sign-up flow
2. If creating users manually, always create a corresponding Account record
3. Use the diagnostic script regularly to check for issues

## Utility Scripts

### Recommended: Recreate User via Better Auth API
```bash
bun recreate-user.ts <email> <password> [name]
```
**Use this script** to properly create/reset user credentials. It:
- Deletes existing user
- Creates new user via Better Auth sign-up API
- Ensures proper password hashing
- Tests sign-in automatically

Example:
```bash
bun recreate-user.ts user@example.com SecurePassword123! "User Name"
```

### Diagnostic Scripts

#### Diagnose Auth Issues
```bash
bun scripts/diagnose-auth-issues.ts
```
Checks all users for authentication issues.

#### Check Database Connection
```bash
bun test-db-connection.ts
```
Tests database connectivity and lists users with their accounts.

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
