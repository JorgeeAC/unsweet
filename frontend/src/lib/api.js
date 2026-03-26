const API_BASE = '/api'

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })

  if (!response.ok) {
    const message = await response.text()
    throw new Error(message || `Request failed: ${response.status}`)
  }

  return response.json()
}

export const cmsApi = {
  health: () => fetch('/health').then((res) => res.json()),

  artists: (featured = null) => {
    const search = new URLSearchParams()
    if (featured !== null && featured !== undefined) {
      search.set('featured', String(featured))
    }
    const query = search.toString() ? `?${search.toString()}` : ''
    return request(`/cms/artists${query}`)
  },
  artist: (slug) => request(`/cms/artists/${slug}`),
  pieces: (params = {}) => {
    const search = new URLSearchParams(params)
    const query = search.toString() ? `?${search.toString()}` : ''
    return request(`/cms/pieces${query}`)
  },
}

// TODO [NEXT]: replace with Shopify Storefront GraphQL client — do not route through FastAPI
export const shopifyClient = {}

// Preserve existing `api` export — do not remove until Collections.jsx is migrated
export const api = {
  ...cmsApi,
  // TODO: reroute to Shopify Storefront API
  collections: () => request('/shop/collections'),
  // TODO: reroute to Shopify Storefront API
  products: (params = {}) => {
    const search = new URLSearchParams(params)
    const query = search.toString() ? `?${search.toString()}` : ''
    return request(`/shop/products${query}`)
  },
}
