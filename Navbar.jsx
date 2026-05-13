import React, { useState, useEffect } from 'react';
import { Download, Eye, Github, Linkedin, Mail } from 'lucide-react';
import './Hero.css';
import { loadPortfolioData, getStats } from '../portfoliodata';

const roles = ['Java Developer', 'Full Stack Dev', 'Problem Solver', 'Open to Work'];

function AnimatedGirlAvatar() {
  return (
    <svg viewBox="0 0 300 350" xmlns="http://www.w3.org/2000/svg" className="hero__avatar-svg">
      <defs>
        <radialGradient id="skinGrad" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#f9c9a0" />
          <stop offset="100%" stopColor="#e8a87c" />
        </radialGradient>
        <radialGradient id="hairGrad" cx="50%" cy="0%" r="80%">
          <stop offset="0%" stopColor="#2d1b00" />
          <stop offset="100%" stopColor="#1a0a00" />
        </radialGradient>
        <linearGradient id="shirtGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      {/* Floating particles */}
      <circle cx="50" cy="80" r="3" fill="#7c3aed" opacity="0.6">
        <animate attributeName="cy" values="80;60;80" dur="3s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.6;1;0.6" dur="3s" repeatCount="indefinite"/>
      </circle>
      <circle cx="250" cy="120" r="2" fill="#ec4899" opacity="0.6">
        <animate attributeName="cy" values="120;100;120" dur="4s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.6;1;0.6" dur="4s" repeatCount="indefinite"/>
      </circle>
      <circle cx="270" cy="60" r="4" fill="#a78bfa" opacity="0.4">
        <animate attributeName="cy" values="60;40;60" dur="5s" repeatCount="indefinite"/>
      </circle>
      <circle cx="30" cy="200" r="2.5" fill="#f472b6" opacity="0.5">
        <animate attributeName="cy" values="200;180;200" dur="3.5s" repeatCount="indefinite"/>
      </circle>

      {/* Body floating animation wrapper */}
      <g>
        <animateTransform attributeName="transform" type="translate" values="0,0;0,-8;0,0" dur="4s" repeatCount="indefinite" additive="sum"/>

        {/* Shirt / body */}
        <ellipse cx="150" cy="300" rx="80" ry="60" fill="url(#shirtGrad)" />
        <rect x="85" y="240" width="130" height="80" rx="10" fill="url(#shirtGrad)" />

        {/* Arms */}
        <ellipse cx="85" cy="265" rx="20" ry="45" fill="url(#shirtGrad)" transform="rotate(-10 85 265)"/>
        <ellipse cx="215" cy="265" rx="20" ry="45" fill="url(#shirtGrad)" transform="rotate(10 215 265)"/>

        {/* Hands */}
        <ellipse cx="70" cy="305" rx="14" ry="10" fill="url(#skinGrad)"/>
        <ellipse cx="228" cy="305" rx="14" ry="10" fill="url(#skinGrad)"/>

        {/* Neck */}
        <rect x="133" y="195" width="34" height="35" rx="8" fill="url(#skinGrad)" />

        {/* Head */}
        <ellipse cx="150" cy="165" rx="65" ry="72" fill="url(#skinGrad)" />

        {/* Hair - back */}
        <ellipse cx="150" cy="130" rx="67" ry="60" fill="url(#hairGrad)" />

        {/* Hair - side waves */}
        <path d="M85 155 Q65 180 75 220 Q80 240 88 230 Q78 195 90 170Z" fill="url(#hairGrad)"/>
        <path d="M215 155 Q235 180 225 220 Q220 240 212 230 Q222 195 210 170Z" fill="url(#hairGrad)"/>

        {/* Hair top and flow */}
        <path d="M90 130 Q100 80 150 75 Q200 80 210 130 Q190 90 150 92 Q110 90 90 130Z" fill="url(#hairGrad)"/>
        
        {/* Hair flowing down back */}
        <path d="M88 155 Q70 200 80 260 Q84 275 90 265 Q82 210 95 165Z" fill="#1a0a00"/>
        <path d="M212 155 Q230 200 220 260 Q216 275 210 265 Q218 210 205 165Z" fill="#1a0a00"/>

        {/* Ears */}
        <ellipse cx="86" cy="167" rx="10" ry="13" fill="url(#skinGrad)"/>
        <ellipse cx="214" cy="167" rx="10" ry="13" fill="url(#skinGrad)"/>

        {/* Eyes */}
        <ellipse cx="128" cy="162" rx="13" ry="14" fill="white"/>
        <ellipse cx="172" cy="162" rx="13" ry="14" fill="white"/>
        <ellipse cx="130" cy="163" rx="8" ry="9" fill="#2d1b00"/>
        <ellipse cx="174" cy="163" rx="8" ry="9" fill="#2d1b00"/>
        <ellipse cx="132" cy="161" rx="3" ry="3" fill="#1a0a00"/>
        <ellipse cx="176" cy="161" rx="3" ry="3" fill="#1a0a00"/>
        {/* Eye shine */}
        <circle cx="134" cy="159" r="2" fill="white"/>
        <circle cx="178" cy="159" r="2" fill="white"/>

        {/* Eyebrows */}
        <path d="M116 147 Q128 140 140 145" stroke="#2d1b00" strokeWidth="3" fill="none" strokeLinecap="round"/>
        <path d="M160 145 Q172 140 184 147" stroke="#2d1b00" strokeWidth="3" fill="none" strokeLinecap="round"/>

        {/* Eyelashes */}
        <path d="M116 156 L113 150 M119 154 L116 148" stroke="#1a0a00" strokeWidth="1.5" fill="none"/>
        <path d="M184 156 L187 150 M181 154 L184 148" stroke="#1a0a00" strokeWidth="1.5" fill="none"/>

        {/* Nose */}
        <path d="M147 172 Q150 185 153 172" stroke="#c87941" strokeWidth="1.5" fill="none" strokeLinecap="round"/>

        {/* Smile */}
        <path d="M135 192 Q150 205 165 192" stroke="#c07040" strokeWidth="2.5" fill="none" strokeLinecap="round"/>

        {/* Blush */}
        <ellipse cx="112" cy="183" rx="14" ry="8" fill="#f4a0a0" opacity="0.35"/>
        <ellipse cx="188" cy="183" rx="14" ry="8" fill="#f4a0a0" opacity="0.35"/>

        {/* Laptop / code element in hands */}
        <rect x="88" y="295" width="124" height="78" rx="8" fill="#120f22" stroke="#7c3aed" strokeWidth="1.5"/>
        <rect x="94" y="301" width="112" height="60" rx="4" fill="#0d0a1a"/>
        {/* Code lines on laptop */}
        <text x="100" y="318" fontSize="7" fill="#ec4899" fontFamily="monospace">{'<code>'}</text>
        <text x="100" y="330" fontSize="7" fill="#a78bfa" fontFamily="monospace">{'  String dev'}</text>
        <text x="100" y="342" fontSize="7" fill="#f472b6" fontFamily="monospace">{'  = "Mridusmita";'}</text>
        <text x="100" y="354" fontSize="7" fill="#ec4899" fontFamily="monospace">{'</code>'}</text>
      </g>
    </svg>
  );
}

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [liveStats, setLiveStats] = useState({ years: '1+', projects: '1+', technologies: '10+' });

  useEffect(() => {
    const data = loadPortfolioData();
    setLiveStats(getStats(data));
  }, []);

  useEffect(() => {
    const current = roles[roleIndex];
    let timeout;

    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 50);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setRoleIndex((roleIndex + 1) % roles.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, roleIndex]);

  return (
    <section id="home" className="hero">
      <div className="container hero__container">
        <div className="hero__content">
          <div className="hero__badge animate-fade-up-delay-1">
            <span className="hero__badge-dot"></span>
            <span>Open to Work</span>
          </div>

          <h1 className="hero__name animate-fade-up-delay-2">
            Hi, I'm <span className="gradient-text">Mridusmita</span><br />
            <span className="gradient-text">Phukan</span>
          </h1>

          <div className="hero__role animate-fade-up-delay-3">
            <span>{displayed}</span>
            <span className="hero__cursor">|</span>
          </div>

          <p className="hero__bio animate-fade-up-delay-3">
            A passionate Full Stack Java Developer from <strong>North Lakhimpur, Assam</strong>, 
            building robust and elegant web applications with Spring Boot and React. 
            I love turning complex problems into clean, scalable solutions — one commit at a time.
          </p>

          <div className="hero__tags animate-fade-up-delay-4">
            {['☕ Java', '🌿 Spring Boot', '⚛️ React', '🗄️ MySQL', '🐳 Docker'].map(tag => (
              <span key={tag} className="hero__tag">{tag}</span>
            ))}
          </div>

          <div className="hero__actions animate-fade-up-delay-5">
            <a href="#projects" className="btn-primary" onClick={e => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({behavior:'smooth'}); }}>
              <Eye size={16} /> View My Work
            </a>
            {/*
              =====================================================
              RESUME LINK — Add your resume PDF path/URL here:
              Replace "YOUR_RESUME_URL_HERE" with:
              - A Google Drive shareable link, OR
              - A path like /resume.pdf (place resume.pdf in the public/ folder)
              =====================================================
            */}
            <a href="https://drive.google.com/file/d/1MtbCojJKuHOg8WIvaEOqs2xelz_d2EHQ/view?usp=drive_link" download className="btn-secondary">
              <Download size={16} /> Download CV
            </a>
          </div>

          <div className="hero__socials animate-fade-up-delay-5">
            <a href="https://github.com/phukanmridusmita81-svg" target="_blank" rel="noreferrer" className="hero__social-link" aria-label="GitHub">
              <Github size={20} />
            </a>
            <a href="https://www.linkedin.com/in/mridusmita-phukan-83a4832b3" target="_blank" rel="noreferrer" className="hero__social-link" aria-label="LinkedIn">
              <Linkedin size={20} />
            </a>
            <a href="mailto:phukanmridusmita81@gmail.com" className="hero__social-link" aria-label="Email">
              <Mail size={20} />
            </a>
          </div>
        </div>

        <div className="hero__visual animate-fade-up-delay-2">
          <div className="hero__avatar-ring">
            <AnimatedGirlAvatar />
          </div>
          <div className="hero__stats">
            <div className="hero__stat">
              <span className="hero__stat-num">{liveStats.years}</span>
              <span className="hero__stat-label">Years Coding</span>
            </div>
            <div className="hero__stat">
              <span className="hero__stat-num">{liveStats.projects}</span>
              <span className="hero__stat-label">Projects</span>
            </div>
            <div className="hero__stat">
              <span className="hero__stat-num">{liveStats.technologies}</span>
              <span className="hero__stat-label">Technologies</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}