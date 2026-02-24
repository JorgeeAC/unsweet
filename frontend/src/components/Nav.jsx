import { NavLink } from 'react-router-dom'
import Logo from './Logo'

const links = [
  { to: '/', label: 'Home' },
  { to: '/creators', label: 'Creators' },
  { to: '/collections', label: 'Collections' },
]

export default function Nav() {
  return (
    <header style={s.wrap}>
      <div className="container" style={s.inner}>
        <Logo />
        <nav style={s.nav}>
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              style={({ isActive }) => ({
                ...s.link,
                color: isActive ? 'var(--text)' : 'var(--text-muted)',
                borderBottomColor: isActive ? 'var(--accent)' : 'transparent',
              })}
              end={link.to === '/'}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}

const s = {
  wrap: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    height: 'var(--nav-h)',
    borderBottom: '1px solid var(--border)',
    backdropFilter: 'blur(6px)',
    background: 'color-mix(in oklab, var(--bg) 86%, white 14%)',
    zIndex: 20,
  },
  inner: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  link: {
    textDecoration: 'none',
    fontFamily: 'var(--font-mono)',
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    fontSize: '0.72rem',
    paddingBottom: '0.2rem',
    borderBottom: '2px solid',
    transition: 'color 160ms ease, border-color 160ms ease',
  },
}
