from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, List
from datetime import datetime
from typing import List
from .user import User
class Catalogue(SQLModel, table =True):
    id: Optional[int]=Field(default=None, primary_key=True)
    nom:str=Field(default=None)
    date_creation:Optional[datetime]=Field(default=None)
    
    animals: List["Animal"] = Relationship(back_populates="catalogue",sa_relationship_kwargs={"cascade": "all, delete"})

    user_id: int =Field(foreign_key= "user.id")
    user: User = Relationship(back_populates="catalogues")  # Ajout de la relation ice

