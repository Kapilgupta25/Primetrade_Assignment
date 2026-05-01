import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
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
    <>
      <Navbar />
      <main className="mx-auto max-w-md px-4 py-12">
        <form onSubmit={handleSubmit} className="card space-y-4">
          <h1 className="text-2xl font-bold">Login</h1>
          {error && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
          <input className="input" name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
          <input className="input" name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
          <button className="btn w-full" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
          <p className="text-sm text-slate-600">No account? <Link className="font-semibold text-slate-900" to="/register">Register</Link></p>
        </form>
      </main>
    </>
  );
};

export default Login;
