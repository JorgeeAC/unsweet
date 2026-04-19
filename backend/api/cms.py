"""
CMS router - content is fetched and managed here.
Owns: artists, pieces, editorial content, and brand config.
Does not own: products, collections, cart, orders, or inventory.
"""

from __future__ import annotations

import json
from pathlib import Path

from fastapi import APIRouter, HTTPException
from models import Artist, ArtistDetail, MediaType, Piece

router = APIRouter()

CREATORS_JSON_PATH = Path(__file__).resolve().parents[1] / "data" / "creators.json"


def _load_creators() -> tuple[list[Artist], dict[str, ArtistDetail]]:
    with CREATORS_JSON_PATH.open("r", encoding="utf-8") as f:
        payload = json.load(f)

    artists = [Artist.model_validate(raw_artist) for raw_artist in payload.get("artists", [])]
    artists_by_slug = {artist.slug: artist for artist in artists}
    pieces_by_id = {piece.id: piece for piece in PIECES}

    details: dict[str, ArtistDetail] = {}
    for slug, raw_detail in payload.get("artist_details", {}).items():
        artist = artists_by_slug.get(slug)
        if artist is None:
            raise ValueError(f"artist_details references unknown slug: {slug}")

        selected_work_ids = raw_detail.get("selected_work_ids", [])
        missing_work_ids = [work_id for work_id in selected_work_ids if work_id not in pieces_by_id]
        if missing_work_ids:
            raise ValueError(f"{slug} references unknown piece ids: {missing_work_ids}")
        selected_works = [pieces_by_id[work_id] for work_id in selected_work_ids]

        details[slug] = ArtistDetail(
            artist=artist,
            statement=raw_detail.get("statement"),
            process_notes=raw_detail.get("process_notes"),
            selected_works=selected_works,
            palette=raw_detail.get("palette"),
            layout_variant=raw_detail.get("layout_variant", "default"),
        )

    return artists, details


PIECES: list[Piece] = [
    Piece(
        id="p1",
        slug="between-frequencies",
        title="Between Frequencies",
        artist_id="1",
        year=2024,
        media_type=MediaType.image,
        media_url="/media/works/p1.jpg",
        thumbnail_url="/media/works/p1-thumb.jpg",
        description="A series of 12 photographs exploring liminal space.",
        tags=["photography", "diaspora"],
        featured=True,
    ),
    Piece(
        id="p2",
        slug="urban-elegy",
        title="Urban Elegy",
        artist_id="2",
        year=2023,
        media_type=MediaType.video,
        media_url="/media/works/p2.mp4",
        thumbnail_url="/media/works/p2-thumb.jpg",
        description="30-minute sound and video installation.",
        tags=["video", "sound", "urban"],
        featured=True,
    ),
    Piece(
        id="p3",
        slug="soft-resistance",
        title="Soft Resistance",
        artist_id="3",
        year=2024,
        media_type=MediaType.image,
        media_url="/media/works/p3.jpg",
        thumbnail_url="/media/works/p3-thumb.jpg",
        description="Hand-woven textile triptych.",
        tags=["textile", "identity"],
        featured=False,
    ),
]

ARTISTS, ARTIST_DETAILS = _load_creators()


@router.get("/artists", response_model=list[Artist])
def list_artists(featured: bool | None = None):
    if featured is not None:
        return [artist for artist in ARTISTS if artist.featured == featured]
    return ARTISTS


@router.get("/artists/{slug}", response_model=ArtistDetail)
def get_artist(slug: str):
    detail = ARTIST_DETAILS.get(slug)
    if not detail:
        raise HTTPException(status_code=404, detail="Artist not found")
    return detail


@router.get("/pieces", response_model=list[Piece])
def list_pieces(featured: bool | None = None, artist_id: str | None = None):
    pieces = PIECES
    if featured is not None:
        pieces = [piece for piece in pieces if piece.featured == featured]
    if artist_id:
        pieces = [piece for piece in pieces if piece.artist_id == artist_id]
    return pieces


@router.get("/pieces/{slug}", response_model=Piece)
def get_piece(slug: str):
    piece = next((candidate for candidate in PIECES if candidate.slug == slug), None)
    if not piece:
        raise HTTPException(status_code=404, detail="Piece not found")
    return piece
