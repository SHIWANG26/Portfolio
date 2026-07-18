import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { createRandom } from '../utils/random'

function Asteroid({ position, size, speed, rotationAxis, seed }) {
  const ref = useRef()

  const geometry = useMemo(() => {
    const random = createRandom(seed || 1234)
    const geo = new THREE.DodecahedronGeometry(size, 1)
    // Randomize vertices for rocky appearance
    const posAttr = geo.attributes.position
    for (let i = 0; i < posAttr.count; i++) {
      const x = posAttr.getX(i)
      const y = posAttr.getY(i)
      const z = posAttr.getZ(i)
      const offset = (random() - 0.5) * size * 0.4
      posAttr.setXYZ(i, x + offset, y + offset * 0.6, z + offset * 0.8)
    }
    geo.computeVertexNormals()
    return geo
  }, [size, seed])

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (ref.current) {
      ref.current.rotation.x = t * speed * rotationAxis[0]
      ref.current.rotation.y = t * speed * rotationAxis[1]
      ref.current.rotation.z = t * speed * rotationAxis[2]
    }
  })

  return (
    <mesh ref={ref} position={position} geometry={geometry}>
      <meshStandardMaterial
        color="#6a6060"
        roughness={0.9}
        metalness={0.1}
        flatShading
      />
    </mesh>
  )
}

export default function Asteroids({ position = [0, 0, 0], count = 30, spread = 8 }) {
  const asteroids = useMemo(() => {
    const random = createRandom(888)
    return Array.from({ length: count }, (_, i) => ({
      key: i,
      seed: Math.floor(random() * 100000),
      position: [
        (random() - 0.5) * spread,
        (random() - 0.5) * spread * 0.4,
        (random() - 0.5) * spread,
      ],
      size: random() * 0.2 + 0.08,
      speed: random() * 0.3 + 0.1,
      rotationAxis: [
        random() * 2 - 1,
        random() * 2 - 1,
        random() * 2 - 1,
      ],
    }))
  }, [count, spread])

  return (
    <group position={position}>
      {asteroids.map((a) => (
        <Asteroid
          key={a.key}
          position={a.position}
          size={a.size}
          speed={a.speed}
          rotationAxis={a.rotationAxis}
          seed={a.seed}
        />
      ))}
    </group>
  )
}
