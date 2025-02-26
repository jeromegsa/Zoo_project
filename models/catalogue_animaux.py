from sqlmodel import SQLModel, Field, Relationship
from typing import Optional, List
from datetime import datetime
from .animal import Animal
from typing import List
class Catalogue(SQLModel, table =True):
    id: Optional[int]=Field(default=None, primary_key=True)
    nom:str=Field(default=None)
    date_creation:Optional[datetime]=Field(default=None)
    
    animals: List[Animal]=Relationship(
       back_populates= "catalogue"
   )
    user_id: int =Field(foreign_key= "user.id")
