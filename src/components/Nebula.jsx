import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function NebulaCloud({ position, color, size = 8, opacity = 0.03 }) {
  const ref = useRef()

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (ref.current) {
      ref.current.rotation.z = t * 0.01
    }
  })

  return (
    <mesh ref={ref} position={position}>
      <planeGeometry args={[size, size]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={opacity}
        side={THREE.DoubleSide}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  )
}

export default function Nebula() {
  const clouds = useMemo(() => [
    { position: [15, 5, -15], color: '#6c3baa', size: 25, opacity: 0.02 },
    { position: [-20, -5, -40], color: '#ec4899', size: 30, opacity: 0.015 },
    { position: [10, 8, -60], color: '#3b82f6', size: 20, opacity: 0.02 },
    { position: [-15, -3, -90], color: '#22c55e', size: 22, opacity: 0.015 },
    { position: [18, 6, -120], color: '#a855f7', size: 28, opacity: 0.02 },
    { position: [-10, 4, -150], color: '#6366f1', size: 25, opacity: 0.015 },
    { position: [5, -5, -170], color: '#8b5cf6', size: 30, opacity: 0.02 },
  ], [])

  return (
    <group>
      {clouds.map((cloud, i) => (
        <NebulaCloud key={i} {...cloud} />
      ))}
    </group>
  )
}
