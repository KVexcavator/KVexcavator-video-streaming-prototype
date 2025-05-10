from typing import Optional
from datetime import datetime
from pydantic import BaseModel
from beanie import Document, Link, Indexed
from .user import User
from utils import generate_stream_key

class Stream(Document):
  title: str
  description: Optional[str] = None
  streamer: Link[User]
  stream_key: str = Indexed(unique=True, default_factory=generate_stream_key)

  created_at: datetime = datetime.now()
  updated_at: datetime = datetime.now()

  # OBS create stream with
  # rtmp://<srs-server-ip>/live/<stream_key>
  class Settings:
    name = "stream"

class UpdateStream(BaseModel):
  title: Optional[str] = None
  description: Optional[str] = None
  updated_at: datetime = datetime.now()

