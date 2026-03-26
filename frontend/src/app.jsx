import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Footer from './components/Footer'
import Home from './pages/Home'
import Creators from './pages/Creators'
import ArtistDetail from './pages/ArtistDetail'
import Collections from './pages/Collections'
import AssetPage from './pages/AssetPage'

export default function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/"               element={<Home />} />
        <Route path="/creators"       element={<Creators />} />
        <Route path="/asset/:id"       element={<AssetPage />} />
        <Route path="/creators/:slug" element={<ArtistDetail />} />
        <Route path="/collections"    element={<Collections />} /> {/* HYDROGEN MIGRATION TARGET — move to Hydrogen storefront when ready */}
        <Route path="*"               element={<div className="not-found">404 — Not found.</div>} />
      </Routes>
      <Footer />
    </>
  )
}