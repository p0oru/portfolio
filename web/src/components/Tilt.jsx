import { useRef } from 'react'

export default function Tilt({ children, max = 6 }) {
  const ref = useRef(null)
  return (
    <div
      ref={ref}
      onMouseMove={(e) => {
        const el = ref.current
        if (!el) return
        const r = el.getBoundingClientRect()
        const x = (e.clientX - r.left) / r.width - 0.5
        const y = (e.clientY - r.top) / r.height - 0.5
        el.style.transform = `rotateX(${(-y * max).toFixed(2)}deg) rotateY(${(x * max).toFixed(2)}deg) translateY(-4px)`
      }}
      onMouseLeave={() => {
        const el = ref.current
        if (!el) return
        el.style.transform = ''
      }}
      style={{ transition: 'transform 160ms ease', transformStyle: 'preserve-3d' }}
    >
      {children}
    </div>
  )
}


