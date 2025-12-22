import { useEffect, useRef } from 'react'
import styles from './BackgroundFX.module.scss'

export default function BackgroundFX() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let raf = 0
    let t = 0
    const animate = () => {
      t += 0.003
      el.style.setProperty('--t', String(t))
      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <>
      <div ref={ref} className={styles.bg} aria-hidden="true" />
      <div className={styles.stars} aria-hidden="true" />
    </>
  )
}



