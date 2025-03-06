from sqlmodel import Session, select
from fastapi import HTTPException
from models import Catalogue
from typing import  Optional
from datetime import datetime

def create_catalogue(session: Session, nom: str, user_id: int):
    """
    Crée un nouveau catalogue pour un utilisateur spécifique.
    """
    date_creation=datetime.now()
    catalogue = Catalogue(nom=nom, user_id=user_id, date_creation=date_creation )
    session.add(catalogue)
    session.commit()
    session.refresh(catalogue)
    return catalogue

def get_catalogue(session: Session, catalogue_id: int):
    """
    Récupère un catalogue spécifique par son ID.
    """
    catalogue = session.get(Catalogue, catalogue_id)
    if not catalogue:
        raise HTTPException(status_code=404, detail="Catalogue non trouvé")
    return catalogue

def get_catalogues(session: Session, user_id: Optional[int] = None):
    """
    Récupère tous les catalogues ou les catalogues d'un utilisateur spécifique.
    """
    query = select(Catalogue)
    if user_id:
        query = query.where(Catalogue.user_id == user_id)

    results = session.exec(query).all()
    return results

def update_catalogue(session: Session, catalogue_id: int, nom: str):
    """
    Met à jour le nom d'un catalogue existant.
    """
    catalogue = session.get(Catalogue, catalogue_id)
    if not catalogue:
        raise HTTPException(status_code=404, detail="Catalogue non trouvé")
    
    catalogue.nom = nom
    session.commit()
    session.refresh(catalogue)
    return catalogue

def delete_catalogue(session: Session, catalogue_id: int):
    """
    Supprime un catalogue par son ID.
    """
    catalogue = session.get(Catalogue, catalogue_id)
    if not catalogue:
        raise HTTPException(status_code=404, detail="Catalogue non trouvé")

    session.delete(catalogue)
    session.commit()
    return {"message": "Catalogue supprimé avec succès"}
