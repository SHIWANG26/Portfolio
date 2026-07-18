import { Html } from '@react-three/drei'

export default function TextCard({ position, children, visible = true, distanceFactor = 18 }) {
  return (
    <Html
      position={position}
      center
      distanceFactor={distanceFactor}
      occlude={false}
      style={{
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.5s ease',
        pointerEvents: 'none',
      }}
    >
      <div className="glass-card" style={{ pointerEvents: 'none' }}>
        {children}
      </div>
    </Html>
  )
}
