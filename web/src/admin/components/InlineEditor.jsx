import styles from './InlineEditor.module.scss'

/**
 * Generic inline editor panel.
 * Props:
 *   title    - string
 *   fields   - [{ key, label, type?: 'text'|'textarea'|'checkbox'|'number'|'markdown', placeholder? }]
 *   values   - object
 *   onChange - (key, value) => void
 *   onSave   - () => void
 *   onCancel - () => void
 *   saving   - bool
 *   error    - string
 *   children - extra content (e.g. MarkdownEditor) rendered below fields
 */
export default function InlineEditor({ title, fields = [], values = {}, onChange, onSave, onCancel, saving, error, children }) {
  return (
    <div className={styles.panel}>
      <div className={styles.panelHeader}>
        <span className={styles.panelTitle}>{title}</span>
        <div className={styles.panelActions}>
          <button className={styles.cancelBtn} onClick={onCancel} disabled={saving}>Cancel</button>
          <button className={styles.saveBtn} onClick={onSave} disabled={saving}>
            {saving ? 'Saving…' : 'Save'}
          </button>
        </div>
      </div>
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles.fields}>
        {fields.map((f) => (
          <div key={f.key} className={styles.field}>
            <label className={styles.label}>{f.label}</label>
            {f.type === 'textarea' ? (
              <textarea
                className={styles.textarea}
                value={values[f.key] ?? ''}
                placeholder={f.placeholder}
                rows={4}
                onChange={(e) => onChange(f.key, e.target.value)}
              />
            ) : f.type === 'checkbox' ? (
              <input
                type="checkbox"
                checked={Boolean(values[f.key])}
                onChange={(e) => onChange(f.key, e.target.checked)}
              />
            ) : (
              <input
                className={styles.input}
                type={f.type || 'text'}
                value={values[f.key] ?? ''}
                placeholder={f.placeholder}
                onChange={(e) => onChange(f.key, e.target.value)}
              />
            )}
          </div>
        ))}
        {children}
      </div>
    </div>
  )
}
