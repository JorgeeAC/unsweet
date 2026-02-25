import { useState } from 'react'
import { useFetch } from '../hooks/useFetch'
import { api } from '../lib/api'

const MOCK_COLLECTIONS = [
  { id: 'c1', title: 'Drop 001', product_count: 8 },
  { id: 'c2', title: 'Archive', product_count: 24 },
]

const MOCK_PRODUCTS = [
  { id: 'p1', title: 'Soft Resistance Tee', price: '68.00', compare_at_price: '85.00',
    available: true,  artist: 'Soleil D.', desc: '100% organic cotton. Screen printed by hand.' },
  { id: 'p2', title: 'Between Frequencies Hoodie', price: '120.00',
    available: true,  artist: 'Nova Reyes', desc: 'Heavyweight fleece. Archival print.' },
  { id: 'p3', title: 'Urban Elegy Cap', price: '45.00',
    available: false, artist: 'Echo Park', desc: 'Unstructured 6-panel. Hand embroidery.' },
  { id: 'p4', title: 'Soft Resistance Long Sleeve', price: '82.00',
    available: true,  artist: 'Soleil D.', desc: 'Extended fit. Same hand-print as the tee.' },
]

export default function Collections() {
  const [activeTab, setActiveTab] = useState(null)
  const { data: collections } = useFetch(() => api.collections(),[])
  const { data: products }    = useFetch(() => api.products(activeTab ? { collection_id: activeTab } : {}), [activeTab])


  const cols  = collections || MOCK_COLLECTIONS
  const prods = products    || MOCK_PRODUCTS

  return (
    <main>
      <div className="container">
        <header className="page-header">
          <p className="page-eyebrow">UNsweet Store</p>
          <h1 className="page-title">Collections</h1>
          <p className="page-subtitle">
            Every piece is a collaboration. Every purchase supports an artist directly.
          </p>

          <div className="tabs">
            <button
              className={`tab-btn${activeTab === null ? ' active' : ''}`}
              onClick={() => setActiveTab(null)}
            >
              All
            </button>
            {cols.map(c => (
              <button
                key={c.id}
                className={`tab-btn${activeTab === c.id ? ' active' : ''}`}
                onClick={() => setActiveTab(c.id)}
              >
                {c.title}
                <span style={{ marginLeft: '0.35rem', opacity: 0.5 }}>({c.product_count})</span>
              </button>
            ))}
          </div>
        </header>

        <div className="products-grid">
          {prods.map(product => (
            <article key={product.id} className="product-card">
              <div className="product-thumb">
                {!product.available && <div className="product-sold-overlay">Sold Out</div>}
                {product.compare_at_price && <span className="product-sale-badge">Sale</span>}
                {product.title}
              </div>
              <div>
                <div className="product-row">
                  <h2 className="product-name">{product.title}</h2>
                  <div className="product-prices">
                    <span className="product-price">${product.price}</span>
                    {product.compare_at_price && (
                      <span className="product-compare">${product.compare_at_price}</span>
                    )}
                  </div>
                </div>
                <p className="product-artist mono">By {product.artist}</p>
                <p className="product-desc">{product.desc || product.description}</p>
                <button className="add-to-cart" disabled={!product.available}>
                  {product.available ? 'Add to Cart' : 'Sold Out'}
                </button>
              </div>
            </article>
          ))}
        </div>

        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.5rem', paddingBottom: '2rem', textAlign: 'center' }}>
          <p className="mono muted" style={{ fontSize: '0.68rem' }}>
            Powered by Shopify — set <code>SHOPIFY_STORE_DOMAIN</code> + <code>SHOPIFY_STOREFRONT_TOKEN</code> in <code>.env</code> to go live.
          </p>
        </div>
      </div>
    </main>
  )
}