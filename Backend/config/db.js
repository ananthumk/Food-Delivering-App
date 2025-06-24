import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://ananthukoyilathm:TvAAK9llx4lj4ggB@map.m2mft.mongodb.net/food-del');
    console.log('DB connected');
  } catch (error) {
    console.error('DB connection failed:', error.message);
    process.exit(1); 
  }
};

