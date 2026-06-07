const express = require("express");
const router = express.Router();

const {
  createTask,
  getTaskById,
  getAllTasks,
  getTasksByUserId,
  updateTask,
  deleteTask,
  toggleTaskStatus,
  searchTasks,
  filterTasksByStatus,
  filterTasksByPriority,
} = require("../controller/controller");

router.post("/", createTask);
router.get("/", getAllTasks);
router.get("/search", searchTasks);
router.get("/user/:userId", getTasksByUserId);
router.get("/status/:status", filterTasksByStatus);
router.get("/priority/:priority", filterTasksByPriority);
router.get("/:id", getTaskById);

router.put("/:id", updateTask);
router.patch("/:id/status", toggleTaskStatus);
router.delete("/:id", deleteTask);

module.exports = router;