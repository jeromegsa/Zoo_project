from sqlmodel import Session, select
from fastapi import HTTPException
from models import AnimalImage
from typing import Optional

def create_animal_image(session: Session, url: str, animal_id: int):
    """
    Crée une nouvelle image pour un animal spécifique.
    """
    image = AnimalImage(url=url, animal_id=animal_id)
    session.add(image)
    session.commit()
    session.refresh(image)
    return image

def get_animal_image(session: Session, image_id: int):
    """
    Récupère une image spécifique par son ID.
    """
    image = session.get(AnimalImage, image_id)
    if not image:
        raise HTTPException(status_code=404, detail="Image non trouvée")
    return image

def get_animal_images(session: Session, animal_id: Optional[int] = None):
    """
    Récupère toutes les images ou les images d'un animal spécifique.
    """
    query = select(AnimalImage)
    if animal_id:
        query = query.where(AnimalImage.animal_id == animal_id)

    results = session.exec(query).all()
    return results

def update_animal_image(session: Session, image_id: int, url: str):
    """
    Met à jour l'URL d'une image existante.
    """
    image = session.get(AnimalImage, image_id)
    if not image:
        raise HTTPException(status_code=404, detail="Image non trouvée")
    
    image.url = url
    session.commit()
    session.refresh(image)
    return image

def delete_animal_image(session: Session, image_id: int):
    """
    Supprime une image par son ID.
    """
    image = session.get(AnimalImage, image_id)
    if not image:
        raise HTTPException(status_code=404, detail="Image non trouvée")

    session.delete(image)
    session.commit()
    return {"message": "Image supprimée avec succès"}
