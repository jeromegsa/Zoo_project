from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from .database import Base

# Modèle pour la table des espèces
class Espece(Base):
    __tablename__ = "especes"

    id = Column(Integer, primary_key=True, index=True)
    nom = Column(String, unique=True, index=True)

# Modèle pour la table des races
class Race(Base):
    __tablename__ = "races"

    id = Column(Integer, primary_key=True, index=True)
    nom = Column(String, unique=True, index=True)
    espece_id = Column(Integer, ForeignKey("especes.id"))

    espece = relationship("Espece", back_populates="races")

Espece.races = relationship("Race", back_populates="espece")

# Modèle pour les animaux
class Animal(Base):
    __tablename__ = "animals"

    id = Column(Integer, primary_key=True, index=True)
    nom = Column(String, index=True)
    age = Column(Integer)
    race_id = Column(Integer, ForeignKey("races.id"))
    
    race = relationship("Race")

# Modèle pour les refuges
class Refuge(Base):
    __tablename__ = "refuges"

    id = Column(Integer, primary_key=True, index=True)
    nom = Column(String, index=True)
    localisation = Column(String)

# Modèle pour les annonces
class Annonce(Base):
    __tablename__ = "annonces"

    id = Column(Integer, primary_key=True, index=True)
    titre = Column(String)
    description = Column(String)
    animal_id = Column(Integer, ForeignKey("animals.id"))
    user_id = Column(Integer, ForeignKey("users.id"))

    animal = relationship("Animal")
