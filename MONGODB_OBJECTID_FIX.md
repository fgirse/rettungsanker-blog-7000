# MongoDB ObjectId Casting Error Fix

## Problem
You were getting this error:
```
ERROR: Cast to ObjectId failed for value "Lg2PLaL8M0vTk0f5POWWKF75uBPOxNt8" (type string) at path "_id" for model "users"
```

## Root Cause
The `userId` field in both `Sessions` and `Accounts` collections was defined as a simple `text` field in Payload CMS, but MongoDB and Mongoose were trying to query against the `_id` field (which is an ObjectId). This mismatch caused the casting error when the string user ID couldn't be converted to an ObjectId format.

## Solution Applied
Changed the `userId` field definition in both collections from `text` type to `relationship` type:

### 1. Sessions Collection (`config/collections/Sessions.ts`)
**Before:**
```typescript
{
  name: 'userId',
  type: 'text',
  required: true,
}
```

**After:**
```typescript
{
  name: 'userId',
  type: 'relationship',
  relationTo: 'users',
  required: true,
  hasMany: false,
}
```

### 2. Accounts Collection (`config/collections/Account.ts`)
**Before:**
```typescript
{
  name: 'userId',
  type: 'text',
  required: true,
}
```

**After:**
```typescript
{
  name: 'userId',
  type: 'relationship',
  relationTo: 'users',
  required: true,
  hasMany: false,
}
```

## Why This Works
- **Relationship fields** tell Payload to properly handle the reference to the `users` collection
- Payload understands that `userId` is a foreign key and handles the MongoDB ObjectId conversion automatically
- This prevents the casting error when Mongoose tries to query against the `_id` field

## Next Steps
1. **Rebuild the database schema** (if needed):
   ```bash
   bun payload generate:types
   ```

2. **Restart the development server**:
   ```bash
   bun dev
   ```

3. **Test sign-in**:
   - Try signing in with an existing user account
   - The error should no longer occur

4. **Migration (if you have existing data)**:
   - The existing `userId` text values in the database should still work
   - Payload will handle the migration automatically when you save records
   - For safety, you may want to:
     - Export your Sessions and Accounts data
     - Clear these collections in the database
     - Let them repopulate through normal authentication flows

## Verification
To verify the fix is working:
1. Check the browser console for network errors during auth
2. Try the sign-in flow and verify no MongoDB ObjectId casting errors appear
3. Check the server logs for any auth-related errors

## Related Issue
This issue could also occur if:
- Payload CMS tries to populate the `userId` field from the `users` relationship
- Any middleware or hooks try to query sessions by userId
- The Payload API is called with direct MongoDB queries

The relationship field fix ensures Payload handles all these scenarios correctly.
