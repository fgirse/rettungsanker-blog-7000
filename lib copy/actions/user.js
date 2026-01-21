import User from '../models/user.model';

import { connect } from '../mongodb/mongoose';

export const createOrUpdateUser = async (
  id,
  first_name,
  last_name,
  image_url,
  email_addresses,
  username
) => {
  try {
    console.log('🔌 Connecting to MongoDB for user operation...');
    await connect();
    console.log('✅ MongoDB connected');
    
    // Handle email_addresses - can be array or undefined
    let email = 'no-email@example.com';
    if (email_addresses && Array.isArray(email_addresses) && email_addresses.length > 0) {
      email = email_addresses[0]?.email_address || email_addresses[0]?.email || email;
    } else if (typeof email_addresses === 'string') {
      email = email_addresses;
    }
    
    console.log('💾 Creating/updating user:', {
      clerkId: id,
      firstName: first_name,
      lastName: last_name,
      username,
      email,
      hasProfilePicture: !!image_url,
    });
    
    const user = await User.findOneAndUpdate(
      { clerkId: id },
      {
        $set: {
          firstName: first_name || 'User',
          lastName: last_name || '',
          profilePicture: image_url || null,
          email,
          username: username || `user_${id.substring(0, 8)}`,
        },
      },
      { new: true, upsert: true }
    );
    
    console.log('✅ User saved to MongoDB:', {
      mongoId: user._id.toString(),
      clerkId: user.clerkId,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
    });
    
    return user;
  } catch (error) {
    console.error('❌ Error creating or updating user:', error.message);
    console.error('📍 Error code:', error.code);
    console.error('📍 Stack trace:', error.stack);
    throw new Error(`Failed to create/update user: ${error.message}`);
  }
};

export const deleteUser = async (id) => {
  try {
    console.log('🔌 Connecting to MongoDB for user deletion...');
    await connect();
    console.log('✅ MongoDB connected');
    
    console.log('🗑️  Deleting user with clerkId:', id);
    const deletedUser = await User.findOneAndDelete({ clerkId: id });
    
    if (deletedUser) {
      console.log('✅ User deleted from MongoDB:', {
        mongoId: deletedUser._id,
        username: deletedUser.username,
      });
    } else {
      console.log('⚠️  User not found in MongoDB:', id);
    }
    
    return deletedUser;
  } catch (error) {
    console.error('❌ Error deleting user:', error);
    console.error('Stack trace:', error.stack);
    throw error;
  }
};
