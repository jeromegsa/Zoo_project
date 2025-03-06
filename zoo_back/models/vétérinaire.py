from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, List
from  enum import Enum
from .espece import Espece
from .user import User
    

class Veterinaire(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="user.id", unique=True)  # One-to-One
    localite: str = Field()
    categorie_espece: str = Field()

    user: User = Relationship(back_populates="veterinaire")
