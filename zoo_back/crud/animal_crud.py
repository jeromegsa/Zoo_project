from sqlmodel import Session, select
from fastapi import HTTPException
from models import Animal, AnimalImage
from typing import Optional, List
import shutil
import os
import uuid

UPLOAD_DIR = "uploads/animaux"
os.makedirs(UPLOAD_DIR, exist_ok=True)  # Crée le dossier s'il n'existe pas

VALID_IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp', '.tiff', '.svg']

def save_image(image):
    """
    Sauvegarde une image sur le serveur et retourne l'URL.
    """
    file_extension = os.path.splitext(image.filename)[1].lower()
    if file_extension not in VALID_IMAGE_EXTENSIONS:
        raise HTTPException(status_code=400, detail="Format d'image non valide.")

    unique_filename = f"{uuid.uuid4().hex}{file_extension}"
    file_path = os.path.join(UPLOAD_DIR, unique_filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(image.file, buffer)

    return f"/{file_path}"

def create_animal(session: Session, nom: str, age: int, poids: int, couleur: str, 
                  regime_alimentaire: str, date_last_vaccin: str, espece_id: int, race: str, price: int,
                  images: Optional[List] = None):
    """
    Crée un nouvel animal avec ses images.
    """
    animal = Animal(
        nom=nom,
        age=age,
        poids=poids,
        couleur=couleur,
        regime_alimentaire=regime_alimentaire,
        date_last_vaccin=date_last_vaccin,
        race=race,
        price=price,
        espece_id=espece_id,
    )

    session.add(animal)
    session.commit()
    session.refresh(animal)

    if images:
        for image in images:
            url = save_image(image)
            image_record = AnimalImage(url=url, animal_id=animal.id)
            session.add(image_record)

    session.commit()
    return animal

def get_animal(session: Session, animal_id: int):
    """
    Récupère un animal par son ID avec ses images.
    """
    animal = session.get(Animal, animal_id)
    if not animal:
        raise HTTPException(status_code=404, detail="Animal non trouvé")

    images = session.exec(select(AnimalImage).where(AnimalImage.animal_id == animal_id)).all()
    animal.images = images

    return animal

def get_animals(session: Session, espece_id: Optional[int] = None):
    """
    Récupère tous les animaux, filtrés par espèce si besoin.
    """
    query = select(Animal)
    if espece_id:
        query = query.where(Animal.espece_id == espece_id)

    animals = session.exec(query).all()
    for animal in animals:
        images = session.exec(select(AnimalImage).where(AnimalImage.animal_id == animal.id)).all()
        animal.images = images

    return animals

def update_animal(session: Session, animal_id: int, nom: str, age: int, poids: int, couleur: str,
                  race: str, price: int, new_images: Optional[List] = None, delete_image_ids: Optional[List[int]] = None):
    """
    Met à jour un animal et gère ses images.
    """
    animal = session.get(Animal, animal_id)
    if not animal:
        raise HTTPException(status_code=404, detail="Animal non trouvé")

    animal.nom = nom
    animal.age = age
    animal.poids = poids
    animal.couleur = couleur
    animal.race = race
    animal.price = price

    # Supprimer les anciennes images sélectionnées
    if delete_image_ids:
        for image_id in delete_image_ids:
            image = session.get(AnimalImage, image_id)
            if image and image.animal_id == animal_id:
                if os.path.exists(image.url.strip("/")):
                    os.remove(image.url.strip("/"))
                session.delete(image)

    # Ajouter de nouvelles images
    if new_images:
        for image in new_images:
            url = save_image(image)
            image_record = AnimalImage(url=url, animal_id=animal.id)
            session.add(image_record)

    session.commit()
    session.refresh(animal)
    return animal

def delete_animal(session: Session, animal_id: int):
    """
    Supprime un animal et ses images.
    """
    animal = session.get(Animal, animal_id)
    if not animal:
        raise HTTPException(status_code=404, detail="Animal non trouvé")

    images = session.exec(select(AnimalImage).where(AnimalImage.animal_id == animal_id)).all()

    for image in images:
        if os.path.exists(image.url.strip("/")):
            os.remove(image.url.strip("/"))
        session.delete(image)

    session.delete(animal)
    session.commit()
