import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || 5555;
export const MONGODB_URL = process.env.MONGODB_URL;
export const JWT_SECRET = process.env.JWT_SECRET;
