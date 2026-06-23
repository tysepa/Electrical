import React from "react";
import type { Experience } from "../data";
import { Briefcase, Calendar, MapPin } from "lucide-react";

interface ExperienceCardProps {
  experience: Experience;
}

export const ExperienceCard: React.FC<ExperienceCardProps> = ({ experience }) => {
  return (
    <div className="timeline-item">
      <div className="timeline-logo">
        {experience.logoText}
      </div>
      <div className="timeline-content">
        <div className="timeline-header">
          <div>
            <h3 className="role-title">{experience.role}</h3>
            <div className="company-name">
              <Briefcase size={16} />
              <span>{experience.company}</span>
            </div>
          </div>
          <div className="exp-date">
            <Calendar size={14} />
            <span>{experience.timeline}</span>
          </div>
        </div>

        <div className="meta-item" style={{ marginBottom: "1rem", fontSize: "0.85rem" }}>
          <MapPin size={14} />
          <span>{experience.location}</span>
        </div>

        <ul className="exp-desc">
          {experience.description.map((bullet, index) => (
            <li key={index}>{bullet}</li>
          ))}
        </ul>

        {experience.keyProjects && experience.keyProjects.length > 0 && (
          <div>
            <div className="exp-projects-label">Key Highlights & Installations</div>
            <div className="exp-projects-list">
              {experience.keyProjects.map((project, index) => (
                <span key={index} className="exp-project-badge">
                  {project}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
