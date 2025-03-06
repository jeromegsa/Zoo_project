from sqlmodel import Session, select
from fastapi import HTTPException, Depends
import datetime
from typing import Optional, List
from models import Annonce, Animal, User  
from dependencies import get_current_user  # Dépendance pour récupérer l'utilisateur connecté

def create_annonce(session: Session, titre: str, description: str, animal_id: int, current_user: User = Depends(get_current_user)):
    """
    Crée une nouvelle annonce pour un animal appartenant à l'utilisateur.
    """
    # Vérifier si l'animal existe et appartient à l'utilisateur
    animal = session.get(Animal, animal_id)
    if not animal:
        raise HTTPException(status_code=404, detail="Animal non trouvé")

    annonce = Annonce(
        titre=titre,
        description=description,
        animal_id=animal_id,
        user_id=current_user.id,
        date_publication=datetime.datetime.utcnow()
    )

    session.add(annonce)
    session.commit()
    session.refresh(annonce)
    return annonce

def get_annonce(session: Session, annonce_id: int):
    """
    Récupère une annonce par son ID.
    """
    annonce = session.get(Annonce, annonce_id)
    if not annonce:
        raise HTTPException(status_code=404, detail="Annonce non trouvée")
    return annonce

def get_annonces(session: Session, user_id: Optional[int] = None, animal_id: Optional[int] = None):
    """
    Récupère toutes les annonces avec des filtres optionnels sur l'utilisateur et l'animal.
    """
    query = select(Annonce)

    if user_id:
        query = query.where(Annonce.user_id == user_id)
    if animal_id:
        query = query.where(Annonce.animal_id == animal_id)

    annonces = session.exec(query).all()
    if not annonces:
        raise HTTPException(status_code=404, detail="Aucune annonce trouvée.")

    return annonces

def update_annonce(session: Session, annonce_id: int, titre: Optional[str] = None, description: Optional[str] = None, current_user: User = Depends(get_current_user)):
    """
    Met à jour une annonce existante si l'utilisateur en est le propriétaire.
    """
    annonce = session.get(Annonce, annonce_id)
    if not annonce:
        raise HTTPException(status_code=404, detail="Annonce non trouvée")

    # Vérification du propriétaire de l'annonce
    if annonce.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Vous n'avez pas l'autorisation de modifier cette annonce")

    if titre:
        annonce.titre = titre
    if description:
        annonce.description = description

    session.commit()
    session.refresh(annonce)
    return annonce

def delete_annonce(session: Session, annonce_id: int, current_user: User = Depends(get_current_user)):
    """
    Supprime une annonce si l'utilisateur en est le propriétaire.
    """
    annonce = session.get(Annonce, annonce_id)
    if not annonce:
        raise HTTPException(status_code=404, detail="Annonce non trouvée")

    # Vérification du propriétaire
    if annonce.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Vous n'avez pas l'autorisation de supprimer cette annonce")

    session.delete(annonce)
    session.commit()
    return {"message": "Annonce supprimée avec succès"}
