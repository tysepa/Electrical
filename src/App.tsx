import { useState, useEffect } from "react";
import { 
  defaultProfile, 
  defaultExperiences, 
  defaultProjects 
} from "./data";
import type { PortfolioData } from "./data";
import { ExperienceCard } from "./components/ExperienceCard";
import { ProjectCard } from "./components/ProjectCard";
import { AdminPanel } from "./components/AdminPanel";
import { 
  Zap, User, Phone, Mail, MapPin, Award, FileDown, 
  ShieldCheck, CheckCircle2, Lock, Cpu
} from "lucide-react";

const STORAGE_KEY = "electrician_portfolio_data";

function App() {
  const [activeTab, setActiveTab] = useState<"portfolio" | "admin">("portfolio");
  const [projectFilter, setProjectFilter] = useState<string>("All");
  
  // Initialize portfolio state from localStorage or defaults
  const [portfolioData, setPortfolioData] = useState<PortfolioData>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse saved portfolio data", e);
      }
    }
    return {
      profile: defaultProfile,
      experiences: defaultExperiences,
      projects: defaultProjects
    };
  });

  // Save changes to localStorage when updated
  const handleUpdateData = (newData: PortfolioData) => {
    setPortfolioData(newData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
  };

  // Scroll to top when changing page tabs
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTab]);

  const { profile, experiences, projects } = portfolioData;

  // Categories list for project filtering
  const categories = ["All", "Grid Operations", "Hotel Maintenance", "Commercial & Kitchen", "Safety & Custom"];

  const filteredProjects = projectFilter === "All" 
    ? projects 
    : projects.filter(p => p.category === projectFilter);

  return (
    <>
      {/* Header / Nav */}
      <header className="header">
        <div className="container header-container">
          <a href="#" className="logo-section" onClick={() => setActiveTab("portfolio")}>
            <Zap size={22} className="logo-icon" />
            <span className="logo-text">Nirere<span>.Elect</span></span>
          </a>

          <nav className="nav-links">
            <button 
              className={`nav-btn ${activeTab === "portfolio" ? "active" : ""}`}
              onClick={() => setActiveTab("portfolio")}
            >
              <User size={16} />
              <span>Portfolio</span>
            </button>
            <button 
              className={`nav-btn admin-btn ${activeTab === "admin" ? "active" : ""}`}
              onClick={() => setActiveTab("admin")}
            >
              <Lock size={15} />
              <span>Admin Panel</span>
            </button>
          </nav>
        </div>
      </header>

      {/* PORTFOLIO VIEW */}
      {activeTab === "portfolio" && (
        <main>
          {/* HERO SECTION */}
          <section className="hero">
            <div className="container hero-grid">
              <div className="hero-content">
                <div className="badge">
                  <span className="badge-pulse"></span>
                  <span>Grid Certified & Licensed</span>
                </div>
                
                <h1 className="hero-title">
                  Professional Electrical Solutions by <span>{profile.name}</span>
                </h1>
                
                <p className="hero-subtitle">
                  {profile.title}. Providing high-integrity industrial and commercial electrical infrastructure across Rwanda.
                </p>

                <div className="hero-meta">
                  <div className="meta-item">
                    <MapPin size={16} />
                    <span>{profile.location}</span>
                  </div>
                  <div className="meta-item">
                    <Phone size={16} />
                    <span>{profile.phone}</span>
                  </div>
                  <div className="meta-item">
                    <Mail size={16} />
                    <span>{profile.email}</span>
                  </div>
                </div>

                <div className="hero-actions">
                  <a href="#contact" className="btn btn-primary">
                    <Phone size={16} />
                    <span>Hire Electrician</span>
                  </a>
                  <button onClick={() => window.print()} className="btn btn-secondary">
                    <FileDown size={16} />
                    <span>Print CV</span>
                  </button>
                </div>
              </div>

              {/* Glowing Interactive Circuit Visual */}
              <div className="hero-visual">
                <div className="circuit-wrapper">
                  <svg viewBox="0 0 200 200" className="circuit-svg">
                    {/* Background Grid */}
                    <path d="M 0,20 H 200 M 0,40 H 200 M 0,60 H 200 M 0,80 H 200 M 0,100 H 200 M 0,120 H 200 M 0,140 H 200 M 0,160 H 200 M 0,180 H 200" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
                    <path d="M 20,0 V 200 M 40,0 V 200 M 60,0 V 200 M 80,0 V 200 M 100,0 V 200 M 120,0 V 200 M 140,0 V 200 M 160,0 V 200 M 180,0 V 200" stroke="rgba(255,255,255,0.02)" strokeWidth="1" />
                    
                    {/* Main transformer circle */}
                    <circle cx="100" cy="100" r="30" fill="none" stroke="rgba(6, 182, 212, 0.2)" strokeWidth="6" />
                    <circle cx="100" cy="100" r="20" fill="none" stroke="var(--accent-cyan)" strokeWidth="2" />
                    
                    {/* Circuit lines */}
                    <path d="M 30,100 H 70" stroke="var(--accent-cyan)" strokeWidth="2.5" />
                    <path d="M 130,100 H 170" stroke="var(--accent-cyan)" strokeWidth="2.5" />
                    <path d="M 100,30 V 70" stroke="var(--accent-amber)" strokeWidth="2.5" />
                    <path d="M 100,130 V 170" stroke="var(--accent-amber)" strokeWidth="2.5" />
                    
                    {/* Diagonals */}
                    <path d="M 50,50 L 80,80" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
                    <path d="M 150,150 L 120,120" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
                    
                    {/* Pulse dots */}
                    <circle cx="30" cy="100" r="4" fill="var(--accent-cyan)" />
                    <circle cx="170" cy="100" r="4" fill="var(--accent-cyan)" />
                    <circle cx="100" cy="30" r="4" fill="var(--accent-amber)" />
                    <circle cx="100" cy="170" r="4" fill="var(--accent-amber)" />
                    
                    {/* Central spark */}
                    <path d="M 95,95 L 105,95 L 98,105 L 108,105 L 96,113 L 102,113" stroke="var(--accent-amber)" strokeWidth="2" fill="none" />
                  </svg>
                </div>
              </div>
            </div>
          </section>

          {/* SKILLS & CERTIFICATIONS SECTION */}
          <section className="skills-section">
            <div className="container">
              <div className="about-card">
                <h2 className="card-title" style={{ fontSize: "1.5rem" }}>
                  <ShieldCheck size={20} />
                  <span>Professional Profile Summary</span>
                </h2>
                <p className="about-text">{profile.bio}</p>
              </div>

              <div className="grid-2col">
                {/* Skills Column */}
                <div>
                  <h3 className="card-title">
                    <Cpu size={18} />
                    <span>Technical Capabilities</span>
                  </h3>
                  <div className="skills-list">
                    {profile.skills.map((skill, index) => (
                      <div key={index} className="skill-tag">
                        <CheckCircle2 size={15} />
                        <span>{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Certifications Column */}
                <div>
                  <h3 className="card-title">
                    <Award size={18} />
                    <span>Licensing & Certifications</span>
                  </h3>
                  <div className="certifications-list">
                    {profile.certifications.map((cert, index) => (
                      <div key={index} className="cert-item">
                        <div className="cert-icon">
                          <Award size={16} />
                        </div>
                        <div>
                          <div className="cert-name">{cert}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* EXPERIENCE TIMELINE SECTION */}
          <section className="experience-section">
            <div className="container">
              <div className="section-header">
                <span className="badge">Professional Career</span>
                <h2 className="section-title">Industry <span>Work History</span></h2>
                <p className="section-desc">
                  Demonstrated track record of delivering compliant infrastructure, hotel automation, and commercial electrical designs.
                </p>
                <div className="section-divider"></div>
              </div>

              <div className="timeline">
                {experiences.map((exp) => (
                  <ExperienceCard key={exp.id} experience={exp} />
                ))}
              </div>
            </div>
          </section>

          {/* PORTFOLIO ACTIVITIES GALLERY */}
          <section className="projects-section">
            <div className="container">
              <div className="section-header">
                <span className="badge">Featured Works</span>
                <h2 className="section-title">Field <span>Installations</span></h2>
                <p className="section-desc">
                  Visual schematics and details of completed high-load systems, grid relays, and commercial electrical assets.
                </p>
                <div className="section-divider"></div>
              </div>

              {/* Filters */}
              <div className="category-filters">
                {categories.map((cat) => (
                  <button 
                    key={cat}
                    className={`filter-btn ${projectFilter === cat ? "active" : ""}`}
                    onClick={() => setProjectFilter(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Projects Grid */}
              <div className="projects-grid">
                {filteredProjects.map((proj) => (
                  <ProjectCard key={proj.id} project={proj} />
                ))}
              </div>
            </div>
          </section>

          {/* CONTACT CTA SECTION */}
          <section id="contact" className="contact-section">
            <div className="container">
              <div className="contact-card">
                <h2 className="contact-title">Let's Secure Your Electrical Infrastructure</h2>
                <p className="contact-subtitle">
                  Available for full-scale commercial installations, substation grid maintenance, hospitality system management, and formal safety auditing in Kigali and across Rwanda.
                </p>
                
                <div className="contact-grid">
                  <div className="contact-method">
                    <div className="contact-icon">
                      <Phone size={20} />
                    </div>
                    <span className="contact-label">Phone Support</span>
                    <span className="contact-value">{profile.phone}</span>
                  </div>

                  <div className="contact-method">
                    <div className="contact-icon">
                      <Mail size={20} />
                    </div>
                    <span className="contact-label">Email Inquiry</span>
                    <span className="contact-value">{profile.email}</span>
                  </div>

                  <div className="contact-method">
                    <div className="contact-icon">
                      <MapPin size={20} />
                    </div>
                    <span className="contact-label">Location / Base</span>
                    <span className="contact-value">{profile.location}</span>
                  </div>
                </div>

                <a href={`mailto:${profile.email}`} className="btn btn-primary">
                  <Mail size={16} />
                  <span>Send Project Brief</span>
                </a>
              </div>
            </div>
          </section>
        </main>
      )}

      {/* ADMIN PANEL VIEW */}
      {activeTab === "admin" && (
        <main className="container">
          <AdminPanel data={portfolioData} onUpdateData={handleUpdateData} />
        </main>
      )}

      {/* FOOTER */}
      <footer className="footer">
        <div className="container footer-container">
          <a href="#" className="logo-section" onClick={() => setActiveTab("portfolio")}>
            <Zap size={18} className="logo-icon" />
            <span className="logo-text">Nirere<span>.Elect</span></span>
          </a>
          <p className="footer-text">
            © {new Date().getFullYear()} {profile.name}. All Rights Reserved. Licensed Class A Electrical Operations.
          </p>
          <p className="footer-credits">
            Powering projects across <span>REG</span>, <span>Onomo Hotel</span>, <span>Azzurri</span>, and <span>La Creola</span>.
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
