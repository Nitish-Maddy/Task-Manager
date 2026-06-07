const Task = require("../model/model");

const createTask = async (taskData) => {
  const task = await Task.create(taskData);
  return task;
};

const getTaskById = async (taskId) => {
  return await Task.findById(taskId).populate(
    "userId",
    "name email"
  );
};

const getAllTasks = async () => {
  return await Task.find()
    .populate("userId", "name email")
    .sort({ createdAt: -1 });
};


const getTasksByUserId = async (userId) => {
  return await Task.find({ userId }).sort({
    createdAt: -1,
  });
};

/**
 * Update Task
 */
const updateTask = async (taskId, updateData) => {
  return await Task.findByIdAndUpdate(
    taskId,
    updateData,
    {
      new: true,
      runValidators: true,
    }
  );
};


const deleteTask = async (taskId) => {
  return await Task.findByIdAndDelete(taskId);
};


const toggleTaskStatus = async (taskId) => {
  const task = await Task.findById(taskId);

  if (!task) {
    throw new Error("Task not found");
  }

  task.status =
    task.status === "Pending"
      ? "Completed"
      : "Pending";

  await task.save();

  return task;
};


const searchTasks = async (keyword, userId) => {
  return await Task.find({
    userId,
    $or: [
      { title: { $regex: keyword, $options: "i" } },
      { description: { $regex: keyword, $options: "i" } },
    ],
  });
};


const filterTasksByStatus = async (
  userId,
  status
) => {
  return await Task.find({
    userId,
    status,
  });
};

const filterTasksByPriority = async (
  userId,
  priority
) => {
  return await Task.find({
    userId,
    priority,
  });
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
