from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, List
import datetime


class Animal(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    nom: str = Field(index=True)
    age: Optional[int] = None
    poids: Optional[int]=Field(ge=1)
    date_last_vaccin: datetime.date
    race_id: Optional[int] = Field(default=None, foreign_key="race.id")
    user_id: Optional[int] = Field(default=None, foreign_key="user.id")
    refuge_id: Optional[int] = Field(default=None, foreign_key="refuge.id")
    
    # Relation avec la table Espece
    espece_id: int = Field(foreign_key="espece.id")  # Obligatoire
    espece: Optional["Espece"] = Relationship(back_populates="animaux")
    
    # Relation avec la table User
    user: Optional["User"] = Relationship(back_populates="animaux")
    
    # Relation avec la table Refuge
    refuge: Optional["Refuge"] = Relationship(back_populates="animaux")
    annonces: List["Annonce"] = Relationship(back_populates="animal")
    images: List["AnimalImage"] = Relationship(back_populates="animal")