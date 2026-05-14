import React, { useState } from 'react';
import { Mail, Github, Linkedin, Send, MapPin, MessageCircle } from 'lucide-react';
import './Contact.css';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Opens the user's mail client with pre-filled details
    const subject = encodeURIComponent(`Portfolio Contact from ${form.name}`);
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`);
    window.location.href = `mailto:phukanmridusmita81@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="contact__header">
          <p className="contact__label gradient-text">GET IN TOUCH</p>
          <h2 className="section-title">Contact <span className="gradient-text">Me</span></h2>
          <p className="section-subtitle">Have a project in mind or want to collaborate? I'd love to hear from you!</p>
        </div>

        <div className="contact__grid">
          <div className="contact__info">
            <h3 className="contact__info-title">Let's work together</h3>
            <p className="contact__info-text">
              I'm currently open to internship opportunities, freelance projects, 
              and collaborations. Whether you have a question or just want to say hi — 
              my inbox is always open!
            </p>

            <div className="contact__links">
              <a href="mailto:phukanmridusmita81@gmail.com" className="contact__link card">
                <div className="contact__link-icon"><Mail size={20} /></div>
                <div>
                  <div className="contact__link-label">Email</div>
                  <div className="contact__link-value">phukanmridusmita81@gmail.com</div>
                </div>
              </a>
              <a href="https://github.com/phukanmridusmita81-svg" target="_blank" rel="noreferrer" className="contact__link card">
                <div className="contact__link-icon"><Github size={20} /></div>
                <div>
                  <div className="contact__link-label">GitHub</div>
                  <div className="contact__link-value">github.com/phukanmridusmita81</div>
                </div>
              </a>
              <a href="https://www.linkedin.com/in/mridusmita-phukan-83a4832b3" target="_blank" rel="noreferrer" className="contact__link card">
                <div className="contact__link-icon"><Linkedin size={20} /></div>
                <div>
                  <div className="contact__link-label">LinkedIn</div>
                  <div className="contact__link-value">Mridusmita Phukan</div>
                </div>
              </a>
              <div className="contact__link card contact__link--static">
                <div className="contact__link-icon"><MapPin size={20} /></div>
                <div>
                  <div className="contact__link-label">Location</div>
                  <div className="contact__link-value">North Lakhimpur, Assam, India</div>
                </div>
              </div>
            </div>
          </div>

          <div className="contact__form-wrap card">
            <div className="contact__form-header">
              <MessageCircle size={20} />
              <span>Send a Message</span>
            </div>
            <form className="contact__form" onSubmit={handleSubmit}>
              <div className="contact__field">
                <label htmlFor="name">Your Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Jane Doe"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="contact__field">
                <label htmlFor="email">Your Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="jane@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="contact__field">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Hey Mridusmita, I'd love to talk about..."
                  value={form.message}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className={`btn-primary contact__submit ${sent ? 'contact__submit--sent' : ''}`}>
                {sent ? '✓ Opening mail app...' : <><Send size={16} /> Send Message</>}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="contact__footer">
        <div className="container">
          <p>Made with ❤️ by <span className="gradient-text">Mridusmita Phukan</span> · {new Date().getFullYear()}</p>
        </div>
      </div>
    </section>
  );
}