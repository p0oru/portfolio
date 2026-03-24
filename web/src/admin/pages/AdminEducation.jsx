import { useEffect, useState } from 'react'
import { api } from '../api'
import ContentList from '../components/ContentList'
import InlineEditor from '../components/InlineEditor'

const EMPTY = { institution: '', degree: '', field: '', start_date: '', end_date: '', gpa: '', honors: '', display_order: 0 }

const FIELDS = [
  { key: 'institution', label: 'Institution' },
  { key: 'degree', label: 'Degree' },
  { key: 'field', label: 'Field of Study' },
  { key: 'start_date', label: 'Start Date (YYYY-MM)' },
  { key: 'end_date', label: 'End Date (YYYY-MM)' },
  { key: 'gpa', label: 'GPA' },
  { key: 'honors', label: 'Honors (comma-separated)' },
  { key: 'display_order', label: 'Display Order', type: 'number' },
]

const COLUMNS = [
  { key: 'institution', label: 'Institution' },
  { key: 'degree', label: 'Degree' },
  { key: 'field', label: 'Field' },
  { key: 'gpa', label: 'GPA' },
]

export default function AdminEducation() {
  const [items, setItems] = useState([])
  const [editing, setEditing] = useState(null)
  const [values, setValues] = useState(EMPTY)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => { api.getEducation().then(setItems) }, [])

  function openNew() { setEditing('new'); setValues(EMPTY); setError('') }
  function openEdit(item) {
    setEditing(item)
    setValues({ ...item, honors: Array.isArray(item.honors) ? item.honors.join(', ') : '' })
    setError('')
  }
  function change(key, val) { setValues((v) => ({ ...v, [key]: val })) }

  async function save() {
    setSaving(true); setError('')
    try {
      const payload = { ...values, honors: values.honors.split(',').map((s) => s.trim()).filter(Boolean) }
      if (editing === 'new') {
        const created = await api.createEducation(payload)
        setItems((p) => [...p, created])
      } else {
        const updated = await api.updateEducation(editing.id, payload)
        setItems((p) => p.map((x) => x.id === updated.id ? updated : x))
      }
      setEditing(null)
    } catch (e) { setError(e.message) }
    finally { setSaving(false) }
  }

  async function remove(item) {
    await api.deleteEducation(item.id)
    setItems((list) => list.filter((x) => x.id !== item.id))
    if (editing && editing.id === item.id) setEditing(null)
  }

  return (
    <div>
      <h2 style={{ marginBottom: 20 }}>Education</h2>
      <ContentList items={items} columns={COLUMNS} onAdd={openNew} onEdit={openEdit} onDelete={remove} addLabel="New Entry" />
      {editing && (
        <InlineEditor title={editing === 'new' ? 'New Education' : `Edit: ${editing.institution}`}
          fields={FIELDS} values={values} onChange={change} onSave={save}
          onCancel={() => setEditing(null)} saving={saving} error={error} />
      )}
    </div>
  )
}
