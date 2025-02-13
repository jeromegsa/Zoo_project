from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "postgresql://postgres:tonmotdepasse@localhost/animaux_db"

# create an instance of connexion engine

engine=create_engine(DATABASE_URL)

# creer une session pour interagir avec la base
SessionLocal=sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base pour définir les modèles 
Base =declarative_base()