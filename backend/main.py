"""
UNsweet Art Collective — FastAPI Backend
Concerns are separated:
  - /api/cms    → CMS content (artists, pieces, editorial)
  - /api/shop   → Shopify proxy / commerce layer
"""

import os

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from api import cms_router, shop_router

app = FastAPI(title="UNsweet API", version="0.1.0")

allowed_origins = os.getenv("ALLOWED_ORIGINS", "http://localhost:5173,http://localhost:3000").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,  # TODO: set via env once session strategy is confirmed
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(cms_router, prefix="/api/cms", tags=["CMS"])
app.include_router(shop_router, prefix="/api/shop", tags=["Shop"])


@app.get("/health")
def health():
    return {"status": "ok", "service": "unsweet-api"}
