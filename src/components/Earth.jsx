import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { createRandom } from '../utils/random'

export default function Earth({ position = [0, 0, 0], scale = 1 }) {
  const earthRef = useRef()
  const moonRef = useRef()
  const orbitRef = useRef()
  const cloudsRef = useRef()
  const glowRef = useRef()

  // Create earth texture procedurally
  const earthTexture = useMemo(() => {
    const random = createRandom(101)
    const canvas = document.createElement('canvas')
    canvas.width = 512
    canvas.height = 256
    const ctx = canvas.getContext('2d')

    // Ocean base
    const gradient = ctx.createLinearGradient(0, 0, 0, 256)
    gradient.addColorStop(0, '#1a4a7a')
    gradient.addColorStop(0.3, '#1e5a8a')
    gradient.addColorStop(0.5, '#2a6b9a')
    gradient.addColorStop(0.7, '#1e5a8a')
    gradient.addColorStop(1, '#1a4a7a')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, 512, 256)

    // Continents
    const continents = [
      // North America
      { x: 100, y: 60, w: 70, h: 50, color: '#2d8a4e' },
      { x: 90, y: 45, w: 40, h: 30, color: '#3a9a5e' },
      // South America
      { x: 130, y: 130, w: 35, h: 60, color: '#2d8a4e' },
      // Europe
      { x: 250, y: 50, w: 40, h: 30, color: '#3a9a5e' },
      // Africa
      { x: 260, y: 90, w: 50, h: 70, color: '#4a7a3e' },
      // Asia
      { x: 310, y: 40, w: 90, h: 60, color: '#3a9a5e' },
      { x: 340, y: 70, w: 50, h: 40, color: '#4a7a3e' },
      // Australia
      { x: 400, y: 150, w: 40, h: 30, color: '#7a6a3e' },
      // Ice caps
      { x: 0, y: 0, w: 512, h: 15, color: '#d4e4f4' },
      { x: 0, y: 241, w: 512, h: 15, color: '#d4e4f4' },
    ]

    continents.forEach(c => {
      ctx.fillStyle = c.color
      ctx.beginPath()
      ctx.ellipse(c.x, c.y, c.w / 2, c.h / 2, 0, 0, Math.PI * 2)
      ctx.fill()
    })

    // Add some noise/detail
    for (let i = 0; i < 2000; i++) {
      const x = random() * 512
      const y = random() * 256
      ctx.fillStyle = `rgba(${random() > 0.5 ? '50,120,80' : '30,70,120'},${random() * 0.15})`
      ctx.fillRect(x, y, 3, 3)
    }

    const tex = new THREE.CanvasTexture(canvas)
    tex.wrapS = THREE.RepeatWrapping
    return tex
  }, [])

  // Cloud texture
  const cloudTexture = useMemo(() => {
    const random = createRandom(202)
    const canvas = document.createElement('canvas')
    canvas.width = 512
    canvas.height = 256
    const ctx = canvas.getContext('2d')

    ctx.clearRect(0, 0, 512, 256)

    for (let i = 0; i < 80; i++) {
      const x = random() * 512
      const y = random() * 256
      const r = random() * 40 + 10
      const grad = ctx.createRadialGradient(x, y, 0, x, y, r)
      grad.addColorStop(0, `rgba(255,255,255,${random() * 0.3 + 0.05})`)
      grad.addColorStop(1, 'rgba(255,255,255,0)')
      ctx.fillStyle = grad
      ctx.fillRect(x - r, y - r, r * 2, r * 2)
    }

    const tex = new THREE.CanvasTexture(canvas)
    tex.wrapS = THREE.RepeatWrapping
    return tex
  }, [])

  // Moon texture
  const moonTexture = useMemo(() => {
    const random = createRandom(303)
    const canvas = document.createElement('canvas')
    canvas.width = 128
    canvas.height = 64
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = '#b0b0b0'
    ctx.fillRect(0, 0, 128, 64)

    // Craters
    for (let i = 0; i < 30; i++) {
      const x = random() * 128
      const y = random() * 64
      const r = random() * 6 + 2
      ctx.fillStyle = `rgba(80,80,80,${random() * 0.4 + 0.1})`
      ctx.beginPath()
      ctx.arc(x, y, r, 0, Math.PI * 2)
      ctx.fill()
    }

    return new THREE.CanvasTexture(canvas)
  }, [])

  // Orbit ring points
  const orbitPoints = useMemo(() => {
    const points = []
    const segments = 128
    const radius = 2.8
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2
      points.push(new THREE.Vector3(
        Math.cos(angle) * radius,
        Math.sin(angle) * 0.3,
        Math.sin(angle) * radius
      ))
    }
    return points
  }, [])

  useFrame((state) => {
    const t = state.clock.getElapsedTime()

    // Earth rotation
    if (earthRef.current) {
      earthRef.current.rotation.y = t * 0.15
    }

    // Clouds rotate slightly faster
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y = t * 0.18
    }

    // Moon orbiting
    if (moonRef.current) {
      const moonAngle = t * 0.3
      moonRef.current.position.x = Math.cos(moonAngle) * 2.8
      moonRef.current.position.z = Math.sin(moonAngle) * 2.8
      moonRef.current.position.y = Math.sin(moonAngle) * 0.3
      moonRef.current.rotation.y = moonAngle
    }
  })

  return (
    <group position={position} scale={scale}>
      {/* Earth */}
      <mesh ref={earthRef}>
        <sphereGeometry args={[1.5, 64, 64]} />
        <meshStandardMaterial
          map={earthTexture}
          roughness={0.7}
          metalness={0.1}
        />
      </mesh>

      {/* Cloud layer */}
      <mesh ref={cloudsRef}>
        <sphereGeometry args={[1.53, 64, 64]} />
        <meshStandardMaterial
          map={cloudTexture}
          transparent
          opacity={0.35}
          depthWrite={false}
        />
      </mesh>

      {/* Atmosphere glow */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[1.62, 32, 32]} />
        <meshBasicMaterial
          color="#4a9eff"
          transparent
          opacity={0.08}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Outer atmosphere */}
      <mesh>
        <sphereGeometry args={[1.75, 32, 32]} />
        <meshBasicMaterial
          color="#6ac0ff"
          transparent
          opacity={0.03}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Orbit ring (dotted) */}
      <line ref={orbitRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={orbitPoints.length}
            array={new Float32Array(orbitPoints.flatMap(p => [p.x, p.y, p.z]))}
            itemSize={3}
          />
        </bufferGeometry>
        <lineDashedMaterial
          color="#ffffff"
          dashSize={0.15}
          gapSize={0.15}
          opacity={0.25}
          transparent
        />
      </line>

      {/* Moon */}
      <mesh ref={moonRef} position={[2.8, 0, 0]}>
        <sphereGeometry args={[0.25, 32, 32]} />
        <meshStandardMaterial
          map={moonTexture}
          roughness={0.9}
          metalness={0}
        />
      </mesh>
    </group>
  )
}
