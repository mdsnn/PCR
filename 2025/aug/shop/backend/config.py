import os
from dotenv import load_dotenv
from datetime import timedelta

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

JWT_SECRET = os.getenv("JWT_SECRET", "change-me")
JWT_ALGORITHM = os.getenv("JWT_ALGORITHM", "HS256")

ACCESS_TOKEN_EXPIRES_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRES_MINUTES", "15"))
REFRESH_TOKEN_EXPIRES_DAYS = int(os.getenv("REFRESH_TOKEN_EXPIRES_DAYS", "7"))

CORS_ORIGINS = [o for o in os.getenv("CORS_ORIGINS", "").split(",") if o]

ACCESS_TOKEN_EXPIRES = timedelta(minutes=ACCESS_TOKEN_EXPIRES_MINUTES)
REFRESH_TOKEN_EXPIRES = timedelta(days=REFRESH_TOKEN_EXPIRES_DAYS)
