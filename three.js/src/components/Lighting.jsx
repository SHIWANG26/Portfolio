export default function Lighting() {
  return (
    <>
      {/* Ambient base light */}
      <ambientLight intensity={0.15} color="#a0a8ff" />

      {/* Main sun light */}
      <directionalLight
        position={[10, 10, 5]}
        intensity={1.2}
        color="#fff5e0"
        castShadow={false}
      />

      {/* Fill light from below */}
      <directionalLight
        position={[-5, -3, -5]}
        intensity={0.2}
        color="#6080ff"
      />

      {/* Rim light */}
      <directionalLight
        position={[-8, 5, -10]}
        intensity={0.3}
        color="#c084fc"
      />

      {/* Nebula colored point lights scattered along path */}
      <pointLight position={[0, 0, -20]} color="#6c3baa" intensity={1} distance={30} />
      <pointLight position={[8, 3, -50]} color="#ec4899" intensity={0.8} distance={25} />
      <pointLight position={[-6, -2, -80]} color="#3b82f6" intensity={0.8} distance={25} />
      <pointLight position={[5, 4, -110]} color="#22c55e" intensity={0.6} distance={25} />
      <pointLight position={[-5, 2, -140]} color="#a855f7" intensity={0.8} distance={25} />
      <pointLight position={[0, 0, -170]} color="#6366f1" intensity={0.6} distance={25} />
    </>
  )
}
