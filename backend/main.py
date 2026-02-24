"""
UNsweet Art Collective — FastAPI Backend
Concerns are separated:
  - /api/cms    → CMS content (artists, pieces, editorial)
  - /api/shop   → Shopify proxy / commerce layer
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api import cms_router, shop_router

app = FastAPI(title="UNsweet API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "https://unsweet.co"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(cms_router, prefix="/api/cms", tags=["CMS"])
app.include_router(shop_router, prefix="/api/shop", tags=["Shop"])


@app.get("/health")
def health():
    return {"status": "ok", "service": "unsweet-api"}
