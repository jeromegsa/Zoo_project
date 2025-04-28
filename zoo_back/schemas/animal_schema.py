from pydantic import BaseModel, Field
from typing import Optional, List
from fastapi import UploadFile
from datetime import datetime
from pydantic import BaseModel

class AnimalImageRead(BaseModel):
    id: int
    url: str
    animal_id: int

    class Config:
        orm_mode = True

class AnimalRead(BaseModel):
    id: int
    nom: str
    age: int
    poids: float
    couleur: str
    race: str
    price:int
    regime_alimentaire: Optional[str]
    date_last_vaccin: Optional[datetime]
    espece_id: int
    images: List[AnimalImageRead] = []

    class Config:
        orm_mode = True

class AnnonceRead(BaseModel):
    id: int
    titre: str
    description: str
    date_publication: datetime
    user_id: int
    animaux: List[AnimalRead] = []

    class Config:
        orm_mode = True
class AnimalCreate(BaseModel):
    nom: str
    age: int
    poids: int
    couleur: str
    race: str
    price:int
    regime_alimentaire: str
    date_last_vaccin: str
    espece_id: int
    images: Optional[List[str]] = None
    class Config:
        arbitrary_types_allowed = True
