from fastapi import APIRouter, Depends, File, Form, UploadFile
from sqlmodel import Session
from database import get_session
from models import Animal, User
from typing import Optional,List
from dependencies import get_current_user
from crud import (
    create_animal, get_animal, get_animals, update_animal, delete_animal
)

router = APIRouter(tags=["Animal"])

@router.post("/animaux/", response_model=Animal)
async def create_new_animal(
    nom: str = Form(...),
    age: int = Form(...),
    poids: int = Form(...),
    couleur: str = Form(...),
    regime_alimentaire: str = Form(...),
    date_last_vaccin: str = Form(...),
    espece_id: int = Form(...),
    catalogue_id: int = Form(...),
    images: list[UploadFile] = File(...),
    session: Session = Depends(get_session)
):
    return create_animal(session, nom, age, poids, couleur, regime_alimentaire, date_last_vaccin, espece_id, catalogue_id, images)
@router.get("/animaux/{animal_id}", response_model=Animal)
def read_animal(animal_id: int, session: Session = Depends(get_session)):
    return get_animal(session, animal_id)

@router.get("/animaux/", response_model=list[Animal])
def read_all_animals(espece_id: Optional[int] = None, catalogue_id: Optional[int] = None, session: Session = Depends(get_session), current_user:Optional [User ]= Depends(get_current_user)):
    return get_animals(session, espece_id, catalogue_id, current_user.id)

@router.put("/animaux/{animal_id}", response_model=Animal)
def update_existing_animal(animal_id: int, nom: str, age: int, poids: int, couleur: str, session: Session = Depends(get_session),   new_images: Optional[List[UploadFile]] = None,
    delete_image_ids: Optional[List[int]] = None):
    return update_animal(session, animal_id, nom, age, poids, couleur)

@router.delete("/animaux/{animal_id}")
def delete_existing_animal(animal_id: int, session: Session = Depends(get_session)):
    return delete_animal(session, animal_id)
