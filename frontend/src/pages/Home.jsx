import { Link } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch'
import { api } from '../lib/api'
import Placeholder from '../components/Placeholder'

export default function Home() {
  const { data: artists } = useFetch(() => api.artists())
  const featured = (artists || []).filter((artist) => artist.featured).slice(0, 2)

  return (
    <main className="page-enter" style={s.main}>
      <section className="container" style={s.hero}>
        <p className="mono muted">UNsweet Collective Platform</p>
        <h1 style={s.title}>Art, editorial stories, and drops from independent creators.</h1>
        <p style={s.subtitle}>
          The frontend stays clean while data comes from one API client. Today this runs on mock data, and later can point to CMS + Shopify with no page rewrite.
        </p>
        <div style={s.actions}>
          <Link to="/creators" style={s.primaryBtn}>Explore creators</Link>
          <Link to="/collections" style={s.secondaryBtn}>View collections</Link>
        </div>
      </section>

      <section className="container" style={s.featured}>
        <div style={s.featuredHead}>
          <h2 style={s.sectionTitle}>Featured Artists</h2>
          <Link to="/creators" className="mono muted" style={s.inlineLink}>See all</Link>
        </div>

        <div style={s.grid}>
          {featured.length === 0 && <p className="mono muted">Loading featured artists...</p>}
          {featured.map((artist) => (
            <article key={artist.id} style={s.card}>
              <Placeholder ratio="16/10" label={artist.name} />
              <div style={s.cardBody}>
                <h3 style={s.cardTitle}>{artist.name}</h3>
                <p className="mono muted" style={s.small}>{artist.location}</p>
                <p style={s.bio}>{artist.bio}</p>
                <Link to={`/creators/${artist.slug}`} style={s.inlineLink} className="mono">
                  View artist ->
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}

const s = {
  main: { paddingTop: 'calc(var(--nav-h) + 2.2rem)', paddingBottom: '4rem' },
  hero: { paddingBottom: '2.8rem' },
  title: {
    fontFamily: 'var(--font-serif)',
    fontWeight: 400,
    fontStyle: 'italic',
    fontSize: 'clamp(2.4rem, 5vw, 4.9rem)',
    maxWidth: '15ch',
    lineHeight: 0.98,
    marginTop: '0.5rem',
  },
  subtitle: { maxWidth: '58ch', color: 'var(--text-muted)', marginTop: '1.1rem' },
  actions: { display: 'flex', gap: '0.8rem', flexWrap: 'wrap', marginTop: '1.4rem' },
  primaryBtn: {
    textDecoration: 'none',
    fontFamily: 'var(--font-mono)',
    fontSize: '0.74rem',
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    border: '1px solid var(--accent)',
    background: 'var(--accent)',
    color: '#f6f4eb',
    padding: '0.68rem 0.95rem',
  },
  secondaryBtn: {
    textDecoration: 'none',
    fontFamily: 'var(--font-mono)',
    fontSize: '0.74rem',
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    border: '1px solid var(--border)',
    padding: '0.68rem 0.95rem',
  },
  featured: { paddingTop: '0.5rem' },
  featuredHead: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' },
  sectionTitle: {
    fontFamily: 'var(--font-serif)',
    fontStyle: 'italic',
    fontWeight: 400,
    fontSize: 'clamp(1.5rem, 2.6vw, 2rem)',
  },
  grid: {
    marginTop: '1.2rem',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))',
    gap: '1rem',
  },
  card: { border: '1px solid var(--border)', background: 'var(--bg-2)', overflow: 'hidden' },
  cardBody: { padding: '1rem 1.1rem 1.3rem' },
  cardTitle: { fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: 400 },
  small: { fontSize: '0.68rem', marginTop: '0.35rem', textTransform: 'uppercase', letterSpacing: '0.06em' },
  bio: { color: 'var(--text-muted)', marginTop: '0.6rem' },
  inlineLink: {
    textDecoration: 'none',
    fontSize: '0.7rem',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    color: 'var(--accent-dim)',
  },
}
