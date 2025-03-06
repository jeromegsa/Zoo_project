from datetime import datetime, timedelta
from typing import Optional
from jose import jwt
from fastapi import HTTPException, status
from sqlmodel import Session
from models.user import User
from schemas.token_schema import TokenData
from passlib.context import CryptContext
from config import SECRET_KEY, ALGORITHM, ACCESS_TOKEN_EXPIRE_MINUTES



# Configuration de bcrypt
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def authenticate_user(session: Session, username: str, password: str) -> Optional[User]:
    """
    Authentifie un utilisateur en vérifiant le nom d'utilisateur et le mot de passe.
    """
    user = session.query(User).filter(User.username == username).first()
    if not user or not pwd_context.verify(password, user.password):  
        return None
    return user
# def authenticate_user(session: Session, username: str, password: str) -> Optional[User]:
#     """
#     Authentifie un utilisateur en vérifiant le nom d'utilisateur et le mot de passe.
#     """
#     user = session.query(User).filter(User.username == username).first()
#     if not user or user.password != password:
#         return None
#     return user

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None) -> str:
    """
    Crée un token JWT.
    """
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt