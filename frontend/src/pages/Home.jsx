import { Link } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch'
import { api } from '../lib/api'

const MOCK_PIECES = [
  { id: 'p1', title: 'Between Frequencies', artist: 'Nova Reyes', year: 2024 },
  { id: 'p2', title: 'Urban Elegy', artist: 'Echo Park', year: 2023 },
  { id: 'p3', title: 'Soft Resistance', artist: 'Soleil D.', year: 2024 },
]

const MOCK_ARTISTS = [
  { id: '1', slug: 'nova-reyes', name: 'Nova Reyes', initials: 'NR', disciplines: ['photography', 'mixed media'] },
  { id: '2', slug: 'echo-park',  name: 'Echo Park',  initials: 'EP', disciplines: ['sound', 'video'] },
  { id: '3', slug: 'soleil-d',   name: 'Soleil D.',  initials: 'SD', disciplines: ['textile', 'design'] },
]

export default function Home() {
  const { data: artists } = useFetch(() => api.artists(true), [])
  const { data: pieces }  = useFetch(() => api.pieces({ featured: true }), [])

  const displayArtists = artists || MOCK_ARTISTS
  const displayPieces  = pieces  || MOCK_PIECES

  return (
    <main>

      {/* ── Hero ── */}
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

          <p className="hero-tagline">
            We're building something.
          </p>

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

      {/* ── Selected Works ── */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Selected Works</h2>
            <Link to="/creators" className="see-all">View all →</Link>
          </div>
          <div className="works-grid">
            {displayPieces.map(piece => (
              <article key={piece.id} className="work-card">
                <div className="work-thumb">{piece.title}</div>
                <div>
                  <p className="work-title">{piece.title}</p>
                  <p className="work-sub">{piece.artist || piece.artist_id} · {piece.year}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── The Collective ── */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">The Collective</h2>
            <Link to="/creators" className="see-all">All creators →</Link>
          </div>
          <div className="artist-strip">
            {displayArtists.map(artist => (
              <Link key={artist.id} to={`/creators/${artist.slug}`} className="artist-card-home">
                <div className="artist-avatar-home">
                  {artist.initials || artist.name?.slice(0, 2)}
                </div>
                <p className="artist-name-home">{artist.name}</p>
                <p className="artist-disc-home">{(artist.disciplines || []).join(' · ')}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Drop Banner ── */}
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
