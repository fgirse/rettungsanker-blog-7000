import mongoose from 'mongoose';

let initialized = false;

export const connect = async () => {
  mongoose.set('strictQuery', true);
  if (initialized) {
    console.log('Already connected to MongoDB');
    return;
  }
  try {
    // Support both MONGODB_URI and MONGODB_URL
    const mongoUri = process.env.MONGODB_URI || process.env.MONGODB_URL;
    
    if (!mongoUri) {
      throw new Error('MongoDB connection string not found. Please set MONGODB_URI or MONGODB_URL in .env.local');
    }
    
    await mongoose.connect(mongoUri, {
      dbName: 'rettungsanker-blog',
    });
    console.log('Connected to MongoDB');
    initialized = true;
  } catch (error) {
    console.log('Error connecting to MongoDB:', error);
    throw error;
  }
};
