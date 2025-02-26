from sqlmodel import SQLModel, Field, Relationship
from typing import Optional
import datetime
class Annonce(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    titre: str
    description: str
    animal_id: int = Field(foreign_key="animal.id")
    user_id: Optional[int] = Field(default=None, foreign_key="user.id")
    date_publication: datetime.datetime = Field(default_factory=datetime.datetime.utcnow)
    animal: Optional["Animal"] = Relationship(back_populates="annonces")
    user: Optional["User"] = Relationship(back_populates="annonces")
