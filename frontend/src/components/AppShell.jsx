import { Outlet } from 'react-router-dom';
import Navbar from './Navbar.jsx';

const AppShell = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="app-container pb-14 pt-6 md:pt-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AppShell;
