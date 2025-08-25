from fastapi import FastAPI
from .database import lifespan
from .routes import users

app = FastAPI(
    title="User CRUD API",
    description="A simple CRUD API using FastAPI + asyncpg (pure SQL)",
    version="1.0.0",
    lifespan=lifespan
)

# Routers
app.include_router(users.router)

# Health check
@app.get("/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
