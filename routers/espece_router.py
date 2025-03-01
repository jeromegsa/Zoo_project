from fastapi import APIRouter, Depends
from sqlmodel import Session
from database import get_session
from models import Espece
from crud import create_espece, get_especes, get_espece_by_id, update_espece, delete_espece

router = APIRouter()

@router.post("/especes/", response_model=Espece)
def create_espece_route(espece_data: Espece, session: Session = Depends(get_session)):
    return create_espece(session, espece_data)

@router.get("/especes/", response_model=list[Espece])
def get_especes_route(session: Session = Depends(get_session)):
    return get_especes(session)

@router.get("/especes/{espece_id}", response_model=Espece)
def get_espece_by_id_route(espece_id: int, session: Session = Depends(get_session)):
    return get_espece_by_id(session, espece_id)

@router.put("/especes/{espece_id}", response_model=Espece)
def update_espece_route(espece_id: int, espece_data: Espece, session: Session = Depends(get_session)):
    return update_espece(session, espece_id, espece_data)

@router.delete("/especes/{espece_id}")
def delete_espece_route(espece_id: int, session: Session = Depends(get_session)):
    return delete_espece(session, espece_id)
