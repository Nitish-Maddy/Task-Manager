export default function TaskCard({ task, onToggle, onEdit, onDelete }) {
  const isCompleted = task.status === "Completed";
  const dueDate = task.dueDate
    ? new Date(task.dueDate).toLocaleDateString()
    : null;

  return (
    <div className={`task-card ${isCompleted ? "completed" : ""}`}>
      <div className="task-card-header">
        <button
          type="button"
          className={`complete-btn ${isCompleted ? "is-done" : ""}`}
          onClick={() => onToggle(task._id)}
          aria-label={isCompleted ? "Mark as pending" : "Mark as completed"}
          title={isCompleted ? "Mark as pending" : "Mark as completed"}
        >
          {isCompleted ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          ) : null}
        </button>

        <div className="task-card-body">
          <h3 className="task-title">{task.title}</h3>
          {task.description && (
            <p className="task-description">{task.description}</p>
          )}
        </div>

        <span className={`badge priority-${task.priority.toLowerCase()}`}>
          {task.priority}
        </span>
      </div>

      <div className="task-meta">
        <span className={`badge status-${task.status.toLowerCase()}`}>
          {isCompleted ? "✓ Completed" : "Pending"}
        </span>
        {dueDate && <span className="due-date">Due: {dueDate}</span>}
      </div>

      <div className="task-actions">
        <button
          type="button"
          className={`btn btn-sm ${isCompleted ? "btn-ghost" : "btn-success"}`}
          onClick={() => onToggle(task._id)}
        >
          {isCompleted ? "Mark Pending" : "Mark Complete"}
        </button>
        <button type="button" className="btn btn-sm" onClick={() => onEdit(task)}>
          Edit
        </button>
        <button
          type="button"
          className="btn btn-sm btn-danger"
          onClick={() => onDelete(task._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
