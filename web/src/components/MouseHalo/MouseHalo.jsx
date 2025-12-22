import { useEffect, useRef, useState } from 'react'
import styles from './MouseHalo.module.scss'

export default function MouseHalo() {
  const ref = useRef(null)
  const [dim, setDim] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const onMove = (e) => {
      el.style.setProperty('--mx', e.clientX + 'px')
      el.style.setProperty('--my', e.clientY + 'px')
    }

    const onOver = (e) => {
      const interactive = e.target.closest('a, button, [role="button"], .btn')
      if (interactive) setDim(true)
      else setDim(false)
    }
    const onOut = () => setDim(false)

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseover', onOver, { passive: true })
    window.addEventListener('mouseout', onOut, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      window.removeEventListener('mouseout', onOut)
    }
  }, [])

  return <div ref={ref} className={styles.halo} data-dim={dim ? '1' : '0'} aria-hidden="true" />
}


