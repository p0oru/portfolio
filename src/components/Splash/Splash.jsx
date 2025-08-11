import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import styles from './Splash.module.scss'

export default function Splash() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const seen = sessionStorage.getItem('seenSplash')
    if (seen) return
    setShow(true)
    const t = setTimeout(() => {
      setShow(false)
      sessionStorage.setItem('seenSplash', '1')
    }, 2000)
    return () => clearTimeout(t)
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className={styles.bg} aria-hidden />
          <motion.div
            className={styles.card + ' glass grain'}
            initial={{ y: 14, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <div className={styles.logoRow}>
              <span className={styles.logoMark}>▰</span>
              <span className={styles.logoText}>PuruSingh()</span>
            </div>
            <div className={styles.tagline}>Building full‑stack & AI experiences</div>
            <div className={styles.progress}>
              <div className={styles.bar} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}


