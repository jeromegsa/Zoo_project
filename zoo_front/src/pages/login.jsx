import React, { useState } from "react";
import tigreImage from "../assets/login_tigre.jpg";
import { login } from "../api/auth"; // Assurez-vous que cette fonction est bien définie dans auth.js

const LoginPage = () => {
  const [username, setUsername] = useState(""); // Stocke le username
  const [password, setPassword] = useState(""); // Stocke le password
  const [error, setError] = useState(""); // Gère les erreurs

  const handleLogin = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page

    if (!username || !password) {
      setError("Veuillez remplir tous les champs.");
      return;
    }

    const result = await login(username, password);

    if (result.success) {
      localStorage.setItem("token", result.token);
      alert("Connexion réussie !");
      window.location.href = "/dashboard"; // Redirection
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-green-100 px-4">
      {/* Carte principale */}
      <div className="w-full max-w-4xl flex flex-col md:flex-row bg-white shadow-lg rounded-2xl overflow-hidden h-auto md:h-[600px]">
        {/* Image à gauche */}
        <div
          className="md:w-1/2 h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${tigreImage})` }}
        ></div>

        {/* Formulaire */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center relative">
          <div
            className="absolute inset-0 bg-cover bg-center md:hidden opacity-20"
            style={{ backgroundImage: `url(${tigreImage})` }}
          ></div>

          <h2 className="text-3xl font-bold text-green-800 text-center mb-6 relative z-10">
            Connexion
          </h2>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          <form onSubmit={handleLogin} className="relative z-10">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                placeholder="Entrer votre username"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Mot de passe
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-700 text-white p-3 rounded-lg hover:bg-green-800 transition-all"
            >
              Se connecter
            </button>
          </form>

          <p className="text-center text-gray-600 text-sm mt-4 relative z-10">
            Pas encore de compte ?{" "}
            <a href="#" className="text-green-700 font-bold">
              S'inscrire
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
