import { useEffect, useState } from 'react'
import { api } from '../api'
import ContentList from '../components/ContentList'
import InlineEditor from '../components/InlineEditor'

const EMPTY = { company: '', role: '', start_date: '', end_date: '', is_current: false, description: '', tech_tags: '', type: 'work', display_order: 0 }

const FIELDS = [
  { key: 'company', label: 'Company' },
  { key: 'role', label: 'Role' },
  { key: 'start_date', label: 'Start Date (YYYY-MM)' },
  { key: 'end_date', label: 'End Date (YYYY-MM or empty)' },
  { key: 'is_current', label: 'Current', type: 'checkbox' },
  { key: 'description', label: 'Description', type: 'textarea' },
  { key: 'tech_tags', label: 'Tech Tags (comma-separated)' },
  { key: 'type', label: 'Type (work/internship/ta/volunteer)' },
  { key: 'display_order', label: 'Display Order', type: 'number' },
]

const COLUMNS = [
  { key: 'role', label: 'Role' },
  { key: 'company', label: 'Company' },
  { key: 'start_date', label: 'Start' },
  { key: 'is_current', label: 'Current', render: (v) => v ? '✓' : '' },
]

export default function AdminExperience() {
  const [items, setItems] = useState([])
  const [editing, setEditing] = useState(null)
  const [values, setValues] = useState(EMPTY)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => { api.getExperience().then(setItems) }, [])

  function openNew() { setEditing('new'); setValues(EMPTY); setError('') }
  function openEdit(item) {
    setEditing(item)
    setValues({ ...item, tech_tags: Array.isArray(item.tech_tags) ? item.tech_tags.join(', ') : '' })
    setError('')
  }
  function change(key, val) { setValues((v) => ({ ...v, [key]: val })) }

  async function save() {
    setSaving(true); setError('')
    try {
      const payload = { ...values, tech_tags: values.tech_tags.split(',').map((s) => s.trim()).filter(Boolean) }
      if (editing === 'new') {
        const created = await api.createExperience(payload)
        setItems((p) => [...p, created])
      } else {
        const updated = await api.updateExperience(editing.id, payload)
        setItems((p) => p.map((x) => x.id === updated.id ? updated : x))
      }
      setEditing(null)
    } catch (e) { setError(e.message) }
    finally { setSaving(false) }
  }

  async function remove(item) {
    await api.deleteExperience(item.id)
    setItems((list) => list.filter((x) => x.id !== item.id))
    if (editing && editing.id === item.id) setEditing(null)
  }

  return (
    <div>
      <h2 style={{ marginBottom: 20 }}>Experience</h2>
      <ContentList items={items} columns={COLUMNS} onAdd={openNew} onEdit={openEdit} onDelete={remove} addLabel="New Entry" />
      {editing && (
        <InlineEditor title={editing === 'new' ? 'New Experience' : `Edit: ${editing.role}`}
          fields={FIELDS} values={values} onChange={change} onSave={save}
          onCancel={() => setEditing(null)} saving={saving} error={error} />
      )}
    </div>
  )
}
