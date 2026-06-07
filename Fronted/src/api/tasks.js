import request from "./client";

export const getTasksByUser = (userId) =>
  request(`/tasks/user/${userId}`);

export const createTask = (taskData) =>
  request("/tasks", {
    method: "POST",
    body: JSON.stringify(taskData),
  });

export const updateTask = (id, taskData) =>
  request(`/tasks/${id}`, {
    method: "PUT",
    body: JSON.stringify(taskData),
  });

export const deleteTask = (id) =>
  request(`/tasks/${id}`, { method: "DELETE" });

export const toggleTaskStatus = (id) =>
  request(`/tasks/${id}/status`, { method: "PATCH" });

export const searchTasks = (keyword, userId) =>
  request(
    `/tasks/search?keyword=${encodeURIComponent(keyword)}&userId=${userId}`
  );

export const filterByStatus = (status, userId) =>
  request(`/tasks/status/${status}?userId=${userId}`);

export const filterByPriority = (priority, userId) =>
  request(`/tasks/priority/${priority}?userId=${userId}`);
