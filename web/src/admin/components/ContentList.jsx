import { useState } from 'react'
import styles from './ContentList.module.scss'

/**
 * Generic list with add/edit/delete.
 * Props:
 *   items      - array of objects
 *   columns    - [{ key, label, render? }]
 *   onAdd      - () => void (opens editor with empty item)
 *   onEdit     - (item) => void
 *   onDelete   - (item) => void
 *   addLabel   - string (default "Add")
 */
export default function ContentList({ items = [], columns = [], onAdd, onEdit, onDelete, addLabel = 'Add' }) {
  const [confirmId, setConfirmId] = useState(null)

  function handleDelete(item) {
    if (confirmId === item.id) {
      onDelete(item)
      setConfirmId(null)
    } else {
      setConfirmId(item.id)
    }
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.toolbar}>
        <button className={styles.addBtn} onClick={onAdd}>+ {addLabel}</button>
      </div>
      {items.length === 0 && <p className={styles.empty}>No items yet.</p>}
      <div className={styles.list}>
        {items.map((item) => (
          <div key={item.id} className={styles.row}>
            <div className={styles.cells}>
              {columns.map((col) => (
                <div key={col.key} className={styles.cell}>
                  <span className={styles.colLabel}>{col.label}</span>
                  <span className={styles.colValue}>
                    {col.render ? col.render(item[col.key], item) : String(item[col.key] ?? '')}
                  </span>
                </div>
              ))}
            </div>
            <div className={styles.actions}>
              <button className={styles.editBtn} onClick={() => onEdit(item)}>Edit</button>
              <button
                className={styles.deleteBtn + (confirmId === item.id ? ' ' + styles.confirm : '')}
                onClick={() => handleDelete(item)}
              >
                {confirmId === item.id ? 'Sure?' : 'Delete'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
