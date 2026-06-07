export default function TaskCard({ task, onToggle, onEdit, onDelete }) {
  const dueDate = task.dueDate
    ? new Date(task.dueDate).toLocaleDateString()
    : null;

  return (
    <div className={`task-card ${task.status === "Completed" ? "completed" : ""}`}>
      <div className="task-card-header">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={task.status === "Completed"}
            onChange={() => onToggle(task._id)}
          />
          <span className="task-title">{task.title}</span>
        </label>
        <span className={`badge priority-${task.priority.toLowerCase()}`}>
          {task.priority}
        </span>
      </div>

      {task.description && (
        <p className="task-description">{task.description}</p>
      )}

      <div className="task-meta">
        <span className={`badge status-${task.status.toLowerCase()}`}>
          {task.status}
        </span>
        {dueDate && <span className="due-date">Due: {dueDate}</span>}
      </div>

      <div className="task-actions">
        <button className="btn btn-sm" onClick={() => onEdit(task)}>
          Edit
        </button>
        <button
          className="btn btn-sm btn-danger"
          onClick={() => onDelete(task._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
