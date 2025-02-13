from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
import models
import crud
import database

app = FastAPI()

# Créer une dépendance pour obtenir la session de la base de données
def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Route pour ajouter une espèce
@app.post("/especes/")
def create_espece(nom: str, db: Session = Depends(get_db)):
    return crud.create_espece(db=db, nom=nom)
