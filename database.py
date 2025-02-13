from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

DataBase_URL="postgresql:://postgres:00000000@localhost/animaux_db"

# create an instance of connexion engine

engine=create_engine(DataBase_URL)

# creer une session pour interagir avec la base
SessionLocal=sessionmaker(autocommit=False, autoflush=false, bind=engine)

# Base pour définir les modèles 
Base =declarative_base()