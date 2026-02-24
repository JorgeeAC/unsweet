import { Link } from 'react-router-dom'

export default function Logo() {
  return (
    <Link to="/" style={s.link}>
      <span style={s.wordmark}>UNsweet</span>
      <span style={s.dot}>Art Collective</span>
    </Link>
  )
}

const s = {
  link: {
    textDecoration: 'none',
    color: 'var(--text)',
    display: 'inline-flex',
    alignItems: 'baseline',
    gap: '0.45rem',
  },
  wordmark: {
    fontFamily: 'var(--font-serif)',
    fontStyle: 'italic',
    fontSize: '1.6rem',
    lineHeight: 1,
  },
  dot: {
    fontFamily: 'var(--font-mono)',
    fontSize: '0.65rem',
    textTransform: 'uppercase',
    letterSpacing: '0.12em',
    color: 'var(--text-muted)',
  },
}
