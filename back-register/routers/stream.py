from typing import List
from beanie import PydanticObjectId, WriteRules
from fastapi import (
  APIRouter, 
  Depends,
  Form,
  HTTPException,
  status)
from services import AuthHandler
from models import User, Stream, UpdateStream, StreamOut

auth_handler = AuthHandler()
router = APIRouter()

@router.get("/", response_model=List[StreamOut])
async def get_streams():
  return await Stream.find_all(fetch_links=True).to_list()

@router.get("/{stream_id}", response_model=StreamOut)
async def get_stream(stream_id: PydanticObjectId):
  stream = await Stream.get(stream_id, fetch_links=True)
  if not stream:
    raise HTTPException(status_code=404, detail="Stream not found")
  return stream

@router.post(
  "/",
  response_description="Add new stream with",
  response_model=Stream,
  status_code=status.HTTP_201_CREATED,
)
async def add_stream(
  title: str = Form("title"),
  description: str = Form("description"),
  user_data=Depends(auth_handler.auth_wrapper),
):
  user = await User.get(user_data["user_id"])
  # print(f"Fetched User: {user}")

  stream = Stream(
    title=title,
    description=description,
    streamer=user,
  )
  return await stream.insert(link_rule=WriteRules.WRITE)

@router.put("/{stream_id}", response_model=Stream)
async def update_stream(
  stream_id: PydanticObjectId,
  streamdata: UpdateStream
):
  stream = await Stream.get(stream_id)
  if not stream:
    raise HTTPException(
      status_code=404,
      detail="Stream not found"
    )
  updated_stream = {
    k: v for k, v in streamdata.model_dump().items() if v is not None}
  return await stream.set(updated_stream)

@router.delete("/{stream_id}")
async def delete_stream(stream_id: PydanticObjectId):
  stream = await Stream.get(stream_id)
  if not stream:
    raise HTTPException(
      status_code=404, 
      detail="Stream not found"
    )
  await stream.delete()