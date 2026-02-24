"""
CMS Router — content is fetched/managed here.
In production, swap the mock data with your headless CMS client
(Sanity, Contentful, Strapi, etc.)
"""
from fastapi import APIRouter, HTTPException
from models import Artist, ArtistDetail, Piece, ArtistLink, MediaType

router = APIRouter()

# ── Mock data (replace with real CMS calls) ──────────────────────────────────

ARTISTS: list[Artist] = [
    Artist(
        id="1",
        slug="nova-reyes",
        name="Nova Reyes",
        bio="Visual artist working at the intersection of diaspora and digital memory.",
        location="Los Angeles, CA",
        avatar_url="/media/artists/nova-avatar.jpg",
        cover_url="/media/artists/nova-cover.jpg",
        disciplines=["photography", "mixed media"],
        links=[
            ArtistLink(platform="instagram", url="https://instagram.com"),
            ArtistLink(platform="website", url="https://example.com"),
        ],
        featured=True,
    ),
    Artist(
        id="2",
        slug="echo-park",
        name="Echo Park",
        bio="Sound designer and visual poet obsessed with urban decay and renewal.",
        location="Brooklyn, NY",
        avatar_url="/media/artists/echo-avatar.jpg",
        cover_url="/media/artists/echo-cover.jpg",
        disciplines=["sound", "video"],
        links=[ArtistLink(platform="soundcloud", url="https://soundcloud.com")],
        featured=True,
    ),
    Artist(
        id="3",
        slug="soleil-d",
        name="Soleil D.",
        bio="Textile artist and muralist exploring identity through texture and scale.",
        location="New Orleans, LA",
        avatar_url="/media/artists/soleil-avatar.jpg",
        cover_url="/media/artists/soleil-cover.jpg",
        disciplines=["textile", "mural", "design"],
        links=[],
        featured=False,
    ),
]

PIECES: list[Piece] = [
    Piece(
        id="p1", slug="between-frequencies",
        title="Between Frequencies", artist_id="1", year=2024,
        media_type=MediaType.image, media_url="/media/works/p1.jpg",
        thumbnail_url="/media/works/p1-thumb.jpg",
        description="A series of 12 photographs exploring liminal space.",
        tags=["photography", "diaspora"], featured=True,
    ),
    Piece(
        id="p2", slug="urban-elegy",
        title="Urban Elegy", artist_id="2", year=2023,
        media_type=MediaType.video, media_url="/media/works/p2.mp4",
        thumbnail_url="/media/works/p2-thumb.jpg",
        description="30-minute sound and video installation.",
        tags=["video", "sound", "urban"], featured=True,
    ),
    Piece(
        id="p3", slug="soft-resistance",
        title="Soft Resistance", artist_id="3", year=2024,
        media_type=MediaType.image, media_url="/media/works/p3.jpg",
        thumbnail_url="/media/works/p3-thumb.jpg",
        description="Hand-woven textile triptych.",
        tags=["textile", "identity"], featured=False,
    ),
]

ARTIST_DETAILS: dict[str, ArtistDetail] = {
    "nova-reyes": ArtistDetail(
        artist=ARTISTS[0],
        statement="My practice is an act of remembering for those who were not allowed to.",
        process_notes="I shoot on film first, then digitally manipulate to introduce artifacts of memory.",
        selected_works=[PIECES[0]],
        palette=["#1a1a1a", "#c8b8a2", "#8b7355"],
        layout_variant="editorial",
    ),
    "echo-park": ArtistDetail(
        artist=ARTISTS[1],
        statement="Sound is the architecture of the invisible city.",
        process_notes="Field recordings, synthesis, and found footage collapsed into single experiences.",
        selected_works=[PIECES[1]],
        palette=["#0d0d0d", "#a0a0a0", "#3d3d3d"],
        layout_variant="cinematic",
    ),
    "soleil-d": ArtistDetail(
        artist=ARTISTS[2],
        statement="Fabric remembers the body that wore it.",
        selected_works=[PIECES[2]],
        layout_variant="grid",
    ),
}

# ── Endpoints ─────────────────────────────────────────────────────────────────

@router.get("/artists", response_model=list[Artist])
def list_artists(featured: bool | None = None):
    if featured is not None:
        return [a for a in ARTISTS if a.featured == featured]
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
        pieces = [p for p in pieces if p.featured == featured]
    if artist_id:
        pieces = [p for p in pieces if p.artist_id == artist_id]
    return pieces


@router.get("/pieces/{slug}", response_model=Piece)
def get_piece(slug: str):
    piece = next((p for p in PIECES if p.slug == slug), None)
    if not piece:
        raise HTTPException(status_code=404, detail="Piece not found")
    return piece
