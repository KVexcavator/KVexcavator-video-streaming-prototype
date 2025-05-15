import datetime
import jwt
from fastapi import HTTPException, Security
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from passlib.context import CryptContext

class AuthHandler:
  security = HTTPBearer()
  pwd_context = CryptContext(
    schemes=["bcrypt"], deprecated="auto"
  )
  secret = "VerySecretString"

  def get_password_hash(self, password):
    return self.pwd_context.hash(password)
  
  def verify_password( self, plain_password, hashed_password ):
    return self.pwd_context.verify(
      plain_password, hashed_password
    )
  
  def encode_token(self, user_id, username):
    payload = {
      "exp": datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(days=30),
      "iat": datetime.datetime.now(datetime.timezone.utc),
      "sub": user_id, 
      "username": username,
    }
    return jwt.encode(payload, self.secret, algorithm="HS256")
  
  def decode_token(self, token):
    try:
      payload = jwt.decode( token, self.secret, algorithms=["HS256"])
      # print(f"[AUTH PAYLOAD]: {payload}")
      return {
        "user_id": payload["sub"],
        "username": payload.get("username")
      }
    except jwt.ExpiredSignatureError:
      # print("[AUTH ERROR] Token expired")
      raise HTTPException(
        status_code=401,
        detail="Signature has expired"
      )
    except jwt.InvalidTokenError as e:
      # print(f"[AUTH ERROR] Invalid token: {str(e)}")
      raise HTTPException(
        status_code=401,
        detail="Invalid token"
      )
  def auth_wrapper(
    self,
    auth: HTTPAuthorizationCredentials = Security(security)
  ):
    # print(f"[AUTH] Received token: {auth.credentials}")
    return self.decode_token(auth.credentials)