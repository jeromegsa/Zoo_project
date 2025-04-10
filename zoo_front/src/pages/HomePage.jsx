import React from 'react';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-teal-400 flex items-center justify-center">
      <div className="text-center">
        {/* Titre principal */}
        <h1 className="text-white text-5xl font-bold mb-6 animate-bounce">
          Trouvez votre compagnon idéal !
        </h1>
        
        {/* Vidéo ou image */}
        <div className="relative w-full max-w-lg mx-auto mb-6">
          <img
            src="https://via.placeholder.com/600x400"
            alt="Animaux"
            className="rounded-lg shadow-lg hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Boutons d'action */}
        <div className="space-x-4">
          <button className="bg-white text-blue-500 px-6 py-3 rounded-lg shadow-md hover:bg-blue-500 hover:text-white transition-colors duration-300">
            Découvrir les animaux
          </button>
          <button className="bg-white text-teal-500 px-6 py-3 rounded-lg shadow-md hover:bg-teal-500 hover:text-white transition-colors duration-300">
            Publier un animal
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
