from fastapi import APIRouter, Depends
from sqlmodel import Session
from database import get_session
from models import Race
from crud import create_race, get_races, get_race_by_id, update_race, delete_race

router = APIRouter(tags=["Race"])

@router.post("/races/", response_model=Race)
def create_race_route(race_data: Race, session: Session = Depends(get_session)):
    return create_race(session, race_data)

@router.get("/races/", response_model=list[Race])
def get_races_route(session: Session = Depends(get_session)):
    return get_races(session)

@router.get("/races/{race_id}", response_model=Race)
def get_race_by_id_route(race_id: int, session: Session = Depends(get_session)):
    return get_race_by_id(session, race_id)

@router.put("/races/{race_id}", response_model=Race)
def update_race_route(race_id: int, race_data: Race, session: Session = Depends(get_session)):
    return update_race(session, race_id, race_data)

@router.delete("/races/{race_id}")
def delete_race_route(race_id: int, session: Session = Depends(get_session)):
    return delete_race(session, race_id)
