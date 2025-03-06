from fastapi import  Depends, HTTPException 
from sqlmodel  import Session,select
from database import get_session
from models import User, UserCreate,UserUpdate,UserPasswordUpdate
from dependencies import get_current_user
from passlib.context import CryptContext

pwd_context =CryptContext(schemes=['bcrypt'], deprecated ="auto")

def store(user_data : UserCreate, session : Session =Depends (get_session)):
    """
    Crée un nouvel utilisateur après validation 
    """
    try:
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
            role=user_data.role,
            status=False
    )
        # Ajouter et enregistrer dans la base de données 

        session.add(new_user)
        session.commit()
        session.refresh(new_user)
        return new_user
    except HTTPException as e :
        print (e)

def get_users(session: Session = Depends(get_session),current_user: User=Depends(get_current_user)):
    """
    Récupère tous les utilisateurs de la base de données
    """
    try:
        users =  session.query(User).all()
        return users
    except HTTPException as e :
        print (e)
        
def get_user_by_id(user_id, session: Session = Depends(get_session), current_user: User=Depends(get_current_user)):
    """
    Récupère un utilisateur par son ID de la base de données
    """
    try:
        user_id=int(user_id)
        user=session.query(User).filter(User.id==user_id).first()
        if not user:
            raise HTTPException(status_code=404, detail="Utilisateur introuvable")
        return user
    except HTTPException as e :
        print (e)
    
    

def update_user(user_data: UserUpdate, session: Session = Depends(get_session), current_user: User = Depends(get_current_user)):
    """
    Met à jour un utilisateur tout en conservant les champs non modifiés.
    """
    user = session.query(User).filter(User.id == current_user.id).first()

    if not user:
        raise HTTPException(status_code=404, detail="Utilisateur introuvable")

    # Mise à jour des champs si fournis
    update_data = user_data.dict(exclude_unset=True)  # Exclut les champs non fournis
    for key, value in update_data.items():
        setattr(user, key, value)

    session.commit()
    session.refresh(user)

    return user   
def setUserStatus(user_id:int, session: Session = Depends(get_session), current_user: User = Depends(get_current_user)):
    """
        Mise à jour du statut des utilsateurs 
    """
    if current_user.role !="admin":
        raise HTTPException(status_code=401,detail="Vous n'êtes pas autorisé à faire cette action")

    user=session.query(User).filter(User.id==user_id).first()
    if user.is_active:
        user.is_active=False
     
    else:
        user.is_active=True
    session.commit()
    session.refresh(user)
    return ("Statut mise à jour avec succès !")

def update_password( password_data: UserPasswordUpdate, session: Session = Depends(get_session), current_user: User = Depends(get_current_user)):
    """
    Met à jour le mot de passe d'un utilisateur après validation de l'ancien mot de passe.
    """
    user = session.query(User).filter(User.id == current_user.id).first()

    if not user:
        raise HTTPException(status_code=404, detail="Utilisateur introuvable")

    # Vérification de l'ancien mot de passe
    if not pwd_context.verify(password_data.old_password, user.password):
        raise HTTPException(status_code=400, detail="Ancien mot de passe incorrect")

    # Hash du nouveau mot de passe
    user.password = pwd_context.hash(password_data.new_password)

    session.commit()
    session.refresh(user)

    return {"message": "Mot de passe mis à jour avec succès"}

def  delete_user(user_id:int , session: Session = Depends(get_session), current_user: User=Depends(get_current_user)):
    """
    Supprime un utilisateur de la base de données
    """
    try:
        user_id=int(user_id)
        user=session.query(User).filter(User.id==user_id).first()
        if not user:
            raise HTTPException(status_code=404, detail="Utilisateur introuvable")
        session.delete(user)
        session.commit()
        return {"message": "Utilisateur supprimé"}
    except HTTPException as e :
        print (e)
        
    
