from fastapi import APIRouter, Depends,HTTPException 
from models import User, UserCreate,UserUpdate, UserPasswordUpdate
from sqlmodel import Session
from database import get_session
from crud import store,get_users,get_user_by_id,delete_user,update_user,update_password,setUserStatus
from dependencies import get_current_user

router = APIRouter()

@router.post("/users", response_model=User)
async  def create_user(user_data: UserCreate, session: Session = Depends(get_session)):
    """
    Création d'un nouvel utilisateur
    """
    user_created = store(user_data, session)
    return user_created

@router.get("/users/auth")
async def getAuthUser(current_user: User=Depends(get_current_user)):
    return current_user

@router.get("/users")
async def getAlluser(session: Session = Depends(get_session), current_user: User=Depends(get_current_user)):
    """
    Recupère tous les utilisateurs 
    """
    users =  get_users(session, current_user)
    return users

@router.get("/users/user/{user_id}")
async def getUserById(user_id:int, session: Session = Depends(get_session), current_user: User=Depends(get_current_user)):
    """
    Recupère un utilisateur par son id
    """
    user = get_user_by_id(user_id, session, current_user)
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user
@router.put("/users")
async def update__user(user_data: UserUpdate,session: Session = Depends(get_session), current_user: User = Depends(get_current_user)):
    try:
        user=update_user(user_data,session, current_user)
        return user
    except HTTPException as e :
        return e
@router.put("/users/user-password") 
def update_user_password(password_data: UserPasswordUpdate, session: Session = Depends(get_session), current_user: User = Depends(get_current_user)):
    dataUpdated= update_password(password_data,session, current_user)
    return dataUpdated

@router.put("/users/user/status/{user_id}")
def set_user_status(user_id:int, session: Session = Depends(get_session), current_user: User = Depends(get_current_user)):
    message= setUserStatus(user_id,session,current_user)
    return message
    
    

@router.delete("/users/user/{user_id}")
async def  delete_one_user(user_id:int , session: Session = Depends(get_session), current_user: User=Depends(get_current_user)):
    message_suppression=delete_user(user_id,session, current_user)
    return {"message": message_suppression}