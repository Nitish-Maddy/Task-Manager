const taskService = require("../services/services");

/**
 * Create Task
 * POST /api/tasks
 */
const createTask = async (req, res) => {
  try {
    const task = await taskService.createTask(req.body);

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

/**
 * Get Task By Id
 * GET /api/tasks/:id
 */
const getTaskById = async (req, res) => {
  try {
    const task = await taskService.getTaskById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
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

/**
 * Get All Tasks
 * GET /api/tasks
 */
const getAllTasks = async (req, res) => {
  try {
    const tasks = await taskService.getAllTasks();

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

/**
 * Get Tasks By User Id
 * GET /api/tasks/user/:userId
 */
const getTasksByUserId = async (req, res) => {
  try {
    const tasks = await taskService.getTasksByUserId(
      req.params.userId
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

/**
 * Update Task
 * PUT /api/tasks/:id
 */
const updateTask = async (req, res) => {
  try {
    const task = await taskService.updateTask(
      req.params.id,
      req.body
    );

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

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

/**
 * Delete Task
 * DELETE /api/tasks/:id
 */
const deleteTask = async (req, res) => {
  try {
    const task = await taskService.deleteTask(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

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

/**
 * Toggle Task Status
 * PATCH /api/tasks/:id/status
 */
const toggleTaskStatus = async (req, res) => {
  try {
    const task = await taskService.toggleTaskStatus(
      req.params.id
    );

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

/**
 * Search Tasks
 * GET /api/tasks/search?keyword=react&userId=123
 */
const searchTasks = async (req, res) => {
  try {
    const { keyword, userId } = req.query;

    const tasks = await taskService.searchTasks(
      keyword,
      userId
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

/**
 * Filter Tasks By Status
 * GET /api/tasks/status/:status?userId=123
 */
const filterTasksByStatus = async (req, res) => {
  try {
    const { userId } = req.query;
    const { status } = req.params;

    const tasks = await taskService.filterTasksByStatus(
      userId,
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

/**
 * Filter Tasks By Priority
 * GET /api/tasks/priority/:priority?userId=123
 */
const filterTasksByPriority = async (req, res) => {
  try {
    const { userId } = req.query;
    const { priority } = req.params;

    const tasks = await taskService.filterTasksByPriority(
      userId,
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