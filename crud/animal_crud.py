from sqlmodel import Session, select
from fastapi import HTTPException, Depends, UploadFile
from models import Animal,User
from models import AnimalImage,Catalogue 
from typing import Optional
from dependencies import get_current_user
import shutil
import os

UPLOAD_DIR = "uploads/animaux"
os.makedirs(UPLOAD_DIR, exist_ok=True)  # Crée le dossier s'il n'existe pas

def create_animal(session: Session, nom: str, age: int, poids: int, couleur: str, 
                  regime_alimentaire: str, date_last_vaccin: str, espece_id: int, 
                  catalogue_id: int, images: list[UploadFile]):
    """
    Crée un nouvel animal et enregistre ses images sur le serveur et en base de données.
    """
    animal = Animal(
        nom=nom,
        age=age,
        poids=poids,
        couleur=couleur,
        regime_alimentaire=regime_alimentaire,
        date_last_vaccin=date_last_vaccin,
        espece_id=espece_id,
        catalogue_id=catalogue_id,

        
    )
    
    session.add(animal)
    session.commit()
    session.refresh(animal)

    # Enregistrer les images sur le serveur et en base de données
    # Liste des extensions d'image valides
    VALID_IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp', '.tiff', '.svg']

    for image in images:
        
          # Extraire l'extension du fichier
        file_extension = os.path.splitext(image.filename)[1].lower()

    # Vérifier si l'extension est valide
        if file_extension not in VALID_IMAGE_EXTENSIONS:
            raise HTTPException(status_code=400, detail="Format d'image non valide. Formats acceptés : jpg, jpeg, png, gif, webp, bmp, tiff, svg.")

        file_path = f"{UPLOAD_DIR}/{image.filename}"
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(image.file, buffer)

        # Sauvegarde dans la base de données
        image_record = AnimalImage(url=file_path, animal_id=animal.id)
        print(image_record)
        session.add(image_record)

    session.commit()
    return animal

def get_animal(session: Session, animal_id: int):
    """
    Récupère un animal par son ID, ainsi que ses images associées.
    """
    # Récupérer l'animal et ses images en une seule requête
    animal = session.get(Animal, animal_id)
    if not animal:
        raise HTTPException(status_code=404, detail="Animal non trouvé")

    # Récupérer les images associées à l'animal
    images = session.exec(select(AnimalImage).where(AnimalImage.animal_id == animal_id)).all()

    # Ajouter les images à l'objet animal
    animal.images = images

    return animal


def get_animals(
    session: Session,
    espece_id: Optional[int] = None,
    catalogue_id: Optional[int] = None,
    current_user: User = Depends(get_current_user)
):
    """
    Récupère tous les animaux appartenant aux catalogues de l'utilisateur connecté,
    ainsi que leurs images associées. Peut être filtré par espèce ou par catalogue.
    """
    # Récupérer tous les catalogues de l'utilisateur
    catalogues = session.exec(select(Catalogue.id).where(Catalogue.user_id == current_user.id)).all()

    if not catalogues:
        raise HTTPException(status_code=404, detail="Aucun catalogue trouvé pour cet utilisateur.")

    # Extraire les IDs des catalogues de l'utilisateur
    catalogue_ids = [catalogue for catalogue in catalogues]

    # Construire la requête des animaux
    query = select(Animal).where(Animal.catalogue_id.in_(catalogue_ids))

    if espece_id:
        query = query.where(Animal.espece_id == espece_id)

    if catalogue_id:
        query = query.where(Animal.catalogue_id == catalogue_id)

    # Exécuter la requête pour récupérer les animaux
    animals = session.exec(query).all()

    if not animals:
        raise HTTPException(status_code=404, detail="Aucun animal trouvé pour cet utilisateur.")

    # Pour chaque animal, récupérer les images associées
    for animal in animals:
        images = session.exec(select(AnimalImage).where(AnimalImage.animal_id == animal.id)).all()
        animal.images = images

    return animals
def update_animal(
    session: Session,
    animal_id: int,
    nom: str,
    age: int,
    poids: int,
    couleur: str,
    new_images: Optional[List[UploadFile]] = None,
    delete_image_ids: Optional[List[int]] = None
):
    """
    Met à jour les informations d'un animal et gère ses images.
    """
    animal = session.get(Animal, animal_id)
    if not animal:
        raise HTTPException(status_code=404, detail="Animal non trouvé")

    # Mettre à jour les informations de l'animal
    animal.nom = nom
    animal.age = age
    animal.poids = poids
    animal.couleur = couleur

    # Supprimer les images spécifiées
    if delete_image_ids:
        for image_id in delete_image_ids:
            image = session.get(AnimalImage, image_id)
            if image and image.animal_id == animal_id:
                if os.path.exists(image.url):
                    os.remove(image.url)  # Supprimer le fichier
                session.delete(image)  # Supprimer l'enregistrement de la base de données

    # Ajouter de nouvelles images
    if new_images:
        VALID_IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp', '.tiff', '.svg']
        for image in new_images:
            file_extension = os.path.splitext(image.filename)[1].lower()
            if file_extension not in VALID_IMAGE_EXTENSIONS:
                raise HTTPException(status_code=400, detail="Format d'image non valide. Formats acceptés : jpg, jpeg, png, gif, webp, bmp, tiff, svg.")

            file_path = f"{UPLOAD_DIR}/{image.filename}"
            with open(file_path, "wb") as buffer:
                shutil.copyfileobj(image.file, buffer)

            # Sauvegarde dans la base de données
            image_record = AnimalImage(url=file_path, animal_id=animal.id)
            session.add(image_record)

    session.commit()
    session.refresh(animal)
    return animal

def delete_animal(session: Session, animal_id: int):
    """
    Supprime un animal ainsi que toutes ses images associées.
    """
    # Récupérer l'animal
    animal = session.get(Animal, animal_id)
    if not animal:
        raise HTTPException(status_code=404, detail="Animal non trouvé")

    # Récupérer les images associées à l'animal
    images = session.exec(select(AnimalImage).where(AnimalImage.animal_id == animal_id)).all()

    # Supprimer les fichiers images du serveur
    for image in images:
        if os.path.exists(image.url):
            os.remove(image.url)  # Supprimer le fichier

    # Supprimer les enregistrements des images de la base de données
    for image in images:
        session.delete(image)

    # Supprimer l'animal lui-même
    session.delete(animal)

    # Valider les changements dans la base de données
    session.commit()