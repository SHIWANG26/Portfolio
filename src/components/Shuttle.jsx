import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

export default function Shuttle({ position = [0, 0, 0], scale = 0.3 }) {
  const groupRef = useRef()
  const exhaustRef = useRef()

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(t * 1.2) * 0.1
    }
    if (exhaustRef.current) {
      exhaustRef.current.scale.y = 1 + Math.sin(t * 8) * 0.3
      exhaustRef.current.material.opacity = 0.3 + Math.sin(t * 6) * 0.15
    }
  })

  return (
    <group ref={groupRef} position={position} scale={scale} rotation={[0, 0, 0]}>
      {/* Fuselage */}
      <mesh>
        <cylinderGeometry args={[0.2, 0.35, 2.5, 8]} />
        <meshStandardMaterial color="#d0d4e0" metalness={0.7} roughness={0.3} />
      </mesh>
      {/* Nose cone */}
      <mesh position={[0, 1.5, 0]}>
        <coneGeometry args={[0.2, 0.8, 8]} />
        <meshStandardMaterial color="#e0e4f0" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Wings */}
      <mesh position={[0, -0.3, 0]} rotation={[0, 0, 0]}>
        <boxGeometry args={[2.5, 0.05, 0.8]} />
        <meshStandardMaterial color="#b0b4c0" metalness={0.6} roughness={0.4} />
      </mesh>
      {/* Tail fin vertical */}
      <mesh position={[0, 0.2, -0.4]}>
        <boxGeometry args={[0.05, 0.8, 0.5]} />
        <meshStandardMaterial color="#b0b4c0" metalness={0.6} roughness={0.4} />
      </mesh>
      {/* Engine nozzle */}
      <mesh position={[0, -1.4, 0]}>
        <cylinderGeometry args={[0.25, 0.15, 0.3, 8]} />
        <meshStandardMaterial color="#4a4e58" metalness={0.9} roughness={0.2} />
      </mesh>
      {/* Exhaust flame */}
      <mesh ref={exhaustRef} position={[0, -1.9, 0]}>
        <coneGeometry args={[0.18, 0.8, 8]} />
        <meshBasicMaterial color="#ff8844" transparent opacity={0.4} />
      </mesh>
      {/* Engine glow */}
      <pointLight position={[0, -1.6, 0]} color="#ff6622" intensity={1.5} distance={3} />
    </group>
  )
}
