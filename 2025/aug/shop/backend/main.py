from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from .config import CORS_ORIGINS
from .database import get_db
from .auth import router as auth_router
from .deps import get_current_user
from .schemas import UserOut
from .models import User

app = FastAPI(title="FastAPI JWT Neon Starter", version="1.0.0")

if CORS_ORIGINS:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=CORS_ORIGINS,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

app.include_router(auth_router)

@app.get("/me", response_model=UserOut)
def read_me(user: User = Depends(get_current_user)):
    return user
