from datetime import datetime
from beanie import Document, PydanticObjectId
from pydantic import BaseModel, Field

class User(Document):
  username: str = Field(min_length=3, max_length=50)
  password: str
  email: str
  created: datetime = Field(default_factory=datetime.now)

  class Setting:
    name = "user"
  class Config:
    json_schema_extra = {
      "example": {
        "username": "Ivan",
        "password": "password",
        "email": "ivan@mail.local"
      }
    }

class RegisterUser(BaseModel):
  username: str
  password: str
  email: str

class LoginUser(BaseModel):
  username: str
  password: str

class CurrentUser(BaseModel):
  username: str
  email: str
  id: PydanticObjectId

class UserOut(BaseModel):
  id: PydanticObjectId
  username: str
  email: str
  created: datetime

  class Config:
        orm_mode = True