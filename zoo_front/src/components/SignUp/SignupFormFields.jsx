import React from "react";

function SignupFormFields({ formData, errors, handleChange }) {
  return (
    <>
      {/* Prénom et Nom */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="prenom" className="block text-sm font-medium mb-1">
            Prénom
          </label>
          <input
            id="prenom"
            name="prenom"
            type="text"
            placeholder="Jean"
            value={formData.prenom}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md ${
              errors.prenom ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.prenom && (
            <p className="text-red-500 text-xs mt-1">{errors.prenom}</p>
          )}
        </div>

        <div>
          <label htmlFor="nom" className="block text-sm font-medium mb-1">
            Nom
          </label>
          <input
            id="nom"
            name="nom"
            type="text"
            placeholder="Dupont"
            value={formData.nom}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md ${
              errors.nom ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.nom && (
            <p className="text-red-500 text-xs mt-1">{errors.nom}</p>
          )}
        </div>
      </div>

      {/* Nom d'utilisateur */}
      <div>
        <label htmlFor="username" className="block text-sm font-medium mb-1">
          Nom d'utilisateur
        </label>
        <input
          id="username"
          name="username"
          type="text"
          placeholder="jean_dupont"
          value={formData.username}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-md ${
            errors.username ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.username && (
          <p className="text-red-500 text-xs mt-1">{errors.username}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="jean.dupont@exemple.fr"
          value={formData.email}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-md ${
            errors.email ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.email && (
          <p className="text-red-500 text-xs mt-1">{errors.email}</p>
        )}
      </div>

      {/* Mot de passe */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium mb-1">
          Mot de passe
        </label>
        <input
          id="password"
          name="password"
          type="password"
          placeholder="••••••••"
          value={formData.password}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-md ${
            errors.password ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.password && (
          <p className="text-red-500 text-xs mt-1">{errors.password}</p>
        )}
      </div>

      {/* Localisation */}
      <div>
        <label htmlFor="localisation" className="block text-sm font-medium mb-1">
          Localisation
        </label>
        <input
          id="localisation"
          name="localisation"
          type="text"
          placeholder="Paris, France"
          value={formData.localisation}
          onChange={handleChange}
          className={`w-full px-3 py-2 border rounded-md ${
            errors.localisation ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.localisation && (
          <p className="text-red-500 text-xs mt-1">{errors.localisation}</p>
        )}
      </div>
    </>
  );
}

export default SignupFormFields;
