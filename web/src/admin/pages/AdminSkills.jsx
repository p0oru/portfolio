import { useEffect, useState } from 'react'
import { api } from '../api'
import ContentList from '../components/ContentList'
import InlineEditor from '../components/InlineEditor'

const EMPTY = { category: '', name: '', icon_name: '', proficiency: 3, display_order: 0 }

const FIELDS = [
  { key: 'category', label: 'Category' },
  { key: 'name', label: 'Name' },
  { key: 'icon_name', label: 'Icon Name (react-icons Si* key)' },
  { key: 'proficiency', label: 'Proficiency (1-5)', type: 'number' },
  { key: 'display_order', label: 'Display Order', type: 'number' },
]

const COLUMNS = [
  { key: 'category', label: 'Category' },
  { key: 'name', label: 'Name' },
  { key: 'proficiency', label: 'Level' },
]

export default function AdminSkills() {
  const [items, setItems] = useState([])
  const [editing, setEditing] = useState(null)
  const [values, setValues] = useState(EMPTY)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => { api.getSkills().then(setItems) }, [])

  function openNew() { setEditing('new'); setValues(EMPTY); setError('') }
  function openEdit(item) { setEditing(item); setValues(item); setError('') }
  function change(key, val) { setValues((v) => ({ ...v, [key]: val })) }

  async function save() {
    setSaving(true); setError('')
    try {
      if (editing === 'new') {
        const created = await api.createSkill(values)
        setItems((p) => [...p, created])
      } else {
        const updated = await api.updateSkill(editing.id, values)
        setItems((p) => p.map((x) => x.id === updated.id ? updated : x))
      }
      setEditing(null)
    } catch (e) { setError(e.message) }
    finally { setSaving(false) }
  }

  async function remove(item) {
    await api.deleteSkill(item.id)
    setItems((list) => list.filter((x) => x.id !== item.id))
    if (editing && editing.id === item.id) setEditing(null)
  }

  return (
    <div>
      <h2 style={{ marginBottom: 20 }}>Skills</h2>
      <ContentList items={items} columns={COLUMNS} onAdd={openNew} onEdit={openEdit} onDelete={remove} addLabel="New Skill" />
      {editing && (
        <InlineEditor title={editing === 'new' ? 'New Skill' : `Edit: ${editing.name}`}
          fields={FIELDS} values={values} onChange={change} onSave={save}
          onCancel={() => setEditing(null)} saving={saving} error={error} />
      )}
    </div>
  )
}
