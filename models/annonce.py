from sqlmodel import SQLModel, Field, Relationship
from typing import Optional

class Annonce(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    titre: str
    description: str
    animal_id: int = Field(foreign_key="animal.id")
    user_id: Optional[int] = Field(default=None, foreign_key="user.id")
    refuge_id: Optional[int] = Field(default=None, foreign_key="refuge.id")
    date_publication: Optional[str] = Field(default="CURRENT_TIMESTAMP")
    animal: Optional["Animal"] = Relationship(back_populates="annonces")
    user: Optional["User"] = Relationship(back_populates="annonces")
    refuge: Optional["Refuge"] = Relationship(back_populates="annonces")