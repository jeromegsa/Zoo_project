from typing import List
from pydantic import BaseModel
from schemas import AnimalCreate

class AnnonceCreate(BaseModel):
    titre: str
    description: str
    animaux_data: List[AnimalCreate]
