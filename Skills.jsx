import React, { useState, useEffect } from 'react';
import { ExternalLink, Github, FolderOpen } from 'lucide-react';
import { loadPortfolioData } from '../portfoliodata';
import './Projects.css';

/*
  Projects are now managed from the Admin Panel.
  Go to /admin in your browser to add, edit or delete projects.
  No code editing needed!
*/

export default function Projects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const data = loadPortfolioData();
    setProjects(data.projects);
  }, []);

  return (
    <section id="projects" className="projects">
      <div className="container">
        <div className="projects__header">
          <p className="projects__label gradient-text">WHAT I'VE BUILT</p>
          <h2 className="section-title">My <span className="gradient-text">Projects</span></h2>
          <p className="section-subtitle">
            Things I've built and shipped — more coming soon!
          </p>
        </div>

        {projects.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 2rem', color: 'var(--text-muted)' }}>
            <FolderOpen size={40} style={{ margin: '0 auto 1rem', display: 'block' }} />
            <p>No projects yet. Add them from the Admin Panel!</p>
          </div>
        ) : (
          <div className={`projects__grid projects__grid--${projects.length === 1 ? 'single' : 'multi'}`}>
            {projects.map((proj) => (
              <div key={proj.id} className={`project-card card ${proj.featured ? 'project-card--featured' : ''}`}>
                <div className="project-card__top">
                  <div className="project-card__icon">
                    <span style={{ fontSize: '1.4rem' }}>{proj.emoji || '💻'}</span>
                  </div>
                  <div className="project-card__links">
                    {proj.githubUrl && proj.githubUrl !== '#' && (
                      <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="project-card__link" aria-label="GitHub">
                        <Github size={18} />
                      </a>
                    )}
                    {proj.liveUrl && proj.liveUrl !== '#' && (
                      <a href={proj.liveUrl} target="_blank" rel="noreferrer" className="project-card__link project-card__link--live" aria-label="Live Demo">
                        <ExternalLink size={18} />
                      </a>
                    )}
                  </div>
                </div>

                <h3 className="project-card__title">{proj.title}</h3>
                <p className="project-card__desc">{proj.description}</p>

                <div className="project-card__tags">
                  {(Array.isArray(proj.tags) ? proj.tags : (proj.tags || '').split(','))
                    .map(tag => tag.trim())
                    .filter(Boolean)
                    .map(tag => (
                      <span key={tag} className="project-card__tag">{tag}</span>
                    ))}
                </div>

                {proj.liveUrl && proj.liveUrl !== '#' && (
                  <a href={proj.liveUrl} target="_blank" rel="noreferrer" className="project-card__cta">
                    View Live Project <ExternalLink size={14} />
                  </a>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="projects__more">
          <p className="projects__more-text">More projects on the way — stay tuned! 🚀</p>
          <a href="https://github.com/phukanmridusmita81-svg" target="_blank" rel="noreferrer" className="btn-secondary">
            <Github size={16} /> View GitHub Profile
          </a>
        </div>
      </div>
    </section>
  );
}