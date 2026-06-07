const express = require("express");
const router = express.Router();

const {
  register,
  login,
  getProfile,
} = require("../controller/auth.controller");

const authMiddleware = require("../middleware/auth.middleware");

// Public Routes
router.post("/register", register);
router.post("/login", login);

// Protected Route
router.get("/profile", authMiddleware, getProfile);

module.exports = router;