from fastapi import APIRouter, Depends, HTTPException
import asyncpg
from typing import List
from ..database import get_db_pool
from ..models import OrderCreate, OrderResponse
from ..queries import OrderQueries

router = APIRouter(prefix="/orders", tags=["Orders"])

@router.post("/", response_model=OrderResponse, status_code=201)
async def create_order(order: OrderCreate, pool: asyncpg.Pool = Depends(get_db_pool)):
    async with pool.acquire() as conn:
        row = await conn.fetchrow(OrderQueries.CREATE_ORDER, order.user_id, order.product_id, order.quantity)
        return OrderResponse(**row)

@router.get("/{order_id}", response_model=OrderResponse)
async def get_order(order_id: int, pool: asyncpg.Pool = Depends(get_db_pool)):
    async with pool.acquire() as conn:
        row = await conn.fetchrow(OrderQueries.GET_ORDER_BY_ID, order_id)
        if not row:
            raise HTTPException(status_code=404, detail="Order not found")
        return OrderResponse(**row)

@router.get("/", response_model=List[OrderResponse])
async def get_orders(skip: int = 0, limit: int = 100, pool: asyncpg.Pool = Depends(get_db_pool)):
    async with pool.acquire() as conn:
        rows = await conn.fetch(OrderQueries.GET_ALL_ORDERS, limit, skip)
        return [OrderResponse(**row) for row in rows]
