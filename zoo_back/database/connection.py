from sqlmodel import create_engine, SQLModel, Session

# URL de connexion à la base de données MySQL
DATABASE_URL = "mysql+mysqldb://root@localhost/animaux_db"

# Créer le moteur de base de données
engine = create_engine(DATABASE_URL)

# Fonction pour créer les tables
def create_tables():
    SQLModel.metadata.create_all(engine)
    print("Tables créées avec succès !")
    
def get_session():
    session = Session(engine)
    try:
        yield session
    finally:
        session.close()

    # Supprime et recrée les tables
def reset_db():
    SQLModel.metadata.drop_all(engine)  # Supprime toutes les tables
    SQLModel.metadata.create_all(engine)  # Recrée les tables