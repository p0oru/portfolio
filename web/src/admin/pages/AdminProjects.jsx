import { useEffect, useState } from 'react'
import { api } from '../api'
import ContentList from '../components/ContentList'
import InlineEditor from '../components/InlineEditor'
import MarkdownEditor from '../components/MarkdownEditor'

const EMPTY = { slug: '', title: '', tagline: '', short_desc: '', long_desc: '', tech_stack: '', links: '', featured: false, visible: true, display_order: 0 }

const FIELDS = [
  { key: 'slug', label: 'Slug' },
  { key: 'title', label: 'Title' },
  { key: 'tagline', label: 'Tagline' },
  { key: 'short_desc', label: 'Short Description', type: 'textarea' },
  { key: 'tech_stack', label: 'Tech Stack (comma-separated)' },
  { key: 'links', label: 'Links (JSON: {"github":"...","live":"..."})' },
  { key: 'display_order', label: 'Display Order', type: 'number' },
  { key: 'featured', label: 'Featured', type: 'checkbox' },
  { key: 'visible', label: 'Visible', type: 'checkbox' },
]

const COLUMNS = [
  { key: 'title', label: 'Title' },
  { key: 'slug', label: 'Slug' },
  { key: 'visible', label: 'Visible', render: (v) => v ? '✓' : '—' },
  { key: 'featured', label: 'Featured', render: (v) => v ? '★' : '—' },
]

export default function AdminProjects() {
  const [projects, setProjects] = useState([])
  const [editing, setEditing] = useState(null) // null | project object
  const [values, setValues] = useState(EMPTY)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => { api.getProjects().then(setProjects) }, [])

  function openNew() { setEditing('new'); setValues(EMPTY); setError('') }
  function openEdit(p) {
    setEditing(p)
    setValues({
      ...p,
      tech_stack: Array.isArray(p.tech_stack) ? p.tech_stack.join(', ') : '',
      links: typeof p.links === 'object' ? JSON.stringify(p.links) : p.links,
    })
    setError('')
  }
  function cancel() { setEditing(null) }
  function change(key, val) { setValues((v) => ({ ...v, [key]: val })) }

  async function save() {
    setSaving(true); setError('')
    try {
      const payload = {
        ...values,
        tech_stack: values.tech_stack.split(',').map((s) => s.trim()).filter(Boolean),
        links: (() => { try { return JSON.parse(values.links || '{}') } catch { return {} } })(),
      }
      if (editing === 'new') {
        const created = await api.createProject(payload)
        setProjects((p) => [...p, created])
      } else {
        const updated = await api.updateProject(editing.id, payload)
        setProjects((p) => p.map((x) => x.id === updated.id ? updated : x))
      }
      setEditing(null)
    } catch (e) { setError(e.message) }
    finally { setSaving(false) }
  }

  async function remove(p) {
    await api.deleteProject(p.id)
    setProjects((list) => list.filter((x) => x.id !== p.id))
    if (editing && editing.id === p.id) setEditing(null)
  }

  return (
    <div>
      <h2 style={{ marginBottom: 20 }}>Projects</h2>
      <ContentList items={projects} columns={COLUMNS} onAdd={openNew} onEdit={openEdit} onDelete={remove} addLabel="New Project" />
      {editing && (
        <InlineEditor
          title={editing === 'new' ? 'New Project' : `Edit: ${editing.title}`}
          fields={FIELDS}
          values={values}
          onChange={change}
          onSave={save}
          onCancel={cancel}
          saving={saving}
          error={error}
        >
          <MarkdownEditor label="Long Description (Markdown)" value={values.long_desc || ''} onChange={(v) => change('long_desc', v)} />
        </InlineEditor>
      )}
    </div>
  )
}
