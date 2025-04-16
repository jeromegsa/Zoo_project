from fastapi import FastAPI
from routers import auth, user_router, espece_router, race_router, animal_image_router, animal_router, annonce_router
from database.connection import engine, create_tables, reset_db
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Inclure le routeur d'authentification
app.include_router(auth.router)
#inclure le routeur des utilisateurs 
app.include_router(user_router.router)

#inclure le routeur des especes
app.include_router(espece_router.router)

#inclure le routeur des races
app.include_router(race_router.router)

#inclure le routeur des animals
app.include_router(animal_router.router)
#inclure le routeur des annonce
app.include_router(annonce_router.router)

# Configuration CORS pour autoriser le frontend React
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Remplace par l'URL de ton frontend si nécessaire
    allow_credentials=True,
    allow_methods=["*"],  # Autoriser toutes les méthodes (GET, POST, PUT, DELETE)
    allow_headers=["*"],  # Autoriser tous les headers
)

@app.on_event("startup")
def on_startup():
    # reset_db()
    # create_tables()
    print("startup")

@app.get("/")
def read_root():
    return {"message": "Bienvenue sur l'API de gestion des animaux !!"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)