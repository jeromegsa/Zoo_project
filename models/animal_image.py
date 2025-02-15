from sqlmodel import SQLModel, Field, Relationship
from typing import Optional
from .animal import Animal

class AnimalImage(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    url: str
    animal_id: int = Field(foreign_key="animal.id")
    animal: Optional[Animal] = Relationship(back_populates="images")