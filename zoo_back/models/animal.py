import datetime
from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, List


class Animal(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    nom: str = Field(index=True)
    age: Optional[int] = None
    poids: Optional[int]=Field(ge=1)
    couleur:Optional[str]=Field(default= "Noire")
    regime_alimentaire:Optional[str]
    date_last_vaccin: datetime.date
   
    
    # Relation avec la table Espece
    espece_id: int = Field(foreign_key="espece.id")  # Obligatoire
    espece: Optional["Espece"] = Relationship(back_populates="animaux")  #
    
    catalogue_id:Optional[int]=Field(default= None, foreign_key="catalogue.id")
    catalogue: Optional["Catalogue"] = Relationship(back_populates="animals")
   
    annonces: List["Annonce"] = Relationship(back_populates="animal")
    images: List["AnimalImage"] = Relationship(back_populates="animal")