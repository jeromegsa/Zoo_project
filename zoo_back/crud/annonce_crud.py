from sqlmodel import Session, select
from fastapi import HTTPException, Depends
import datetime
import random
from typing import Optional, List
from models import Annonce, Animal, User, AnimalImage
from dependencies import get_current_user
from schemas import AnimalCreate, AnnonceRead  # Schéma Pydantic pour créer des animaux

def create_annonce(session: Session, titre: str, description: str, animaux_data: List[AnimalCreate], current_user: User = Depends(get_current_user)):
    """
    Crée une nouvelle annonce et associe plusieurs animaux avec leurs images.
    """
    annonce = Annonce(
        titre=titre,
        description=description,
        date_publication=datetime.datetime.utcnow(),
        user_id=current_user.id
    )
    session.add(annonce)
    session.flush()  # récupérer annonce.id sans commit

    for animal_data in animaux_data:
        animal = Animal(
            nom=animal_data.nom,
            age=animal_data.age,
            poids=animal_data.poids,
            couleur=animal_data.couleur,
            regime_alimentaire=animal_data.regime_alimentaire,
            date_last_vaccin=animal_data.date_last_vaccin,
            espece_id=animal_data.espece_id,
            race=animal_data.race,
            price= animal_data.price,
            annonce_id=annonce.id
        )
        session.add(animal)
        session.flush()  # récupérer animal.id sans commit

        if animal_data.images:
            for image_url in animal_data.images:
                image_record = AnimalImage(
                    url=image_url,
                    animal_id=animal.id
                )
                session.add(image_record)

    session.commit()
    session.refresh(annonce)
    return annonce

def get_annonce(session: Session, annonce_id: int):
    """
    Récupère une annonce par son ID avec les animaux et leurs images.
    """
    annonce = session.exec(
        select(Annonce).where(Annonce.id == annonce_id)
    ).first()

    if not annonce:
        raise HTTPException(status_code=404, detail="Annonce non trouvée")

    animaux = session.exec(
        select(Animal).where(Animal.annonce_id == annonce.id)
    ).all()

    for animal in animaux:
        images = session.exec(
            select(AnimalImage).where(AnimalImage.animal_id == animal.id)
        ).all()
        animal.images = images

    annonce.animaux = animaux
    return annonce

def get_annonces(session: Session, user_id: Optional[int] = None):
    """
    Récupère toutes les annonces avec les animaux et leurs images.
    """
    query = select(Annonce)
    if user_id:
        query = query.where(Annonce.user_id == user_id)

    annonces = session.exec(query).all()

    if not annonces:
        raise HTTPException(status_code=404, detail="Aucune annonce trouvée.")

    for annonce in annonces:
        animaux = session.exec(
            select(Animal).where(Animal.annonce_id == annonce.id)
        ).all()
        for animal in animaux:
            images = session.exec(
                select(AnimalImage).where(AnimalImage.animal_id == animal.id)
            ).all()
            animal.images = images
        annonce.animaux = animaux

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

def get_random_annonces(session: Session) -> List[AnnonceRead]:
    annonces = session.exec(select(Annonce)).all()
    if not annonces:
        raise HTTPException(status_code=404, detail="Aucune annonce trouvée")
    
    random.shuffle(annonces)
    annonces = annonces[:10]
    return annonces
