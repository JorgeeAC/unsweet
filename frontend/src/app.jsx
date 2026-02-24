import { Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Home from './pages/Home'
import Creators from './pages/Creators'
import ArtistDetail from './pages/ArtistDetail'
import Collections from './pages/Collections'

export default function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/"                    element={<Home />} />
        <Route path="/creators"            element={<Creators />} />
        <Route path="/creators/:slug"      element={<ArtistDetail />} />
        <Route path="/collections"         element={<Collections />} />
        <Route path="*" element={
          <main style={{ paddingTop: 'calc(var(--nav-h) + 4rem)', paddingBottom: '5rem', textAlign: 'center' }}>
            <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontSize: '2rem', opacity: 0.4 }}>404 — Not found</p>
          </main>
        } />
      </Routes>
      <Footer />
    </>
  )
}
