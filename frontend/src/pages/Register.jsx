import { useState } from 'react';
import { LayoutDashboard, ShieldCheck, UserPlus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout.jsx';
import { useAuth } from '../context/AuthContext.jsx';

const Register = () => {
  const { register, loading } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'user' });
  const [error, setError] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await register(form);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <AuthLayout
      description="Create a new account to manage tasks, keep priorities organized, and unlock admin visibility where needed."
      eyebrow="Set up your workspace"
      footer="No new backend behavior is introduced here. Registration still uses the same auth endpoint while the UI adds clearer guidance and state handling."
      highlights={[
        {
          title: 'Quick onboarding',
          description: 'Simple account setup with clearer labels and a more trustworthy first-run experience.',
          icon: UserPlus
        },
        {
          title: 'Task-focused dashboard',
          description: 'New users land straight into a workspace designed to highlight priorities and progress.',
          icon: LayoutDashboard
        },
        {
          title: 'Admin-ready roles',
          description: 'Choose between user and admin access using the same role-based backend behavior.',
          icon: ShieldCheck
        }
      ]}
      title="Create a team-ready account in a calmer, more guided flow."
    >
      <div className="space-y-6">
        <div className="space-y-3">
          <p className="page-eyebrow">New account</p>
          <h1 className="section-title text-4xl md:text-5xl">Register</h1>
          <p className="text-sm leading-7 text-slate-600">
            Start with a secure account and choose the access level that matches how you want to use the app.
          </p>
        </div>

        {error ? <p className="alert-error">{error}</p> : null}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="label" htmlFor="register-name">Full name</label>
            <input
              className="input"
              id="register-name"
              name="name"
              onChange={handleChange}
              placeholder="Kapil Sharma"
              required
              value={form.name}
            />
          </div>

          <div>
            <label className="label" htmlFor="register-email">Email address</label>
            <input
              className="input"
              id="register-email"
              name="email"
              onChange={handleChange}
              placeholder="team@primetrade.ai"
              required
              type="email"
              value={form.email}
            />
          </div>

          <div>
            <label className="label" htmlFor="register-password">Password</label>
            <input
              className="input"
              id="register-password"
              minLength={6}
              name="password"
              onChange={handleChange}
              placeholder="At least 6 characters"
              required
              type="password"
              value={form.password}
            />
          </div>

          <div>
            <label className="label" htmlFor="register-role">Access level</label>
            <select
              className="input"
              id="register-role"
              name="role"
              onChange={handleChange}
              value={form.role}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <p className="mt-2 text-xs leading-6 text-slate-500">
              Choose <span className="font-semibold text-slate-700">admin</span> only if you need user oversight and platform stats.
            </p>
          </div>

          <button className="btn-primary w-full" disabled={loading} type="submit">
            {loading ? 'Creating account...' : 'Create account'}
          </button>
        </form>

        <p className="text-sm text-slate-600">
          Already registered?{' '}
          <Link className="font-semibold text-slate-950 transition hover:text-blue-700" to="/login">
            Sign in instead
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default Register;
