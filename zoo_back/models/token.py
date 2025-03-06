from sqlmodel import SQLModel, Field
from typing import Optional

# class Token(SQLModel, table= True):
#     id: Optional[int] =Field(index= True, primary_key= True, unique=True)
#     access_token: str
#     token_type: str