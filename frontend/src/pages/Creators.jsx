import { Link } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch'
import { api } from '../lib/api'

const MOCK = [
  { id: '1', slug: 'nova-reyes', name: 'Nova Reyes', location: 'Los Angeles, CA',
    disciplines: ['photography', 'mixed media'], featured: true },
  { id: '2', slug: 'echo-park',  name: 'Echo Park',  location: 'Brooklyn, NY',
    disciplines: ['sound', 'video'], featured: true },
  { id: '3', slug: 'soleil-d',   name: 'Soleil D.',  location: 'New Orleans, LA',
    disciplines: ['textile', 'design'], featured: false },
]

export default function Creators() {
  const { data, loading } = useFetch(() => api.artists(), [])
  const artists = data || MOCK

  return (
    <main>
      <div className="container">
        <header className="page-header">
          <p className="page-eyebrow">The Collective</p>
          <h1 className="page-title">Creators</h1>
          <p className="page-subtitle">
            Independent artists, collaborators, and troublemakers.
          </p>
        </header>

        {loading && <p className="state-msg">Loading…</p>}

        <div className="creators-grid">
          {artists.map(artist => (
            <Link key={artist.id} to={`/creators/${artist.slug}`} className="creator-card">
              <div className="creator-cover">
                {artist.name}
              </div>
              <div className="creator-body">
                <div className="creator-top">
                  <h2 className="creator-name">{artist.name}</h2>
                  {artist.featured && <span className="tag">Featured</span>}
                </div>
                <p className="creator-location">{artist.location}</p>
                <div className="creator-tags">
                  {(artist.disciplines || []).map(d => (
                    <span key={d} className="tag">{d}</span>
                  ))}
                </div>
                <p className="creator-cta">View profile →</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}