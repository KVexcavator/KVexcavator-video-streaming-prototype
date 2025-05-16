from typing import Optional
from datetime import datetime
from pydantic import BaseModel, Field
from beanie import Document, Link, PydanticObjectId
from .user import User, UserOut
from utils import generate_stream_key

class Stream(Document):
  title: str
  description: Optional[str] = None
  streamer: Link[User]
  stream_key: str = Field(
    default_factory=generate_stream_key,
  )

  created_at: datetime = Field(default_factory=datetime.now)
  updated_at: datetime = Field(default_factory=datetime.now)

  # OBS create stream with
  # rtmp://<srs-server-ip>/live/<stream_key>
  class Settings:
    name = "stream"

class UpdateStream(BaseModel):
  title: Optional[str] = None
  description: Optional[str] = None
  updated_at: datetime = datetime.now()

class StreamOut(BaseModel):
    id: PydanticObjectId
    title: str
    description: Optional[str]
    streamer: UserOut
    stream_key: str
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True