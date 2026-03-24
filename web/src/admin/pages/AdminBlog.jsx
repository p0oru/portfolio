import { useEffect, useState } from 'react'
import { api } from '../api'
import ContentList from '../components/ContentList'
import InlineEditor from '../components/InlineEditor'
import MarkdownEditor from '../components/MarkdownEditor'

const EMPTY = { slug: '', title: '', excerpt: '', tags: '', published: false, published_at: '', content: '' }

const FIELDS = [
  { key: 'slug', label: 'Slug' },
  { key: 'title', label: 'Title' },
  { key: 'excerpt', label: 'Excerpt', type: 'textarea' },
  { key: 'tags', label: 'Tags (comma-separated)' },
  { key: 'published_at', label: 'Published At (YYYY-MM-DD)' },
  { key: 'published', label: 'Published', type: 'checkbox' },
]

const COLUMNS = [
  { key: 'title', label: 'Title' },
  { key: 'slug', label: 'Slug' },
  { key: 'published', label: 'Status', render: (v) => v ? 'Published' : 'Draft' },
  { key: 'published_at', label: 'Date' },
]

export default function AdminBlog() {
  const [posts, setPosts] = useState([])
  const [editing, setEditing] = useState(null)
  const [values, setValues] = useState(EMPTY)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => { api.getPosts().then(setPosts) }, [])

  function openNew() { setEditing('new'); setValues(EMPTY); setError('') }
  function openEdit(p) {
    setEditing(p)
    setValues({ ...p, tags: Array.isArray(p.tags) ? p.tags.join(', ') : '' })
    setError('')
  }
  function change(key, val) { setValues((v) => ({ ...v, [key]: val })) }

  async function save() {
    setSaving(true); setError('')
    try {
      const payload = { ...values, tags: values.tags.split(',').map((s) => s.trim()).filter(Boolean) }
      if (editing === 'new') {
        const created = await api.createPost(payload)
        setPosts((p) => [created, ...p])
      } else {
        const updated = await api.updatePost(editing.id, payload)
        setPosts((p) => p.map((x) => x.id === updated.id ? updated : x))
      }
      setEditing(null)
    } catch (e) { setError(e.message) }
    finally { setSaving(false) }
  }

  async function remove(p) {
    await api.deletePost(p.id)
    setPosts((list) => list.filter((x) => x.id !== p.id))
    if (editing && editing.id === p.id) setEditing(null)
  }

  return (
    <div>
      <h2 style={{ marginBottom: 20 }}>Blog Posts</h2>
      <ContentList items={posts} columns={COLUMNS} onAdd={openNew} onEdit={openEdit} onDelete={remove} addLabel="New Post" />
      {editing && (
        <InlineEditor
          title={editing === 'new' ? 'New Post' : `Edit: ${editing.title}`}
          fields={FIELDS}
          values={values}
          onChange={change}
          onSave={save}
          onCancel={() => setEditing(null)}
          saving={saving}
          error={error}
        >
          <MarkdownEditor value={values.content || ''} onChange={(v) => change('content', v)} />
        </InlineEditor>
      )}
    </div>
  )
}
