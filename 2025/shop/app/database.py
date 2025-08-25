import asyncpg
from contextlib import asynccontextmanager
from .config import DATABASE_URL
from .queries import UserQueries, ProductQueries, OrderQueries

db_pool = None

async def get_db_pool():
    return db_pool

async def init_db():
    """Initialize DB pool and create tables"""
    global db_pool
    db_pool = await asyncpg.create_pool(DATABASE_URL)

    async with db_pool.acquire() as conn:
        await conn.execute(UserQueries.CREATE_TABLE)
        await conn.execute(ProductQueries.CREATE_TABLE)
        await conn.execute(OrderQueries.CREATE_TABLE)

async def close_db():
    """Close DB pool"""
    if db_pool:
        await db_pool.close()

@asynccontextmanager
async def lifespan(app):
    # Startup
    await init_db()
    yield
    # Shutdown
    await close_db()
