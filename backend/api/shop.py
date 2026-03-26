"""
DEPRECATED ROUTER — do not add new endpoints here.
FastAPI no longer proxies Shopify Storefront data.
Frontend calls Shopify Storefront API directly.
Frozen pending frontend migration.
"""
"""
Shopify Router — acts as a server-side proxy to the Shopify Storefront API.
This keeps your Shopify credentials server-side and lets you enrich
products with CMS data (e.g. linking a product to an artist).

Configuration (env vars):
  SHOPIFY_STORE_DOMAIN   e.g. "your-store.myshopify.com"
  SHOPIFY_STOREFRONT_TOKEN  (public Storefront API token)
"""
import os
import httpx
from fastapi import APIRouter, HTTPException
from models import Product, Collection

router = APIRouter()

SHOPIFY_DOMAIN = os.getenv("SHOPIFY_STORE_DOMAIN", "")
SHOPIFY_TOKEN = os.getenv("SHOPIFY_STOREFRONT_TOKEN", "")
STOREFRONT_URL = f"https://{SHOPIFY_DOMAIN}/api/2024-01/graphql.json"

HEADERS = {
    "X-Shopify-Storefront-Access-Token": SHOPIFY_TOKEN,
    "Content-Type": "application/json",
}

# ── Mock data (used when Shopify env vars are not set) ────────────────────────

MOCK_COLLECTIONS: list[Collection] = [
    Collection(
        id="c1", shopify_collection_id="gid://shopify/Collection/1",
        title="Drop 001 — Unbecoming",
        description="Limited run capsule collection. 8 pieces. Unisex sizing.",
        cover_url="/media/shop/drop001-cover.jpg",
        product_count=8,
    ),
    Collection(
        id="c2", shopify_collection_id="gid://shopify/Collection/2",
        title="Archive",
        description="Previous drops. While supplies last.",
        cover_url="/media/shop/archive-cover.jpg",
        product_count=24,
    ),
]

MOCK_PRODUCTS: list[Product] = [
    Product(
        id="prod1", shopify_product_id="gid://shopify/Product/1",
        title="Soft Resistance Tee",
        description="100% organic cotton. Screen printed by hand. Collab with Soleil D.",
        price="68.00", compare_at_price="85.00",
        images=["/media/shop/tee-front.jpg", "/media/shop/tee-back.jpg"],
        variants=[
            {"id": "v1", "title": "S", "available": True},
            {"id": "v2", "title": "M", "available": True},
            {"id": "v3", "title": "L", "available": False},
        ],
        artist_id="3",
    ),
    Product(
        id="prod2", shopify_product_id="gid://shopify/Product/2",
        title="Between Frequencies Hoodie",
        description="Heavyweight fleece. Nova Reyes archival print.",
        price="120.00",
        images=["/media/shop/hoodie-front.jpg"],
        variants=[
            {"id": "v4", "title": "S", "available": True},
            {"id": "v5", "title": "M", "available": True},
        ],
        artist_id="1",
    ),
]


def _use_mock() -> bool:
    return not SHOPIFY_DOMAIN or not SHOPIFY_TOKEN


# ── Endpoints ─────────────────────────────────────────────────────────────────

@router.get("/collections", response_model=list[Collection])
async def list_collections():
    if _use_mock():
        return MOCK_COLLECTIONS
    # TODO: query Shopify Storefront API with GraphQL
    query = """{ collections(first: 20) { edges { node {
        id title description
        image { url }
        products { totalCount }
    } } } }"""
    async with httpx.AsyncClient() as client:
        resp = await client.post(STOREFRONT_URL, json={"query": query}, headers=HEADERS)
        resp.raise_for_status()
        data = resp.json()
    # Map Shopify response → Collection model (implement mapping here)
    return []


@router.get("/products", response_model=list[Product])
async def list_products(collection_id: str | None = None):
    if _use_mock():
        return MOCK_PRODUCTS
    # TODO: query Shopify with optional collection filter
    return []


@router.get("/products/{product_id}", response_model=Product)
async def get_product(product_id: str):
    if _use_mock():
        product = next((p for p in MOCK_PRODUCTS if p.id == product_id), None)
        if not product:
            raise HTTPException(status_code=404, detail="Product not found")
        return product
    return {}
