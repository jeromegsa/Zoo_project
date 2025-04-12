import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../features/auth/slice'; // Import de l'action async

function Login() {
  const [credentials, setCredentials] = useState({ 
    username: '', 
    password: '' 
  });
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    try {
      const result = await dispatch(loginUser(credentials)).unwrap();
      if (loginUser.fulfilled.match(result)) {}
      if (result.user) {
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.message || 'Identifiants incorrects');
    }
  };

  return (
    <div className="login-form">
      <h2>Connexion</h2>
      {error && <div className="error">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={credentials.username}
          onChange={(e) => setCredentials({...credentials, username: e.target.value})}
          placeholder="Nom d'utilisateur"
          required
        />
        
        <input
          type="password"
          value={credentials.password}
          onChange={(e) => setCredentials({...credentials, password: e.target.value})}
          placeholder="Mot de passe"
          required
        />
        
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
}

export default Login;