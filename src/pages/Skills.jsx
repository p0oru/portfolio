import { useState } from 'react'
import { skillCategories } from '../data/skills'

export default function Skills() {
  const [showAll, setShowAll] = useState(false)
  return (
    <div className="container">
      <h1>Skills</h1>
      <p className="mb-16">A snapshot of technologies and professional strengths I use to build and ship.</p>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 12 }}>
        <button
          onClick={() => setShowAll((v) => !v)}
          className="glass"
          style={{ padding: '8px 12px', borderRadius: 10, cursor: 'pointer' }}
        >
          {showAll ? 'View top 3 per category' : 'View all skills'}
        </button>
      </div>
      <div style={{ display: 'grid', gap: 16 }}>
        {skillCategories.map((cat) => (
          <section key={cat.title} className="glass" style={{ padding: 18, borderRadius: 14 }}>
            <h3>{cat.title}</h3>
            <p style={{ color: 'var(--muted)' }}>{cat.description}</p>
            <div style={{ display: 'grid', gap: 10, gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', marginTop: 10 }}>
              {(showAll ? cat.items : cat.items.slice(0, 3)).map(({ label, Icon, note }) => (
                <div key={label} className="glass" style={{ padding: 10, borderRadius: 10, display: 'flex', alignItems: 'center', gap: 10 }}>
                  {Icon && <Icon size={18} />}
                  <div>
                    <div>{label}</div>
                    {note && <div style={{ color: 'var(--muted)', fontSize: 12 }}>{note}</div>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}


