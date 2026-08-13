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
          I’m a Software Engineer focused on building scalable backend systems, intelligent applications, and reliable distributed architectures. I enjoy turning complex problems into clean, efficient, and production-ready solutions.
          My technical experience spans Java, Python, Spring Boot, FastAPI, microservices, REST APIs, Kafka, gRPC, PostgreSQL, MongoDB, and cloud platforms including AWS and Azure. I also have a strong interest in AI engineering, with hands-on experience building RAG pipelines, Agentic AI workflows, and AI-powered applications using LangChain and Spring AI. I believe good engineering is not just about writing code—it’s about building systems that are scalable, maintainable, secure, and capable of creating real impact. I’m continuously improving my problem-solving skills through competitive programming and have solved 350+ problems on LeetCode. I’m currently looking for opportunities where I can contribute to challenging engineering problems, work with strong teams, and grow as a software engineer while building technology that matters.
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
          Software Engineer with hands-on experience in backend development, microservices, AI engineering, and cloud technologies. Skilled in Java, Python, Spring Boot, FastAPI, Kafka, gRPC, REST APIs, PostgreSQL, MongoDB, Docker, AWS, and Azure. Experienced in developing scalable APIs, distributed microservices, RAG pipelines, and Agentic AI workflows, with demonstrated improvements in system throughput, latency, reliability, and response accuracy. Strong foundation in Data Structures & Algorithms, OOP, DBMS, and Operating Systems, with 350+ LeetCode problems solved.
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

      {/* ── Section 4: Projects — Asteroid Belt ─────── */}
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
        <h2>Projects</h2>
        <p>Tap to expand and see details of my recent engineering work.</p>
        
        <div className="project-details" style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          <div className="project">
            <h3 style={{ color: '#fff', fontSize: '1.3rem', marginBottom: '8px' }}>1. Agentic RAG Document Intelligence Engine</h3>
            <p style={{ fontSize: '0.95rem', fontStyle: 'italic', color: '#a78bfa' }}>Autonomous Multi-Agent PDF Synthesis & Knowledge Retrieval System</p>
            <p style={{ fontSize: '0.95rem', marginTop: '8px' }}>
              Built using <strong>CrewAI</strong> and <strong>Gemini 2.5 Flash</strong> to automate extraction, semantic searching, and synthesis of PDF reports. Uses localized vector search (ChromaDB + HuggingFace) with agentic reasoning to generate factual analysis grounded in document evidence.
            </p>
            <ul style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginLeft: '20px', marginTop: '8px', lineHeight: '1.5' }}>
              <li><strong>Tech:</strong> Python, CrewAI, Gemini 2.5 Flash, LangChain, ChromaDB, PyPDF</li>
              <li>Engineered an Agentic RAG system for complex PDF parsing and synthesis.</li>
              <li>Designed local vector storage with custom chunking strategies (800-token/150-overlap).</li>
              <li>Implemented custom LangChain retrieval tools for real-time reasoning and fact-gathering.</li>
            </ul>
          </div>

          <div className="project">
            <h3 style={{ color: '#fff', fontSize: '1.3rem', marginBottom: '8px' }}>2. Distributed Healthcare Microservices Platform</h3>
            <p style={{ fontSize: '0.95rem', fontStyle: 'italic', color: '#a78bfa' }}>Scalable, Event-Driven Architecture for Patient Management</p>
            <p style={{ fontSize: '0.95rem', marginTop: '8px' }}>
              A production-grade ecosystem handling patient lifecycle management, secure authentication, and real-time event analytics using database-per-service patterns and centralized API routing.
            </p>
            <ul style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginLeft: '20px', marginTop: '8px', lineHeight: '1.5' }}>
              <li><strong>Tech:</strong> Java 17, Spring Boot 3.4, Kafka, gRPC, PostgreSQL, Docker, JWT</li>
              <li>Architected an event-driven platform with 6+ microservices and isolated databases.</li>
              <li>Implemented hybrid communication: gRPC for low-latency RPCs and Kafka for streaming.</li>
              <li>Configured API Gateway with JWT filters for centralized security and route proxying.</li>
            </ul>
          </div>

          <div className="project">
            <h3 style={{ color: '#fff', fontSize: '1.3rem', marginBottom: '8px' }}>3. Foodingo – Cloud-Native Food Ordering Platform</h3>
            <p style={{ fontSize: '0.95rem', fontStyle: 'italic', color: '#a78bfa' }}>Full-Stack RESTful E-Commerce Engine</p>
            <p style={{ fontSize: '0.95rem', marginTop: '8px' }}>
              Scalable backend infrastructure managing menu discovery, shopping carts, Razorpay payments, and automated order status state machines with cloud media storage.
            </p>
            <ul style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginLeft: '20px', marginTop: '8px', lineHeight: '1.5' }}>
              <li><strong>Tech:</strong> Java 17, Spring Boot, MongoDB, Spring Security, Razorpay API, AWS S3</li>
              <li>Developed a backend serving 15+ REST endpoints for ordering and cart operations.</li>
              <li>Integrated Razorpay with HMAC-SHA256 signature verification and order state transitions.</li>
              <li>Implemented AWS S3 for media management and secured routes using stateless JWT auth.</li>
            </ul>
          </div>

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
