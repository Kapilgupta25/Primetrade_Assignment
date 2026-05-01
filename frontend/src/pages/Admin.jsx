import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar.jsx';
import api from '../api/axios.js';

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const [usersRes, statsRes] = await Promise.all([
          api.get('/admin/users'),
          api.get('/admin/stats')
        ]);
        setUsers(usersRes.data.users);
        setStats(statsRes.data.stats);
      } catch (err) {
        setError(err.response?.data?.message || 'Could not load admin data');
      }
    };

    fetchAdminData();
  }, []);

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        {error && <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}

        {stats && (
          <section className="mt-6 grid gap-4 md:grid-cols-4">
            <div className="card"><p className="text-sm text-slate-500">Users</p><p className="text-3xl font-bold">{stats.users}</p></div>
            <div className="card"><p className="text-sm text-slate-500">Tasks</p><p className="text-3xl font-bold">{stats.tasks}</p></div>
            <div className="card"><p className="text-sm text-slate-500">Completed</p><p className="text-3xl font-bold">{stats.completedTasks}</p></div>
            <div className="card"><p className="text-sm text-slate-500">Pending</p><p className="text-3xl font-bold">{stats.pendingTasks}</p></div>
          </section>
        )}

        <section className="card mt-6 overflow-x-auto">
          <h2 className="text-2xl font-bold">All Users</h2>
          <table className="mt-4 w-full text-left text-sm">
            <thead>
              <tr className="border-b">
                <th className="py-3">Name</th>
                <th className="py-3">Email</th>
                <th className="py-3">Role</th>
                <th className="py-3">Joined</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-b last:border-0">
                  <td className="py-3 font-medium">{user.name}</td>
                  <td className="py-3">{user.email}</td>
                  <td className="py-3">{user.role}</td>
                  <td className="py-3">{new Date(user.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </>
  );
};

export default Admin;
