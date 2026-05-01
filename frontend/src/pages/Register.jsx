import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
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
    <>
      <Navbar />
      <main className="mx-auto max-w-md px-4 py-12">
        <form onSubmit={handleSubmit} className="card space-y-4">
          <h1 className="text-2xl font-bold">Register</h1>
          {error && <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>}
          <input className="input" name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
          <input className="input" name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
          <input className="input" name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required minLength={6} />
          <select className="input" name="role" value={form.role} onChange={handleChange}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <button className="btn w-full" disabled={loading}>{loading ? 'Creating account...' : 'Register'}</button>
          <p className="text-sm text-slate-600">Already have account? <Link className="font-semibold text-slate-900" to="/login">Login</Link></p>
        </form>
      </main>
    </>
  );
};

export default Register;
