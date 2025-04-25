

import { useState } from "react"

export default function HomePage() {
  const [searchType, setSearchType] = useState("animals")
  const [searchQuery, setSearchQuery] = useState("")
  const [animalType, setAnimalType] = useState("all")

  // Gestion du slider de héros
  const [currentSlide, setCurrentSlide] = useState(0)
  const heroSlides = [
    {
      image: "https://source.unsplash.com/random/1600x800/?dog,pet",
      title: "Envie d'adopter un chien ?",
      cta: "Voir nos annonces chiens",
      links: ["Les chiots à vendre", "Les chiens à adopter"],
    },
    {
      image: "https://source.unsplash.com/random/1600x800/?cat,kitten",
      title: "Envie d'adopter un chat ?",
      cta: "Voir nos annonces chats",
      links: ["Les chatons à vendre", "Les chats à adopter"],
    },
    {
      image: "https://source.unsplash.com/random/1600x800/?rabbit,pet",
      title: "Envie d'adopter un NAC ?",
      cta: "Voir nos annonces NAC",
      links: ["Les NAC à vendre", "Les NAC à adopter"],
    },
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1))
  }

  // Données pour les catégories d'animaux
  const animalCategories = [
    { name: "Chiens", icon: dogIcon },
    { name: "Chats", icon: catIcon },
    { name: "Chevaux", icon: horseIcon },
    { name: "Poissons", icon: fishIcon },
    { name: "Oiseaux", icon: birdIcon },
    { name: "Rongeurs", icon: rodentIcon },
    { name: "NAC", icon: nacIcon },
    { name: "Par Région", icon: mapIcon },
  ]

  // Données pour les annonces d'animaux
  const petListings = [
    {
      id: 1,
      image: "https://source.unsplash.com/random/300x300/?dog,puppy",
      title: "Chiot Berger Australien LOF",
      price: "1 200 €",
      location: "Lyon, Rhône",
      date: "Aujourd'hui, 10:45",
    },
    {
      id: 2,
      image: "https://source.unsplash.com/random/300x300/?cat,kitten",
      title: "Chaton Maine Coon pure race",
      price: "950 €",
      location: "Paris, Île-de-France",
      date: "Hier, 18:30",
    },
    {
      id: 3,
      image: "https://source.unsplash.com/random/300x300/?rabbit",
      title: "Lapin nain à adopter",
      price: "Adoption",
      location: "Marseille, Bouches-du-Rhône",
      date: "Il y a 2 jours",
    },
    {
      id: 4,
      image: "https://source.unsplash.com/random/300x300/?parrot",
      title: "Perroquet Gris du Gabon",
      price: "800 €",
      location: "Toulouse, Haute-Garonne",
      date: "Il y a 3 jours",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4">
          {/* Top navigation */}
          <div className="flex justify-end py-2 text-sm">
            <a href="#" className="text-gray-600 hover:text-rose-600 mr-4">
              Annuaire des élevages
            </a>
            <a href="#" className="text-gray-600 hover:text-rose-600 mr-4">
              Annuaire des services
            </a>
            <a href="#" className="text-rose-600 hover:text-rose-700 font-medium">
              <span className="inline-block mr-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </span>
              Connexion
            </a>
          </div>

          {/* Main navigation */}
          <div className="flex items-center justify-between py-4">
            <a href="#" className="flex items-center">
              <span className="text-2xl font-bold text-gray-800">
                <span className="text-rose-600">UN</span>COMPAGNON
                <span className="text-rose-600">.fr</span>
              </span>
            </a>

            <div className="hidden md:flex items-center space-x-8">
              {animalCategories.map((category, index) => (
                <a key={index} href="#" className="flex flex-col items-center text-gray-700 hover:text-rose-600 group">
                  <div className="w-8 h-8 mb-1 text-gray-500 group-hover:text-rose-600">{category.icon}</div>
                  <span className="text-xs font-medium">{category.name}</span>
                </a>
              ))}
            </div>

            <a
              href="#"
              className="bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
            >
              Déposer une annonce
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[500px] overflow-hidden">
        {/* Slider */}
        <div className="relative h-full">
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-100" : "opacity-0 pointer-events-none"
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent z-10"></div>
              <img src={slide.image || "/placeholder.svg"} alt={slide.title} className="w-full h-full object-cover" />
              <div className="absolute top-1/2 right-20 transform -translate-y-1/2 z-20 text-right">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">{slide.title}</h1>
                <a
                  href="#"
                  className="inline-block bg-rose-600 hover:bg-rose-700 text-white px-6 py-3 rounded-md font-medium transition-colors"
                >
                  {slide.cta}
                </a>
                <div className="mt-4 text-white">
                  {slide.links.map((link, i) => (
                    <a key={i} href="#" className="text-white hover:text-rose-300 text-sm mr-4 underline">
                      {link}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* Navigation arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-30 bg-white/20 hover:bg-white/40 rounded-full p-2 text-white transition-colors"
            aria-label="Précédent"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-30 bg-white/20 hover:bg-white/40 rounded-full p-2 text-white transition-colors"
            aria-label="Suivant"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
            <div className="flex space-x-6 mb-4">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="searchType"
                  checked={searchType === "animals"}
                  onChange={() => setSearchType("animals")}
                  className="h-4 w-4 text-rose-600 focus:ring-rose-500"
                />
                <span className="ml-2 text-gray-700">Annonces animaux</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="searchType"
                  checked={searchType === "services"}
                  onChange={() => setSearchType("services")}
                  className="h-4 w-4 text-rose-600 focus:ring-rose-500"
                />
                <span className="ml-2 text-gray-700">Annonces services</span>
              </label>
            </div>

            <div className="flex">
              <div className="w-1/3 mr-2">
                <select
                  value={animalType}
                  onChange={(e) => setAnimalType(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                >
                  <option value="all">Animaux</option>
                  <option value="dogs">Chiens</option>
                  <option value="cats">Chats</option>
                  <option value="horses">Chevaux</option>
                  <option value="fish">Poissons</option>
                  <option value="birds">Oiseaux</option>
                  <option value="rodents">Rongeurs</option>
                  <option value="nac">NAC</option>
                </select>
              </div>
              <div className="w-2/3 flex">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Saisissez une ville et un rayon"
                  className="flex-1 border border-gray-300 rounded-l-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                />
                <button className="bg-gray-800 hover:bg-gray-900 text-white px-4 py-2 rounded-r-md transition-colors">
                  Rechercher
                </button>
              </div>
            </div>

            <div className="flex justify-between mt-3 text-sm">
              <button className="text-gray-500 hover:text-rose-600">Effacer la recherche</button>
              <button className="text-gray-500 hover:text-rose-600 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                  />
                </svg>
                Plus de filtres
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Listings Section */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Petites annonces d'animaux contrôlées</h2>
          <p className="text-gray-600 mb-6">
            Vous souhaitez adopter des chatons ? Acheter un chien ? Vous recherchez des chiots ou d'autres animaux ?
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {petListings.map((listing) => (
              <a
                key={listing.id}
                href="#"
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={listing.image || "/placeholder.svg"}
                    alt={listing.title}
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-gray-800 mb-1">{listing.title}</h3>
                  <p className="text-rose-600 font-bold mb-2">{listing.price}</p>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>{listing.location}</span>
                    <span>{listing.date}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>

          <div className="text-center mt-8">
            <a
              href="#"
              className="inline-block bg-rose-600 hover:bg-rose-700 text-white px-6 py-3 rounded-md font-medium transition-colors"
            >
              Voir toutes les annonces
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">À propos</h3>
              <p className="text-gray-400 mb-4">
                UnCompagnon.fr est le site de référence pour l'adoption et l'achat d'animaux de compagnie en France.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">Liens rapides</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Accueil
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Déposer une annonce
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Rechercher un animal
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Annuaire des élevages
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Annuaire des services
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">Catégories</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Chiens
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Chats
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Chevaux
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Poissons
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Oiseaux
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    Rongeurs
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white">
                    NAC
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">Contact</h3>
              <p className="text-gray-400 mb-4">Vous avez des questions ? N'hésitez pas à nous contacter.</p>
              <a
                href="#"
                className="inline-block bg-rose-600 hover:bg-rose-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
              >
                Nous contacter
              </a>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} UnCompagnon.fr - Tous droits réservés</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Icônes SVG pour les catégories d'animaux
const dogIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M14 10h.01M8 10h.01M17.5 15a2.5 2.5 0 01-2.5 2.5h-6a2.5 2.5 0 01-2.5-2.5m9.5-7.5a2.5 2.5 0 00-2.5-2.5h-9a2.5 2.5 0 00-2.5 2.5v9a2.5 2.5 0 002.5 2.5h9a2.5 2.5 0 002.5-2.5v-9z"
    />
  </svg>
)

const catIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 14l9-5-9-5-9 5 9 5z" />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
    />
  </svg>
)

const horseIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
    />
  </svg>
)

const fishIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
    />
  </svg>
)

const birdIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76"
    />
  </svg>
)

const rodentIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
)

const nacIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
    />
  </svg>
)

const mapIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
    />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
)
