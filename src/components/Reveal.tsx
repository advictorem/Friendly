import { CSSProperties, ElementType, ReactNode } from 'react'
import { useInView } from '../hooks/useInView'

/** Large type that rises out of a mask, one line at a time. */
export function RevealLines({ lines, as: Tag = 'h2', className = '', immediate = false }: { lines: ReactNode[]; as?: ElementType; className?: string; immediate?: boolean }) {
  const { ref, inView } = useInView<HTMLElement>()
  return (
    <Tag ref={ref} className={`${className} ${inView || immediate ? 'is-in' : ''}`}>
      {lines.map((line, i) => (
        <span key={i} className="mask-line" style={{ '--i': i } as CSSProperties}><span>{line}</span></span>
      ))}
    </Tag>
  )
}

/** Fades its children up when they enter the viewport. */
export function Reveal({ children, className = '', delay = 0, as: Tag = 'div' }: { children: ReactNode; className?: string; delay?: number; as?: ElementType }) {
  const { ref, inView } = useInView<HTMLElement>()
  return <Tag ref={ref} className={`fade-up ${inView ? 'is-in' : ''} ${className}`} style={{ '--i': delay } as CSSProperties}>{children}</Tag>
}
