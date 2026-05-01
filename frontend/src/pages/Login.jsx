import { useState } from 'react';
import { LayoutDashboard, ShieldCheck, Sparkles } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../components/AuthLayout.jsx';
import { useAuth } from '../context/AuthContext.jsx';

const Login = () => {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(form);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <AuthLayout
      description="Sign in to manage tasks, review work status, and access your role-based workspace from one focused dashboard."
      eyebrow="Welcome back"
      footer="Use the same API-backed auth flow as before. This pass improves clarity, confidence, and responsiveness without changing the contract."
      highlights={[
        {
          title: 'Protected by JWT',
          description: 'Session handling stays aligned with the backend auth middleware and protected routes.',
          icon: ShieldCheck
        },
        {
          title: 'Fast task access',
          description: 'Get back to your dashboard quickly with clearer forms and calmer feedback states.',
          icon: Sparkles
        },
        {
          title: 'Role-aware experience',
          description: 'Users and admins land in the spaces that make sense for their access level.',
          icon: LayoutDashboard
        }
      ]}
      title="Pick up where your team left off."
    >
      <div className="space-y-6">
        <div className="space-y-3">
          <p className="page-eyebrow">Account access</p>
          <h1 className="section-title text-4xl md:text-5xl">Sign in</h1>
          <p className="text-sm leading-7 text-slate-600">
            Enter your account details to reach the protected dashboard and continue managing your work.
          </p>
        </div>

        {error ? <p className="alert-error">{error}</p> : null}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="label" htmlFor="login-email">Email address</label>
            <input
              className="input"
              id="login-email"
              name="email"
              onChange={handleChange}
              placeholder="team@primetrade.ai"
              required
              type="email"
              value={form.email}
            />
          </div>

          <div>
            <label className="label" htmlFor="login-password">Password</label>
            <input
              className="input"
              id="login-password"
              name="password"
              onChange={handleChange}
              placeholder="Enter your password"
              required
              type="password"
              value={form.password}
            />
          </div>

          <button className="btn-primary w-full" disabled={loading} type="submit">
            {loading ? 'Signing in...' : 'Sign in to dashboard'}
          </button>
        </form>

        <p className="text-sm text-slate-600">
          New here?{' '}
          <Link className="font-semibold text-slate-950 transition hover:text-blue-700" to="/register">
            Create your account
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default Login;
