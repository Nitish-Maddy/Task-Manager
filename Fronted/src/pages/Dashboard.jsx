import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import Layout from "../components/Layout";
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";
import * as tasksApi from "../api/tasks";

export default function Dashboard() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [showCompleted, setShowCompleted] = useState(true);

  const userId = user.id || user._id;

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      let res;

      if (search.trim()) {
        res = await tasksApi.searchTasks(search.trim(), userId);
      } else if (statusFilter) {
        res = await tasksApi.filterByStatus(statusFilter, userId);
      } else if (priorityFilter) {
        res = await tasksApi.filterByPriority(priorityFilter, userId);
      } else {
        res = await tasksApi.getTasksByUser(userId);
      }

      setTasks(res.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [userId, search, statusFilter, priorityFilter]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const pendingTasks = tasks.filter((task) => task.status === "Pending");
  const completedTasks = tasks.filter((task) => task.status === "Completed");

  const handleCreate = async (taskData) => {
    await tasksApi.createTask({ ...taskData, userId });
    setShowForm(false);
    fetchTasks();
  };

  const handleUpdate = async (taskData) => {
    await tasksApi.updateTask(editingTask._id, taskData);
    setEditingTask(null);
    fetchTasks();
  };

  const handleToggle = async (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task._id === id
          ? {
              ...task,
              status: task.status === "Pending" ? "Completed" : "Pending",
            }
          : task
      )
    );

    try {
      await tasksApi.toggleTaskStatus(id);
    } catch (err) {
      setError(err.message);
      fetchTasks();
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this task?")) return;
    await tasksApi.deleteTask(id);
    fetchTasks();
  };

  const clearFilters = () => {
    setSearch("");
    setStatusFilter("");
    setPriorityFilter("");
  };

  const hasFilters = search || statusFilter || priorityFilter;

  const renderTaskGrid = (taskList) => (
    <div className="task-grid">
      {taskList.map((task) => (
        <TaskCard
          key={task._id}
          task={task}
          onToggle={handleToggle}
          onEdit={setEditingTask}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );

  return (
    <Layout>
      <div className="dashboard">
        <div className="dashboard-header">
          <div>
            <h1>My Tasks</h1>
            <div className="task-stats">
              <span className="stat stat-pending">
                {pendingTasks.length} pending
              </span>
              <span className="stat-divider">·</span>
              <span className="stat stat-completed">
                {completedTasks.length} completed
              </span>
            </div>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => {
              setEditingTask(null);
              setShowForm(!showForm);
            }}
          >
            {showForm ? "Close" : "+ New Task"}
          </button>
        </div>

        <div className="filters">
          <input
            type="text"
            className="search-input"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => {
              setStatusFilter("");
              setPriorityFilter("");
              setSearch(e.target.value);
            }}
          />
          <select
            value={statusFilter}
            onChange={(e) => {
              setSearch("");
              setPriorityFilter("");
              setStatusFilter(e.target.value);
            }}
          >
            <option value="">All statuses</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
          <select
            value={priorityFilter}
            onChange={(e) => {
              setSearch("");
              setStatusFilter("");
              setPriorityFilter(e.target.value);
            }}
          >
            <option value="">All priorities</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          {hasFilters && (
            <button className="btn btn-ghost" onClick={clearFilters}>
              Clear
            </button>
          )}
        </div>

        {error && <div className="error">{error}</div>}

        {(showForm || editingTask) && (
          <TaskForm
            initialData={
              editingTask
                ? {
                    title: editingTask.title,
                    description: editingTask.description || "",
                    priority: editingTask.priority,
                    dueDate: editingTask.dueDate
                      ? editingTask.dueDate.split("T")[0]
                      : "",
                  }
                : null
            }
            onSubmit={editingTask ? handleUpdate : handleCreate}
            onCancel={() => {
              setShowForm(false);
              setEditingTask(null);
            }}
          />
        )}

        {loading ? (
          <div className="loading">Loading tasks...</div>
        ) : tasks.length === 0 ? (
          <div className="empty-state">
            <p>No tasks found.</p>
            {!showForm && (
              <button
                className="btn btn-primary"
                onClick={() => setShowForm(true)}
              >
                Create your first task
              </button>
            )}
          </div>
        ) : (
          <div className="task-sections">
            {pendingTasks.length > 0 && (
              <section className="task-section">
                <h2 className="section-title">
                  To Do
                  <span className="section-count">{pendingTasks.length}</span>
                </h2>
                {renderTaskGrid(pendingTasks)}
              </section>
            )}

            {completedTasks.length > 0 && (
              <section className="task-section task-section-completed">
                <button
                  type="button"
                  className="section-title section-toggle"
                  onClick={() => setShowCompleted((prev) => !prev)}
                >
                  Completed
                  <span className="section-count">{completedTasks.length}</span>
                  <span className="toggle-icon">{showCompleted ? "▾" : "▸"}</span>
                </button>
                {showCompleted && renderTaskGrid(completedTasks)}
              </section>
            )}

            {pendingTasks.length === 0 && completedTasks.length > 0 && (
              <div className="all-done">
                <p>All tasks completed — great work!</p>
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}
