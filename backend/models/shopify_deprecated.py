"""DEPRECATED — Shopify proxy models. Do not extend. Removed with shop.py."""
from pydantic import BaseModel
from typing import Optional, List


class Collection(BaseModel):
    """Shopify collection proxy"""
    id: str
    shopify_collection_id: str
    title: str
    description: Optional[str] = None
    cover_url: Optional[str] = None
    product_count: int = 0


class Product(BaseModel):
    """Shopify product proxy"""
    id: str
    shopify_product_id: str
    title: str
    description: Optional[str] = None
    price: str
    compare_at_price: Optional[str] = None
    images: List[str] = []
    variants: List[dict] = []
    available: bool = True
    artist_id: Optional[str] = None      # Link product back to an artist
