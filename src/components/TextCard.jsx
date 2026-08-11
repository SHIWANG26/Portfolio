import { useState } from 'react'
import { Html } from '@react-three/drei'

export default function TextCard({ position, children, visible = true, distanceFactor = 18 }) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <Html
      position={position}
      center
      distanceFactor={distanceFactor}
      occlude={false}
      style={{
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.5s ease',
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      <div 
        className={`glass-card ${isExpanded ? 'expanded' : ''}`}
        onClick={() => visible && setIsExpanded(!isExpanded)}
      >
        <div className="glass-card-content">
          {children}
        </div>
        <div className="expand-indicator">
          <span>{isExpanded ? 'Collapse' : 'Tap to expand'}</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`expand-icon ${isExpanded ? 'rotated' : ''}`}>
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
      </div>
    </Html>
  )
}
