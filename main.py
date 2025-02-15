from fastapi import FastAPI
from database.connection import engine, create_tables
from tests.seed_data import add_test_data
from models import Espece, Race, User, Refuge, Animal, Annonce, AnimalImage
from sqlmodel import Session
# from  .tests.seed_data import add_test_data

app = FastAPI()

@app.on_event("startup")
def on_startup():
    create_tables()
    # add_test_data()


@app.get("/")
def read_root():
    return {"message": "Bienvenue sur l'API de gestion des animaux !"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
    