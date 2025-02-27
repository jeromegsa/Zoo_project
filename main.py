from fastapi import FastAPI
from routers import auth, user_router
from database.connection import engine, create_tables, reset_db

app = FastAPI()

# Inclure le routeur d'authentification
app.include_router(auth.router)

#inclure le routeur des utilisateurs 
app.include_router(user_router.router)

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