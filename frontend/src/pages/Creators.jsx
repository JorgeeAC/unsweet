import { useFetch } from '../hooks/useFetch'
import { api } from '../lib/api'
import GalleryGrid from '../components/GalleryGrid'

export default function Creators() {
  const { data, loading, error } = useFetch(() => api.artists(), [])
  const artists = Array.isArray(data) ? data : []

  const creatorAssets = artists.map((artist) => ({
    id: artist.id,
    name: artist.name,
    creator: artist.name,
    thumbnailUrl: artist.avatar_url || artist.cover_url || '',
    href: `/creators/${artist.slug}`,
  }))

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

        {loading && <p className="state-msg">Loading...</p>}
        {error && <p className="state-msg">Could not load creators from CMS.</p>}
        {!loading && !error && creatorAssets.length === 0 && (
          <p className="state-msg">No creators found in CMS.</p>
        )}
        {!loading && !error && (
          <GalleryGrid
            assets={creatorAssets}
            getHref={(asset) => asset.href || `/asset/${asset.id}`}
          />
        )}
      </div>
    </main>
  )
}
