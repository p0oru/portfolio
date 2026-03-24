import { useState } from 'react'
import { marked } from 'marked'
import styles from './InlineEditor.module.scss'

export default function MarkdownEditor({ label = 'Content (Markdown)', value = '', onChange }) {
  const [preview, setPreview] = useState(false)

  return (
    <div className={styles.field}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <label className={styles.label}>{label}</label>
        <button
          type="button"
          onClick={() => setPreview(!preview)}
          style={{ fontSize: 12, background: 'none', border: 'none', color: 'var(--adm-accent)', cursor: 'pointer' }}
        >
          {preview ? 'Edit' : 'Preview'}
        </button>
      </div>
      {preview ? (
        <div
          className={styles.textarea}
          style={{ minHeight: 200, overflow: 'auto' }}
          dangerouslySetInnerHTML={{ __html: marked.parse(value || '') }}
        />
      ) : (
        <textarea
          className={styles.textarea}
          value={value}
          rows={12}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Write markdown here…"
        />
      )}
    </div>
  )
}
