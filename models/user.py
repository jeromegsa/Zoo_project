from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, List

class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    nom: str = Field(index=True)
    email: str = Field(unique=True, index=True)
    password: str
    animaux: List["Animal"] = Relationship(back_populates="user")
    annonces: List["Annonce"] = Relationship(back_populates="user")
    veterinaire: Optional["Veterinaire"] = Relationship(back_populates="user", sa_relationship_kwargs={"uselist": False})
    
    
    


