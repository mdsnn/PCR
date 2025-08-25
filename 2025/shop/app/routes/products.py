from fastapi import APIRouter, Depends, HTTPException
import asyncpg
from typing import List
from ..database import get_db_pool
from ..models import ProductCreate, ProductResponse
from ..queries import ProductQueries

router = APIRouter(prefix="/products", tags=["Products"])

@router.post("/", response_model=ProductResponse, status_code=201)
async def create_product(product: ProductCreate, pool: asyncpg.Pool = Depends(get_db_pool)):
    async with pool.acquire() as conn:
        row = await conn.fetchrow(ProductQueries.CREATE_PRODUCT, product.name, product.price)
        return ProductResponse(**row)

@router.get("/{product_id}", response_model=ProductResponse)
async def get_product(product_id: int, pool: asyncpg.Pool = Depends(get_db_pool)):
    async with pool.acquire() as conn:
        row = await conn.fetchrow(ProductQueries.GET_PRODUCT_BY_ID, product_id)
        if not row:
            raise HTTPException(status_code=404, detail="Product not found")
        return ProductResponse(**row)

@router.get("/", response_model=List[ProductResponse])
async def get_products(skip: int = 0, limit: int = 100, pool: asyncpg.Pool = Depends(get_db_pool)):
    async with pool.acquire() as conn:
        rows = await conn.fetch(ProductQueries.GET_ALL_PRODUCTS, limit, skip)
        return [ProductResponse(**row) for row in rows]

@router.delete("/{product_id}")
async def delete_product(product_id: int, pool: asyncpg.Pool = Depends(get_db_pool)):
    async with pool.acquire() as conn:
        row = await conn.fetchrow(ProductQueries.DELETE_PRODUCT, product_id)
        if not row:
            raise HTTPException(status_code=404, detail="Product not found")
        return {"message": f"Product {product_id} deleted successfully"}
