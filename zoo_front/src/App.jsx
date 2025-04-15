import './App.css'
import AppRouter from './routes';
import { authService } from './features/auth/AuthService';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    if (authService.isTokenExpired()) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("token_expiration");
      navigate('/login');
    }
  }, []);
  return (
    <div className="app">
      <AppRouter />
    </div>
  );
}

export default App