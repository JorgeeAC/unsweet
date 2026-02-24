import { useFetch } from '../hooks/useFetch'
import { api } from '../lib/api'
import Placeholder from '../components/Placeholder'

export default function Collections() {
  const { data: collections, loading } = useFetch(() => api.collections())
  const { data: products } = useFetch(() => api.products())

  return (
    <main className="page-enter" style={s.main}>
      <div className="container">
        <header style={s.header}>
          <p className="mono muted">Commerce</p>
          <h1 style={s.title}>Collections</h1>
          <p style={s.subtitle}>
            Shopify-ready storefront layer. Local mode uses mock products from the FastAPI `/api/shop` endpoints.
          </p>
        </header>

        <hr className="thin" />

        {loading && <p className="mono muted">Loading collections...</p>}

        <section>
          <h2 style={s.sectionTitle}>Drops</h2>
          <div style={s.grid}>
            {(collections || []).map((collection) => (
              <article key={collection.id} style={s.card}>
                <Placeholder ratio="21/9" label={collection.title} />
                <div style={s.cardBody}>
                  <h3 style={s.cardTitle}>{collection.title}</h3>
                  <p style={s.desc}>{collection.description}</p>
                  <p className="mono muted" style={s.monoSmall}>{collection.product_count} products</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <hr className="thin" />

        <section>
          <h2 style={s.sectionTitle}>Products</h2>
          <div style={s.products}>
            {(products || []).map((product) => (
              <article key={product.id} style={s.productCard}>
                <Placeholder ratio="1/1" label={product.title} />
                <div style={s.productBody}>
                  <h3 style={s.productTitle}>{product.title}</h3>
                  <p style={s.price}>${product.price}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}

const s = {
  main: { paddingTop: 'calc(var(--nav-h) + 3rem)', paddingBottom: '5rem' },
  header: { paddingBottom: '2rem' },
  title: {
    fontFamily: 'var(--font-serif)',
    fontStyle: 'italic',
    fontWeight: 400,
    lineHeight: 1,
    letterSpacing: '-0.02em',
    fontSize: 'clamp(2.7rem, 5vw, 4.7rem)',
  },
  subtitle: { color: 'var(--text-muted)', maxWidth: '58ch', marginTop: '0.7rem' },
  sectionTitle: {
    fontFamily: 'var(--font-serif)',
    fontWeight: 400,
    fontStyle: 'italic',
    fontSize: 'clamp(1.2rem, 2.2vw, 1.8rem)',
    marginBottom: '1rem',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(min(360px, 100%), 1fr))',
    gap: '1rem',
  },
  card: { border: '1px solid var(--border)', background: 'var(--bg-2)', overflow: 'hidden' },
  cardBody: { padding: '1rem 1.1rem 1.3rem' },
  cardTitle: { fontFamily: 'var(--font-serif)', fontWeight: 400, fontSize: '1.3rem' },
  desc: { color: 'var(--text-muted)', marginTop: '0.5rem' },
  monoSmall: { fontSize: '0.68rem', marginTop: '0.75rem', letterSpacing: '0.06em', textTransform: 'uppercase' },
  products: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(min(220px, 100%), 1fr))',
    gap: '1rem',
  },
  productCard: { border: '1px solid var(--border)', background: 'var(--bg-2)' },
  productBody: { padding: '0.8rem 0.95rem 1rem', display: 'flex', justifyContent: 'space-between', gap: '0.75rem' },
  productTitle: { fontFamily: 'var(--font-serif)', fontWeight: 400, fontSize: '1.05rem' },
  price: { fontFamily: 'var(--font-mono)', fontSize: '0.76rem', letterSpacing: '0.06em' },
}
