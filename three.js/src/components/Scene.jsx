import Earth from './Earth'
import Planet from './Planet'
import SpaceStation from './SpaceStation'
import Asteroids from './Asteroids'
import UFO from './UFO'
import Shuttle from './Shuttle'
import StarsBackground from './Stars'
import Lighting from './Lighting'
import TextCard from './TextCard'
import CameraController from './CameraController'
import Nebula from './Nebula'

export default function Scene({ scrollProgress = 0 }) {
  // Determine which sections are "near" based on scroll
  const aboutVisible = scrollProgress > 0.12 && scrollProgress < 0.35
  const skillsVisible = scrollProgress > 0.32 && scrollProgress < 0.55
  const hobbiesVisible = scrollProgress > 0.52 && scrollProgress < 0.75

  return (
    <>
      <CameraController scrollProgress={scrollProgress} />
      <Lighting />
      <StarsBackground />
      <fog attach="fog" args={['#050816', 60, 200]} />

      {/* Nebula clouds */}
      <Nebula />

      {/* ── Section 1: Hero — Earth ─────────────────── */}
      <Earth position={[0, 0, 0]} scale={1} />

      {/* Small shuttle near earth */}
      <Shuttle position={[3, 1.5, 2]} scale={0.2} />

      {/* ── Section 2: About Me — Purple Planet ─────── */}
      <Planet
        position={[8, 0, -28]}
        scale={1.8}
        color="#8b5cf6"
        color2="#6d28d9"
        hasRing
        ringColor="#a78bfa"
        rotationSpeed={0.15}
      />

      <TextCard position={[4, 2.5, -35]} visible={aboutVisible}>
        <h2>About Me</h2>
        <p>
          Hey! I'm <strong>Shiwang Kumar Rai</strong> — a Computer Science student at 
          Oriental Institute of Science and Technology. I'm passionate about backend architecture, 
          AI pipelines, and building scalable microservices.
        </p>
      </TextCard>

      {/* ── Section 3: Skills — Space Station ──────── */}
      <SpaceStation position={[-8, 0, -72]} scale={1.5} />

      <Planet
        position={[-4, -3, -68]}
        scale={1.2}
        color="#3b82f6"
        color2="#1e40af"
        rotationSpeed={0.1}
      />

      <TextCard position={[-3, 3, -80]} visible={skillsVisible}>
        <h2>Skills & Tech</h2>
        <p>
          I build robust backend systems and integrate AI logic.
        </p>
        <div className="tag-list">
          <span className="tag">Java</span>
          <span className="tag">Python</span>
          <span className="tag">Spring Boot</span>
          <span className="tag">FastAPI</span>
          <span className="tag">LangChain</span>
          <span className="tag">Kafka</span>
          <span className="tag">AWS</span>
          <span className="tag">Docker</span>
        </div>
      </TextCard>

      {/* ── Section 4: Hobbies — Asteroid Belt ─────── */}
      <Asteroids position={[6, 1, -118]} count={40} spread={10} />

      <Planet
        position={[10, -2, -115]}
        scale={0.9}
        color="#22c55e"
        color2="#15803d"
        hasRing
        ringColor="#4ade80"
        rotationSpeed={0.25}
      />

      <TextCard position={[3, 4, -125]} visible={hobbiesVisible}>
        <h2>Projects & Hobbies</h2>
        <p>
          I've built a modular healthcare ecosystem (Micropatient) with AI and a secure food ordering platform (Foodingo). Outside of tech, I love speedcubing and basketball.
        </p>
        <div className="tag-list">
          <span className="tag">🏥 Micropatient</span>
          <span className="tag">🍔 Foodingo</span>
          <span className="tag">🧩 Speedcubing</span>
          <span className="tag">🏀 Basketball</span>
        </div>
      </TextCard>

      {/* ── Section 5: UFO Encounter ────────────────── */}
      <UFO position={[-5, 0, -155]} scale={1.2} />

      <Asteroids position={[-2, 0, -160]} count={15} spread={6} />

      <Planet
        position={[4, -4, -170]}
        scale={2}
        color="#a855f7"
        color2="#7e22ce"
        hasRing
        ringColor="#c084fc"
        rotationSpeed={0.08}
        emissiveIntensity={0.1}
      />

      {/* Some floating debris near end */}
      <Asteroids position={[0, 2, -175]} count={10} spread={4} />
    </>
  )
}
