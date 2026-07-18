import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

export default function UFO({ position = [0, 0, 0], scale = 1 }) {
  const groupRef = useRef()

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (groupRef.current) {
      groupRef.current.position.y = position[1] + Math.sin(t * 0.8) * 0.3
      groupRef.current.rotation.y = t * 0.5
      groupRef.current.rotation.x = Math.sin(t * 0.4) * 0.08
      groupRef.current.rotation.z = Math.cos(t * 0.3) * 0.06
    }
  })

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {/* Bottom saucer */}
      <mesh>
        <sphereGeometry args={[1, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2.5]} />
        <meshStandardMaterial color="#7a8898" metalness={0.9} roughness={0.15} />
      </mesh>
      {/* Top saucer */}
      <mesh position={[0, 0.15, 0]} rotation={[Math.PI, 0, 0]}>
        <sphereGeometry args={[1, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2.5]} />
        <meshStandardMaterial color="#8a9aaa" metalness={0.85} roughness={0.2} />
      </mesh>
      {/* Cockpit dome */}
      <mesh position={[0, 0.15, 0]}>
        <sphereGeometry args={[0.45, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#4af0ff" metalness={0.3} roughness={0.1} transparent opacity={0.6} emissive="#4af0ff" emissiveIntensity={0.3} />
      </mesh>
      {/* Rim ring */}
      <mesh position={[0, 0.05, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.02, 0.05, 8, 32]} />
        <meshStandardMaterial color="#c0d0e0" metalness={0.9} roughness={0.1} emissive="#4af0ff" emissiveIntensity={0.15} />
      </mesh>
      {/* Bottom light beam */}
      <mesh position={[0, -0.8, 0]}>
        <coneGeometry args={[0.6, 1.5, 16, 1, true]} />
        <meshBasicMaterial color="#4af0ff" transparent opacity={0.08} side={2} />
      </mesh>
      <pointLight position={[0, -0.3, 0]} color="#4af0ff" intensity={2} distance={5} />
      <pointLight position={[0, 0.5, 0]} color="#4af0ff" intensity={0.5} distance={3} />
    </group>
  )
}
