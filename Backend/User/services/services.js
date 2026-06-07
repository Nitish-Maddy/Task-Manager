const User = require("../model/model");

/**
 * Create User
 */
const createUser = async (userData) => {
  const { name, email, password } = userData;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  return user;
};

/**
 * Find User By Email
 */
const findUserByEmail = async (email) => {
  return await User.findOne({ email }).select("+password");
};

/**
 * Find User By Id
 */
const findUserById = async (userId) => {
  return await User.findById(userId);
};

/**
 * Get All Users
 */
const getAllUsers = async () => {
  return await User.find().select("-password");
};

/**
 * Update User
 */
const updateUser = async (userId, updateData) => {
  return await User.findByIdAndUpdate(
    userId,
    updateData,
    {
      new: true,
      runValidators: true,
    }
  ).select("-password");
};

/**
 * Delete User
 */
const deleteUser = async (userId) => {
  return await User.findByIdAndDelete(userId);
};

module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
  getAllUsers,
  updateUser,
  deleteUser,
};