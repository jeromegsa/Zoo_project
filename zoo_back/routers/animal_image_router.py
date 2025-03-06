from fastapi import APIRouter, Depends
from sqlmodel import Session
from database import get_session
from models.animal_image import AnimalImage
from typing import Optional
from crud import (
    create_animal_image, get_animal_image, get_animal_images, update_animal_image, delete_animal_image
)

router = APIRouter()

@router.post("/animal-images/", response_model=AnimalImage)
def create_image(url: str, animal_id: int, session: Session = Depends(get_session)):
    return create_animal_image(session, url, animal_id)

@router.get("/animal-images/{image_id}", response_model=AnimalImage)
def read_image(image_id: int, session: Session = Depends(get_session)):
    return get_animal_image(session, image_id)

@router.get("/animal-images/", response_model=list[AnimalImage])
def read_images(animal_id: Optional[int] = None, session: Session = Depends(get_session)):
    return get_animal_images(session, animal_id)

@router.put("/animal-images/{image_id}", response_model=AnimalImage)
def update_image(image_id: int, url: str, session: Session = Depends(get_session)):
    return update_animal_image(session, image_id, url)

@router.delete("/animal-images/{image_id}")
def delete_image(image_id: int, session: Session = Depends(get_session)):
    return delete_animal_image(session, image_id)
