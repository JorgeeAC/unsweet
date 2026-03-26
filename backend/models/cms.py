"""CMS domain models — owned by FastAPI sidecar."""
from pydantic import BaseModel
from typing import Optional, List
from enum import Enum


class MediaType(str, Enum):
    image = "image"
    video = "video"
    audio = "audio"
    mixed = "mixed"


class ArtistLink(BaseModel):
    platform: str          # "instagram" | "website" | "spotify" etc.
    url: str


class Artist(BaseModel):
    id: str
    slug: str
    name: str
    bio: str
    location: Optional[str] = None
    avatar_url: Optional[str] = None
    cover_url: Optional[str] = None
    links: List[ArtistLink] = []
    disciplines: List[str] = []   # ["photography", "music", "design"]
    featured: bool = False


class ArtistDetail(BaseModel):
    """Extended artist profile — each artist gets their own layout data"""
    artist: Artist
    statement: Optional[str] = None       # Artist statement
    process_notes: Optional[str] = None   # Behind-the-scenes / process text
    selected_works: List["Piece"] = []
    palette: Optional[List[str]] = None   # Hex colours for artist's detail page theme
    layout_variant: str = "default"       # CMS can set "grid" | "editorial" | "cinematic"


class Piece(BaseModel):
    id: str
    slug: str
    title: str
    artist_id: str
    year: int
    media_type: MediaType
    media_url: str
    thumbnail_url: Optional[str] = None
    description: Optional[str] = None
    tags: List[str] = []
    featured: bool = False


ArtistDetail.model_rebuild()
