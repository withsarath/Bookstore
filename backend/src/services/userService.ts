import { User } from '../models/userModel.js';

export const getUserProfile = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    const error = new Error('User not found');
    error.statusCode = 404;
    throw error;
  }
  return {
    _id: user._id,
    name: user.name,
    email: user.email,
  };
};

export const updateUserProfile = async (userId, userData) => {
  const user = await User.findById(userId);

  if (!user) {
    const error = new Error('User not found');
    error.statusCode = 404;
    throw error;
  }

  user.name = userData.name || user.name;
  user.email = userData.email || user.email;

  if (userData.password) {
    user.password = userData.password;
  }

  const updatedUser = await user.save();

  return {
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
  };
};
