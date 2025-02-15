from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, List

class Animal(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    nom: str = Field(index=True)
    age: Optional[int] = None
    race_id: Optional[int] = Field(default=None, foreign_key="race.id")
    user_id: Optional[int] = Field(default=None, foreign_key="user.id")
    refuge_id: Optional[int] = Field(default=None, foreign_key="refuge.id")
    race: Optional["Race"] = Relationship(back_populates="animaux")
    user: Optional["User"] = Relationship(back_populates="animaux")
    refuge: Optional["Refuge"] = Relationship(back_populates="animaux")
    annonces: List["Annonce"] = Relationship(back_populates="animal")
    images: List["AnimalImage"] = Relationship(back_populates="animal")