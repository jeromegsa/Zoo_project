from pydantic import BaseModel, Field
from typing import Optional, List
from fastapi import UploadFile

class AnimalCreate(BaseModel):
    nom: str
    age: int
    poids: int
    couleur: str
    race: str
    regime_alimentaire: str
    date_last_vaccin: str
    espece_id: int
    images: Optional[List[UploadFile]] 

    class Config:
        arbitrary_types_allowed = True
