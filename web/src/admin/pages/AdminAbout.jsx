import { useEffect, useState } from 'react'
import { api } from '../api'

const FIELDS = ['name', 'tagline', 'bio', 'location', 'open_to_work']

export default function AdminAbout() {
  const [values, setValues] = useState({})
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => { api.getSettings().then(setValues) }, [])

  function change(key, val) { setValues((v) => ({ ...v, [key]: val })) }

  async function save() {
    setSaving(true); setError(''); setSaved(false)
    try {
      await api.updateSettings(Object.fromEntries(FIELDS.map((k) => [k, values[k] || ''])))
      setSaved(true)
    } catch (e) { setError(e.message) }
    finally { setSaving(false) }
  }

  return (
    <div style={{ maxWidth: 600 }}>
      <h2 style={{ marginBottom: 20 }}>About / Bio</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {[
          { key: 'name', label: 'Name' },
          { key: 'tagline', label: 'Tagline' },
          { key: 'bio', label: 'Bio', textarea: true },
          { key: 'location', label: 'Location' },
          { key: 'open_to_work', label: 'Open to Work (true/false)' },
        ].map(({ key, label, textarea }) => (
          <div key={key} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <label style={{ fontSize: 11, textTransform: 'uppercase', color: 'var(--adm-muted)', letterSpacing: '0.05em' }}>{label}</label>
            {textarea ? (
              <textarea value={values[key] || ''} onChange={(e) => change(key, e.target.value)} rows={4}
                style={{ padding: '8px 12px', background: 'var(--adm-bg)', border: '1px solid var(--adm-border)', borderRadius: 'var(--adm-radius)', color: 'var(--adm-text)', fontSize: 13, resize: 'vertical' }} />
            ) : (
              <input value={values[key] || ''} onChange={(e) => change(key, e.target.value)}
                style={{ padding: '8px 12px', background: 'var(--adm-bg)', border: '1px solid var(--adm-border)', borderRadius: 'var(--adm-radius)', color: 'var(--adm-text)', fontSize: 13 }} />
            )}
          </div>
        ))}
        {error && <p style={{ color: 'var(--adm-red)', fontSize: 13 }}>{error}</p>}
        {saved && <p style={{ color: 'var(--adm-green)', fontSize: 13 }}>Saved!</p>}
        <button onClick={save} disabled={saving}
          style={{ padding: '10px', background: 'var(--adm-accent)', color: '#fff', border: 'none', borderRadius: 'var(--adm-radius)', fontWeight: 600, cursor: 'pointer' }}>
          {saving ? 'Saving…' : 'Save'}
        </button>
      </div>
    </div>
  )
}
