from sqlmodel import create_engine, SQLModel

# URL de connexion à la base de données MySQL
DATABASE_URL = "mysql+mysqldb://root@localhost/animaux_db"

# Créer le moteur de base de données
engine = create_engine(DATABASE_URL)

# Fonction pour créer les tables
def create_tables():
    SQLModel.metadata.create_all(engine)
    print("Tables créées avec succès !")