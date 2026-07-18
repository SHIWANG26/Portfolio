import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { createRandom } from '../utils/random'

export default function Planet({
  position = [0, 0, 0],
  scale = 1,
  color = '#8b5cf6',
  color2 = '#6d28d9',
  hasRing = false,
  ringColor = '#a78bfa',
  rotationSpeed = 0.2,
  emissiveIntensity = 0.05,
}) {
  const meshRef = useRef()
  const ringRef = useRef()

  const texture = useMemo(() => {
    // Generate a hash of color and color2 for seeded RNG
    const str = color + color2
    let hash = 0
    for (let i = 0; i < str.length; i++) {
      hash = (hash << 5) - hash + str.charCodeAt(i)
      hash |= 0
    }
    const random = createRandom(hash)

    const canvas = document.createElement('canvas')
    canvas.width = 256
    canvas.height = 128
    const ctx = canvas.getContext('2d')

    const grad = ctx.createLinearGradient(0, 0, 256, 128)
    grad.addColorStop(0, color)
    grad.addColorStop(0.4, color2)
    grad.addColorStop(0.6, color)
    grad.addColorStop(1, color2)
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, 256, 128)

    // Bands
    for (let i = 0; i < 8; i++) {
      const y = (i / 8) * 128
      ctx.fillStyle = `rgba(0,0,0,${random() * 0.15})`
      ctx.fillRect(0, y, 256, random() * 12 + 4)
    }

    // Spots/storms
    for (let i = 0; i < 15; i++) {
      const x = random() * 256
      const y = random() * 128
      const r = random() * 12 + 4
      ctx.fillStyle = `rgba(255,255,255,${random() * 0.08})`
      ctx.beginPath()
      ctx.arc(x, y, r, 0, Math.PI * 2)
      ctx.fill()
    }

    const tex = new THREE.CanvasTexture(canvas)
    tex.wrapS = THREE.RepeatWrapping
    return tex
  }, [color, color2])

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (meshRef.current) {
      meshRef.current.rotation.y = t * rotationSpeed
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = Math.sin(t * 0.1) * 0.05
    }
  })

  return (
    <group position={position} scale={scale}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[1.2, 48, 48]} />
        <meshStandardMaterial
          map={texture}
          roughness={0.6}
          metalness={0.2}
          emissive={color}
          emissiveIntensity={emissiveIntensity}
        />
      </mesh>

      {/* Atmospheric glow */}
      <mesh>
        <sphereGeometry args={[1.35, 32, 32]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.06}
          side={THREE.BackSide}
        />
      </mesh>

      {hasRing && (
        <mesh ref={ringRef} rotation={[Math.PI / 2.5, 0, 0]}>
          <ringGeometry args={[1.6, 2.4, 64]} />
          <meshBasicMaterial
            color={ringColor}
            transparent
            opacity={0.35}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}
    </group>
  )
}
