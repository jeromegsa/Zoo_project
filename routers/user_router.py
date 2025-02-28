from fastapi import APIRouter, Depends,HTTPException 
from models import User, UserCreate
from sqlmodel import Session
from database import get_session
from crud import store,get_users,get_user_by_id,delete_user
from dependencies import get_current_user

router = APIRouter()

@router.post("/users", response_model=User)
async def create_user(user_data: UserCreate, session: Session = Depends(get_session)):
    """
    Création d'un nouvel utilisateur
    """
    user_created = store(user_data, session)
    return user_created

@router.get("/users/auth")
def getAuthUser(current_user: User=Depends(get_current_user)):
    return current_user

@router.get("/users")
def getAlluser(session: Session = Depends(get_session), current_user: User=Depends(get_current_user)):
    """
    Recupère tous les utilisateurs 
    """
    users =  get_users(session, current_user)
    return users

@router.get("/users/{user_id}")
def getUserById(user_id:int, session: Session = Depends(get_session), current_user: User=Depends(get_current_user)):
    """
    Recupère un utilisateur par son id
    """
    user = get_user_by_id(user_id, session, current_user)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user
@router.delete("/users")
def  delete_one_user(user_id:int , session: Session = Depends(get_session), current_user: User=Depends(get_current_user)):
    message_suppression=delete_user(user_id,session, current_user)
    return {"message": message_suppression}