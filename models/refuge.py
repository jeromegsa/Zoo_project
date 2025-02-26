from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, List

class Refuge(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    nom: str = Field(index=True)
    localisation: str
    catalogues: List["Catalogue"] = Relationship(back_populates="refuge")
    annonces: List["Annonce"] = Relationship(back_populates="refuge")
    