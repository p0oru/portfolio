import { useEffect, useState } from 'react'
import { api } from '../api'

export default function AdminSettings() {
  const [settings, setSettings] = useState({})
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')
  const [pwForm, setPwForm] = useState({ current_password: '', new_password: '', confirm: '' })
  const [pwError, setPwError] = useState('')
  const [pwSaved, setPwSaved] = useState(false)

  useEffect(() => { api.getSettings().then(setSettings) }, [])

  async function saveSettings() {
    setSaving(true); setError(''); setSaved(false)
    try {
      const payload = { email: settings.email, github_url: settings.github_url, linkedin_url: settings.linkedin_url, resume_url: settings.resume_url }
      await api.updateSettings(payload)
      setSaved(true)
    } catch (e) { setError(e.message) }
    finally { setSaving(false) }
  }

  async function changePassword() {
    setPwError(''); setPwSaved(false)
    if (pwForm.new_password !== pwForm.confirm) return setPwError('Passwords do not match')
    try {
      await api.changePassword(pwForm.current_password, pwForm.new_password)
      setPwSaved(true)
      setPwForm({ current_password: '', new_password: '', confirm: '' })
    } catch (e) { setPwError(e.message) }
  }

  const inputStyle = { padding: '8px 12px', background: 'var(--adm-bg)', border: '1px solid var(--adm-border)', borderRadius: 'var(--adm-radius)', color: 'var(--adm-text)', fontSize: 13, width: '100%' }

  return (
    <div style={{ maxWidth: 600 }}>
      <h2 style={{ marginBottom: 20 }}>Settings</h2>
      
      <section style={{ marginBottom: 32 }}>
        <h3 style={{ fontSize: 15, marginBottom: 16 }}>Social Links & Resume</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {[['email', 'Email'], ['github_url', 'GitHub URL'], ['linkedin_url', 'LinkedIn URL'], ['resume_url', 'Resume URL']].map(([key, label]) => (
            <div key={key} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <label style={{ fontSize: 11, textTransform: 'uppercase', color: 'var(--adm-muted)' }}>{label}</label>
              <input style={inputStyle} value={settings[key] || ''} onChange={(e) => setSettings((s) => ({ ...s, [key]: e.target.value }))} />
            </div>
          ))}
          {error && <p style={{ color: 'var(--adm-red)', fontSize: 13 }}>{error}</p>}
          {saved && <p style={{ color: 'var(--adm-green)', fontSize: 13 }}>Saved!</p>}
          <button onClick={saveSettings} disabled={saving}
            style={{ padding: '10px', background: 'var(--adm-accent)', color: '#fff', border: 'none', borderRadius: 'var(--adm-radius)', fontWeight: 600, cursor: 'pointer' }}>
            {saving ? 'Saving…' : 'Save'}
          </button>
        </div>
      </section>

      <section>
        <h3 style={{ fontSize: 15, marginBottom: 16 }}>Change Password</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[['current_password', 'Current Password'], ['new_password', 'New Password'], ['confirm', 'Confirm New Password']].map(([key, label]) => (
            <div key={key} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <label style={{ fontSize: 11, textTransform: 'uppercase', color: 'var(--adm-muted)' }}>{label}</label>
              <input type="password" style={inputStyle} value={pwForm[key]} onChange={(e) => setPwForm((f) => ({ ...f, [key]: e.target.value }))} />
            </div>
          ))}
          {pwError && <p style={{ color: 'var(--adm-red)', fontSize: 13 }}>{pwError}</p>}
          {pwSaved && <p style={{ color: 'var(--adm-green)', fontSize: 13 }}>Password changed!</p>}
          <button onClick={changePassword}
            style={{ padding: '10px', background: 'var(--adm-surface-2)', color: 'var(--adm-text)', border: '1px solid var(--adm-border)', borderRadius: 'var(--adm-radius)', fontWeight: 600, cursor: 'pointer' }}>
            Change Password
          </button>
        </div>
      </section>
    </div>
  )
}
