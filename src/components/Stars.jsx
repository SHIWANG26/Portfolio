import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { createRandom } from '../utils/random'

export default function StarsBackground() {
  const starsRef = useRef()

  const [positions, colors] = useMemo(() => {
    const random = createRandom(777)
    const count = 3000
    const pos = new Float32Array(count * 3)
    const col = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      // Distribute in a sphere
      const r = 80 + random() * 120
      const theta = random() * Math.PI * 2
      const phi = Math.acos(2 * random() - 1)

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi)

      // Slight color variation
      const hue = random()
      if (hue < 0.7) {
        col[i * 3] = 0.9 + random() * 0.1
        col[i * 3 + 1] = 0.9 + random() * 0.1
        col[i * 3 + 2] = 1.0
      } else if (hue < 0.85) {
        col[i * 3] = 1.0
        col[i * 3 + 1] = 0.85 + random() * 0.1
        col[i * 3 + 2] = 0.6 + random() * 0.2
      } else {
        col[i * 3] = 0.7 + random() * 0.2
        col[i * 3 + 1] = 0.8 + random() * 0.2
        col[i * 3 + 2] = 1.0
      }
    }

    return [pos, col]
  }, [])

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (starsRef.current) {
      starsRef.current.rotation.y = t * 0.003
      starsRef.current.rotation.x = t * 0.001
    }
  })

  return (
    <points ref={starsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-color" count={colors.length / 3} array={colors} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.4}
        vertexColors
        transparent
        opacity={0.9}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}
