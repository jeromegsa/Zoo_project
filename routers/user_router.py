from fastapi import APIRouter, Depends
from  models import User,UserCreate
from sqlmodel import Session
from database import get_session
from  crud import store

router=APIRouter()

@router.post("/users/", response_model=User)
def create_user(user: UserCreate, session: Session = Depends(get_session)):
    """
    Crée un nouvel utilisateur.
    """
    db_user = store( user, session)
    return db_user
