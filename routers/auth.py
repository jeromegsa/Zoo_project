from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from datetime import timedelta
from sqlmodel import Session
from crud.auth import authenticate_user, create_access_token
from schemas.token_schema import Token
from database.connection import get_session

router = APIRouter()

@router.post("/token", response_model=Token)
async def login_for_access_token(
    form_data: OAuth2PasswordRequestForm = Depends(),
    session: Session = Depends(get_session)
):
    # Authentifier l'utilisateur
    user = authenticate_user(session, form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Nom d'utilisateur ou mot de passe incorrect",
            headers={"WWW-Authenticate": "Bearer"},
        )

    # Créez un token JWT
    access_token_expires = timedelta(minutes=30)
    access_token = create_access_token(data={"sub": user.username, "role": user.role.value})

    # Retournez le token
    return {"access_token": access_token, "token_type": "bearer"}