import React from "react";
import type { Project } from "../data";
import { CheckCircle2, Cpu, Zap, Settings, ShieldCheck } from "lucide-react";

interface ProjectCardProps {
  project: Project;
}

const CircuitIllustration: React.FC<{ type: string }> = ({ type }) => {
  switch (type) {
    case "grid":
      return (
        <svg viewBox="0 0 200 120" className="circuit-svg" style={{ height: "100%", width: "100%" }}>
          {/* Substation / Tower grid */}
          <path d="M50 110 L100 20 L150 110" stroke="rgba(6, 182, 212, 0.4)" strokeWidth="2" fill="none" />
          <path d="M75 65 L125 65" stroke="rgba(6, 182, 212, 0.4)" strokeWidth="2" fill="none" />
          <path d="M60 90 L140 90" stroke="rgba(6, 182, 212, 0.4)" strokeWidth="2" fill="none" />
          
          {/* Insulators */}
          <rect x="70" y="60" width="10" height="15" fill="var(--accent-amber)" opacity="0.8" rx="2" />
          <rect x="120" y="60" width="10" height="15" fill="var(--accent-amber)" opacity="0.8" rx="2" />
          
          {/* Power lines */}
          <path d="M10 68 H200" stroke="var(--accent-cyan)" strokeWidth="1.5" strokeDasharray="5,5" className="circuit-path-pulse" />
          
          {/* Sine wave background */}
          <path d="M10 40 Q 30 20, 50 40 T 90 40 T 130 40 T 170 40 T 200 40" stroke="rgba(6, 182, 212, 0.15)" strokeWidth="1.5" fill="none" />
          
          {/* Glow spots */}
          <circle cx="100" cy="20" r="4" fill="var(--accent-cyan)" />
          <circle cx="100" cy="20" r="10" stroke="var(--accent-cyan)" strokeWidth="1" fill="none" opacity="0.4" />
        </svg>
      );
    case "hotel":
      return (
        <svg viewBox="0 0 200 120" className="circuit-svg" style={{ height: "100%", width: "100%" }}>
          {/* Building control rack */}
          <rect x="40" y="15" width="120" height="90" rx="6" fill="rgba(17, 24, 39, 0.7)" stroke="rgba(245, 158, 11, 0.3)" strokeWidth="1.5" />
          
          {/* Analog Meter */}
          <circle cx="70" cy="45" r="18" stroke="rgba(255,255,255,0.15)" strokeWidth="2" fill="none" />
          <path d="M70 45 L80 35" stroke="var(--accent-amber)" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="70" cy="45" r="3" fill="var(--text-primary)" />
          
          {/* Status LEDs */}
          <circle cx="120" cy="35" r="4" fill="var(--success)" />
          <text x="130" y="38" fill="var(--text-secondary)" fontSize="8" fontFamily="monospace">GEN RUN</text>
          
          <circle cx="120" cy="55" r="4" fill="var(--accent-cyan)" />
          <text x="130" y="58" fill="var(--text-secondary)" fontSize="8" fontFamily="monospace">GRID OK</text>
          
          {/* Digital readouts */}
          <rect x="55" y="80" width="90" height="15" rx="3" fill="#000" stroke="rgba(255,255,255,0.1)" />
          <text x="100" y="91" fill="var(--accent-cyan)" fontSize="9" fontFamily="monospace" textAnchor="middle">ATS: NORMAL</text>
        </svg>
      );
    case "kitchen":
      return (
        <svg viewBox="0 0 200 120" className="circuit-svg" style={{ height: "100%", width: "100%" }}>
          {/* 3-Phase Busbars */}
          <line x1="20" y1="25" x2="180" y2="25" stroke="#ef4444" strokeWidth="2" /> {/* Phase L1 */}
          <line x1="20" y1="40" x2="180" y2="40" stroke="#eab308" strokeWidth="2" /> {/* Phase L2 */}
          <line x1="20" y1="55" x2="180" y2="55" stroke="#3b82f6" strokeWidth="2" /> {/* Phase L3 */}
          
          <text x="15" y="27" fill="#ef4444" fontSize="7" fontFamily="monospace">L1</text>
          <text x="15" y="42" fill="#eab308" fontSize="7" fontFamily="monospace">L2</text>
          <text x="15" y="57" fill="#3b82f6" fontSize="7" fontFamily="monospace">L3</text>
          
          {/* Load Balancer Box */}
          <rect x="65" y="70" width="70" height="35" rx="4" fill="rgba(17, 24, 39, 0.9)" stroke="rgba(6, 182, 212, 0.4)" strokeWidth="1" />
          
          {/* Connections */}
          <path d="M80 25 V70" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
          <path d="M100 40 V70" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
          <path d="M120 55 V70" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
          
          {/* Heat coil diagram */}
          <path d="M80 90 Q 85 80, 90 90 T 100 90 T 110 90 T 120 90" stroke="var(--accent-amber)" strokeWidth="2" fill="none" />
        </svg>
      );
    case "safety":
      return (
        <svg viewBox="0 0 200 120" className="circuit-svg" style={{ height: "100%", width: "100%" }}>
          {/* Breaker board panel */}
          <rect x="30" y="15" width="140" height="90" rx="4" fill="rgba(17, 24, 39, 0.5)" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="1" />
          
          {/* Main Isolator Switch */}
          <rect x="45" y="25" width="20" height="40" rx="2" fill="var(--bg-tertiary)" stroke="rgba(255,255,255,0.2)" />
          <line x1="55" y1="35" x2="55" y2="55" stroke="var(--danger)" strokeWidth="3" />
          <circle cx="55" cy="35" r="2" fill="#fff" />
          <text x="55" y="75" fill="var(--text-secondary)" fontSize="7" textAnchor="middle">MAIN</text>
          
          {/* Individual Breakers */}
          <g transform="translate(80, 25)">
            <rect x="0" y="0" width="12" height="30" rx="1" fill="#22c55e" />
            <line x1="6" y1="5" x2="6" y2="15" stroke="#fff" strokeWidth="2" />
            <text x="6" y="42" fill="var(--text-muted)" fontSize="6" textAnchor="middle">CB1</text>
          </g>
          
          <g transform="translate(97, 25)">
            <rect x="0" y="0" width="12" height="30" rx="1" fill="#22c55e" />
            <line x1="6" y1="5" x2="6" y2="15" stroke="#fff" strokeWidth="2" />
            <text x="6" y="42" fill="var(--text-muted)" fontSize="6" textAnchor="middle">CB2</text>
          </g>
          
          <g transform="translate(114, 25)">
            <rect x="0" y="0" width="12" height="30" rx="1" fill="#ef4444" />
            <line x1="6" y1="15" x2="6" y2="25" stroke="#fff" strokeWidth="2" />
            <text x="6" y="42" fill="var(--text-muted)" fontSize="6" textAnchor="middle">TRIP</text>
          </g>
          
          <g transform="translate(131, 25)">
            <rect x="0" y="0" width="12" height="30" rx="1" fill="#22c55e" />
            <line x1="6" y1="5" x2="6" y2="15" stroke="#fff" strokeWidth="2" />
            <text x="6" y="42" fill="var(--text-muted)" fontSize="6" textAnchor="middle">CB4</text>
          </g>
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 200 120" className="circuit-svg" style={{ height: "100%", width: "100%" }}>
          <circle cx="100" cy="60" r="30" stroke="var(--accent-cyan)" strokeWidth="1" fill="none" opacity="0.3" />
          <path d="M20 60 H 180" stroke="var(--accent-cyan)" strokeWidth="1" strokeDasharray="3,3" />
          <path d="M100 10 V 110" stroke="var(--accent-cyan)" strokeWidth="1" strokeDasharray="3,3" />
          <Zap size={24} className="logo-icon" style={{ transform: "translate(88px, 48px)" }} />
        </svg>
      );
  }
};

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Grid Operations":
        return <Zap size={14} />;
      case "Hotel Maintenance":
        return <Settings size={14} />;
      case "Commercial & Kitchen":
        return <Cpu size={14} />;
      default:
        return <ShieldCheck size={14} />;
    }
  };

  return (
    <div className="project-card">
      <div className="project-visual">
        <div className="project-category-badge">
          <span style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem" }}>
            {getCategoryIcon(project.category)}
            {project.category}
          </span>
        </div>
        <CircuitIllustration type={project.imageUrl} />
      </div>

      <div className="project-body">
        <h3 className="project-title">{project.title}</h3>
        <p className="project-desc">{project.description}</p>
        
        <div className="project-highlights">
          {project.highlights.map((highlight, index) => (
            <div key={index} className="highlight-item">
              <CheckCircle2 size={14} />
              <span>{highlight}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
