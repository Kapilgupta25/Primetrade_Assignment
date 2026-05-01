import { useEffect, useState } from 'react';
import { CheckCircle2, ClipboardList, Pencil, RefreshCw, Search, Trash2 } from 'lucide-react';
import api from '../api/axios.js';

const defaultForm = { title: '', description: '', status: 'pending', priority: 'medium' };

const formatLabel = (value) => value.split('-').map((part) => part[0].toUpperCase() + part.slice(1)).join(' ');

const getStatusBadgeClass = (status) => {
  switch (status) {
    case 'completed':
      return 'bg-emerald-50 text-emerald-700';
    case 'in-progress':
      return 'bg-amber-50 text-amber-700';
    default:
      return 'bg-slate-100 text-slate-600';
  }
};

const getPriorityBadgeClass = (priority) => {
  switch (priority) {
    case 'high':
      return 'bg-rose-50 text-rose-700';
    case 'medium':
      return 'bg-blue-50 text-blue-700';
    default:
      return 'bg-slate-100 text-slate-600';
  }
};

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState(defaultForm);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [query, setQuery] = useState('');

  const fetchTasks = async ({ showMessage = false } = {}) => {
    setLoading(true);
    try {
      const { data } = await api.get('/tasks');
      setTasks(data.tasks);
      setError('');
      if (showMessage) {
        setMessage('Tasks refreshed');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Could not fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setSubmitting(true);

    try {
      if (editingId) {
        await api.put(`/tasks/${editingId}`, form);
        setMessage('Task updated successfully');
      } else {
        await api.post('/tasks', form);
        setMessage('Task created successfully');
      }

      setForm(defaultForm);
      setEditingId(null);
      await fetchTasks();
    } catch (err) {
      setError(err.response?.data?.message || 'Action failed');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (task) => {
    setEditingId(task._id);
    setForm({
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this task?')) return;

    setError('');
    try {
      await api.delete(`/tasks/${id}`);
      setMessage('Task deleted successfully');
      await fetchTasks();
    } catch (err) {
      setError(err.response?.data?.message || 'Delete failed');
    }
  };

  const normalizedQuery = query.trim().toLowerCase();
  const filteredTasks = tasks.filter((task) => (
    !normalizedQuery
    || task.title.toLowerCase().includes(normalizedQuery)
    || task.description.toLowerCase().includes(normalizedQuery)
  ));

  const summaryCards = [
    {
      label: 'Total',
      value: tasks.length,
      icon: ClipboardList,
      accent: 'bg-blue-50 text-blue-700'
    },
    {
      label: 'Pending',
      value: tasks.filter((task) => task.status === 'pending').length,
      icon: RefreshCw,
      accent: 'bg-amber-50 text-amber-700'
    },
    {
      label: 'Done',
      value: tasks.filter((task) => task.status === 'completed').length,
      icon: CheckCircle2,
      accent: 'bg-emerald-50 text-emerald-700'
    }
  ];

  return (
    <div className="space-y-6 pb-6">
      <section className="app-section pb-0">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            <p className="page-eyebrow">Dashboard</p>
            <h1 className="section-title">My tasks</h1>
            <p className="max-w-2xl text-sm leading-7 text-slate-600 md:text-base">
              Add tasks, update them, and keep track of what is left to do.
            </p>
          </div>

          <button className="btn-secondary self-start" onClick={() => fetchTasks({ showMessage: true })} type="button">
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </section>

      {message ? <p className="alert-success">{message}</p> : null}
      {error ? <p className="alert-error">{error}</p> : null}

      <section className="grid gap-4 sm:grid-cols-3">
        {summaryCards.map((card) => (
          <article key={card.label} className="rounded-3xl border border-slate-200/80 bg-white/85 p-5 shadow-[0_16px_36px_-28px_rgba(15,23,42,0.35)]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-500">{card.label}</p>
                <p className="mt-2 text-3xl font-semibold text-slate-950">{card.value}</p>
              </div>
              <span className={`rounded-2xl p-3 ${card.accent}`}>
                <card.icon className="h-5 w-5" />
              </span>
            </div>
          </article>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[360px_1fr]">
        <aside className="panel-strong p-6">
          <div className="space-y-2">
            <p className="page-eyebrow">{editingId ? 'Edit task' : 'New task'}</p>
            <h2 className="text-2xl font-semibold">{editingId ? 'Update task' : 'Create task'}</h2>
            <p className="text-sm leading-6 text-slate-600">
              Fill in the details below and save your task.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="label" htmlFor="task-title">Title</label>
              <input
                className="input"
                id="task-title"
                name="title"
                onChange={handleChange}
                placeholder="Example: Finish project report"
                required
                value={form.title}
              />
            </div>

            <div>
              <label className="label" htmlFor="task-description">Description</label>
              <textarea
                className="input min-h-28"
                id="task-description"
                name="description"
                onChange={handleChange}
                placeholder="Add a short note about this task"
                required
                value={form.description}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="label" htmlFor="task-status">Status</label>
                <select className="input" id="task-status" name="status" onChange={handleChange} value={form.status}>
                  <option value="pending">Pending</option>
                  <option value="in-progress">In progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <div>
                <label className="label" htmlFor="task-priority">Priority</label>
                <select className="input" id="task-priority" name="priority" onChange={handleChange} value={form.priority}>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <button className="btn-primary w-full" disabled={submitting} type="submit">
                {submitting ? 'Saving...' : editingId ? 'Update task' : 'Add task'}
              </button>
              {editingId ? (
                <button
                  className="btn-secondary w-full"
                  onClick={() => {
                    setEditingId(null);
                    setForm(defaultForm);
                  }}
                  type="button"
                >
                  Cancel
                </button>
              ) : null}
            </div>
          </form>
        </aside>

        <section className="panel-strong p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="space-y-2">
              <p className="page-eyebrow">Task list</p>
              <h2 className="text-2xl font-semibold">All tasks</h2>
              <p className="text-sm leading-6 text-slate-600">
                Search by title or description to quickly find a task.
              </p>
            </div>

            <div className="relative w-full max-w-sm">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                className="input pl-11"
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search tasks"
                value={query}
              />
            </div>
          </div>

          <div className="mt-5 rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
            Showing <span className="font-semibold text-slate-900">{filteredTasks.length}</span> of{' '}
            <span className="font-semibold text-slate-900">{tasks.length}</span> tasks
          </div>

          <div className="mt-6 space-y-4">
            {loading ? (
              <div className="rounded-3xl border border-dashed border-slate-300 bg-white/60 px-6 py-12 text-center text-slate-500">
                Loading tasks...
              </div>
            ) : null}

            {!loading && tasks.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-slate-300 bg-white/60 px-6 py-12 text-center">
                <p className="text-lg font-semibold text-slate-900">No tasks yet</p>
                <p className="mt-2 text-sm text-slate-600">Create your first task to get started.</p>
              </div>
            ) : null}

            {!loading && tasks.length > 0 && filteredTasks.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-slate-300 bg-white/60 px-6 py-12 text-center">
                <p className="text-lg font-semibold text-slate-900">No matching tasks</p>
                <p className="mt-2 text-sm text-slate-600">Try a different search term.</p>
              </div>
            ) : null}

            {!loading && filteredTasks.map((task) => (
              <article key={task._id} className="rounded-3xl border border-slate-200/80 bg-white/85 p-5 shadow-[0_16px_36px_-30px_rgba(15,23,42,0.35)]">
                <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                  <div className="space-y-3">
                    <div>
                      <h3 className="text-xl font-semibold">{task.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-slate-600">{task.description}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className={`badge ${getStatusBadgeClass(task.status)}`}>{formatLabel(task.status)}</span>
                      <span className={`badge ${getPriorityBadgeClass(task.priority)}`}>{formatLabel(task.priority)} priority</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button className="btn-secondary" onClick={() => handleEdit(task)} type="button">
                      <Pencil className="h-4 w-4" />
                      Edit
                    </button>
                    <button
                      className="btn-secondary text-rose-700 hover:border-rose-200 hover:bg-rose-50"
                      onClick={() => handleDelete(task._id)}
                      type="button"
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </section>
    </div>
  );
};

export default Dashboard;
