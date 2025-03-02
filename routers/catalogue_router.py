from fastapi import APIRouter, Depends
from sqlmodel import Session
from database import get_session
from models import Catalogue
from crud import (
    create_catalogue, get_catalogue, get_catalogues, update_catalogue, delete_catalogue
)
from typing import Optional

router = APIRouter()

@router.post("/catalogues/", response_model=Catalogue)
def create_new_catalogue(nom: str, user_id: int, session: Session = Depends(get_session)):
    return create_catalogue(session, nom, user_id)

@router.get("/catalogues/{catalogue_id}", response_model=Catalogue)
def read_catalogue(catalogue_id: int, session: Session = Depends(get_session)):
    return get_catalogue(session, catalogue_id)

@router.get("/catalogues/", response_model=list[Catalogue])
def read_all_catalogues(user_id: Optional[int] = None, session: Session = Depends(get_session)):
    return get_catalogues(session, user_id)

@router.put("/catalogues/{catalogue_id}", response_model=Catalogue)
def update_existing_catalogue(catalogue_id: int, nom: str, session: Session = Depends(get_session)):
    return update_catalogue(session, catalogue_id, nom)

@router.delete("/catalogues/{catalogue_id}")
def delete_existing_catalogue(catalogue_id: int, session: Session = Depends(get_session)):
    return delete_catalogue(session, catalogue_id)
