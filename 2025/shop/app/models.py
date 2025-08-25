from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class UserCreate(BaseModel):
    name: str
    email: EmailStr
    age: Optional[int] = None

class UserUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[EmailStr] = None
    age: Optional[int] = None

class UserResponse(BaseModel):
    id: int
    name: str
    email: str
    age: Optional[int]
    created_at: datetime
    updated_at: datetime
