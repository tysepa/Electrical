import React, { useState } from "react";
import type { PortfolioData, Profile, Experience, Project } from "../data";
import { 
  Lock, KeyRound, User, Briefcase, FolderGit2, Plus, 
  Trash2, Edit, Save, LogOut, X, AlertCircle 
} from "lucide-react";

interface AdminPanelProps {
  data: PortfolioData;
  onUpdateData: (newData: PortfolioData) => void;
}

type AdminTab = "profile" | "experiences" | "projects";

export const AdminPanel: React.FC<AdminPanelProps> = ({ data, onUpdateData }) => {
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [activeTab, setActiveTab] = useState<AdminTab>("profile");

  // Profile Edit State
  const [profileForm, setProfileForm] = useState<Profile>({ ...data.profile });
  const [newSkill, setNewSkill] = useState("");
  const [newCert, setNewCert] = useState("");

  // Experience Edit State
  const [editingExpId, setEditingExpId] = useState<string | null>(null);
  const [expForm, setExpForm] = useState<Partial<Experience>>({});
  const [newBullet, setNewBullet] = useState("");
  const [newHighlight, setNewHighlight] = useState("");

  // Project Edit State
  const [editingProjId, setEditingProjId] = useState<string | null>(null);
  const [projForm, setProjForm] = useState<Partial<Project>>({});
  const [newProjHighlight, setNewProjHighlight] = useState("");

  // Login handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "admin") {
      setIsLoggedIn(true);
      setLoginError("");
      setPassword("");
      // Sync forms with latest data
      setProfileForm({ ...data.profile });
    } else {
      setLoginError("Invalid Administrator Passcode. Hint: 'admin'");
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setEditingExpId(null);
    setEditingProjId(null);
  };

  // Profile functions
  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateData({
      ...data,
      profile: profileForm
    });
    alert("Profile CV details updated successfully!");
  };

  const addSkill = () => {
    if (newSkill.trim() && !profileForm.skills.includes(newSkill.trim())) {
      const updated = {
        ...profileForm,
        skills: [...profileForm.skills, newSkill.trim()]
      };
      setProfileForm(updated);
      setNewSkill("");
    }
  };

  const removeSkill = (skill: string) => {
    const updated = {
      ...profileForm,
      skills: profileForm.skills.filter(s => s !== skill)
    };
    setProfileForm(updated);
  };

  const addCert = () => {
    if (newCert.trim() && !profileForm.certifications.includes(newCert.trim())) {
      const updated = {
        ...profileForm,
        certifications: [...profileForm.certifications, newCert.trim()]
      };
      setProfileForm(updated);
      setNewCert("");
    }
  };

  const removeCert = (cert: string) => {
    const updated = {
      ...profileForm,
      certifications: profileForm.certifications.filter(c => c !== cert)
    };
    setProfileForm(updated);
  };

  // Experience functions
  const startAddExperience = () => {
    setEditingExpId("new");
    setExpForm({
      id: "exp-" + Date.now(),
      company: "",
      role: "",
      location: "",
      timeline: "",
      description: [],
      keyProjects: [],
      logoText: ""
    });
  };

  const startEditExperience = (exp: Experience) => {
    setEditingExpId(exp.id);
    setExpForm({ ...exp });
  };

  const handleExperienceSave = () => {
    if (!expForm.company || !expForm.role || !expForm.timeline) {
      alert("Company, Role and Timeline are required!");
      return;
    }
    
    let updatedExperiences = [...data.experiences];
    if (editingExpId === "new") {
      updatedExperiences.push(expForm as Experience);
    } else {
      updatedExperiences = updatedExperiences.map(e => e.id === editingExpId ? (expForm as Experience) : e);
    }

    onUpdateData({
      ...data,
      experiences: updatedExperiences
    });
    setEditingExpId(null);
    setExpForm({});
  };

  const handleDeleteExperience = (id: string) => {
    if (confirm("Are you sure you want to delete this work experience?")) {
      onUpdateData({
        ...data,
        experiences: data.experiences.filter(e => e.id !== id)
      });
    }
  };

  const addDescriptionBullet = () => {
    if (newBullet.trim()) {
      setExpForm({
        ...expForm,
        description: [...(expForm.description || []), newBullet.trim()]
      });
      setNewBullet("");
    }
  };

  const removeDescriptionBullet = (idx: number) => {
    setExpForm({
      ...expForm,
      description: (expForm.description || []).filter((_, i) => i !== idx)
    });
  };

  const addExpHighlight = () => {
    if (newHighlight.trim()) {
      setExpForm({
        ...expForm,
        keyProjects: [...(expForm.keyProjects || []), newHighlight.trim()]
      });
      setNewHighlight("");
    }
  };

  const removeExpHighlight = (idx: number) => {
    setExpForm({
      ...expForm,
      keyProjects: (expForm.keyProjects || []).filter((_, i) => i !== idx)
    });
  };

  // Project functions
  const startAddProject = () => {
    setEditingProjId("new");
    setProjForm({
      id: "proj-" + Date.now(),
      title: "",
      description: "",
      category: "Grid Operations",
      date: new Date().toISOString().split('T')[0],
      highlights: [],
      imageUrl: "grid"
    });
  };

  const startEditProject = (proj: Project) => {
    setEditingProjId(proj.id);
    setProjForm({ ...proj });
  };

  const handleProjectSave = () => {
    if (!projForm.title || !projForm.description) {
      alert("Title and Description are required!");
      return;
    }

    let updatedProjects = [...data.projects];
    if (editingProjId === "new") {
      updatedProjects.push(projForm as Project);
    } else {
      updatedProjects = updatedProjects.map(p => p.id === editingProjId ? (projForm as Project) : p);
    }

    onUpdateData({
      ...data,
      projects: updatedProjects
    });
    setEditingProjId(null);
    setProjForm({});
  };

  const handleDeleteProject = (id: string) => {
    if (confirm("Are you sure you want to delete this activity project?")) {
      onUpdateData({
        ...data,
        projects: data.projects.filter(p => p.id !== id)
      });
    }
  };

  const addProjHighlight = () => {
    if (newProjHighlight.trim()) {
      setProjForm({
        ...projForm,
        highlights: [...(projForm.highlights || []), newProjHighlight.trim()]
      });
      setNewProjHighlight("");
    }
  };

  const removeProjHighlight = (idx: number) => {
    setProjForm({
      ...projForm,
      highlights: (projForm.highlights || []).filter((_, i) => i !== idx)
    });
  };


  // NOT logged in view
  if (!isLoggedIn) {
    return (
      <div className="login-card">
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ display: "inline-flex", padding: "1rem", background: "rgba(245, 158, 11, 0.1)", borderRadius: "50%", color: "var(--accent-amber)", marginBottom: "1rem" }}>
            <KeyRound size={32} />
          </div>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "700" }}>Admin Dashboard Access</h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", marginTop: "0.5rem" }}>
            Authenticate to modify CV details and portfolio activities.
          </p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="passcode">System Passcode</label>
            <input 
              type="password" 
              id="passcode"
              className="form-control" 
              placeholder="Enter admin password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {loginError && (
            <div className="error-msg" style={{ marginBottom: "1.5rem" }}>
              <AlertCircle size={16} />
              <span>{loginError}</span>
            </div>
          )}

          <button type="submit" className="btn btn-primary" style={{ width: "100%", gap: "0.5rem" }}>
            <Lock size={16} />
            <span>Verify Credentials</span>
          </button>
        </form>
      </div>
    );
  }

  // Logged in Admin Panel Dashboard
  return (
    <div className="admin-section">
      <div className="admin-header">
        <div>
          <h2 style={{ fontSize: "1.75rem", fontWeight: "800", display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <span style={{ color: "var(--accent-amber)" }}>Admin</span> Dashboard
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem" }}>
            Modifying live records saved in LocalStorage.
          </p>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <div className="admin-nav">
            <button 
              className={`admin-nav-btn ${activeTab === "profile" ? "active" : ""}`}
              onClick={() => { setActiveTab("profile"); setEditingExpId(null); setEditingProjId(null); }}
            >
              <User size={14} style={{ marginRight: "0.35rem", display: "inline", verticalAlign: "middle" }} />
              CV Profile
            </button>
            <button 
              className={`admin-nav-btn ${activeTab === "experiences" ? "active" : ""}`}
              onClick={() => { setActiveTab("experiences"); setEditingExpId(null); setEditingProjId(null); }}
            >
              <Briefcase size={14} style={{ marginRight: "0.35rem", display: "inline", verticalAlign: "middle" }} />
              Experiences
            </button>
            <button 
              className={`admin-nav-btn ${activeTab === "projects" ? "active" : ""}`}
              onClick={() => { setActiveTab("projects"); setEditingExpId(null); setEditingProjId(null); }}
            >
              <FolderGit2 size={14} style={{ marginRight: "0.35rem", display: "inline", verticalAlign: "middle" }} />
              Activities
            </button>
          </div>

          <button onClick={handleLogout} className="btn btn-secondary btn-sm" style={{ color: "var(--danger)", borderColor: "rgba(239, 68, 68, 0.2)" }}>
            <LogOut size={14} />
          </button>
        </div>
      </div>

      {/* VIEW: PROFILE EDITOR */}
      {activeTab === "profile" && (
        <form onSubmit={handleProfileSave} className="admin-panel-card">
          <div className="admin-title-row">
            <h3 style={{ fontSize: "1.25rem", fontWeight: "700" }}>Edit Basic CV Details</h3>
            <button type="submit" className="btn btn-success btn-sm">
              <Save size={14} style={{ marginRight: "0.4rem" }} /> Save Profile
            </button>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
            <div className="form-group">
              <label>Full Name</label>
              <input 
                type="text" 
                className="form-control"
                value={profileForm.name} 
                onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                required 
              />
            </div>
            <div className="form-group">
              <label>Professional Title</label>
              <input 
                type="text" 
                className="form-control"
                value={profileForm.title} 
                onChange={(e) => setProfileForm({ ...profileForm, title: e.target.value })}
                required 
              />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input 
                type="email" 
                className="form-control"
                value={profileForm.email} 
                onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                required 
              />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input 
                type="text" 
                className="form-control"
                value={profileForm.phone} 
                onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                required 
              />
            </div>
            <div className="form-group" style={{ gridColumn: "span 2" }}>
              <label>Location</label>
              <input 
                type="text" 
                className="form-control"
                value={profileForm.location} 
                onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                required 
              />
            </div>
            <div className="form-group" style={{ gridColumn: "span 2" }}>
              <label>Biography Summary</label>
              <textarea 
                className="form-control"
                value={profileForm.bio} 
                onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                required 
              />
            </div>
          </div>

          <hr style={{ borderColor: "rgba(255,255,255,0.05)", margin: "2rem 0" }} />

          {/* SKILLS MANAGER */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2.5rem" }}>
            <div>
              <h4 style={{ fontSize: "1.05rem", fontWeight: "700", marginBottom: "1rem" }}>Modify Core Skills</h4>
              <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Add new skill (e.g. Solar panels)..."
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                />
                <button type="button" onClick={addSkill} className="btn btn-primary btn-sm">
                  <Plus size={16} />
                </button>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {profileForm.skills.map((skill, index) => (
                  <div key={index} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(255,255,255,0.02)", padding: "0.5rem 0.75rem", borderRadius: "0.25rem", border: "1px solid rgba(255,255,255,0.04)" }}>
                    <span style={{ fontSize: "0.9rem" }}>{skill}</span>
                    <button type="button" onClick={() => removeSkill(skill)} style={{ background: "transparent", border: "none", color: "var(--danger)", cursor: "pointer" }}>
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* CERTIFICATIONS MANAGER */}
            <div>
              <h4 style={{ fontSize: "1.05rem", fontWeight: "700", marginBottom: "1rem" }}>Modify Certifications</h4>
              <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
                <input 
                  type="text" 
                  className="form-control" 
                  placeholder="Add license / cert..."
                  value={newCert}
                  onChange={(e) => setNewCert(e.target.value)}
                />
                <button type="button" onClick={addCert} className="btn btn-primary btn-sm">
                  <Plus size={16} />
                </button>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {profileForm.certifications.map((cert, index) => (
                  <div key={index} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(255,255,255,0.02)", padding: "0.5rem 0.75rem", borderRadius: "0.25rem", border: "1px solid rgba(255,255,255,0.04)" }}>
                    <span style={{ fontSize: "0.9rem" }}>{cert}</span>
                    <button type="button" onClick={() => removeCert(cert)} style={{ background: "transparent", border: "none", color: "var(--danger)", cursor: "pointer" }}>
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </form>
      )}

      {/* VIEW: EXPERIENCES EDITOR */}
      {activeTab === "experiences" && (
        <div>
          {editingExpId === null ? (
            <div className="admin-panel-card">
              <div className="admin-title-row">
                <h3 style={{ fontSize: "1.25rem", fontWeight: "700" }}>Manage Work History</h3>
                <button type="button" onClick={startAddExperience} className="btn btn-primary btn-sm" style={{ gap: "0.4rem" }}>
                  <Plus size={14} /> Add Experience
                </button>
              </div>

              <div className="admin-items-list">
                {data.experiences.map((exp) => (
                  <div key={exp.id} className="admin-item-row">
                    <div className="admin-item-info">
                      <span className="admin-item-title">{exp.role}</span>
                      <span className="admin-item-subtitle">{exp.company} | {exp.timeline}</span>
                    </div>
                    <div className="admin-item-actions">
                      <button onClick={() => startEditExperience(exp)} className="btn btn-secondary btn-sm" style={{ padding: "0.4rem 0.75rem" }}>
                        <Edit size={14} />
                      </button>
                      <button onClick={() => handleDeleteExperience(exp.id)} className="btn btn-danger btn-sm" style={{ padding: "0.4rem 0.75rem" }}>
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            // EXPERIENCE EDITING FORM
            <div className="admin-panel-card">
              <div className="admin-title-row">
                <h3 style={{ fontSize: "1.25rem", fontWeight: "700" }}>
                  {editingExpId === "new" ? "Add Work Experience" : "Edit Work Experience"}
                </h3>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button type="button" onClick={handleExperienceSave} className="btn btn-success btn-sm">
                    <Save size={14} style={{ marginRight: "0.4rem" }} /> Save
                  </button>
                  <button type="button" onClick={() => setEditingExpId(null)} className="btn btn-secondary btn-sm">
                    <X size={14} style={{ marginRight: "0.4rem" }} /> Cancel
                  </button>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
                <div className="form-group">
                  <label>Company / Organization</label>
                  <input 
                    type="text" 
                    className="form-control"
                    placeholder="e.g. Onomo Hotel"
                    value={expForm.company || ""} 
                    onChange={(e) => setExpForm({ ...expForm, company: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Job Title</label>
                  <input 
                    type="text" 
                    className="form-control"
                    placeholder="e.g. Lead Maintenance Electrician"
                    value={expForm.role || ""} 
                    onChange={(e) => setExpForm({ ...expForm, role: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Logo Abbreviation (2-3 chars)</label>
                  <input 
                    type="text" 
                    className="form-control"
                    maxLength={3}
                    placeholder="e.g. REG"
                    value={expForm.logoText || ""} 
                    onChange={(e) => setExpForm({ ...expForm, logoText: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Timeline Period</label>
                  <input 
                    type="text" 
                    className="form-control"
                    placeholder="e.g. 2021 - 2023"
                    value={expForm.timeline || ""} 
                    onChange={(e) => setExpForm({ ...expForm, timeline: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Location</label>
                  <input 
                    type="text" 
                    className="form-control"
                    placeholder="e.g. Kigali, Rwanda"
                    value={expForm.location || ""} 
                    onChange={(e) => setExpForm({ ...expForm, location: e.target.value })}
                  />
                </div>
              </div>

              <hr style={{ borderColor: "rgba(255,255,255,0.05)", margin: "2rem 0" }} />

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2.5rem" }}>
                {/* Description bullet list */}
                <div>
                  <label style={{ fontSize: "0.9rem", fontWeight: "600", color: "var(--text-secondary)", display: "block", marginBottom: "0.5rem" }}>
                    Job Duties & Achievements (Bullets)
                  </label>
                  <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="Add duty description..."
                      value={newBullet}
                      onChange={(e) => setNewBullet(e.target.value)}
                    />
                    <button type="button" onClick={addDescriptionBullet} className="btn btn-primary btn-sm">
                      <Plus size={16} />
                    </button>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    {(expForm.description || []).map((bullet, index) => (
                      <div key={index} style={{ display: "flex", gap: "0.5rem", alignItems: "flex-start", background: "rgba(255,255,255,0.02)", padding: "0.5rem 0.75rem", borderRadius: "0.25rem" }}>
                        <span style={{ fontSize: "0.85rem", flexGrow: 1 }}>{bullet}</span>
                        <button type="button" onClick={() => removeDescriptionBullet(index)} style={{ background: "transparent", border: "none", color: "var(--danger)", cursor: "pointer", flexShrink: 0 }}>
                          <Trash2 size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Major Projects Highlights */}
                <div>
                  <label style={{ fontSize: "0.9rem", fontWeight: "600", color: "var(--text-secondary)", display: "block", marginBottom: "0.5rem" }}>
                    Project Tags (Key Highlights)
                  </label>
                  <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="Add key project tag..."
                      value={newHighlight}
                      onChange={(e) => setNewHighlight(e.target.value)}
                    />
                    <button type="button" onClick={addExpHighlight} className="btn btn-primary btn-sm">
                      <Plus size={16} />
                    </button>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    {(expForm.keyProjects || []).map((projName, index) => (
                      <div key={index} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(255,255,255,0.02)", padding: "0.5rem 0.75rem", borderRadius: "0.25rem" }}>
                        <span style={{ fontSize: "0.85rem" }}>{projName}</span>
                        <button type="button" onClick={() => removeExpHighlight(index)} style={{ background: "transparent", border: "none", color: "var(--danger)", cursor: "pointer" }}>
                          <Trash2 size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* VIEW: PROJECTS EDITOR */}
      {activeTab === "projects" && (
        <div>
          {editingProjId === null ? (
            <div className="admin-panel-card">
              <div className="admin-title-row">
                <h3 style={{ fontSize: "1.25rem", fontWeight: "700" }}>Manage Activities & Projects</h3>
                <button type="button" onClick={startAddProject} className="btn btn-primary btn-sm" style={{ gap: "0.4rem" }}>
                  <Plus size={14} /> Add Project
                </button>
              </div>

              <div className="admin-items-list">
                {data.projects.map((proj) => (
                  <div key={proj.id} className="admin-item-row">
                    <div className="admin-item-info">
                      <span className="admin-item-title">{proj.title}</span>
                      <span className="admin-item-subtitle">{proj.category} | Schematic: {proj.imageUrl}</span>
                    </div>
                    <div className="admin-item-actions">
                      <button onClick={() => startEditProject(proj)} className="btn btn-secondary btn-sm" style={{ padding: "0.4rem 0.75rem" }}>
                        <Edit size={14} />
                      </button>
                      <button onClick={() => handleDeleteProject(proj.id)} className="btn btn-danger btn-sm" style={{ padding: "0.4rem 0.75rem" }}>
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            // PROJECT EDITING FORM
            <div className="admin-panel-card">
              <div className="admin-title-row">
                <h3 style={{ fontSize: "1.25rem", fontWeight: "700" }}>
                  {editingProjId === "new" ? "Add Portfolio Activity" : "Edit Portfolio Activity"}
                </h3>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <button type="button" onClick={handleProjectSave} className="btn btn-success btn-sm">
                    <Save size={14} style={{ marginRight: "0.4rem" }} /> Save
                  </button>
                  <button type="button" onClick={() => setEditingProjId(null)} className="btn btn-secondary btn-sm">
                    <X size={14} style={{ marginRight: "0.4rem" }} /> Cancel
                  </button>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
                <div className="form-group" style={{ gridColumn: "span 2" }}>
                  <label>Project / Activity Title</label>
                  <input 
                    type="text" 
                    className="form-control"
                    placeholder="e.g. Substation Switchgear Upgrade"
                    value={projForm.title || ""} 
                    onChange={(e) => setProjForm({ ...projForm, title: e.target.value })}
                  />
                </div>
                <div className="form-group" style={{ gridColumn: "span 2" }}>
                  <label>Description Details</label>
                  <textarea 
                    className="form-control"
                    placeholder="Provide a description of your electrical work, standards met, and scope..."
                    value={projForm.description || ""} 
                    onChange={(e) => setProjForm({ ...projForm, description: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Category</label>
                  <select 
                    className="form-control"
                    value={projForm.category}
                    onChange={(e) => setProjForm({ ...projForm, category: e.target.value as any })}
                  >
                    <option value="Grid Operations">Grid Operations (REG Style)</option>
                    <option value="Hotel Maintenance">Hotel Maintenance (Onomo Style)</option>
                    <option value="Commercial & Kitchen">Commercial & Kitchen (Azzurri Style)</option>
                    <option value="Safety & Custom">Safety & Custom (La Creola Style)</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Schematic Illustration Style</label>
                  <select 
                    className="form-control"
                    value={projForm.imageUrl}
                    onChange={(e) => setProjForm({ ...projForm, imageUrl: e.target.value })}
                  >
                    <option value="grid">Grid (Substation Tower & Wave)</option>
                    <option value="hotel">Hotel (Analog Meter & Controls)</option>
                    <option value="kitchen">Kitchen (3-Phase Busbar Layout)</option>
                    <option value="safety">Safety (Circuit Breaker Board Panel)</option>
                  </select>
                </div>
              </div>

              <hr style={{ borderColor: "rgba(255,255,255,0.05)", margin: "2rem 0" }} />

              {/* Project Highlights (Tasks) */}
              <div>
                <label style={{ fontSize: "0.9rem", fontWeight: "600", color: "var(--text-secondary)", display: "block", marginBottom: "0.5rem" }}>
                  Project Accomplishments (Highlights List)
                </label>
                <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="e.g. Tested tripping speeds under 50ms..."
                    value={newProjHighlight}
                    onChange={(e) => setNewProjHighlight(e.target.value)}
                  />
                  <button type="button" onClick={addProjHighlight} className="btn btn-primary btn-sm">
                    <Plus size={16} />
                  </button>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", maxWidth: "500px" }}>
                  {(projForm.highlights || []).map((hl, index) => (
                    <div key={index} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(255,255,255,0.02)", padding: "0.5rem 0.75rem", borderRadius: "0.25rem" }}>
                      <span style={{ fontSize: "0.85rem" }}>{hl}</span>
                      <button type="button" onClick={() => removeProjHighlight(index)} style={{ background: "transparent", border: "none", color: "var(--danger)", cursor: "pointer" }}>
                        <Trash2 size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
