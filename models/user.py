from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, List
from enum import Enum 

class RoleEnum (str, Enum):
    Admin="admin"
    User="user"
    Refuge="refuge"


class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    username: str = Field(index=True, unique=True)
    nom: str = Field(default="GBOSSA")
    prenom:str =Field( default="John")
    email: str = Field(unique=True, index=True)
    password: str=Field(default="00000000")
    localisation: str=Field(default="Cotonou")
    catalogues:List["Catalogue"]=Relationship(back_populates="user")
    annonces: List["Annonce"] = Relationship(back_populates="user")
    veterinaire: Optional["Veterinaire"] = Relationship(back_populates="user", sa_relationship_kwargs={"uselist": False})
    role:RoleEnum=Field(default=RoleEnum.User)
    
class UserCreate(SQLModel):
    username: str
    nom : str
    prenom:str
    email: str
    password: str
    localisation:str
    role: RoleEnum



