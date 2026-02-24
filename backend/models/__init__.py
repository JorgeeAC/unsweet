from enum import Enum
from typing import Literal

from pydantic import BaseModel, HttpUrl


class MediaType(str, Enum):
    image = "image"
    video = "video"
    audio = "audio"
    mixed = "mixed"


class ArtistLink(BaseModel):
    platform: str
    url: HttpUrl | str


class Artist(BaseModel):
    id: str
    slug: str
    name: str
    bio: str
    location: str
    avatar_url: str | None = None
    cover_url: str | None = None
    disciplines: list[str] = []
    links: list[ArtistLink] = []
    featured: bool = False


class Piece(BaseModel):
    id: str
    slug: str
    title: str
    artist_id: str
    year: int
    media_type: MediaType
    media_url: str
    thumbnail_url: str | None = None
    description: str | None = None
    tags: list[str] = []
    featured: bool = False


class ArtistDetail(BaseModel):
    artist: Artist
    statement: str | None = None
    process_notes: str | None = None
    selected_works: list[Piece] = []
    palette: list[str] = []
    layout_variant: Literal["default", "editorial", "cinematic", "grid"] = "default"


class Collection(BaseModel):
    id: str
    shopify_collection_id: str
    title: str
    description: str | None = None
    cover_url: str | None = None
    product_count: int = 0


class ProductVariant(BaseModel):
    id: str
    title: str
    available: bool = True


class Product(BaseModel):
    id: str
    shopify_product_id: str
    title: str
    description: str | None = None
    price: str
    compare_at_price: str | None = None
    images: list[str] = []
    variants: list[ProductVariant] = []
    artist_id: str | None = None
