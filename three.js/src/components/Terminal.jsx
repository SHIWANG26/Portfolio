import { useState, useRef, useEffect } from 'react';

export default function Terminal({ onClose }) {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { type: 'output', text: "Welcome to Shiwang's Universe." },
    { type: 'output', text: 'Type "help" to see available commands.' },
  ]);
  const endRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-focus input and scroll to bottom
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (cmd) => {
    const trimmed = cmd.trim().toLowerCase();
    
    if (trimmed === 'clear') {
      setHistory([]);
      return;
    }

    const newHistory = [...history, { type: 'input', text: `> ${cmd}` }];
    let output;

    switch (trimmed) {
      case 'help':
        output = `Available commands:
  whoami    - Who is Shiwang Kumar Rai?
  skills    - View technical skills
  projects  - List all projects
  contact   - Get contact information
  hire      - Why you should hire me
  resume    - Download resume
  clear     - Clear terminal
  secret    - ???`;
        break;
      case 'whoami':
        output = `Shiwang Kumar Rai
Software Engineering Intern at Predulive Labs.
B.Tech in Computer Science and Engineering (Expected 2026) from Oriental Institute of Science and Technology.
Passionate about backend architecture, AI pipelines, and building scalable microservices.`;
        break;
      case 'skills':
        output = `Technical Skills:
- Languages: Java, Python, C++, SQL, HTML/CSS
- AI & ML: LangChain, Spring AI, RAG Pipelines, Agentic AI, Prompt Engineering
- Backend & Architecture: Spring Boot, FastAPI, Spring Cloud, Apache Kafka, gRPC, RESTful APIs
- Cloud & Tools: AWS (S3, EC2), Azure, Docker, Git, CI/CD, Postman
- Core CS: Data Structures & Algorithms (350+ LeetCode), OOP, DBMS, OS`;
        break;
      case 'projects':
        output = `Projects:
1. Micropatient: Patient Management Microservices (Spring Boot, FastAPI, Kafka, gRPC, RAG, Docker)
   - Architected healthcare ecosystem with 5+ modular microservices.
   - Orchestrated Agentic AI workflows with LangChain automating 85% of queries.
2. Foodingo: Full-Stack Food Ordering Platform (React, Java, Spring Boot, MongoDB, Azure, AWS S3)
   - Developed secure auth module using JWT and Spring Security.
   - Deployed on Azure with auto-scaling to maintain 99.9% uptime.`;
        break;
      case 'contact':
        output = `Contact Information:
- Email: shiwangr@gmail.com
- Phone: +91-7985135746
- LinkedIn: https://linkedin.com/in/shiwangr
- GitHub: https://github.com/shiwangr`;
        break;
      case 'hire':
        output = `Why you should hire me:
I'm a fast learner who isn't afraid of complex problems. With my experience in building scalable microservices and integrating Agentic AI workflows, I bridge the gap between traditional backend engineering and the future of AI. Plus, I solve Rubik's cubes really fast!`;
        break;
      case 'resume':
        output = `Opening resume in a new tab...`;
        window.open('/shiwang-kumar-rai.pdf', '_blank');
        break;
      case 'secret':
        output = `i'm interested in learning and building`;
        break;
      case '':
        output = '';
        break;
      default:
        output = `Command not found: ${trimmed}. Type "help" for available commands.`;
    }

    if (output) {
      newHistory.push({ type: 'output', text: output });
    }
    
    setHistory(newHistory);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand(input);
      setInput('');
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div className="terminal-overlay" onClick={onClose}>
      <div className="terminal-window" onClick={(e) => e.stopPropagation()}>
        <div className="terminal-header">
          <div className="terminal-buttons">
            <span className="term-btn red" onClick={onClose}></span>
            <span className="term-btn yellow"></span>
            <span className="term-btn green"></span>
          </div>
          <div className="terminal-title">shiwang@universe: ~</div>
        </div>
        <div className="terminal-body" onClick={() => inputRef.current?.focus()}>
          {history.map((entry, i) => (
            <div key={i} className={`term-line ${entry.type}`}>
              <pre>{entry.text}</pre>
            </div>
          ))}
          <div className="term-input-line">
            <span className="term-prompt">&gt;</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              spellCheck="false"
              autoComplete="off"
            />
          </div>
          <div ref={endRef} />
        </div>
      </div>
    </div>
  );
}
