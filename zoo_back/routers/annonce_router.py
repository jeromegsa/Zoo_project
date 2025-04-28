from fastapi import APIRouter, Depends, Form, UploadFile
from fastapi import File
from sqlmodel import Session
from typing import List, Optional
from database import get_session
from crud import create_annonce, get_annonce, get_annonces, update_annonce, delete_annonce, get_random_annonces
from dependencies import get_current_user
from models import User
from schemas import AnimalCreate , AnnonceCreate , AnimalImageRead, AnimalRead, AnnonceRead # Schéma Pydantic pour créer des animaux

router = APIRouter(prefix="/annonces", tags=["Annonces"])

@router.get("/randomAll", response_model=List[AnnonceRead])
def read_random_annonces(session: Session = Depends(get_session)) -> List[AnnonceRead]:
    return get_random_annonces(session)
@router.post("/")
def create_annonce_route(
    data: AnnonceCreate,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    return create_annonce(
            session,
            data.titre,
            data.description,
            data.animaux_data,
            current_user
        )


@router.get("/{id}")
def get_annonce_route(id: int, session: Session = Depends(get_session)):
    return get_annonce(session, id)

@router.get("/", response_model=List[AnnonceRead])
def read_annonces(session: Session = Depends(get_session)):
    return get_annonces(session)

@router.put("/{id}")
def update_annonce_route(
    id: int,
    data: dict,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_user)
):
    return update_annonce(session, id, data.get("titre"), data.get("description"), current_user)

@router.delete("/{id}")
def delete_annonce_route(id: int, session: Session = Depends(get_session), current_user: User = Depends(get_current_user)):
    return delete_annonce(session, id, current_user)

