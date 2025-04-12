import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from '../pages/auth/Login';
import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';

// Composant de protection de route
const ProtectedRoute = () => {
  const { token } = useSelector(state => state.auth);
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

// Configuration principale des routes
const AppRouter = () => {
  return (
    <Routes>
      {/* Route publique */}
      <Route path="/login" element={<Login />} />
      
      {/* Routes protégées */}
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
      </Route>
      
      {/* Gestion des routes inconnues */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRouter;