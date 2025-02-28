from fastapi import  Depends, HTTPException 
from sqlmodel  import Session,select
from database import get_session
from models import User, UserCreate
from dependencies import get_current_user
from passlib.context import CryptContext

pwd_context =CryptContext(schemes=['bcrypt'], deprecated ="auto")

def store(user_data : UserCreate, session : Session =Depends (get_session)):
    """
    Crée un nouvel utilisateur après validation 
    """
    
    # Vérifier si l'utilisateur existe déjà 
    existing_user= session.query(User).filter(User.username==user_data.username).first()
    
    if existing_user:
        raise HTTPException(status_code=400, detail="L'utlisateur existe déjà ")
    
    #hasher le mot de passe 
    hashed_password=pwd_context.hash(user_data.password)
    
    #Créeer un nouvel objet utilisateur 
    
    new_user=User(
        username=user_data.username,
        nom =user_data.nom,
        prenom= user_data.prenom,
        email=user_data.email,
        password=hashed_password,
        localisation=user_data.localisation,
        role=user_data.role
)
    # Ajouter et enregistrer dans la base de données 

    session.add(new_user)
    session.commit()
    session.refresh(new_user)
    return new_user

def get_users(session: Session = Depends(get_session),current_user: User=Depends(get_current_user)):
    """
    Récupère tous les utilisateurs de la base de données
    """
    try:
        users =  session.query(User).all()
        return users
    except HTTPException as e :
        print (e)

