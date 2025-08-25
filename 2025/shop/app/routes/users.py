from fastapi import APIRouter, Depends, HTTPException
import asyncpg
from typing import List
from ..database import get_db_pool
from ..models import UserCreate, UserUpdate, UserResponse
from ..queries import UserQueries

router = APIRouter(prefix="/users", tags=["Users"])

@router.post("/", response_model=UserResponse, status_code=201)
async def create_user(user: UserCreate, pool: asyncpg.Pool = Depends(get_db_pool)):
    try:
        async with pool.acquire() as conn:
            row = await conn.fetchrow(UserQueries.CREATE_USER, user.name, user.email, user.age)
            return UserResponse(**row)
    except asyncpg.UniqueViolationError:
        raise HTTPException(status_code=400, detail="Email already exists")

@router.get("/{user_id}", response_model=UserResponse)
async def get_user(user_id: int, pool: asyncpg.Pool = Depends(get_db_pool)):
    async with pool.acquire() as conn:
        row = await conn.fetchrow(UserQueries.GET_USER_BY_ID, user_id)
        if not row:
            raise HTTPException(status_code=404, detail="User not found")
        return UserResponse(**row)

@router.get("/", response_model=List[UserResponse])
async def get_users(skip: int = 0, limit: int = 100, pool: asyncpg.Pool = Depends(get_db_pool)):
    async with pool.acquire() as conn:
        rows = await conn.fetch(UserQueries.GET_ALL_USERS, limit, skip)
        return [UserResponse(**row) for row in rows]

@router.put("/{user_id}", response_model=UserResponse)
async def update_user(user_id: int, user_update: UserUpdate, pool: asyncpg.Pool = Depends(get_db_pool)):
    try:
        async with pool.acquire() as conn:
            row = await conn.fetchrow(
                UserQueries.UPDATE_USER,
                user_id,
                user_update.name,
                user_update.email,
                user_update.age
            )
            if not row:
                raise HTTPException(status_code=404, detail="User not found")
            return UserResponse(**row)
    except asyncpg.UniqueViolationError:
        raise HTTPException(status_code=400, detail="Email already exists")

@router.delete("/{user_id}")
async def delete_user(user_id: int, pool: asyncpg.Pool = Depends(get_db_pool)):
    async with pool.acquire() as conn:
        row = await conn.fetchrow(UserQueries.DELETE_USER, user_id)
        if not row:
            raise HTTPException(status_code=404, detail="User not found")
        return {"message": f"User {user_id} deleted successfully"}

@router.get("/count/total")
async def get_user_count(pool: asyncpg.Pool = Depends(get_db_pool)):
    async with pool.acquire() as conn:
        count = await conn.fetchval(UserQueries.COUNT_USERS)
        return {"total_users": count}
