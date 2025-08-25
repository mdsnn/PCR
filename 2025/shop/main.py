from fastapi import FastAPI, HTTPException, Depends
from pydantic import BaseModel, EmailStr
from typing import List, Optional
import asyncpg
import os
from datetime import datetime
from contextlib import asynccontextmanager

# Database configuration
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://postgres:chama@localhost:5432/store")

# Database connection pool
db_pool = None

# Pydantic models
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

# SQL Queries
class UserQueries:
    CREATE_TABLE = """
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            age INTEGER,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """
    
    CREATE_USER = """
        INSERT INTO users (name, email, age) 
        VALUES ($1, $2, $3) 
        RETURNING id, name, email, age, created_at, updated_at
    """
    
    GET_USER_BY_ID = """
        SELECT id, name, email, age, created_at, updated_at 
        FROM users 
        WHERE id = $1
    """
    
    GET_ALL_USERS = """
        SELECT id, name, email, age, created_at, updated_at 
        FROM users 
        ORDER BY created_at DESC
        LIMIT $1 OFFSET $2
    """
    
    UPDATE_USER = """
        UPDATE users 
        SET name = COALESCE($2, name),
            email = COALESCE($3, email),
            age = COALESCE($4, age),
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $1
        RETURNING id, name, email, age, created_at, updated_at
    """
    
    DELETE_USER = """
        DELETE FROM users 
        WHERE id = $1
        RETURNING id
    """
    
    COUNT_USERS = """
        SELECT COUNT(*) FROM users
    """

# Database functions
async def get_db_pool():
    return db_pool

async def init_db():
    """Initialize database and create tables"""
    global db_pool
    db_pool = await asyncpg.create_pool(DATABASE_URL)
    
    async with db_pool.acquire() as conn:
        await conn.execute(UserQueries.CREATE_TABLE)

async def close_db():
    """Close database pool"""
    if db_pool:
        await db_pool.close()

# Lifespan context manager
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    await init_db()
    yield
    # Shutdown
    await close_db()

# FastAPI app
app = FastAPI(
    title="User CRUD API",
    description="A simple CRUD API using FastAPI and PostgreSQL with pure SQL",
    version="1.0.0",
    lifespan=lifespan
)

# CRUD Operations

@app.post("/users/", response_model=UserResponse, status_code=201)
async def create_user(user: UserCreate, pool: asyncpg.Pool = Depends(get_db_pool)):
    """Create a new user"""
    try:
        async with pool.acquire() as conn:
            row = await conn.fetchrow(
                UserQueries.CREATE_USER,
                user.name, user.email, user.age
            )
            return UserResponse(**row)
    except asyncpg.UniqueViolationError:
        raise HTTPException(status_code=400, detail="Email already exists")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/users/{user_id}", response_model=UserResponse)
async def get_user(user_id: int, pool: asyncpg.Pool = Depends(get_db_pool)):
    """Get a user by ID"""
    async with pool.acquire() as conn:
        row = await conn.fetchrow(UserQueries.GET_USER_BY_ID, user_id)
        
        if not row:
            raise HTTPException(status_code=404, detail="User not found")
        
        return UserResponse(**row)

@app.get("/users/", response_model=List[UserResponse])
async def get_users(
    skip: int = 0, 
    limit: int = 100, 
    pool: asyncpg.Pool = Depends(get_db_pool)
):
    """Get all users with pagination"""
    async with pool.acquire() as conn:
        rows = await conn.fetch(UserQueries.GET_ALL_USERS, limit, skip)
        return [UserResponse(**row) for row in rows]

@app.put("/users/{user_id}", response_model=UserResponse)
async def update_user(
    user_id: int, 
    user_update: UserUpdate, 
    pool: asyncpg.Pool = Depends(get_db_pool)
):
    """Update a user"""
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
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.delete("/users/{user_id}")
async def delete_user(user_id: int, pool: asyncpg.Pool = Depends(get_db_pool)):
    """Delete a user"""
    async with pool.acquire() as conn:
        row = await conn.fetchrow(UserQueries.DELETE_USER, user_id)
        
        if not row:
            raise HTTPException(status_code=404, detail="User not found")
        
        return {"message": f"User {user_id} deleted successfully"}

@app.get("/users/count/total")
async def get_user_count(pool: asyncpg.Pool = Depends(get_db_pool)):
    """Get total user count"""
    async with pool.acquire() as conn:
        count = await conn.fetchval(UserQueries.COUNT_USERS)
        return {"total_users": count}

# Health check endpoint
@app.get("/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
