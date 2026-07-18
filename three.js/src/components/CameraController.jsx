import { useRef, useMemo } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

export default function CameraController({ scrollProgress = 0 }) {
  const { camera } = useThree()
  const targetPos = useRef(new THREE.Vector3(0, 0, 8))
  const targetLook = useRef(new THREE.Vector3(0, 0, 0))

  // Define the camera flight path waypoints
  const pathCurve = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0, 8),       // 0: Hero - looking at Earth
      new THREE.Vector3(2, 1, 3),        // Transition
      new THREE.Vector3(5, 2, -5),       // Moving away
      new THREE.Vector3(8, 1, -20),      // Toward About section
      new THREE.Vector3(5, 3, -35),      // About section
      new THREE.Vector3(-2, 2, -50),     // Transition
      new THREE.Vector3(-6, 1, -65),     // Toward Skills
      new THREE.Vector3(-3, 3, -80),     // Skills section
      new THREE.Vector3(2, 1, -95),      // Transition
      new THREE.Vector3(5, 2, -110),     // Toward Hobbies
      new THREE.Vector3(3, 4, -125),     // Hobbies section
      new THREE.Vector3(-2, 2, -140),    // Transition
      new THREE.Vector3(-4, 1, -150),    // Toward UFO
      new THREE.Vector3(0, 2, -165),     // UFO encounter
      new THREE.Vector3(0, 1, -180),     // Outro
    ])
  }, [])

  // Look-at targets (what camera points toward)
  const lookCurve = useMemo(() => {
    return new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0, 0),        // Earth
      new THREE.Vector3(3, 1, -2),
      new THREE.Vector3(6, 1, -10),
      new THREE.Vector3(8, 0, -28),      // About planet
      new THREE.Vector3(4, 2, -40),
      new THREE.Vector3(-4, 1, -55),
      new THREE.Vector3(-8, 0, -72),     // Skills station
      new THREE.Vector3(-4, 2, -85),
      new THREE.Vector3(3, 0, -100),
      new THREE.Vector3(6, 1, -118),     // Hobbies asteroids
      new THREE.Vector3(2, 3, -130),
      new THREE.Vector3(-3, 1, -145),
      new THREE.Vector3(-5, 0, -155),
      new THREE.Vector3(0, 1, -172),     // UFO
      new THREE.Vector3(0, 0, -190),     // End
    ])
  }, [])

  useFrame(() => {
    const t = Math.max(0, Math.min(1, scrollProgress))

    // Get position and look-at from curves
    const pos = pathCurve.getPointAt(t)
    const look = lookCurve.getPointAt(t)

    // Smooth lerp
    targetPos.current.lerp(pos, 0.08)
    targetLook.current.lerp(look, 0.08)

    camera.position.copy(targetPos.current)
    camera.lookAt(targetLook.current)
  })

  return null
}
