from sqlmodel import SQLModel, Field, Relationship
from typing import Optional
import datetime
class Annonce(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    titre: str
    description: str
    animal_id: int = Field(foreign_key="animal.id")
    user_id: Optional[int] = Field(default=None, foreign_key="user.id")
    date_publication: datetime.datetime = Field(default_factory=datetime.datetime.utcnow)
    animal: Optional["Animal"] = Relationship(back_populates="annonces")
    user: Optional["User"] = Relationship(back_populates="annonces")



# Base commune pour les Annonces
class AnnonceBase(SQLModel):
    titre: str
    description: str

# Schéma pour la création d'une annonce (requête POST)
class AnnonceCreate(AnnonceBase):
    animal_id: int  # Obligatoire car lié à un animal

# Schéma pour la mise à jour d'une annonce (requête PUT)
class AnnonceUpdate(SQLModel):
    titre: Optional[str] = None
    description: Optional[str] = None

# Schéma pour la lecture d'une annonce (réponse API)
class AnnonceRead(AnnonceBase):
    id: int
    user_id: Optional[int]
    date_publication: datetime.datetime