import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="border-b bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link to="/" className="text-xl font-bold text-slate-900">Primetrade Tasks</Link>
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Link className="text-sm font-medium" to="/dashboard">Dashboard</Link>
              {user.role === 'admin' && <Link className="text-sm font-medium" to="/admin">Admin</Link>}
              <span className="rounded-full bg-slate-100 px-3 py-1 text-sm">{user.name} · {user.role}</span>
              <button className="btn" onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link className="text-sm font-medium" to="/login">Login</Link>
              <Link className="btn" to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
