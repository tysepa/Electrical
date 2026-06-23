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

              {/* Glowing Profile Photo of Owner */}
              <div className="hero-visual">
                <div className="profile-wrapper">
                  <div className="profile-glow-circle"></div>
                  <img src="/avatar.png" alt={profile.name} className="profile-image" />
                  
                  {/* Decorative Circuit Indicators Overlay */}
                  <svg viewBox="0 0 100 100" className="profile-circuit-svg">
                    <circle cx="50" cy="50" r="47" stroke="var(--accent-cyan)" strokeWidth="1.5" fill="none" strokeDasharray="6,4" />
                    <line x1="0" y1="50" x2="15" y2="50" stroke="var(--accent-cyan)" strokeWidth="2" />
                    <line x1="85" y1="50" x2="100" y2="50" stroke="var(--accent-cyan)" strokeWidth="2" />
                    <circle cx="15" cy="50" r="3" fill="var(--accent-cyan)" />
                    <circle cx="85" cy="50" r="3" fill="var(--accent-cyan)" />
                  </svg>
                </div>
              </div>
            </div>
          </section>

          {/* SKILLS & CERTIFICATIONS SECTION */}
          <section className="skills-section">
            <div className="container">
              <div className="about-container">
                <div className="about-card" style={{ marginBottom: 0 }}>
                  <h2 className="card-title" style={{ fontSize: "1.5rem" }}>
                    <ShieldCheck size={20} />
                    <span>Professional Profile Summary</span>
                  </h2>
                  <p className="about-text">{profile.bio}</p>
                </div>
                
                <div className="services-showcase-wrapper">
                  <img src="/services.png" alt="Industrial Electrical Work" className="services-showcase-image" />
                  <div className="services-caption">
                    <Zap size={14} style={{ color: "var(--accent-amber)" }} />
                    <span>Verified High-Voltage Commissioning</span>
                  </div>
                </div>
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
