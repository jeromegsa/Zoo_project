from fastapi import APIRouter, Depends
from models import User, UserCreate
from sqlmodel import Session
from database import get_session
from crud import store,get_users
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