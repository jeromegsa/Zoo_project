import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchAnnonces } from "../../features/annonce/AnnonceSlice" 

export default function AnnonceList() {
  const dispatch = useDispatch()

  const { annonces, isLoading, error } = useSelector(state => state.annonces)

  useEffect(() => {
    dispatch(fetchAnnonces())
  }, [dispatch])

  if (isLoading) return <p>Chargement des annonces...</p>
  if (error) return <p>Erreur : {error}</p>

  return (
    <div className="annonces">
      <h2>Liste des annonces</h2>
      <ul>
        {annonces && annonces.map((annonce) => (
          <li key={annonce.id}>
            <strong>{annonce.titre}</strong> - {annonce.description}
          </li>
        ))}
      </ul>
    </div>
  )
}
