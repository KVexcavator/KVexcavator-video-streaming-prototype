import jwt

secret = "VerySecretString"
token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NDk5Mjk4OTIsImlhdCI6MTc0NzMzNzg5Miwic3ViIjp7InVzZXJfaWQiOiI2ODIzMmZmZTNkYzRhOGUwNzU0NmQwMGYiLCJ1c2VybmFtZSI6Iml2YW4ifX0.zVUih4FbSAFlMawDP1QApIS4u3q1YGgZWcAOOteYgkY"

decoded = jwt.decode(token, secret, algorithms=["HS256"])
print(decoded)

# {
#   "exp": 1749930752,
#   "iat": 1747338752,
#   "sub": {
#     "user_id": "68232ffe3dc4a8e07546d00f",
#     "username": "ivan"
#   }
# }
