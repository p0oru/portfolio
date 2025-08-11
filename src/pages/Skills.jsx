import { skillCategories } from '../data/skills'

export default function Skills() {
  return (
    <div className="container">
      <h1>Skills</h1>
      <p className="mb-16">A snapshot of technologies and professional strengths I use to build and ship.</p>
      <div style={{ display: 'grid', gap: 16 }}>
        {skillCategories.map((cat) => (
          <section key={cat.title} className="glass" style={{ padding: 18, borderRadius: 14 }}>
            <h3>{cat.title}</h3>
            <p style={{ color: 'var(--muted)' }}>{cat.description}</p>
            <div style={{ display: 'grid', gap: 10, gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', marginTop: 10 }}>
              {cat.items.map(({ label, Icon, note }) => (
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


