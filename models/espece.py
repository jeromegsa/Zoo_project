from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, List

class Espece(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    nom: str = Field(unique=True, index=True)
    races: List["Race"] = Relationship(back_populates="espece")
    animaux: List["Animal"] = Relationship(back_populates="espece")  # Correction ici ✅
    