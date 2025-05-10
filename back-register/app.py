from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi_cors import CORS
from config import init_db
from routers import stream as stream_router
from routers import user as user_router

@asynccontextmanager
async def lifespan(app: FastAPI):
  await init_db()
  yield

app = FastAPI(lifespan=lifespan)

CORS(app) 
# .env ALLOW_ORIGINS, ALLOWED_CREDENTIALS, ALLOWED_METHODS, ALLOWED_ORIGINS, and others

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