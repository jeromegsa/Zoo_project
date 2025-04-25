import React from 'react';
import { Routes, Route, Navigate, Outlet , redirect} from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from '../pages/auth/Login';
import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';
import SignupForm from '../pages/signUp/SignPage';
import HomePage from '../pages/Home'
import  EspeceComponent from "../components/espece/Espece"
// Composant de protection de route
const ProtectedRoute = () => {
  const { token } = useSelector(state => state.auth);

  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

// composant de protection des routes publiques 
const ExceptLoginRoute = () => {
  const { token } = useSelector(state => state.auth)
  
  // Si l'utilisateur est connecté, on le redirige vers la page d'accueil
  return token ? <Navigate to="/" replace /> : <Outlet />
}
// Configuration principale des routes
const AppRouter = () => {
  return (
    <Routes>
      {/* Route publique */}
      <Route element={<ExceptLoginRoute />}>
        <Route path="/login" element={<Login />} />
      </Route>
      <Route path="sign-up" element={<SignupForm />} />
      <Route path="/espece" element={<EspeceComponent />} />
      <Route path="/" element={<HomePage />} />



      {/* Routes protégées */}
      <Route element={<ProtectedRoute />}>
        {/* <Route path="/" element={<Dashboard />} /> */}
        <Route path="/profile" element={<Profile />} />
      </Route>

      {/* Gestion des routes inconnues */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRouter;