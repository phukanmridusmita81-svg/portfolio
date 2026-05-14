import React from 'react';
import { GraduationCap, Award } from 'lucide-react';
import './Education.css';

/*
  =====================================================
  EDUCATION SECTION
  =====================================================
  Currently shows only University education (school section removed as requested).
  If you want to add more education entries (certifications, online courses),
  add them to the `otherEducation` array below.
  =====================================================
*/

const otherEducation = [
  // =====================================================
  // ADD CERTIFICATIONS / COURSES HERE:
  // Example:
  // {
  //   title: 'Full Stack Java Developer',
  //   issuer: 'Udemy / Coursera / etc.',
  //   year: '2024',
  //   icon: '🏅',
  // },
  // =====================================================
];

export default function Education() {
  return (
    <section id="education" className="education">
      <div className="container">
        <div className="education__header">
          <p className="education__label gradient-text">ACADEMIC BACKGROUND</p>
          <h2 className="section-title">My <span className="gradient-text">Education</span></h2>
          <p className="section-subtitle">Where I've been learning and growing</p>
        </div>

        <div className="education__main">
          {/* University Card */}
          <div className="edu-card card edu-card--main">
            <div className="edu-card__left">
              <div className="edu-card__icon">
                <GraduationCap size={30} />
              </div>
              <div className="edu-card__line" />
            </div>

            <div className="edu-card__content">
              <div className="edu-card__badge">B.Tech in Computer Science & Engineering</div>
              <h3 className="edu-card__title">KIIT University</h3>
              <p className="edu-card__subtitle">Bhubaneswar, Odisha, India</p>

              <div className="edu-card__meta">
                <span className="edu-card__year">📅 2023 – 2027</span>
                <span className="edu-card__cgpa">
                  <Award size={14} /> CGPA: <strong>8.42 / 10</strong>
                </span>
              </div>

              <p className="edu-card__desc">
                Pursuing a four-year undergraduate degree with a focus on software engineering, 
                data structures, algorithms, databases, and modern web technologies. 
                Actively involved in coding clubs and building real-world projects.
              </p>

              <div className="edu-card__highlights">
                <span className="edu-card__highlight">Data Structures & Algorithms</span>
                <span className="edu-card__highlight">Database Management</span>
                <span className="edu-card__highlight">Object-Oriented Programming</span>
                <span className="edu-card__highlight">Web Technologies</span>
                <span className="edu-card__highlight">Software Engineering</span>
                <span className="edu-card__highlight">Operating Systems</span>
              </div>
            </div>
          </div>

          {/* Certifications — shown if any are added */}
          {otherEducation.length > 0 && (
            <div className="edu-certs">
              <h3 className="edu-certs__title">Certifications & Courses</h3>
              <div className="edu-certs__grid">
                {otherEducation.map((item, i) => (
                  <div key={i} className="cert-card card">
                    <div className="cert-card__icon">{item.icon}</div>
                    <div className="cert-card__title">{item.title}</div>
                    <div className="cert-card__issuer">{item.issuer}</div>
                    <div className="cert-card__year">{item.year}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}