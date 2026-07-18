import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

export default function SpaceStation({ position = [0, 0, 0], scale = 1 }) {
  const groupRef = useRef()
  const ringRef = useRef()

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.08
      // Gentle bobbing
      groupRef.current.position.y = position[1] + Math.sin(t * 0.5) * 0.15
    }
    if (ringRef.current) {
      ringRef.current.rotation.x = t * 0.3
    }
  })

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Central hub */}
      <mesh>
        <cylinderGeometry args={[0.3, 0.3, 1.2, 16]} />
        <meshStandardMaterial color="#8892a8" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Central sphere */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshStandardMaterial color="#a0a8b8" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Solar panel arm left */}
      <mesh position={[-1.2, 0, 0]}>
        <boxGeometry args={[1.5, 0.05, 0.6]} />
        <meshStandardMaterial color="#1e3a6a" metalness={0.5} roughness={0.4} emissive="#1a3060" emissiveIntensity={0.2} />
      </mesh>

      {/* Solar panel arm right */}
      <mesh position={[1.2, 0, 0]}>
        <boxGeometry args={[1.5, 0.05, 0.6]} />
        <meshStandardMaterial color="#1e3a6a" metalness={0.5} roughness={0.4} emissive="#1a3060" emissiveIntensity={0.2} />
      </mesh>

      {/* Connecting truss */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.04, 0.04, 4, 8]} />
        <meshStandardMaterial color="#6a7080" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Rotating ring */}
      <mesh ref={ringRef} position={[0, 0, 0]}>
        <torusGeometry args={[0.7, 0.06, 8, 32]} />
        <meshStandardMaterial color="#a8b0c0" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Docking port top */}
      <mesh position={[0, 0.8, 0]}>
        <coneGeometry args={[0.15, 0.3, 8]} />
        <meshStandardMaterial color="#7a8298" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Antenna */}
      <mesh position={[0, 1.1, 0]}>
        <cylinderGeometry args={[0.01, 0.01, 0.5, 4]} />
        <meshStandardMaterial color="#c0c8d0" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Antenna tip light */}
      <mesh position={[0, 1.35, 0]}>
        <sphereGeometry args={[0.03, 8, 8]} />
        <meshBasicMaterial color="#ff4444" />
      </mesh>

      {/* Navigation lights */}
      <pointLight position={[0, 1.35, 0]} color="#ff4444" intensity={0.5} distance={2} />
      <pointLight position={[-2, 0, 0]} color="#44ff44" intensity={0.3} distance={1.5} />
      <pointLight position={[2, 0, 0]} color="#ff4444" intensity={0.3} distance={1.5} />
    </group>
  )
}
