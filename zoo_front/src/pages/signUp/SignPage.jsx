import chienImage from '/images/chien_2.jpg';
import { useState } from 'react';
import { User, PawPrint, Building2 } from "lucide-react";
import { useDispatch } from 'react-redux';
import { registerUser } from '../../features/user/UserSlice'; 
import { Link } from 'react-router-dom';
const icons = {
  user: <User className="h-5 w-5 sm:h-6 sm:w-6" />,
  pawPrint: <PawPrint className="h-5 w-5 sm:h-6 sm:w-6" />,
  building: <Building2 className="h-5 w-5 sm:h-6 sm:w-6" />,
};

function SignupForm() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: "",
    nom: "",
    prenom: "",
    email: "",
    password: "",
    localisation: "",
    role: "user",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (formData.username.length < 3) newErrors.username = "Le nom d'utilisateur doit contenir au moins 3 caractères.";
    if (formData.nom.length < 2) newErrors.nom = "Le nom doit contenir au moins 2 caractères.";
    if (formData.prenom.length < 2) newErrors.prenom = "Le prénom doit contenir au moins 2 caractères.";
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = "Veuillez entrer une adresse email valide.";
    if (formData.password.length < 8) newErrors.password = "Le mot de passe doit contenir au moins 8 caractères.";
    if (formData.localisation.length < 2) newErrors.localisation = "Veuillez entrer une localisation valide.";

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

      dispatch(registerUser(formData))
        .unwrap() // optionnel : pour utiliser les promesses facilement avec createAsyncThunk
        .then(() => {
          setIsLoading(false);
          // redirection, message, reset du formulaire, etc.
        })
        .catch((error) => {
          setIsLoading(false);
          // gestion d'erreur
          console.error("Erreur d'inscription :", error);
        });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 sm:p-6 md:p-8">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-md overflow-hidden flex flex-col lg:flex-row">

        {/* Section image */}
        <div className="relative w-full lg:w-1/2 h-64 lg:h-auto">
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/50 z-10" />
          <img
            src={chienImage}
            alt="Animaux de compagnie"
            className="object-cover w-full h-full"
          />
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 z-20 text-white">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1">PetConnect</h1>
            <p className="text-xs sm:text-sm md:text-base opacity-90">
              Connectez-vous avec des propriétaires d'animaux, des refuges et des éleveurs
            </p>
          </div>
        </div>

        {/* Formulaire */}
        <div className="w-full lg:w-1/2 overflow-y-auto p-4 sm:p-6 md:p-8 max-h-screen">
          <div className="space-y-1 mb-4 sm:mb-6 text-center">
            <div className="flex justify-center mb-2">
              <div className="h-10 w-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-600">
                🐾
              </div>
            </div>
            <h2 className="text-lg sm:text-xl font-bold">Créez votre compte</h2>
            <p className="text-xs sm:text-sm text-gray-500">Rejoignez notre communauté d'amoureux des animaux</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="prenom" className="block text-xs font-medium mb-1">Prénom</label>
                <input
                  id="prenom"
                  name="prenom"
                  type="text"
                  placeholder="Jean"
                  value={formData.prenom}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 text-sm rounded-lg bg-gray-50 ${errors.prenom ? "border border-red-500" : ""}`}
                />
                {errors.prenom && <p className="text-red-500 text-xs mt-1">{errors.prenom}</p>}
              </div>

              <div>
                <label htmlFor="nom" className="block text-xs font-medium mb-1">Nom</label>
                <input
                  id="nom"
                  name="nom"
                  type="text"
                  placeholder="Dupont"
                  value={formData.nom}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 text-sm rounded-lg bg-gray-50 ${errors.nom ? "border border-red-500" : ""}`}
                />
                {errors.nom && <p className="text-red-500 text-xs mt-1">{errors.nom}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="username" className="block text-xs font-medium mb-1">Nom d'utilisateur</label>
              <input
                id="username"
                name="username"
                type="text"
                placeholder="jean_dupont"
                value={formData.username}
                onChange={handleChange}
                className={`w-full px-3 py-2 text-sm rounded-lg bg-gray-50 ${errors.username ? "border border-red-500" : ""}`}
              />
              {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-xs font-medium mb-1">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="jean.dupont@exemple.fr"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-3 py-2 text-sm rounded-lg bg-gray-50 ${errors.email ? "border border-red-500" : ""}`}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
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
                  className={`w-full px-3 py-2 text-sm rounded-lg bg-gray-50 pr-10 ${errors.password ? "border border-red-500" : ""}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-0 h-full px-3 text-gray-500"
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
            </div>

            <div>
              <label htmlFor="localisation" className="block text-xs font-medium mb-1">Localisation</label>
              <input
                id="localisation"
                name="localisation"
                type="text"
                placeholder="Paris, France"
                value={formData.localisation}
                onChange={handleChange}
                className={`w-full px-3 py-2 text-sm rounded-lg bg-gray-50 ${errors.localisation ? "border border-red-500" : ""}`}
              />
              {errors.localisation && <p className="text-red-500 text-xs mt-1">{errors.localisation}</p>}
            </div>

            <div className="space-y-2 sm:space-y-3">
              <label className="block text-xs font-medium mb-1">Vous êtes</label>
              <div className="grid grid-cols-3 gap-2 sm:gap-3">

                <label
                  className={`cursor-pointer ${formData.role === "user" ? "ring-2 ring-rose-600 bg-rose-50" : ""
                    } rounded-lg border border-gray-200`}
                >
                  <input
                    type="radio"
                    name="role"
                    value="user"
                    checked={formData.role === "user"}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div className="flex flex-col items-center justify-between bg-white p-2 sm:p-3 hover:bg-gray-50">
                    <span className="mb-1 sm:mb-2 h-5 sm:h-6 w-5 sm:w-6 text-rose-600">
                      {icons.user}
                    </span>
                    <span className="text-center text-xs sm:text-sm font-medium">
                      Utilisateur
                    </span>
                  </div>
                </label>

                <label
                  className={`cursor-pointer ${formData.role === "eleveur" ? "ring-2 ring-rose-600 bg-rose-50" : ""
                    } rounded-lg border border-gray-200`}
                >
                  <input
                    type="radio"
                    name="role"
                    value="eleveur"
                    checked={formData.role === "eleveur"}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div className="flex flex-col items-center justify-between bg-white p-2 sm:p-3 hover:bg-gray-50">
                    <span className="mb-1 sm:mb-2 h-5 sm:h-6 w-5 sm:w-6 text-rose-600">
                      {icons.pawPrint}
                    </span>
                    <span className="text-center text-xs sm:text-sm font-medium">
                      Éleveur
                    </span>
                  </div>
                </label>

                <label
                  className={`cursor-pointer ${formData.role === "refuge" ? "ring-2 ring-rose-600 bg-rose-50" : ""
                    } rounded-lg border border-gray-200`}
                >
                  <input
                    type="radio"
                    name="role"
                    value="refuge"
                    checked={formData.role === "refuge"}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div className="flex flex-col items-center justify-between bg-white p-2 sm:p-3 hover:bg-gray-50">
                    <span className="mb-1 sm:mb-2 h-5 sm:h-6 w-5 sm:w-6 text-rose-600">
                      {icons.building}
                    </span>
                    <span className="text-center text-xs sm:text-sm font-medium">
                      Refuge
                    </span>
                  </div>
                </label>

              </div>
            </div>

            <button
              type="submit"
              className="mt-4 w-full bg-rose-600 text-white py-2 rounded-lg hover:bg-rose-700 transition"
              disabled={isLoading}
            >
              {isLoading ? "Chargement..." : "Créer un compte"}
            </button>
          </form>
        </div>
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            Vous avez déjà  un compte ?{" "}
            <Link to="/login" className="text-rose-600 hover:underline font-medium">Connectez-vous</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignupForm;
