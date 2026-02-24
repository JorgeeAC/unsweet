import { Link } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch'
import { api } from '../lib/api'
import Placeholder from '../components/Placeholder'

const MOCK = [
  { id: '1', slug: 'nova-reyes',  name: 'Nova Reyes',  location: 'Los Angeles, CA', disciplines: ['photography', 'mixed media'], featured: true },
  { id: '2', slug: 'echo-park',   name: 'Echo Park',   location: 'Brooklyn, NY',    disciplines: ['sound', 'video'],             featured: true },
  { id: '3', slug: 'soleil-d',    name: 'Soleil D.',   location: 'New Orleans, LA', disciplines: ['textile', 'design'],          featured: false },
]

export default function Creators() {
  const { data, loading } = useFetch(() => api.artists())
  const artists = data || MOCK

  return (
    <main className="page-enter" style={s.main}>
      <div className="container">

        <header style={s.header}>
          <p className="mono muted">The Collective</p>
          <h1 style={s.title}>Creators</h1>
          <p style={s.subtitle}>
            Independent artists, collaborators, and troublemakers.
          </p>
        </header>

        <hr className="thin" />

        {loading && <p className="mono muted">Loading…</p>}

        <div style={s.grid}>
          {artists.map((artist, i) => (
            <Link
              key={artist.id}
              to={`/creators/${artist.slug}`}
              style={{ ...s.card, animationDelay: `${i * 80}ms` }}
              className="page-enter"
            >
              <div style={s.cover}>
                <Placeholder ratio="16/9" label={artist.name} />
              </div>
              <div style={s.cardBody}>
                <div style={s.cardTop}>
                  <h2 style={s.artistName}>{artist.name}</h2>
                  {artist.featured && (
                    <span className="tag">Featured</span>
                  )}
                </div>
                <p className="mono muted" style={{ fontSize: '0.73rem', margin: '0.4rem 0 0.8rem' }}>
                  {artist.location}
                </p>
                <div style={s.tags}>
                  {artist.disciplines?.map(d => (
                    <span key={d} className="tag">{d}</span>
                  ))}
                </div>
                <p style={s.viewLink} className="mono">
                  View profile →
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}

const s = {
  main: { paddingTop: 'calc(var(--nav-h) + 3rem)', paddingBottom: '5rem' },
  header: { paddingBottom: '2.5rem' },
  title: {
    fontFamily: 'var(--font-serif)',
    fontSize: 'clamp(2.8rem, 5vw, 5rem)',
    fontWeight: 400,
    fontStyle: 'italic',
    letterSpacing: '-0.02em',
    lineHeight: 1,
    margin: '0.5rem 0 1rem',
  },
  subtitle: {
    color: 'var(--text-muted)',
    maxWidth: '50ch',
  },

  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(min(320px, 100%), 1fr))',
    gap: '2px',
    marginTop: '2.5rem',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    background: 'var(--bg-2)',
    border: '1px solid var(--border)',
    overflow: 'hidden',
    transition: 'border-color 0.2s',
    textDecoration: 'none',
  },
  cover: { overflow: 'hidden' },
  cardBody: { padding: '1.25rem 1.4rem 1.5rem' },
  cardTop: { display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.5rem' },
  artistName: {
    fontFamily: 'var(--font-serif)',
    fontWeight: 400,
    fontSize: '1.4rem',
    letterSpacing: '-0.01em',
  },
  tags: { display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.2rem' },
  viewLink: {
    fontSize: '0.75rem',
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    color: 'var(--accent-dim)',
  },
}
