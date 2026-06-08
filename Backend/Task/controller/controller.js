const taskService = require("../services/services");

const getUserId = (req) => req.user._id.toString();

const isTaskOwner = (task, userId) => {
  const ownerId = task.userId._id || task.userId;
  return ownerId.toString() === userId;
};

const createTask = async (req, res) => {
  try {
    const task = await taskService.createTask({
      ...req.body,
      userId: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Task created successfully",
      data: task,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getTaskById = async (req, res) => {
  try {
    const task = await taskService.getTaskById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    if (!isTaskOwner(task, getUserId(req))) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to access this task",
      });
    }

    res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllTasks = async (req, res) => {
  try {
    const tasks = await taskService.getTasksByUserId(req.user._id);

    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getTasksByUserId = async (req, res) => {
  try {
    if (req.params.userId !== getUserId(req)) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to access these tasks",
      });
    }

    const tasks = await taskService.getTasksByUserId(req.user._id);

    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateTask = async (req, res) => {
  try {
    const existing = await taskService.getTaskById(req.params.id);

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    if (!isTaskOwner(existing, getUserId(req))) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this task",
      });
    }

    const { userId, ...updateData } = req.body;
    const task = await taskService.updateTask(req.params.id, updateData);

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      data: task,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    const existing = await taskService.getTaskById(req.params.id);

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    if (!isTaskOwner(existing, getUserId(req))) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to delete this task",
      });
    }

    await taskService.deleteTask(req.params.id);

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const toggleTaskStatus = async (req, res) => {
  try {
    const existing = await taskService.getTaskById(req.params.id);

    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    if (!isTaskOwner(existing, getUserId(req))) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to update this task",
      });
    }

    const task = await taskService.toggleTaskStatus(req.params.id);

    res.status(200).json({
      success: true,
      message: "Task status updated successfully",
      data: task,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};

const searchTasks = async (req, res) => {
  try {
    const { keyword } = req.query;

    const tasks = await taskService.searchTasks(
      keyword,
      req.user._id
    );

    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const filterTasksByStatus = async (req, res) => {
  try {
    const { status } = req.params;

    const tasks = await taskService.filterTasksByStatus(
      req.user._id,
      status
    );

    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const filterTasksByPriority = async (req, res) => {
  try {
    const { priority } = req.params;

    const tasks = await taskService.filterTasksByPriority(
      req.user._id,
      priority
    );

    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
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
};
