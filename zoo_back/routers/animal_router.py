from fastapi import APIRouter, Depends, File, Form, UploadFile
from sqlmodel import Session
from database import get_session
from models import Animal, User
from typing import Optional, List
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
    race: str = Form(...),
    espece_id: int = Form(...),
    images: Optional[List[UploadFile]] = None,
    session: Session = Depends(get_session)
):
    return create_animal(
        session=session,
        nom=nom,
        age=age,
        poids=poids,
        couleur=couleur,
        regime_alimentaire=regime_alimentaire,
        date_last_vaccin=date_last_vaccin,
        race= race,
        espece_id=espece_id,
        images=images
    )

@router.get("/animaux/{animal_id}", response_model=Animal)
def read_animal(animal_id: int, session: Session = Depends(get_session)):
    return get_animal(session, animal_id)

@router.get("/animaux/", response_model=List[Animal])
def read_all_animals(
    espece_id: Optional[int] = None,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    return get_animals(session, espece_id, current_user)

@router.put("/animaux/{animal_id}", response_model=Animal)
def update_existing_animal(
    animal_id: int,
    nom: str = Form(...),
    age: int = Form(...),
    poids: int = Form(...),
    couleur: str = Form(...),
    new_images: Optional[List[UploadFile]] = File(None),
    delete_image_ids: Optional[List[int]] = Form(None),
    session: Session = Depends(get_session)
):
    return update_animal(
        session=session,
        animal_id=animal_id,
        nom=nom,
        age=age,
        poids=poids,
        couleur=couleur,
        new_images=new_images,
        delete_image_ids=delete_image_ids
    )

@router.delete("/animaux/{animal_id}")
def delete_existing_animal(animal_id: int, session: Session = Depends(get_session)):
    return delete_animal(session, animal_id)
