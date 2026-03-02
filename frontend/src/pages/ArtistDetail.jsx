import { useParams, Link } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch'
import { api } from '../lib/api'

export default function ArtistDetail() {
  const { slug } = useParams()
  const { data, loading, error } = useFetch(
    () => (slug ? api.artist(slug) : Promise.resolve(null)),
    [slug]
  )
  const detail = data

  if (loading) return <div className="state-msg">Loading...</div>
  if (error) return <div className="state-msg">Could not load creator profile from CMS.</div>
  if (!detail?.artist) return <div className="state-msg">Creator not found.</div>

  const { artist, statement, process_notes, selected_works } = detail

  return (
    <main>
      {/* Cover */}
      <div className="artist-detail-cover">
        <div className="artist-detail-cover-bg">{artist.name}</div>
        <div className="artist-detail-cover-gradient" />
        <div className="artist-detail-cover-content">
          <p className="artist-detail-breadcrumb">
            <Link to="/creators">Creators</Link> / {artist.name}
          </p>
          <h1 className="artist-detail-name">{artist.name}</h1>
          <p className="mono muted" style={{ fontSize: '0.75rem' }}>{artist.location}</p>
        </div>
      </div>

      {/* Body */}
      <div className="container">
        <div className="artist-detail-body">

          <div className="artist-detail-cols">
            <div>
              <p className="detail-label">About</p>
              <p className="detail-bio">{artist.bio}</p>
              <div className="detail-discipline-tags">
                {(artist.disciplines || []).map(d => <span key={d} className="tag">{d}</span>)}
              </div>
              {artist.links?.length > 0 && (
                <div className="detail-links">
                  {artist.links.map(l => (
                    <a key={l.platform} href={l.url} target="_blank" rel="noreferrer" className="detail-link">
                      {l.platform} ↗
                    </a>
                  ))}
                </div>
              )}
            </div>
            {statement && (
              <div>
                <p className="detail-label">Statement</p>
                <blockquote className="detail-statement">"{statement}"</blockquote>
              </div>
            )}
          </div>

          {selected_works?.length > 0 && (
            <>
              <hr className="detail-divider" />
              <p className="detail-label">Selected Works</p>
              <div className="detail-works-grid">
                {selected_works.map(work => (
                  <div key={work.id}>
                    <div className="detail-work-thumb">{work.title}</div>
                    <p style={{ fontFamily: 'var(--font-serif)', fontSize: '0.95rem' }}>{work.title}</p>
                    <p className="mono muted" style={{ fontSize: '0.68rem' }}>{work.year} · {work.media_type}</p>
                  </div>
                ))}
              </div>
            </>
          )}

          {process_notes && (
            <>
              <hr className="detail-divider" />
              <p className="detail-label">Process</p>
              <p className="detail-bio" style={{ maxWidth: '70ch' }}>{process_notes}</p>
            </>
          )}

        </div>
      </div>
    </main>
  )
}
