import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import App from './App.jsx';
import AppShell from './components/AppShell.jsx';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import './index.css';
import Admin from './pages/Admin.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate replace to="/login" />;
};

const AdminRoute = ({ children }) => {
  const { user } = useAuth();
  return user?.role === 'admin' ? children : <Navigate replace to="/dashboard" />;
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route element={<AppShell />}>
            <Route element={<App />} path="/" />
            <Route element={<Login />} path="/login" />
            <Route element={<Register />} path="/register" />
            <Route
              element={(
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              )}
              path="/dashboard"
            />
            <Route
              element={(
                <AdminRoute>
                  <Admin />
                </AdminRoute>
              )}
              path="/admin"
            />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
