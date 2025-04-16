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
    race: Optional[str]

    # date_ajout: datetime
   
    
    # Relation avec la table Espece
    espece_id: int = Field(foreign_key="espece.id")  # Obligatoire
    espece: Optional["Espece"] = Relationship(back_populates="animaux")  #
    
    annonce_id: int = Field(foreign_key="annonce.id")
    annonce: Optional["Annonce"] = Relationship(back_populates="animaux")
    images: List["AnimalImage"] = Relationship(back_populates="animal")
    
class AnimalCreate(SQLModel):
    nom: str
    age: int
    poids: int
    couleur: str
    regime_alimentaire: str
    date_last_vaccin: str
    espece_id: int
    images: Optional[ List[UploadFile]  ]# Liste de fichiers uploadés
