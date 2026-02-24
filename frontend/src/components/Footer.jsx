export default function Footer() {
  return (
    <footer style={s.footer}>
      <div className="container" style={s.inner}>
        <p className="mono muted" style={s.copy}>
          UNsweet Collective
        </p>
        <p className="mono muted" style={s.note}>
          Built with React + FastAPI. Mock data today, CMS + Shopify tomorrow.
        </p>
      </div>
    </footer>
  )
}

const s = {
  footer: {
    borderTop: '1px solid var(--border)',
    marginTop: '3rem',
    padding: '1.1rem 0 1.6rem',
  },
  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '0.8rem',
    flexWrap: 'wrap',
  },
  copy: {
    fontSize: '0.67rem',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
  },
  note: {
    fontSize: '0.67rem',
  },
}
