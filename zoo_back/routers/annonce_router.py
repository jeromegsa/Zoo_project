from fastapi import APIRouter, Depends
from sqlmodel import Session
from typing import List, Optional
from database import get_session
from crud import create_annonce, get_annonce, get_annonces, update_annonce, delete_annonce
from dependencies import get_current_user
from models import User,AnnonceCreate, AnnonceRead, AnnonceUpdate

router = APIRouter(prefix="/annonces", tags=["Annonces"])

@router.post("/", response_model=AnnonceRead)
def create_annonce_route(data: AnnonceCreate, session: Session = Depends(get_session), current_user: User = Depends(get_current_user)):
    return create_annonce(session, data.titre, data.description, data.animal_id, current_user)

@router.get("/{id}", response_model=AnnonceRead)
def get_annonce_route(id: int, session: Session = Depends(get_session)):
    return get_annonce(session, id)

@router.get("/", response_model=List[AnnonceRead])
def get_annonces_route(session: Session = Depends(get_session), user_id: Optional[int] = None, animal_id: Optional[int] = None):
    return get_annonces(session, user_id, animal_id)

@router.put("/{id}", response_model=AnnonceRead)
def update_annonce_route(id: int, data: AnnonceUpdate, session: Session = Depends(get_session), current_user: User = Depends(get_current_user)):
    return update_annonce(session, id, data.titre, data.description, current_user)

@router.delete("/{id}")
def delete_annonce_route(id: int, session: Session = Depends(get_session), current_user: User = Depends(get_current_user)):
    return delete_annonce(session, id, current_user)
