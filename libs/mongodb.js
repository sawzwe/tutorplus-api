import mongoose from 'mongoose';

const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    return Promise.resolve('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB');
    return Promise.reject('Failed to connect to MongoDB');
  }
};

export default connectMongoDB;
