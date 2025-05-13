from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os
from config import init_db
from routers import stream as stream_router
from routers import user as user_router

load_dotenv()

@asynccontextmanager
async def lifespan(app: FastAPI):
  await init_db()
  yield

app = FastAPI(lifespan=lifespan)

origins = os.getenv("ALLOWED_ORIGINS", "").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # список строк
    allow_credentials=os.getenv("ALLOW_CREDENTIALS", "false").lower() == "true",
    allow_methods=os.getenv("ALLOWED_METHODS", "GET,POST,OPTIONS").split(","),
    allow_headers=os.getenv("ALLOWED_HEADERS", "*").split(","),
)

app.include_router(
  stream_router.router,
  prefix="/streams",
  tags=["Streams"]
)

app.include_router(
  user_router.router,
  prefix="/users",
  tags=["Users"]
)

# http http://localhost:8000/
@app.get("/", tags=["Root"])
async def read_root() -> dict:
  return {"message": "Welcome to Register!"}