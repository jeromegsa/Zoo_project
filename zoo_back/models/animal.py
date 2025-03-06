from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, List
import datetime
from fastapi import UploadFile


class Animal(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    nom: str = Field(index=True)
    age: Optional[int] = None
    poids: Optional[int]=Field(ge=1)
    couleur:Optional[str]=Field(default= "Noire")
    regime_alimentaire:Optional[str]
    date_last_vaccin: datetime.date
    images: List[UploadFile]  # Liste de fichiers uploadés

    # date_ajout: datetime
   
    
    # Relation avec la table Espece
    espece_id: int = Field(foreign_key="espece.id")  # Obligatoire
    espece: Optional["Espece"] = Relationship(back_populates="animaux")  #
    
    catalogue_id:Optional[int]=Field(default= None, foreign_key="catalogue.id")
    catalogue: Optional["Catalogue"] = Relationship(back_populates="animals")
   
    annonces: List["Annonce"] = Relationship(back_populates="animal")
    images: List["AnimalImage"] = Relationship(back_populates="animal")
    
class AnimalCreate(SQLModel):
    nom: str
    age: int
    poids: int
    couleur: str
    regime_alimentaire: str
    date_last_vaccin: str
    espece_id: int
    catalogue_id: int
    images: List[UploadFile]  # Liste de fichiers uploadés