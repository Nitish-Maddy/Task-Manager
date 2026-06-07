import { useState } from "react";

const emptyForm = {
  title: "",
  description: "",
  priority: "Medium",
  dueDate: "",
};

export default function TaskForm({ onSubmit, onCancel, initialData }) {
  const [form, setForm] = useState(initialData || emptyForm);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (form.title.trim().length < 3) {
      setError("Title must be at least 3 characters");
      return;
    }

    try {
      await onSubmit({
        ...form,
        dueDate: form.dueDate || undefined,
      });
      if (!initialData) {
        setForm(emptyForm);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h3>{initialData ? "Edit Task" : "New Task"}</h3>

      {error && <div className="error">{error}</div>}

      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Task title"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Optional description"
          rows={3}
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="priority">Priority</label>
          <select
            id="priority"
            name="priority"
            value={form.priority}
            onChange={handleChange}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="dueDate">Due Date</label>
          <input
            id="dueDate"
            name="dueDate"
            type="date"
            value={form.dueDate}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {initialData ? "Update" : "Create"}
        </button>
        {onCancel && (
          <button type="button" className="btn btn-ghost" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
