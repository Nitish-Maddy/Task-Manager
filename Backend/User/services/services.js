const User = require("../model/model");


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


const findUserByEmail = async (email) => {
  return await User.findOne({ email }).select("+password");
};


const findUserById = async (userId) => {
  return await User.findById(userId);
};


const getAllUsers = async () => {
  return await User.find().select("-password");
};


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
