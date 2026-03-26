import test from 'node:test'
import assert from 'node:assert/strict'

import { api } from '../src/lib/api.js'

function mockJsonResponse(data, ok = true, status = 200) {
  return {
    ok,
    status,
    json: async () => data,
    text: async () => JSON.stringify(data),
  }
}

test('api.health calls /health and returns payload json', async () => {
  const originalFetch = global.fetch
  global.fetch = async (url) => {
    assert.equal(url, '/health')
    return mockJsonResponse({ status: 'ok' })
  }

  const result = await api.health()
  assert.deepEqual(result, { status: 'ok' })

  global.fetch = originalFetch
})

test('api.artists appends featured query param', async () => {
  const originalFetch = global.fetch
  global.fetch = async (url) => {
    assert.equal(url, '/api/cms/artists?featured=true')
    return mockJsonResponse([{ id: '1', featured: true }])
  }

  const result = await api.artists(true)
  assert.equal(Array.isArray(result), true)
  assert.equal(result[0].id, '1')

  global.fetch = originalFetch
})

test('api.pieces serializes params into querystring', async () => {
  const originalFetch = global.fetch
  global.fetch = async (url) => {
    assert.equal(url, '/api/cms/pieces?featured=true&artist_id=1')
    return mockJsonResponse([{ id: 'p1' }])
  }

  const result = await api.pieces({ featured: 'true', artist_id: '1' })
  assert.equal(result.length, 1)

  global.fetch = originalFetch
})

test('api.collections hits shop collections endpoint', async () => {
  const originalFetch = global.fetch
  global.fetch = async (url) => {
    assert.equal(url, '/api/shop/collections')
    return mockJsonResponse([{ id: 'c1' }])
  }

  const result = await api.collections()
  assert.equal(result[0].id, 'c1')

  global.fetch = originalFetch
})

test('api.products surfaces non-ok response as Error', async () => {
  const originalFetch = global.fetch
  global.fetch = async (url) => {
    assert.equal(url, '/api/shop/products?collection_id=c1')
    return {
      ok: false,
      status: 500,
      json: async () => ({}),
      text: async () => 'boom',
    }
  }

  await assert.rejects(() => api.products({ collection_id: 'c1' }), /boom/)

  global.fetch = originalFetch
})
