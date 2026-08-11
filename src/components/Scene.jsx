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
  const aboutVisible = scrollProgress > 0.10 && scrollProgress < 0.28
  const resumeVisible = scrollProgress > 0.26 && scrollProgress < 0.44
  const skillsVisible = scrollProgress > 0.42 && scrollProgress < 0.60
  const hobbiesVisible = scrollProgress > 0.58 && scrollProgress < 0.76
  const ufoVisible = scrollProgress > 0.74 && scrollProgress < 0.95

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

      {/* ── Section 2.5: Resume — Orange Planet ─────── */}
      <Planet
        position={[-4, -1, -55]}
        scale={1.4}
        color="#f59e0b"
        color2="#d97706"
        rotationSpeed={0.05}
      />

      <TextCard position={[-2, 2, -55]} visible={resumeVisible}>
        <div className="resume-header">
          <img src="/profile_avatar.png" alt="Shiwang" className="profile-avatar" />
          <div className="resume-title-wrap">
            <h2>
              Resume 
              <svg className="resume-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
            </h2>
            <p style={{ margin: 0, fontSize: '0.9rem' }}>Software Engineer</p>
          </div>
        </div>
        <p>
          Ready to bring scalable solutions and innovative AI pipelines to your team. 
          Download my resume to see my full experience and technical background.
        </p>
        <a href="/shiwang-kumar-rai.pdf" download className="download-btn">
          Download PDF
          <svg className="download-icon" viewBox="0 0 24 24">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="7 10 12 15 17 10"></polyline>
            <line x1="12" y1="15" x2="12" y2="3"></line>
          </svg>
        </a>
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

      <TextCard position={[0, 2, -165]} visible={ufoVisible}>
        <h2>The Unknown</h2>
        <p>
          You've reached the end of the known portfolio universe. The truth is out there, and so is my next big project! 
        </p>
        <div className="tag-list">
          <span className="tag">🛸 Aliens</span>
          <span className="tag">🌌 Mysteries</span>
        </div>
      </TextCard>

      {/* Some floating debris near end */}
      <Asteroids position={[0, 2, -175]} count={10} spread={4} />
    </>
  )
}
