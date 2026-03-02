import { Link } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch'
import { api } from '../lib/api'

export default function Home() {
  const { data: artists, loading: artistsLoading, error: artistsError } = useFetch(
    () => api.artists(true),
    []
  )
  const { data: pieces, loading: piecesLoading, error: piecesError } = useFetch(
    () => api.pieces({ featured: true }),
    []
  )

  const displayArtists = Array.isArray(artists) ? artists : []
  const displayPieces = Array.isArray(pieces) ? pieces : []
  const artistNameById = new Map(displayArtists.map((artist) => [artist.id, artist.name]))

  return (
    <main>
      <section className="hero">
        <div className="hero-grid" />
        <div className="hero-vignette" />

        <div className="hero-content">
          <div className="hero-wordmark">
            <svg
              viewBox="0 0 700 110"
              xmlns="http://www.w3.org/2000/svg"
              style={{ width: 'clamp(260px, 58vw, 700px)', height: 'auto' }}
            >
              <text
                x="50%"
                y="92"
                fontFamily="'EB Garamond', Georgia, serif"
                fontSize="106"
                fontWeight="400"
                fill="var(--text)"
                letterSpacing="-2"
                textAnchor="middle"
              >
                UNsweet
              </text>
            </svg>
          </div>

          <p className="hero-tagline">We're building something.</p>

          <div className="hero-ctas">
            {/*
            <Link to="/creators" className="btn-primary">Meet the creators</Link>
            <Link to="/collections" className="btn-secondary">Shop the drop</Link>
            */}
          </div>
        </div>

        <div className="hero-scroll">
          <span className="hero-scroll-label">Scroll</span>
          <span className="hero-scroll-line" />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Selected Works</h2>
            <Link to="/creators" className="see-all">View all →</Link>
          </div>

          {piecesLoading && <p className="state-msg">Loading featured works...</p>}
          {piecesError && <p className="state-msg">Could not load featured works.</p>}

          {!piecesLoading && !piecesError && displayPieces.length > 0 && (
            <div className="works-grid">
              {displayPieces.map((piece) => (
                <article key={piece.id} className="work-card">
                  <div className="work-thumb">{piece.title}</div>
                  <div>
                    <p className="work-title">{piece.title}</p>
                    <p className="work-sub">
                      {artistNameById.get(piece.artist_id) || piece.artist || piece.artist_id} · {piece.year}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          )}

          {!piecesLoading && !piecesError && displayPieces.length === 0 && (
            <p className="state-msg">No featured works found.</p>
          )}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">The Collective</h2>
            <Link to="/creators" className="see-all">All creators →</Link>
          </div>

          {artistsLoading && <p className="state-msg">Loading creators...</p>}
          {artistsError && <p className="state-msg">Could not load creators.</p>}

          {!artistsLoading && !artistsError && displayArtists.length > 0 && (
            <div className="artist-strip">
              {displayArtists.map((artist) => (
                <Link key={artist.id} to={`/creators/${artist.slug}`} className="artist-card-home">
                  <div className="artist-avatar-home">
                    {artist.name
                      ?.split(' ')
                      .slice(0, 2)
                      .map((part) => part[0])
                      .join('')
                      .toUpperCase()}
                  </div>
                  <p className="artist-name-home">{artist.name}</p>
                  <p className="artist-disc-home">{(artist.disciplines || []).join(' · ')}</p>
                </Link>
              ))}
            </div>
          )}

          {!artistsLoading && !artistsError && displayArtists.length === 0 && (
            <p className="state-msg">No creators found.</p>
          )}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="shop-banner">
            <div>
              <p className="drop-label">Drop 001 — Now Live</p>
              <h2 className="drop-title">Unbecoming</h2>
              <p className="drop-copy">
                Limited run capsule. Eight pieces. Artist collaborations baked into every thread.
              </p>
              <Link to="/collections" className="btn-primary">Shop Now</Link>
            </div>
            <div className="drop-visual">drop 001</div>
          </div>
        </div>
      </section>
    </main>
  )
}

