from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from datetime import timedelta
from sqlmodel import Session
from crud.auth import authenticate_user, create_access_token
from schemas.token_schema import Token
from database.connection import get_session
from config import SECRET_KEY, ALGORITHM, ACCESS_TOKEN_EXPIRE_MINUTES
from jose import JWTError, jwt
from  models import User

router = APIRouter()

@router.post("/login", response_model=Token)
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
    access_token = create_access_token(data={"sub": user.username, "role": user.role.value}, expires_delta=access_token_expires)

    # Retournez le token
    return {"access_token": access_token, "token_type": "bearer"}


# OAuth2PasswordBearer : prend le token depuis le header Authorization
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")
def get_current_user(token: str = Depends(oauth2_scheme), session: Session = Depends(get_session)):
    """ Récupère l'utilisateur à partir du token JWT """
    decoded = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    print(decoded)
    credentials_exception = HTTPException(
        status_code=401,
        detail="Impossible de valider les informations d'identification",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception

    user = session.query(User).filter(User.username == username).first()
    if user is None:
        raise credentials_exception
    return user