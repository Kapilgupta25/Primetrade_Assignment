import { useEffect, useState } from 'react';
import { CheckCircle2, RefreshCw, Search, ShieldCheck, Users } from 'lucide-react';
import api from '../api/axios.js';

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      const [usersRes, statsRes] = await Promise.all([
        api.get('/admin/users'),
        api.get('/admin/stats')
      ]);
      setUsers(usersRes.data.users);
      setStats(statsRes.data.stats);
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Could not load admin data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  const normalizedQuery = query.trim().toLowerCase();
  const filteredUsers = users.filter((user) => {
    if (!normalizedQuery) return true;

    return (
      user.name.toLowerCase().includes(normalizedQuery)
      || user.email.toLowerCase().includes(normalizedQuery)
      || user.role.toLowerCase().includes(normalizedQuery)
    );
  });

  const statCards = stats ? [
    { label: 'Users', value: stats.users, icon: Users, accent: 'bg-blue-50 text-blue-700' },
    { label: 'Tasks', value: stats.tasks, icon: ShieldCheck, accent: 'bg-slate-100 text-slate-700' },
    { label: 'Completed', value: stats.completedTasks, icon: CheckCircle2, accent: 'bg-emerald-50 text-emerald-700' },
    {
      label: 'Completion rate',
      value: `${stats.tasks ? Math.round((stats.completedTasks / stats.tasks) * 100) : 0}%`,
      icon: RefreshCw,
      accent: 'bg-amber-50 text-amber-700'
    }
  ] : [];

  return (
    <div className="space-y-6 pb-6">
      <section className="app-section pb-0">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-3">
            <p className="page-eyebrow">Admin overview</p>
            <h1 className="section-title">Platform operations</h1>
            <p className="section-copy max-w-2xl">
              Review account access, overall task activity, and completion health from a more structured control surface.
            </p>
          </div>
          <button className="btn-secondary self-start" onClick={fetchAdminData} type="button">
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh data
          </button>
        </div>
      </section>

      {error ? <p className="alert-error">{error}</p> : null}

      {stats ? (
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {statCards.map((card) => (
            <article key={card.label} className="kpi-card">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-slate-500">{card.label}</p>
                  <p className="mt-4 text-4xl font-semibold text-slate-950">{card.value}</p>
                </div>
                <span className={`rounded-2xl p-3 ${card.accent}`}>
                  <card.icon className="h-5 w-5" />
                </span>
              </div>
            </article>
          ))}
        </section>
      ) : null}

      <section className="panel-strong overflow-hidden p-6 sm:p-7">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-2">
            <p className="page-eyebrow">User directory</p>
            <h2 className="text-3xl font-semibold">All registered users</h2>
            <p className="text-sm leading-7 text-slate-600">
              Search by name, email, or role to quickly find the people and permissions you need to review.
            </p>
          </div>
          <div className="relative w-full max-w-md">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              className="input pl-11"
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search users"
              value={query}
            />
          </div>
        </div>

        <div className="mt-6 overflow-x-auto rounded-[28px] border border-slate-200/80 bg-white/85">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50/90 text-slate-500">
              <tr>
                <th className="px-5 py-4 font-semibold">Name</th>
                <th className="px-5 py-4 font-semibold">Email</th>
                <th className="px-5 py-4 font-semibold">Role</th>
                <th className="px-5 py-4 font-semibold">Joined</th>
              </tr>
            </thead>
            <tbody>
              {loading && users.length === 0 ? (
                <tr>
                  <td className="px-5 py-10 text-center text-slate-500" colSpan="4">Loading admin data...</td>
                </tr>
              ) : null}

              {!loading && filteredUsers.length === 0 ? (
                <tr>
                  <td className="px-5 py-10 text-center text-slate-500" colSpan="4">No users match your search.</td>
                </tr>
              ) : null}

              {filteredUsers.map((user) => (
                <tr key={user._id} className="border-t border-slate-200/80">
                  <td className="px-5 py-4">
                    <p className="font-semibold text-slate-900">{user.name}</p>
                  </td>
                  <td className="px-5 py-4 text-slate-600">{user.email}</td>
                  <td className="px-5 py-4">
                    <span className={`badge ${user.role === 'admin' ? 'bg-blue-50 text-blue-700' : 'bg-slate-100 text-slate-600'}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-slate-600">{new Date(user.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Admin;
