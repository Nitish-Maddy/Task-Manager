const userService = require("../services/services");

const isSelf = (req) => req.params.id === req.user._id.toString();

const createUser = async (req, res) => {
  res.status(403).json({
    success: false,
    message: "Use /api/auth/register to create an account",
  });
};

const getUserById = async (req, res) => {
  try {
    if (!isSelf(req)) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to access this profile",
      });
    }

    const user = await userService.findUserById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllUsers = async (req, res) => {
  res.status(403).json({
    success: false,
    message: "Not authorized to list all users",
  });
};

const updateUser = async (req, res) => {
  try {
    if (!isSelf(req)) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this profile",
      });
    }

    const { password, ...updateData } = req.body;
    const user = await userService.updateUser(req.user._id, updateData);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    if (!isSelf(req)) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this account",
      });
    }

    const user = await userService.deleteUser(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createUser,
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser,
};
