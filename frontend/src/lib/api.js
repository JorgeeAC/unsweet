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

export const api = {
  health: () => fetch('/health').then((res) => res.json()),

  artists: () => request('/cms/artists'),
  artist: (slug) => request(`/cms/artists/${slug}`),
  pieces: (params = {}) => {
    const search = new URLSearchParams(params)
    const query = search.toString() ? `?${search.toString()}` : ''
    return request(`/cms/pieces${query}`)
  },

  collections: () => request('/shop/collections'),
  products: (params = {}) => {
    const search = new URLSearchParams(params)
    const query = search.toString() ? `?${search.toString()}` : ''
    return request(`/shop/products${query}`)
  },
}
