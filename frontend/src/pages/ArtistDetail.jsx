import { useParams, Link } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch'
import { api } from '../lib/api'
import Placeholder from '../components/Placeholder'

const MOCK_DETAIL = {
  artist: { id: '1', slug: 'nova-reyes', name: 'Nova Reyes', location: 'Los Angeles, CA',
    disciplines: ['photography', 'mixed media'],
    bio: 'Visual artist working at the intersection of diaspora and digital memory.',
    links: [{ platform: 'instagram', url: '#' }, { platform: 'website', url: '#' }],
  },
  statement: 'My practice is an act of remembering for those who were not allowed to.',
  process_notes: 'I shoot on film first, then digitally manipulate to introduce artifacts of memory.',
  selected_works: [
    { id: 'p1', title: 'Between Frequencies', year: 2024, media_type: 'image' },
    { id: 'p2', title: 'Afterglow Study No. 3', year: 2023, media_type: 'image' },
    { id: 'p3', title: 'The Weight of Distance', year: 2022, media_type: 'mixed' },
  ],
  layout_variant: 'editorial',
}

export default function ArtistDetail() {
  const { slug } = useParams()
  const { data, loading, error } = useFetch(() => api.artist(slug), [slug])
  const detail = data || MOCK_DETAIL

  if (loading) return (
    <main style={s.main}><div className="container"><p className="mono muted">Loading…</p></div></main>
  )
  if (error && !data) return (
    <main style={s.main}><div className="container"><p className="mono muted">Artist not found.</p></div></main>
  )

  const { artist, statement, process_notes, selected_works } = detail

  return (
    <main className="page-enter" style={s.main}>

      {/* ── Cover / Hero ── */}
      <div style={s.cover}>
        <Placeholder ratio="21/6" label={`${artist.name} — cover`} />
        <div style={s.coverOverlay} />
        <div style={s.coverText} className="container">
          <p className="mono muted" style={{ marginBottom: '0.5rem' }}>
            <Link to="/creators" style={{ color: 'var(--text-muted)' }}>Creators</Link>
            {' / '}
            {artist.name}
          </p>
          <h1 style={s.name}>{artist.name}</h1>
          <p className="mono muted">{artist.location}</p>
        </div>
      </div>

      <div className="container" style={s.body}>

        {/* ── Bio + Statement ── */}
        <div style={s.columns}>
          <div style={s.colLeft}>
            <h2 style={s.label} className="mono muted">About</h2>
            <p style={s.bio}>{artist.bio}</p>

            {artist.disciplines?.length > 0 && (
              <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {artist.disciplines.map(d => <span key={d} className="tag">{d}</span>)}
              </div>
            )}

            {artist.links?.length > 0 && (
              <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                {artist.links.map(l => (
                  <a key={l.platform} href={l.url} target="_blank" rel="noreferrer"
                    className="mono" style={s.extLink}>
                    {l.platform} ↗
                  </a>
                ))}
              </div>
            )}
          </div>

          {statement && (
            <div style={s.colRight}>
              <h2 style={s.label} className="mono muted">Statement</h2>
              <blockquote style={s.statement}>"{statement}"</blockquote>
            </div>
          )}
        </div>

        <hr className="thin" />

        {/* ── Selected Works ── */}
        {selected_works?.length > 0 && (
          <section>
            <h2 style={s.sectionTitle}>Selected Works</h2>
            <div style={s.worksGrid}>
              {selected_works.map((work, i) => (
                <article key={work.id} style={s.workCard}>
                  <Placeholder ratio={i % 3 === 0 ? '4/5' : '1/1'} label={work.title} />
                  <div style={s.workMeta}>
                    <span style={s.workTitle}>{work.title}</span>
                    <span className="mono muted" style={{ fontSize: '0.72rem' }}>
                      {work.year} · {work.media_type}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* ── Process Notes ── */}
        {process_notes && (
          <>
            <hr className="thin" />
            <section style={s.processSection}>
              <h2 style={s.label} className="mono muted">Process</h2>
              <p style={{ ...s.bio, maxWidth: '72ch' }}>{process_notes}</p>
            </section>
          </>
        )}

      </div>
    </main>
  )
}

const s = {
  main: { paddingTop: 'var(--nav-h)', paddingBottom: '5rem' },

  cover: { position: 'relative', marginBottom: '3rem' },
  coverOverlay: {
    position: 'absolute', inset: 0,
    background: 'linear-gradient(to top, var(--bg) 10%, transparent 60%)',
  },
  coverText: {
    position: 'absolute', bottom: '2rem', left: 0, right: 0,
  },

  body: { paddingTop: '1rem' },

  name: {
    fontFamily: 'var(--font-serif)',
    fontWeight: 400,
    fontStyle: 'italic',
    fontSize: 'clamp(2.5rem, 5vw, 4.5rem)',
    letterSpacing: '-0.02em',
    lineHeight: 1.05,
    marginBottom: '0.4rem',
  },

  columns: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))',
    gap: 'clamp(2rem, 5vw, 5rem)',
    marginBottom: '2rem',
  },
  colLeft: {},
  colRight: {},

  label: { fontSize: '0.72rem', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.8rem' },
  bio: { color: 'var(--text-muted)', lineHeight: 1.8 },
  statement: {
    fontFamily: 'var(--font-serif)',
    fontStyle: 'italic',
    fontSize: 'clamp(1.1rem, 1.8vw, 1.4rem)',
    lineHeight: 1.6,
    color: 'var(--text)',
    borderLeft: '2px solid var(--accent-dim)',
    paddingLeft: '1.25rem',
  },
  extLink: {
    fontSize: '0.75rem',
    letterSpacing: '0.05em',
    textTransform: 'uppercase',
    color: 'var(--accent-dim)',
  },

  sectionTitle: {
    fontFamily: 'var(--font-serif)',
    fontStyle: 'italic',
    fontWeight: 400,
    fontSize: 'clamp(1.4rem, 2.5vw, 2rem)',
    marginBottom: '1.5rem',
  },
  worksGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(min(240px, 100%), 1fr))',
    gap: '1.5rem',
  },
  workCard: { display: 'flex', flexDirection: 'column', gap: '0.6rem' },
  workMeta: { display: 'flex', flexDirection: 'column', gap: '0.2rem' },
  workTitle: { fontFamily: 'var(--font-serif)', fontSize: '1rem' },

  processSection: { paddingBottom: '1rem' },
}
