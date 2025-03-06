from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, List

class Race(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    nom: str = Field(unique=True, index=True)
    espece_id: int = Field(foreign_key="espece.id")
    espece: Optional["Espece"] = Relationship(back_populates="races")  # Ajout de la relation ici


