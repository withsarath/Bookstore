import jwt from 'jsonwebtoken';
import { User } from '../models/userModel.js';
import { IUser } from '../types/user.js';
import { Types } from 'mongoose';

const generateToken = (id: Types.ObjectId) => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: '30d',
  });
};

export const registerUser = async (userData: Partial<IUser>) => {
  const { name, username, email, password } = userData;

  if (!username) {
    const error: any = new Error('Username is required');
    error.statusCode = 400;
    throw error;
  }

  const userExists = await User.findOne({ $or: [{ email }, { username }] });
  if (userExists) {
    const error: any = new Error('User already exists');
    error.statusCode = 400;
    throw error;
  }

  const user = await User.create({ name, username, email, password });

  return {
    _id: user._id,
    name: user.name,
    username: user.username,
    email: user.email,
    token: generateToken(user._id),
  };
};

export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    return {
      _id: user._id,
      name: user.name,
      username: user.username,
      email: user.email,
      token: generateToken(user._id),
    };
  } else {
    const error: any = new Error('Invalid email or password');
    error.statusCode = 401;
    throw error;
  }
};
