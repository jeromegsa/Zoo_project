
import chienImage from '/images/chien_2.jpg';
import { useState } from 'react';
function SignupForm() {
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
      setTimeout(() => setIsLoading(false), 1500);
    }
  };

  const icons = {
    pawPrint: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="4" r="2" /><circle cx="18" cy="8" r="2" /><circle cx="20" cy="16" r="2" />
        <path d="M9 10a5 5 0 0 1 5 5v3.5a3.5 3.5 0 0 1-6.84 1.045Q6.52 17.48 4.46 16.84A3.5 3.5 0 0 1 5.5 10Z" />
      </svg>
    ),
    user: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
      </svg>
    ),
    building: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="16" height="20" x="4" y="2" rx="2" ry="2" /><path d="M9 22v-4h6v4" />
        <path d="M8 6h.01" /><path d="M16 6h.01" /><path d="M12 6h.01" /><path d="M12 10h.01" />
        <path d="M12 14h.01" /><path d="M16 10h.01" /><path d="M16 14h.01" /><path d="M8 10h.01" /><path d="M8 14h.01" />
      </svg>
    ),
    eye: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" />
      </svg>
    ),
    eyeOff: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
        <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
        <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
        <line x1="2" x2="22" y1="2" y2="22" />
      </svg>
    ),
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4 sm:p-6 md:p-8 overflow-y-auto">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-md overflow-hidden flex flex-col lg:flex-row h-auto min-h-[500px] max-h-[90vh]">
        {/* Section image optimisée */}
        <div className="relative lg:w-1/2 h-48 sm:h-64 md:h-80 lg:h-auto max-lg:flex-shrink-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/50 z-10" />
          <img
            src={chienImage}
            alt="Animaux de compagnie"
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8 z-20 text-white">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-1">PetConnect</h1>
            <p className="text-xs sm:text-sm md:text-base opacity-90">
              Connectez-vous avec des propriétaires d'animaux, des refuges et des éleveurs
            </p>
          </div>
        </div>

        {/* Section formulaire scrollable */}
        <div className="lg:w-1/2 p-4 sm:p-6 md:p-8 lg:p-10 flex flex-col overflow-y-auto">
          <div className="space-y-1 mb-4 sm:mb-6">
            <div className="flex items-center justify-center mb-2">
              <div className="h-8 sm:h-10 w-8 sm:w-10 rounded-full bg-rose-100 flex items-center justify-center text-rose-600">
                {icons.pawPrint}
              </div>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-center">Créez votre compte</h2>
            <p className="text-center text-xs sm:text-sm text-gray-500">
              Rejoignez notre communauté d'amoureux des animaux
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-2 sm:space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
              <div>
                <label htmlFor="prenom" className="block text-xs font-medium mb-1">Prénom</label>
                <input
                  id="prenom"
                  name="prenom"
                  type="text"
                  placeholder="Jean"
                  value={formData.prenom}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 text-xs sm:text-sm rounded-lg bg-gray-50 ${errors.prenom ? "border border-red-500" : ""}`}
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
                  className={`w-full px-3 py-2 text-xs sm:text-sm rounded-lg bg-gray-50 ${errors.nom ? "border border-red-500" : ""}`}
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
                className={`w-full px-3 py-2 text-xs sm:text-sm rounded-lg bg-gray-50 ${errors.username ? "border border-red-500" : ""}`}
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
                className={`w-full px-3 py-2 text-xs sm:text-sm rounded-lg bg-gray-50 ${errors.email ? "border border-red-500" : ""}`}
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
                  className={`w-full px-3 py-2 text-xs sm:text-sm rounded-lg bg-gray-50 pr-10 ${errors.password ? "border border-red-500" : ""}`}
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

            <div>
              <label htmlFor="localisation" className="block text-xs font-medium mb-1">Localisation</label>
              <input
                id="localisation"
                name="localisation"
                type="text"
                placeholder="Paris, France"
                value={formData.localisation}
                onChange={handleChange}
                className={`w-full px-3 py-2 text-xs sm:text-sm rounded-lg bg-gray-50 ${errors.localisation ? "border border-red-500" : ""}`}
              />
              {errors.localisation && <p className="text-red-500 text-xs mt-1">{errors.localisation}</p>}
            </div>

            <div className="space-y-2 sm:space-y-3">
              <label className="block text-xs font-medium mb-1">Vous êtes</label>
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                <label className={`cursor-pointer ${formData.role === "user" ? "ring-2 ring-rose-600 bg-rose-50" : ""}`}>
                  <input type="radio" name="role" value="user" checked={formData.role === "user"} onChange={handleChange} className="sr-only" />
                  <div className="flex flex-col items-center justify-between rounded-lg border border-gray-200 bg-white p-2 sm:p-3 hover:bg-gray-50">
                    <span className="mb-1 sm:mb-2 h-5 sm:h-6 w-5 sm:w-6 text-rose-600">{icons.user}</span>
                    <span className="text-center text-xs sm:text-sm font-medium">Utilisateur</span>
                  </div>
                </label>

                <label className={`cursor-pointer ${formData.role === "eleveur" ? "ring-2 ring-rose-600 bg-rose-50" : ""}`}>
                  <input type="radio" name="role" value="eleveur" checked={formData.role === "eleveur"} onChange={handleChange} className="sr-only" />
                  <div className="flex flex-col items-center justify-between rounded-lg border border-gray-200 bg-white p-2 sm:p-3 hover:bg-gray-50">
                    <span className="mb-1 sm:mb-2 h-5 sm:h-6 w-5 sm:w-6 text-rose-600">{icons.pawPrint}</span>
                    <span className="text-center text-xs sm:text-sm font-medium">Éleveur</span>
                  </div>
                </label>

                <label className={`cursor-pointer ${formData.role === "refuge" ? "ring-2 ring-rose-600 bg-rose-50" : ""}`}>
                  <input type="radio" name="role" value="refuge" checked={formData.role === "refuge"} onChange={handleChange} className="sr-only" />
                  <div className="flex flex-col items-center justify-between rounded-lg border border-gray-200 bg-white p-2 sm:p-3 hover:bg-gray-50">
                    <span className="mb-1 sm:mb-2 h-5 sm:h-6 w-5 sm:w-6 text-rose-600">{icons.building}</span>
                    <span className="text-center text-xs sm:text-sm font-medium">Refuge</span>
                  </div>
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-rose-600 hover:bg-rose-700 text-white py-2 px-4 rounded-lg text-xs sm:text-sm font-medium mt-3 sm:mt-4 transition-colors duration-200"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Création en cours...
                </span>
              ) : "Créer mon compte"}
            </button>
          </form>

          <div className="mt-3 sm:mt-4 text-center">
            <p className="text-xs text-gray-500">
              Vous avez déjà un compte?{" "}
              <a href="#" className="text-rose-600 hover:underline font-medium">Connectez-vous</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupForm;