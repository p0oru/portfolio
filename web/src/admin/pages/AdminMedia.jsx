import { useEffect, useState, useRef } from 'react'
import { api } from '../api'

export default function AdminMedia() {
  const [items, setItems] = useState([])
  const [uploading, setUploading] = useState(false)
  const inputRef = useRef()

  useEffect(() => { api.getMedia().then(setItems) }, [])

  async function handleUpload(e) {
    const file = e.target.files[0]
    if (!file) return
    setUploading(true)
    try {
      const created = await api.uploadMedia(file)
      setItems((p) => [created, ...p])
    } finally {
      setUploading(false)
      inputRef.current.value = ''
    }
  }

  async function remove(item) {
    if (!confirm(`Delete ${item.original_name}?`)) return
    await api.deleteMedia(item.id)
    setItems((list) => list.filter((x) => x.id !== item.id))
  }

  return (
    <div>
      <h2 style={{ marginBottom: 20 }}>Media Library</h2>
      <div style={{ marginBottom: 16, display: 'flex', alignItems: 'center', gap: 12 }}>
        <input ref={inputRef} type="file" accept="image/*" onChange={handleUpload} style={{ display: 'none' }} />
        <button
          onClick={() => inputRef.current.click()}
          disabled={uploading}
          style={{ padding: '8px 16px', background: 'var(--adm-accent)', color: '#fff', border: 'none', borderRadius: 'var(--adm-radius)', cursor: 'pointer', fontSize: 13, fontWeight: 600 }}
        >
          {uploading ? 'Uploading…' : '+ Upload Image'}
        </button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 12 }}>
        {items.map((item) => (
          <div key={item.id} style={{ background: 'var(--adm-surface)', border: '1px solid var(--adm-border)', borderRadius: 'var(--adm-radius)', overflow: 'hidden' }}>
            <img src={item.url_path} alt={item.original_name} style={{ width: '100%', height: 120, objectFit: 'cover', display: 'block' }} />
            <div style={{ padding: '8px 10px' }}>
              <div style={{ fontSize: 11, color: 'var(--adm-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.original_name}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, alignItems: 'center' }}>
                <button onClick={() => navigator.clipboard.writeText(item.url_path)} style={{ fontSize: 11, background: 'none', border: 'none', color: 'var(--adm-accent)', cursor: 'pointer' }}>Copy URL</button>
                <button onClick={() => remove(item)} style={{ fontSize: 11, background: 'none', border: 'none', color: 'var(--adm-muted)', cursor: 'pointer' }}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {items.length === 0 && <p style={{ color: 'var(--adm-muted)' }}>No media uploaded yet.</p>}
    </div>
  )
}
