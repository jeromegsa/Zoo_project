from sqlmodel import SQLModel, Field
from typing import Optional

class Token(SQLModel, table= False):
    # id: Optional[int] =Field(index= True, primary_key= True, unique=True)
    access_token: str
    token_type: str
class TokenData():
    id: Optional[int] =Field(index= True, primary_key= True, unique=True)
    username: Optional[str] = None