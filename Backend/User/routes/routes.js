const express = require("express");
const authMiddleware = require("../../auth/middleware/auth.middleware");
const {
  createUser,
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser,
} = require("../controller/controller");

const router = express.Router();

router.use(authMiddleware);

router.post("/", createUser);
router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;