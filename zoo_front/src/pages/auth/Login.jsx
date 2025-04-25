import chienImage from '/images/chien_2.jpg';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../features/auth/AuthSlice';
import { Link, Navigate, useNavigate } from "react-router-dom";


function SigninForm() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [authError, setAuthError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (formData.username.length < 3) newErrors.username = "Le nom d'utilisateur doit contenir au moins 3 caractères.";
    if (formData.password.length < 8) newErrors.password = "Le mot de passe doit contenir au moins 8 caractères.";

    // Suppression des validations pour les champs qui n'existent pas dans ce formulaire
    // (nom, prenom, email, localisation étaient validés mais absents du formulaire)

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);

      dispatch(loginUser(formData))
        .unwrap() // optionnel : pour utiliser les promesses facilement avec createAsyncThunk
        .then(() => {
          setIsLoading(false);
          navigate(("/"))

        })
        .catch((error) => {
          setIsLoading(false);
          const message = error?.message || "Une erreur s’est produite. Veuillez réessayer.";
          setAuthError(message);
        });
    }
  };

  const icons = {
    pawPrint: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="4" r="2" /><circle cx="18" cy="8" r="2" /><circle cx="20" cy="16" r="2" />
        <path d="M9 10a5 5 0 0 1 5 5v3.5a3.5 3.5 0 0 1-6.84 1.045Q6.52 17.48 4.46 16.84A3.5 3.5 0 0 1 5.5 10Z" />
      </svg>
    ),
    user: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
      </svg>
    ),
    building: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="16" height="20" x="4" y="2" rx="2" ry="2" /><path d="M9 22v-4h6v4" />
        <path d="M8 6h.01" /><path d="M16 6h.01" /><path d="M12 6h.01" /><path d="M12 10h.01" />
        <path d="M12 14h.01" /><path d="M16 10h.01" /><path d="M16 14h.01" /><path d="M8 10h.01" /><path d="M8 14h.01" />
      </svg>
    ),
    eye: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" />
      </svg>
    ),
    eyeOff: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
        <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
        <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
        <line x1="2" x2="22" y1="2" y2="22" />
      </svg>
    ),
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-2 px-3 sm:py-4 sm:px-6">
      <div className="w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-4xl bg-white rounded-xl shadow-md overflow-hidden flex flex-col lg:flex-row">
        {/* Section image optimisée - hauteur relative et hauteur minimale sur mobile */}
        <div className="relative lg:w-1/2 h-40 xs:h-48 sm:h-56 md:h-64 lg:h-auto">
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/50 z-10" />
          <img
            src={chienImage}
            alt="Animaux de compagnie"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-5 z-20 text-white">
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold mb-0.5 sm:mb-1">PetConnect</h1>
            <p className="text-xs sm:text-sm opacity-90">
              Connectez-vous avec des propriétaires d'animaux
            </p>
          </div>
        </div>

        {/* Section formulaire avec padding ajusté */}
        <div className="lg:w-1/2 p-4 sm:p-5 md:p-6 flex flex-col">
          <div className="space-y-1 mb-3 sm:mb-4">
            <div className="flex items-center justify-center mb-2">
              <div className="h-7 w-7 sm:h-8 sm:w-8 rounded-full bg-rose-100 flex items-center justify-center text-rose-600">
                {icons.pawPrint}
              </div>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-center">Connectez-vous à votre compte</h2>
            <p className="text-center text-xs text-gray-500">
              Rejoignez notre communauté d'amoureux des animaux
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            {authError && (
              <div className="bg-red-100 text-red-700 px-3 py-2 rounded text-xs sm:text-sm">
                {authError}
              </div>
            )}            <div>
              <label htmlFor="username" className="block text-xs font-medium mb-1">Nom d'utilisateur</label>
              <input
                id="username"
                name="username"
                type="text"
                placeholder="jean_dupont"
                value={formData.username}
                onChange={handleChange}
                className={`w-full px-3 py-2 text-xs sm:text-sm rounded-lg bg-gray-50 border ${errors.username ? "border-red-500" : "border-gray-200"}`}
              />
              {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-xs font-medium mb-1">Mot de passe</label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 text-xs sm:text-sm rounded-lg bg-gray-50 pr-10 border ${errors.password ? "border-red-500" : "border-gray-200"}`}
                />
                <button
                  type="button"
                  className="absolute right-0 top-0 h-full px-3 flex items-center justify-center text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? icons.eyeOff : icons.eye}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            <button
              type="submit"
              className="w-full bg-rose-600 hover:bg-rose-700 text-white py-2.5 px-4 rounded-lg text-xs sm:text-sm font-medium mt-2 transition-colors duration-200"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Connexion en cours...
                </span>
              ) : "Se connecter"}
            </button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500">
              Vous n'avez pas encore de compte ?{" "}
              <Link to="/sign-up" className="text-rose-600 hover:underline font-medium">Inscrivez-vous</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SigninForm;