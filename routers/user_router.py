from fastapi import APIRouter, Depends
from models import User, UserCreate
from sqlmodel import Session
from database import get_session
from crud import store

router = APIRouter()

@router.post("/users", response_model=User)
async def create_user(user_data: UserCreate, session: Session = Depends(get_session)):
    """
    Création d'un nouvel utilisateur
    """
    user_created = store(user_data, session)
    return user_created
