from sqlmodel import Session, select
from fastapi import HTTPException
from models import Animal
from models import AnimalImage
from typing import Optional

def create_animal(session: Session, nom: str, age: int, poids: int, couleur: str, 
                  regime_alimentaire: str, date_last_vaccin: str, espece_id: int, 
                  catalogue_id: int, images: list[str]):
    """
    Crée un nouvel animal et enregistre ses images dans AnimalImage.
    """
    animal = Animal(
        nom=nom,
        age=age,
        poids=poids,
        couleur=couleur,
        regime_alimentaire=regime_alimentaire,
        date_last_vaccin=date_last_vaccin,
        espece_id=espece_id,
        catalogue_id=catalogue_id
    )
    
    session.add(animal)
    session.commit()
    session.refresh(animal)

    # Enregistrer les images liées à l'animal
    for image_url in images:
        image = AnimalImage(url=image_url, animal_id=animal.id)
        session.add(image)

    session.commit()
    return animal

def get_animal(session: Session, animal_id: int):
    """
    Récupère un animal par son ID.
    """
    animal = session.get(Animal, animal_id)
    if not animal:
        raise HTTPException(status_code=404, detail="Animal non trouvé")
    return animal

def get_animals(session: Session, espece_id: Optional[int] = None, catalogue_id: Optional[int] = None):
    """
    Récupère tous les animaux ou filtre par espèce ou catalogue.
    """
    query = select(Animal)
    if espece_id:
        query = query.where(Animal.espece_id == espece_id)
    if catalogue_id:
        query = query.where(Animal.catalogue_id == catalogue_id)

    results = session.exec(query).all()
    return results

def update_animal(session: Session, animal_id: int, nom: str, age: int, poids: int, couleur: str):
    """
    Met à jour les informations d'un animal.
    """
    animal = session.get(Animal, animal_id)
    if not animal:
        raise HTTPException(status_code=404, detail="Animal non trouvé")

    animal.nom = nom
    animal.age = age
    animal.poids = poids
    animal.couleur = couleur
    session.commit()
    session.refresh(animal)
    return animal

def delete_animal(session: Session, animal_id: int):
    """
    Supprime un animal ainsi que toutes ses images associées.
    """
    animal = session.get(Animal, animal_id)
    if not animal:
        raise HTTPException(status_code=404, detail="Animal non trouvé")

    # Supprimer les images associées
    session.exec(select(AnimalImage).where(AnimalImage.animal_id == animal_id)).delete()

    session.delete(animal)
    session.commit()
    return {"message": "Animal et ses images supprimés avec succès"}
