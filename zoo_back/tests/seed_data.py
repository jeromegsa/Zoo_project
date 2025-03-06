from sqlmodel import Session
from database.connection import engine
from models import Espece, Race, User, Refuge, Animal, Annonce, AnimalImage

def add_test_data():
    with Session(engine) as session:
        # Ajouter une espèce
        espece_chien = Espece(nom="Chien")
        session.add(espece_chien)
        session.commit()

        # Ajouter une race
        race_labrador = Race(nom="Labrador", espece_id=espece_chien.id)
        session.add(race_labrador)
        session.commit()

        # Ajouter un refuge
        refuge_paris = Refuge(nom="Refuge de Paris", localisation="Paris")
        session.add(refuge_paris)
        session.commit()

        # Ajouter un animal
        animal_toto = Animal(nom="Toto", age=3, race_id=race_labrador.id, refuge_id=refuge_paris.id)
        session.add(animal_toto)
        session.commit()

        print("Données de test ajoutées avec succès !")

if __name__ == "__main__":
    add_test_data()