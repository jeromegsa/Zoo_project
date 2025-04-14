"use client"

import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { Search, Heart, PawPrint, Home, Users, Shield, ArrowRight, Menu, X, LogOut } from "lucide-react"
import { Button } from "../components/ui/Button" 
import { Input } from "../components/ui/Input" 

import { logout } from "../features/auth/slice" 

export default function PetLandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Récupérer l'état d'authentification et les informations utilisateur depuis Redux
  const { isAuthenticated, user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Fonction pour gérer la déconnexion
  const handleLogout = () => {
    dispatch(logout())
    // Rediriger vers la page d'accueil ou de connexion après déconnexion
    navigate("/")
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <PawPrint className="h-6 w-6 text-rose-500" />
            <span className="text-xl font-bold">PetConnect</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-sm font-medium transition-colors hover:text-primary">
              Accueil
            </Link>
            <Link
              to="/search"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              Trouver un animal
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  to="/post"
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                >
                  Déposer une annonce
                </Link>
                <Link
                  to="/favorites"
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                >
                  Mes favoris
                </Link>
                <Link
                  to="/messages"
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                >
                  Messages
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/shelters"
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                >
                  Refuges
                </Link>
                <Link
                  to="/about"
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                >
                  À propos
                </Link>
              </>
            )}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-muted overflow-hidden">
                    {user?.profileImage ? (
                      <img
                        src={user.profileImage || "/placeholder.svg"}
                        alt={user.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center bg-rose-100 text-rose-500">
                        {user?.name?.charAt(0) || "U"}
                      </div>
                    )}
                  </div>
                  <span className="text-sm font-medium">{user?.name || "Utilisateur"}</span>
                </div>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Déconnexion
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" size="sm" onClick={() => navigate("/login")}>
                  Se connecter
                </Button>
                <Button size="sm" onClick={() => navigate("/register")}>
                  S'inscrire
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t p-4">
            <nav className="flex flex-col space-y-4">
              <Link to="/" className="text-sm font-medium transition-colors hover:text-primary">
                Accueil
              </Link>
              <Link
                to="/search"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Trouver un animal
              </Link>

              {isAuthenticated ? (
                <>
                  <Link
                    to="/post"
                    className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                  >
                    Déposer une annonce
                  </Link>
                  <Link
                    to="/favorites"
                    className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                  >
                    Mes favoris
                  </Link>
                  <Link
                    to="/messages"
                    className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                  >
                    Messages
                  </Link>
                  <div className="flex items-center gap-2 pt-2">
                    <div className="h-8 w-8 rounded-full bg-muted overflow-hidden">
                      {user?.profileImage ? (
                        <img
                          src={user.profileImage || "/placeholder.svg"}
                          alt={user.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center bg-rose-100 text-rose-500">
                          {user?.name?.charAt(0) || "U"}
                        </div>
                      )}
                    </div>
                    <span className="text-sm font-medium">{user?.name || "Utilisateur"}</span>
                  </div>
                  <Button variant="outline" size="sm" className="mt-2" onClick={handleLogout}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Déconnexion
                  </Button>
                </>
              ) : (
                <>
                  <Link
                    to="/shelters"
                    className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                  >
                    Refuges
                  </Link>
                  <Link
                    to="/about"
                    className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                  >
                    À propos
                  </Link>
                  <div className="flex flex-col gap-2 pt-2">
                    <Button variant="outline" size="sm" className="w-full" onClick={() => navigate("/login")}>
                      Se connecter
                    </Button>
                    <Button size="sm" className="w-full" onClick={() => navigate("/register")}>
                      S'inscrire
                    </Button>
                  </div>
                </>
              )}
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1">
        {/* Hero Section - Différent selon l'état d'authentification */}
        <section className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-rose-500/20 to-amber-500/20 z-0" />
          <div className="container relative z-10 py-16 md:py-24 lg:py-32">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    {isAuthenticated
                      ? `Bonjour, ${user?.name || "ami des animaux"}!`
                      : "Trouvez l'animal qui vous correspond"}
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    {isAuthenticated
                      ? "Continuez votre recherche ou partagez votre animal avec notre communauté."
                      : "Connectez-vous avec des éleveurs, des refuges et des propriétaires pour adopter l'animal de vos rêves."}
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button size="lg" className="bg-rose-500 hover:bg-rose-600" onClick={() => navigate("/search")}>
                    Trouver un animal <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  {isAuthenticated ? (
                    <Button size="lg" variant="outline" onClick={() => navigate("/post")}>
                      Déposer une annonce
                    </Button>
                  ) : (
                    <Button size="lg" variant="outline" onClick={() => navigate("/register")}>
                      Rejoindre la communauté
                    </Button>
                  )}
                </div>
                {!isAuthenticated && (
                  <div className="mt-4 flex items-center">
                    <div className="flex -space-x-2">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className="inline-block h-8 w-8 rounded-full border-2 border-background overflow-hidden"
                        >
                          <img
                            src={`/placeholder.svg?height=32&width=32`}
                            alt="User"
                            className="h-full w-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-muted-foreground">Rejoignez +10,000 amoureux d'animaux</span>
                  </div>
                )}
              </div>
              <div className="relative mx-auto w-full max-w-md lg:max-w-none">
                <div className="aspect-[4/3] overflow-hidden rounded-xl">
                  <img
                    src="/placeholder.svg?height=600&width=800"
                    alt="Happy pets and owners"
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Search Section */}
        <section className="bg-muted py-12">
          <div className="container">
            <div className="mx-auto max-w-3xl rounded-xl bg-background p-6 shadow-lg">
              <h2 className="mb-6 text-center text-2xl font-bold">Rechercher un animal</h2>
              <div className="grid gap-4 md:grid-cols-4">
                <div className="md:col-span-2">
                  <Input placeholder="Chien, chat, lapin..." />
                </div>
                <div>
                  <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                    <option value="">Type d'animal</option>
                    <option value="dog">Chien</option>
                    <option value="cat">Chat</option>
                    <option value="bird">Oiseau</option>
                    <option value="rabbit">Lapin</option>
                    <option value="other">Autre</option>
                  </select>
                </div>
                <div>
                  <Button className="w-full bg-rose-500 hover:bg-rose-600" onClick={() => navigate("/search")}>
                    <Search className="mr-2 h-4 w-4" /> Rechercher
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Découvrez par catégorie</h2>
              <p className="mt-4 text-muted-foreground md:text-xl">Explorez notre sélection d'animaux par catégorie</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { name: "Chiens", icon: "🐕", path: "/search?type=dog" },
                { name: "Chats", icon: "🐈", path: "/search?type=cat" },
                { name: "Oiseaux", icon: "🦜", path: "/search?type=bird" },
                { name: "Rongeurs", icon: "🐹", path: "/search?type=rodent" },
                { name: "Reptiles", icon: "🦎", path: "/search?type=reptile" },
                { name: "Poissons", icon: "🐠", path: "/search?type=fish" },
                { name: "Animaux de ferme", icon: "🐄", path: "/search?type=farm" },
                { name: "Autres", icon: "🦔", path: "/search?type=other" },
              ].map((category, index) => (
                <Link
                  to={category.path}
                  key={index}
                  className="flex flex-col items-center justify-center rounded-xl border bg-card p-6 text-card-foreground shadow-sm transition-all hover:shadow-md hover:border-rose-200"
                >
                  <span className="text-4xl mb-2">{category.icon}</span>
                  <h3 className="font-medium">{category.name}</h3>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works - Différent selon l'état d'authentification */}
        <section className="bg-muted py-16 md:py-24">
          <div className="container">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Comment ça marche</h2>
              <p className="mt-4 text-muted-foreground md:text-xl">
                {isAuthenticated
                  ? "Profitez pleinement de notre plateforme en quelques étapes simples"
                  : "Trouvez facilement votre compagnon idéal en quelques étapes simples"}
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {isAuthenticated
                ? // Étapes pour les utilisateurs connectés
                  [
                    {
                      icon: <Search className="h-10 w-10 text-rose-500" />,
                      title: "Explorez",
                      description: "Parcourez notre large sélection d'animaux avec des filtres personnalisés.",
                    },
                    {
                      icon: <Heart className="h-10 w-10 text-rose-500" />,
                      title: "Enregistrez",
                      description: "Ajoutez vos favoris et recevez des notifications pour les nouvelles annonces.",
                    },
                    {
                      icon: <Home className="h-10 w-10 text-rose-500" />,
                      title: "Contactez",
                      description: "Discutez directement avec les propriétaires ou refuges via notre messagerie.",
                    },
                  ].map((step, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center rounded-xl bg-background p-6 text-center shadow-sm"
                    >
                      <div className="mb-4 rounded-full bg-rose-100 p-3">{step.icon}</div>
                      <h3 className="mb-2 text-xl font-bold">{step.title}</h3>
                      <p className="text-muted-foreground">{step.description}</p>
                    </div>
                  ))
                : // Étapes pour les visiteurs non connectés
                  [
                    {
                      icon: <Search className="h-10 w-10 text-rose-500" />,
                      title: "Recherchez",
                      description: "Parcourez notre large sélection d'animaux disponibles à l'adoption ou à l'achat.",
                    },
                    {
                      icon: <Heart className="h-10 w-10 text-rose-500" />,
                      title: "Connectez-vous",
                      description: "Entrez en contact avec des éleveurs, des refuges ou des propriétaires.",
                    },
                    {
                      icon: <Home className="h-10 w-10 text-rose-500" />,
                      title: "Accueillez",
                      description: "Rencontrez votre nouvel ami et accueillez-le dans votre foyer.",
                    },
                  ].map((step, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center rounded-xl bg-background p-6 text-center shadow-sm"
                    >
                      <div className="mb-4 rounded-full bg-rose-100 p-3">{step.icon}</div>
                      <h3 className="mb-2 text-xl font-bold">{step.title}</h3>
                      <p className="text-muted-foreground">{step.description}</p>
                    </div>
                  ))}
            </div>
          </div>
        </section>

        {/* Featured Pets */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="mb-12 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Animaux à l'honneur</h2>
              <p className="mt-4 text-muted-foreground md:text-xl">
                Ces adorables compagnons cherchent un nouveau foyer
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[1, 2, 3, 4].map((pet) => (
                <div
                  key={pet}
                  className="group overflow-hidden rounded-xl border bg-background shadow-sm transition-all hover:shadow-md"
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={`/placeholder.svg?height=300&width=300`}
                      alt="Pet"
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold">Max</h3>
                      <span className="text-sm text-muted-foreground">2 ans</span>
                    </div>
                    <p className="text-sm text-muted-foreground">Labrador Retriever</p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="font-medium text-rose-500">Paris, France</span>
                      <Button
                        size="sm"
                        variant="outline"
                        className="rounded-full"
                        onClick={() => {
                          if (isAuthenticated) {
                            // Action pour ajouter aux favoris
                            // dispatch(addToFavorites(pet))
                          } else {
                            navigate("/login")
                          }
                        }}
                      >
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-10 text-center">
              <Button size="lg" variant="outline" onClick={() => navigate("/search")}>
                Voir plus d'animaux
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section - Différent selon l'état d'authentification */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="rounded-2xl bg-gradient-to-r from-rose-500 to-amber-500 p-8 md:p-12 shadow-xl">
              <div className="grid gap-6 md:grid-cols-2 md:gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl">
                    {isAuthenticated ? "Vous avez un animal à proposer ?" : "Prêt à trouver votre compagnon idéal?"}
                  </h2>
                  <p className="mt-4 text-white/90 md:text-xl">
                    {isAuthenticated
                      ? "Partagez votre annonce avec notre communauté et trouvez le foyer parfait pour votre animal."
                      : "Rejoignez notre communauté et connectez-vous avec des milliers d'animaux cherchant un foyer aimant."}
                  </p>
                </div>
                <div className="flex flex-col gap-4 md:items-end">
                  {isAuthenticated ? (
                    <>
                      <Button
                        size="lg"
                        className="w-full md:w-auto bg-white text-rose-500 hover:bg-white/90"
                        onClick={() => navigate("/post")}
                      >
                        Déposer une annonce
                      </Button>
                      <Button
                        size="lg"
                        variant="outline"
                        className="w-full md:w-auto border-white text-white hover:bg-white/10"
                        onClick={() => navigate("/my-posts")}
                      >
                        Gérer mes annonces
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        size="lg"
                        className="w-full md:w-auto bg-white text-rose-500 hover:bg-white/90"
                        onClick={() => navigate("/register")}
                      >
                        Créer un compte gratuitement
                      </Button>
                      <Button
                        size="lg"
                        variant="outline"
                        className="w-full md:w-auto border-white text-white hover:bg-white/10"
                        onClick={() => navigate("/about")}
                      >
                        En savoir plus
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Badges */}
        <section className="border-t py-12">
          <div className="container">
            <div className="grid gap-8 md:grid-cols-3">
              {[
                {
                  icon: <Shield className="h-8 w-8 text-rose-500" />,
                  title: "Sécurité garantie",
                  description: "Toutes les annonces sont vérifiées par notre équipe pour assurer leur légitimité.",
                },
                {
                  icon: <Users className="h-8 w-8 text-rose-500" />,
                  title: "Communauté engagée",
                  description: "Rejoignez des milliers d'amoureux des animaux partageant les mêmes valeurs.",
                },
                {
                  icon: <PawPrint className="h-8 w-8 text-rose-500" />,
                  title: "Bien-être animal",
                  description: "Nous promouvons l'adoption responsable et le bien-être des animaux.",
                },
              ].map((badge, index) => (
                <div key={index} className="flex items-start gap-4">
                  {badge.icon}
                  <div>
                    <h3 className="font-bold">{badge.title}</h3>
                    <p className="text-sm text-muted-foreground">{badge.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter - Seulement pour les utilisateurs non connectés */}
        {!isAuthenticated && (
          <section className="bg-muted py-12">
            <div className="container">
              <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-2xl font-bold">Restez informé</h2>
                <p className="mt-2 text-muted-foreground">
                  Inscrivez-vous à notre newsletter pour recevoir les dernières annonces et conseils
                </p>
                <div className="mt-6 flex gap-2">
                  <Input placeholder="Votre adresse email" className="max-w-lg flex-1" />
                  <Button>S'inscrire</Button>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t bg-background">
        <div className="container py-12">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="flex items-center gap-2">
                <PawPrint className="h-6 w-6 text-rose-500" />
                <span className="text-xl font-bold">PetConnect</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Connecter les amoureux d'animaux avec leurs compagnons idéaux.
              </p>
              <div className="mt-4 flex gap-4">
                {["twitter", "facebook", "instagram", "youtube"].map((social) => (
                  <Link
                    key={social}
                    to="#"
                    className="rounded-full bg-muted p-2 text-muted-foreground hover:text-foreground"
                  >
                    <span className="sr-only">{social}</span>
                    <div className="h-5 w-5" />
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-medium">Liens rapides</h3>
              <ul className="grid gap-3">
                {["Accueil", "Rechercher", "Déposer une annonce", "Refuges", "Éleveurs"].map((link) => (
                  <li key={link}>
                    <Link to="#" className="text-sm text-muted-foreground hover:text-foreground">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-medium">Ressources</h3>
              <ul className="grid gap-3">
                {["Guide d'adoption", "Conseils vétérinaires", "FAQ", "Blog", "Témoignages"].map((link) => (
                  <li key={link}>
                    <Link to="#" className="text-sm text-muted-foreground hover:text-foreground">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-medium">Légal</h3>
              <ul className="grid gap-3">
                {["Conditions d'utilisation", "Politique de confidentialité", "Cookies", "Mentions légales"].map(
                  (link) => (
                    <li key={link}>
                      <Link to="#" className="text-sm text-muted-foreground hover:text-foreground">
                        {link}
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t pt-6 text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} PetConnect. Tous droits réservés.
          </div>
        </div>
      </footer>
    </div>
  )
}
