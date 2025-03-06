from sqlmodel import Session, select
from models import Race
from fastapi import HTTPException

def create_race(session: Session, race_data: Race):
    """
    Crée une nouvelle race.
    """
    existing_race = session.exec(select(Race).where(Race.nom == race_data.nom)).first()
    if existing_race:
        raise HTTPException(status_code=400, detail="Une race avec ce nom existe déjà.")

    session.add(race_data)
    session.commit()
    return race_data

def get_races(session: Session):
    """
    Récupère toutes les races.
    """
    return session.exec(select(Race)).all()

def get_race_by_id(session: Session, race_id: int):
    """
    Récupère une race par son ID.
    """
    race = session.exec(select(Race).where(Race.id == race_id)).first()
    if not race:
        raise HTTPException(status_code=404, detail="Race introuvable.")
    return race

def update_race(session: Session, race_id: int, race_data: Race):
    """
    Met à jour une race existante.
    """
    race = session.exec(select(Race).where(Race.id == race_id)).first()
    if not race:
        raise HTTPException(status_code=404, detail="Race introuvable.")

    for key, value in race_data.dict(exclude_unset=True).items():
        setattr(race, key, value)

    session.commit()
    session.refresh(race)
    return race

def delete_race(session: Session, race_id: int):
    """
    Supprime une race.
    """
    race = session.exec(select(Race).where(Race.id == race_id)).first()
    if not race:
        raise HTTPException(status_code=404, detail="Race introuvable.")

    session.delete(race)
    session.commit()
    return {"message": "Race supprimée avec succès"}
