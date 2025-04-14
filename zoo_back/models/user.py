from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, List
from enum import Enum 

class RoleEnum (str, Enum):
    Admin="admin"
    User="user"
    Refuge="refuge"
    Eleveur="eleveur"


class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    username: str = Field(index=True, unique=True)
    nom: str = Field(default="GBOSSA")
    prenom:str =Field( default="John")
    email: str = Field(unique=True, index=True)
    password: str=Field(default="00000000")
    localisation: str=Field(default="Cotonou")
    catalogues: Optional[List["Catalogue"]] = Relationship(back_populates="user",sa_relationship_kwargs={"cascade": "all, delete"})
    annonces: Optional[List["Annonce"]] = Relationship(back_populates="user", sa_relationship_kwargs={"cascade":"all, delete"})
    veterinaire: Optional["Veterinaire"] = Relationship(back_populates="user", sa_relationship_kwargs={"uselist": False})
    role:RoleEnum=Field(default=RoleEnum.User)
    is_active: bool=Field(default=False)
    
class UserCreate(SQLModel):
    username: str
    nom:str
    prenom:str
    email: str
    password: str
    localisation:str
    role: RoleEnum
    is_active:bool=False



class UserUpdate(SQLModel):
    username: Optional[str] = None
    nom: Optional[str] = None
    prenom: Optional[str] = None
    email: Optional[str] = None
    localisation: Optional[str] = None
    is_active: bool =Field(default= False)
    role: Optional[str] = None

class UserPasswordUpdate(SQLModel):
    old_password: str
    new_password: str
    confirm_password: str
