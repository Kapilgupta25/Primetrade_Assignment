import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar.jsx';
import api from '../api/axios.js';

const defaultForm = { title: '', description: '', status: 'pending', priority: 'medium' };

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState(defaultForm);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/tasks');
      setTasks(data.tasks);
    } catch (err) {
      setError(err.response?.data?.message || 'Could not fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchTasks(); }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
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
      fetchTasks();
    } catch (err) {
      setError(err.response?.data?.message || 'Action failed');
    }
  };

  const handleEdit = (task) => {
    setEditingId(task._id);
    setForm({ title: task.title, description: task.description, status: task.status, priority: task.priority });
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this task?')) return;
    try {
      await api.delete(`/tasks/${id}`);
      setMessage('Task deleted successfully');
      fetchTasks();
    } catch (err) {
      setError(err.response?.data?.message || 'Delete failed');
    }
  };

  return (
    <>
      <Navbar />
      <main className="mx-auto grid max-w-6xl gap-6 px-4 py-8 lg:grid-cols-[380px_1fr]">
        <section className="card h-fit">
          <h1 className="text-2xl font-bold">{editingId ? 'Update Task' : 'Create Task'}</h1>
          {message && <p className="mt-4 rounded-lg bg-green-50 p-3 text-sm text-green-700">{message}</p>}
          {error && <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            <input className="input" name="title" placeholder="Task title" value={form.title} onChange={handleChange} required />
            <textarea className="input min-h-28" name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
            <select className="input" name="status" value={form.status} onChange={handleChange}>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
            <select className="input" name="priority" value={form.priority} onChange={handleChange}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <button className="btn w-full">{editingId ? 'Update Task' : 'Add Task'}</button>
            {editingId && <button type="button" className="w-full rounded-lg border px-4 py-2" onClick={() => { setEditingId(null); setForm(defaultForm); }}>Cancel Edit</button>}
          </form>
        </section>

        <section className="card">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Tasks</h2>
            <button className="rounded-lg border px-3 py-2 text-sm" onClick={fetchTasks}>Refresh</button>
          </div>
          {loading ? <p className="mt-6 text-slate-600">Loading...</p> : null}
          <div className="mt-6 grid gap-4">
            {tasks.length === 0 && !loading ? <p className="text-slate-600">No tasks found.</p> : null}
            {tasks.map((task) => (
              <article key={task._id} className="rounded-xl border p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-bold">{task.title}</h3>
                    <p className="mt-1 text-slate-600">{task.description}</p>
                    <div className="mt-3 flex gap-2 text-xs">
                      <span className="rounded-full bg-slate-100 px-3 py-1">{task.status}</span>
                      <span className="rounded-full bg-slate-100 px-3 py-1">{task.priority}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="rounded-lg border px-3 py-2 text-sm" onClick={() => handleEdit(task)}>Edit</button>
                    <button className="rounded-lg bg-red-600 px-3 py-2 text-sm text-white" onClick={() => handleDelete(task._id)}>Delete</button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </>
  );
};

export default Dashboard;
