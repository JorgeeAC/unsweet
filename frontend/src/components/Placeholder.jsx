export default function Placeholder({ ratio = '16/9', label = 'Artwork' }) {
  return (
    <div style={{ ...s.wrap, aspectRatio: ratio }}>
      <span className="mono muted" style={s.label}>{label}</span>
    </div>
  )
}

const s = {
  wrap: {
    width: '100%',
    border: '1px solid var(--border)',
    background:
      'repeating-linear-gradient(-45deg, #e6e0d1 0, #e6e0d1 12px, #efeade 12px, #efeade 24px)',
    display: 'grid',
    placeItems: 'center',
  },
  label: {
    fontSize: '0.62rem',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
  },
}
