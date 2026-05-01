import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, LineChart, LogIn, LogOut, Menu, ShieldCheck, UserPlus, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const links = user
    ? [
        { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
        ...(user.role === 'admin' ? [{ to: '/admin', label: 'Admin', icon: ShieldCheck }] : [])
      ]
    : [];

  const initials = user?.name
    ?.split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getNavClassName = ({ isActive }) => `nav-link ${isActive ? 'nav-link-active' : ''}`;

  return (
    <header className="sticky top-0 z-30 border-b border-white/60 bg-slate-50/75 backdrop-blur-xl">
      <div className="app-container py-4">
        <div className="panel flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <Link to="/" className="flex items-center gap-3 rounded-full pr-2 transition hover:opacity-90">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-lg shadow-blue-900/20">
              <LineChart className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-700">PrimeTrade</p>
              <p className="text-sm font-semibold text-slate-900 sm:text-base">Task Command Center</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-2 md:flex">
            {links.map((link) => (
              <NavLink key={link.to} className={getNavClassName} to={link.to}>
                <span className="inline-flex items-center gap-2">
                  <link.icon className="h-4 w-4" />
                  {link.label}
                </span>
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            {user ? (
              <>
                <div className="flex items-center gap-3 rounded-full border border-slate-200/80 bg-white px-3 py-2 shadow-sm">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-sm font-bold text-blue-700">
                    {initials}
                  </span>
                  <div className="text-sm">
                    <p className="font-semibold text-slate-900">{user.name}</p>
                    <p className="capitalize text-slate-500">{user.role} access</p>
                  </div>
                </div>
                <button className="btn-secondary" onClick={handleLogout} type="button">
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavLink className={getNavClassName} to="/login">
                  <span className="inline-flex items-center gap-2">
                    <LogIn className="h-4 w-4" />
                    Login
                  </span>
                </NavLink>
                <Link className="btn-primary" to="/register">
                  <UserPlus className="h-4 w-4" />
                  Create account
                </Link>
              </>
            )}
          </div>

          <button
            aria-expanded={mobileOpen}
            aria-label="Toggle navigation"
            className="btn-secondary px-3 py-3 md:hidden"
            onClick={() => setMobileOpen((open) => !open)}
            type="button"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>

        {mobileOpen ? (
          <div className="panel mt-3 space-y-4 px-4 py-4 md:hidden">
            {links.length > 0 ? (
              <nav className="grid gap-2">
                {links.map((link) => (
                  <NavLink key={link.to} className={getNavClassName} to={link.to}>
                    <span className="inline-flex items-center gap-2">
                      <link.icon className="h-4 w-4" />
                      {link.label}
                    </span>
                  </NavLink>
                ))}
              </nav>
            ) : null}

            {user ? (
              <div className="space-y-3">
                <div className="rounded-3xl border border-slate-200/80 bg-white p-4">
                  <p className="font-semibold text-slate-900">{user.name}</p>
                  <p className="mt-1 text-sm capitalize text-slate-500">{user.role} access</p>
                </div>
                <button className="btn-secondary w-full" onClick={handleLogout} type="button">
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="grid gap-2">
                <Link className="btn-secondary w-full" to="/login">
                  <LogIn className="h-4 w-4" />
                  Login
                </Link>
                <Link className="btn-primary w-full" to="/register">
                  <UserPlus className="h-4 w-4" />
                  Create account
                </Link>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </header>
  );
};

export default Navbar;
