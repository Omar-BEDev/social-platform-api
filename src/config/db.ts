import mongoose from 'mongoose';
import { ApiError } from '../utils/ApiError';

export const connect = () => {
  const url = process.env.MONGO_URL;
  if (!url) {
    throw new ApiError('MONGO_URL is not defined in the environment variables', 500);
  }
  mongoose.connect(url);
};