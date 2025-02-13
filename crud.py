from sqlalchemy.orm import Session
from . import models

# Créer une nouvelle espèce
def create_espece(db: Session, nom: str):
    db_espece = models.Espece(nom=nom)
    db.add(db_espece)
    db.commit()
    db.refresh(db_espece)
    return db_espece
