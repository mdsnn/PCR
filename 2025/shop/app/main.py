from fastapi import FastAPI
from .database import lifespan
from .routes import users, products, orders
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="User CRUD API",
    description="A simple CRUD API using FastAPI + asyncpg (pure SQL)",
    version="1.0.0",
    lifespan=lifespan
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or restrict to your Expo dev IP
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(users.router)
app.include_router(products.router)
app.include_router(orders.router)

# Health check
@app.get("/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
