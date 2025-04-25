from sqlmodel import Session, select
from models import Espece
from fastapi import HTTPException
from sqlalchemy.orm import selectinload
from sqlalchemy import text

def create_espece(session: Session, espece_data: Espece):
    """
    Crée une nouvelle espèce.
    """
    existing_espece = session.exec(select(Espece).where(Espece.nom == espece_data.nom)).first()
    if existing_espece:
        raise HTTPException(status_code=400, detail="Une espèce avec ce nom existe déjà.")

    session.add(espece_data)
    session.commit()
    return espece_data

def get_especes(session: Session):
    # statement = select(Espece).options(selectinload(Espece.races))
    statement= text("""select espece.id AS espece_id , espece.nom AS espece_nom, race.id AS race_id,
                      race.nom as race_nom FROM espece LEFT JOIN race ON race.espece_id=espece.id
                    """)
    
    result = session.exec(statement)
    rows = result.fetchall()
    # organiser les données sous forme de dictionnaire 
    especes_dict = {}
    for row in rows : 
        espece_id= row.espece_id
        if espece_id  not in especes_dict:
            especes_dict[espece_id] = {
                "id": espece_id,
                "nom": row.espece_nom,
                "races": []
            }
        if row.race_id:
            print("""""""""""""""row """"""""""""""", row)
            especes_dict[espece_id]["races"].append({
                "id": row.race_id,
                "nom": row.race_nom
            })
            
    return list(especes_dict.values())

def get_espece_by_id(session: Session, espece_id: int):
    """
    Récupère une espèce par son ID.
    """
    espece = session.exec(select(Espece).where(Espece.id == espece_id)).first()
    if not espece:
        raise HTTPException(status_code=404, detail="Espèce introuvable.")
    return espece

def update_espece(session: Session, espece_id: int, espece_data: Espece):
    """
    Met à jour une espèce existante.
    """
    espece = session.exec(select(Espece).where(Espece.id == espece_id)).first()
    if not espece:
        raise HTTPException(status_code=404, detail="Espèce introuvable.")

    for key, value in espece_data.dict(exclude_unset=True).items():
        setattr(espece, key, value)

    session.commit()
    session.refresh(espece)
    return espece

def delete_espece(session: Session, espece_id: int):
    """
    Supprime une espèce.
    """
    espece = session.exec(select(Espece).where(Espece.id == espece_id)).first()
    if not espece:
        raise HTTPException(status_code=404, detail="Espèce introuvable.")

    session.delete(espece)
    session.commit()
    return {"message": "Espèce supprimée avec succès"}
