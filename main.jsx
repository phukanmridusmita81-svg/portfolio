import React, { useState } from 'react';
import './Skills.css';

const skillCategories = [
  {
    title: 'Backend',
    emoji: '⚙️',
    skills: [
      { name: 'Java', level: 90 },
      { name: 'Spring Boot', level: 82 },
      { name: 'Spring MVC', level: 78 },
      { name: 'Spring Security', level: 70 },
      { name: 'Hibernate / JPA', level: 75 },
      { name: 'REST APIs', level: 85 },
    ],
  },
  {
    title: 'Frontend',
    emoji: '🎨',
    skills: [
      { name: 'React.js', level: 80 },
      { name: 'HTML5 / CSS3', level: 88 },
      { name: 'JavaScript (ES6+)', level: 78 },
      { name: 'Tailwind CSS', level: 72 },
      
    ],
  },
  {
    title: 'Database & DevOps',
    emoji: '🗄️',
    skills: [
      { name: 'MySQL', level: 82 },
      { name: 'Docker', level: 62 },
      { name: 'Git & GitHub', level: 85 },
      { name: 'Maven', level: 75 },
    ],
  },
  {
    title: 'Tools & Others',
    emoji: '🛠️',
    skills: [
      { name: 'IntelliJ IDEA', level: 90 },
      { name: 'VS Code', level: 85 },
      { name: 'Postman', level: 80 },
      { name: 'Linux', level: 65 },
    ],
  },
];

export default function Skills() {
  const [activeTab, setActiveTab] = useState(0);
  const cat = skillCategories[activeTab];

  return (
    <section id="skills" className="skills">
      <div className="container">
        <div className="skills__header">
          <p className="skills__label gradient-text">WHAT I KNOW</p>
          <h2 className="section-title">My <span className="gradient-text">Skills</span></h2>
          <p className="section-subtitle">Technologies and tools I work with</p>
        </div>

        <div className="skills__tabs">
          {skillCategories.map((c, i) => (
            <button
              key={i}
              className={`skills__tab ${activeTab === i ? 'skills__tab--active' : ''}`}
              onClick={() => setActiveTab(i)}
            >
              <span>{c.emoji}</span> {c.title}
            </button>
          ))}
        </div>

        <div className="skills__content card">
          <h3 className="skills__cat-title">{cat.emoji} {cat.title}</h3>
          <div className="skills__list">
            {cat.skills.map((skill, i) => (
              <div key={skill.name} className="skill-item" style={{ animationDelay: `${i * 0.07}s` }}>
                <div className="skill-item__header">
                  <span className="skill-item__name">{skill.name}</span>
                  <span className="skill-item__level">{skill.level}%</span>
                </div>
                <div className="skill-item__bar">
                  <div
                    className="skill-item__fill"
                    style={{ '--target-width': `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}