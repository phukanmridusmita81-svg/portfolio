import React from 'react';
import { MapPin, GraduationCap, Heart, Coffee } from 'lucide-react';
import './About.css';

const facts = [
  { icon: <MapPin size={18}/>, label: 'Location', value: 'North Lakhimpur, Assam, India' },
  { icon: <GraduationCap size={18}/>, label: 'University', value: 'KIIT University, Bhubaneswar' },
  { icon: <Heart size={18}/>, label: 'Interests', value: 'Open Source · UI Design · Problem Solving' },
  { icon: <Coffee size={18}/>, label: 'Fun Fact', value: 'Codes better after chai ☕' },
];

export default function About() {
  return (
    <section id="about" className="about">
      <div className="container">
        <div className="about__header">
          <p className="about__label gradient-text">GET TO KNOW ME</p>
          <h2 className="section-title">About <span className="gradient-text">Me</span></h2>
          <p className="section-subtitle">A little bit about who I am and what drives me</p>
        </div>

        <div className="about__grid">
          <div className="about__text">
            <p>
              Hey there! I'm <strong>Mridusmita Phukan</strong>, a Computer Science student at 
              KIIT University with a deep passion for full-stack Java development. I love building 
              things that live on the internet — from sleek user interfaces to powerful backend APIs.
            </p>
            <p>
              Hailing from the beautiful northeast of India, I bring a curious mind and a 
              relentless drive to every project I work on. Whether it's architecting a Spring Boot 
              microservice or crafting a pixel-perfect React UI, I care deeply about both 
              functionality and aesthetics.
            </p>
            <p>
              I'm currently a student looking for opportunities to grow, contribute to meaningful 
              projects, and collaborate with amazing teams. When I'm not coding, I'm probably 
              exploring new technologies, contributing to open source, or enjoying the greenery of Assam.
            </p>
            <div className="about__actions">
              <a href="mailto:phukanmridusmita81@gmail.com" className="btn-primary">
                Get In Touch
              </a>
            </div>
          </div>

          <div className="about__facts">
            {facts.map((fact, i) => (
              <div key={i} className="about__fact card">
                <div className="about__fact-icon">{fact.icon}</div>
                <div>
                  <div className="about__fact-label">{fact.label}</div>
                  <div className="about__fact-value">{fact.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}