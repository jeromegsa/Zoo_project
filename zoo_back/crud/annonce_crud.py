from sqlmodel import Session, select
from fastapi import HTTPException, Depends
import datetime
from typing import Optional, List
from models import Annonce, Animal, User
from dependencies import get_current_user
from schemas import AnimalCreate  # Schéma Pydantic pour créer des animaux


def create_annonce(session: Session, titre: str, description: str, animaux_data: List[AnimalCreate], current_user: User = Depends(get_current_user)):
    """
    Crée une nouvelle annonce et associe plusieurs animaux.
    """
    annonce = Annonce(
        titre=titre,
        description=description,
        date_publication=datetime.datetime.utcnow(),
        user_id=current_user.id
    )
    session.add(annonce)
    session.commit()
    session.refresh(annonce)

    for animal_data in animaux_data:
        animal = Animal(**animal_data.dict(), annonce_id=annonce.id)
        session.add(animal)

    session.commit()
    session.refresh(annonce)
    return annonce


def get_annonce(session: Session, annonce_id: int):
    """
    Récupère une annonce par son ID avec les animaux associés.
    """
    annonce = session.exec(
        select(Annonce).where(Annonce.id == annonce_id)
    ).first()

    if not annonce:
        raise HTTPException(status_code=404, detail="Annonce non trouvée")
    return annonce


def get_annonces(session: Session, user_id: Optional[int] = None):
    """
    Récupère toutes les annonces avec des filtres optionnels sur l'utilisateur.
    """
    query = select(Annonce)

    if user_id:
        query = query.where(Annonce.user_id == user_id)

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

    if annonce.user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Vous n'avez pas l'autorisation de supprimer cette annonce")

    session.delete(annonce)
    session.commit()
    return {"message": "Annonce supprimée avec succès"}
