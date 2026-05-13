import React, { useState, useEffect } from 'react';
import {
  Lock, Plus, Trash2, Edit3, Save, X, Eye, EyeOff,
  LogOut, Settings, FolderOpen, BarChart2, CheckCircle, AlertCircle
} from 'lucide-react';
import {
  loadPortfolioData, savePortfolioData, getStats, ADMIN_PASSWORD
} from '../portfoliodata';
import './Admin.css';

const EMOJIS = ['🛒','🚀','💻','🔐','📱','🌐','🎮','📊','🤖','🔧','📝','🎨','⚡','🗄️','🔬'];

function Toast({ message, type, onClose }) {
  useEffect(() => { const t = setTimeout(onClose, 3000); return () => clearTimeout(t); }, [onClose]);
  return (
    <div className={`admin-toast admin-toast--${type}`}>
      {type === 'success' ? <CheckCircle size={16}/> : <AlertCircle size={16}/>}
      {message}
    </div>
  );
}

function EmptyProject() {
  return {
    id: Date.now(),
    title: '',
    description: '',
    tags: '',
    liveUrl: '',
    githubUrl: '',
    emoji: '🚀',
    featured: false,
    dateAdded: new Date().toISOString(),
  };
}

export default function Admin() {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [pwError, setPwError] = useState(false);
  const [data, setData] = useState(null);
  const [activeTab, setActiveTab] = useState('projects');
  const [editingProject, setEditingProject] = useState(null);
  const [isNew, setIsNew] = useState(false);
  const [toast, setToast] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    if (authed) setData(loadPortfolioData());
  }, [authed]);

  function login(e) {
    e.preventDefault();
    if (pw === ADMIN_PASSWORD) {
      setAuthed(true);
      setPwError(false);
    } else {
      setPwError(true);
      setPw('');
    }
  }

  function showToast(message, type = 'success') {
    setToast({ message, type });
  }

  function saveData(newData) {
    const ok = savePortfolioData(newData);
    setData(newData);
    if (ok) showToast('Saved successfully! Refresh portfolio to see changes.', 'success');
    else showToast('Save failed — check browser storage.', 'error');
  }

  // Projects
  function addProject() {
    setEditingProject(EmptyProject());
    setIsNew(true);
  }

  function editProject(proj) {
    setEditingProject({ ...proj, tags: Array.isArray(proj.tags) ? proj.tags.join(', ') : proj.tags });
    setIsNew(false);
  }

  function saveProject() {
    if (!editingProject.title.trim()) { showToast('Project title is required', 'error'); return; }
    const processed = {
      ...editingProject,
      tags: typeof editingProject.tags === 'string'
        ? editingProject.tags.split(',').map(t => t.trim()).filter(Boolean)
        : editingProject.tags,
    };
    const projects = isNew
      ? [...data.projects, processed]
      : data.projects.map(p => p.id === processed.id ? processed : p);
    saveData({ ...data, projects });
    setEditingProject(null);
  }

  function deleteProject(id) {
    const projects = data.projects.filter(p => p.id !== id);
    saveData({ ...data, projects });
    setDeleteConfirm(null);
    showToast('Project deleted.', 'success');
  }

  function toggleFeatured(id) {
    const projects = data.projects.map(p =>
      p.id === id ? { ...p, featured: !p.featured } : p
    );
    saveData({ ...data, projects });
  }

  // Stats
  function updateStats(field, value) {
    saveData({ ...data, stats: { ...data.stats, [field]: Number(value) } });
  }

  // ─── Login Screen ───
  if (!authed) {
    return (
      <div className="admin-login">
        <div className="admin-login__card">
          <div className="admin-login__icon"><Lock size={28} /></div>
          <h1 className="admin-login__title">Admin Panel</h1>
          <p className="admin-login__sub">Mridusmita Phukan · Portfolio Manager</p>
          <form onSubmit={login} className="admin-login__form">
            <div className="admin-login__field">
              <input
                type={showPw ? 'text' : 'password'}
                value={pw}
                onChange={e => { setPw(e.target.value); setPwError(false); }}
                placeholder="Enter admin password"
                className={pwError ? 'admin-input--error' : ''}
                autoFocus
              />
              <button type="button" className="admin-login__eye" onClick={() => setShowPw(!showPw)}>
                {showPw ? <EyeOff size={16}/> : <Eye size={16}/>}
              </button>
            </div>
            {pwError && <p className="admin-login__error">Incorrect password. Try again.</p>}
            <button type="submit" className="btn-primary admin-login__btn">
              <Lock size={16} /> Unlock Panel
            </button>
          </form>
          <p className="admin-login__hint">
        
          </p>
        </div>
      </div>
    );
  }

  if (!data) return <div className="admin-loading">Loading...</div>;

  const stats = getStats(data);

  // ─── Main Dashboard ───
  return (
    <div className="admin">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      {/* Header */}
      <div className="admin__header">
        <div className="admin__header-left">
          <div className="admin__logo"><Settings size={20}/></div>
          <div>
            <h1 className="admin__title">Portfolio Admin</h1>
            <p className="admin__subtitle">Manage your projects and stats</p>
          </div>
        </div>
        <div className="admin__header-right">
          <a href="/" className="btn-secondary admin__view-btn">
            <Eye size={14}/> View Portfolio
          </a>
          <button className="btn-secondary" onClick={() => setAuthed(false)}>
            <LogOut size={14}/> Log Out
          </button>
        </div>
      </div>

      {/* Live Stats Banner */}
      <div className="admin__stats">
        <div className="admin__stat-card">
          <span className="admin__stat-num gradient-text">{stats.years}</span>
          <span className="admin__stat-label">Years Coding</span>
          <span className="admin__stat-note">Auto from start year</span>
        </div>
        <div className="admin__stat-card">
          <span className="admin__stat-num gradient-text">{stats.projects}</span>
          <span className="admin__stat-label">Projects</span>
          <span className="admin__stat-note">Auto-counts your projects</span>
        </div>
        <div className="admin__stat-card">
          <span className="admin__stat-num gradient-text">{stats.technologies}</span>
          <span className="admin__stat-label">Technologies</span>
          <span className="admin__stat-note">Set manually below</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="admin__tabs">
        <button
          className={`admin__tab ${activeTab === 'projects' ? 'admin__tab--active' : ''}`}
          onClick={() => setActiveTab('projects')}
        >
          <FolderOpen size={16}/> Projects ({data.projects.length})
        </button>
        <button
          className={`admin__tab ${activeTab === 'stats' ? 'admin__tab--active' : ''}`}
          onClick={() => setActiveTab('stats')}
        >
          <BarChart2 size={16}/> Stats & Settings
        </button>
      </div>

      {/* ─── Projects Tab ─── */}
      {activeTab === 'projects' && (
        <div className="admin__panel">
          <div className="admin__panel-header">
            <h2 className="admin__panel-title">Your Projects</h2>
            <button className="btn-primary" onClick={addProject}>
              <Plus size={16}/> Add New Project
            </button>
          </div>

          {/* Project Form Modal */}
          {editingProject && (
            <div className="admin__modal-backdrop">
              <div className="admin__modal card">
                <div className="admin__modal-header">
                  <h3>{isNew ? 'Add New Project' : 'Edit Project'}</h3>
                  <button onClick={() => setEditingProject(null)} className="admin__modal-close">
                    <X size={18}/>
                  </button>
                </div>

                <div className="admin__form">
                  {/* Emoji picker */}
                  <div className="admin__form-group">
                    <label>Emoji Icon</label>
                    <div className="admin__emoji-grid">
                      {EMOJIS.map(e => (
                        <button
                          key={e}
                          className={`admin__emoji-btn ${editingProject.emoji === e ? 'admin__emoji-btn--active' : ''}`}
                          onClick={() => setEditingProject({...editingProject, emoji: e})}
                        >{e}</button>
                      ))}
                    </div>
                  </div>

                  <div className="admin__form-row">
                    <div className="admin__form-group">
                      <label>Project Title *</label>
                      <input
                        type="text"
                        value={editingProject.title}
                        onChange={e => setEditingProject({...editingProject, title: e.target.value})}
                        placeholder="My Awesome Project"
                      />
                    </div>
                    <div className="admin__form-group admin__form-group--small">
                      <label>Featured</label>
                      <label className="admin__toggle">
                        <input
                          type="checkbox"
                          checked={editingProject.featured}
                          onChange={e => setEditingProject({...editingProject, featured: e.target.checked})}
                        />
                        <span className="admin__toggle-slider"/>
                      </label>
                    </div>
                  </div>

                  <div className="admin__form-group">
                    <label>Description</label>
                    <textarea
                      rows={3}
                      value={editingProject.description}
                      onChange={e => setEditingProject({...editingProject, description: e.target.value})}
                      placeholder="What does this project do? What problem does it solve?"
                    />
                  </div>

                  <div className="admin__form-group">
                    <label>Tech Tags <span className="admin__form-hint">(comma separated)</span></label>
                    <input
                      type="text"
                      value={editingProject.tags}
                      onChange={e => setEditingProject({...editingProject, tags: e.target.value})}
                      placeholder="React, Java, Spring Boot, MySQL"
                    />
                  </div>

                  <div className="admin__form-row">
                    <div className="admin__form-group">
                      <label>Live URL</label>
                      <input
                        type="url"
                        value={editingProject.liveUrl}
                        onChange={e => setEditingProject({...editingProject, liveUrl: e.target.value})}
                        placeholder="https://myproject.netlify.app"
                      />
                    </div>
                    <div className="admin__form-group">
                      <label>GitHub URL</label>
                      <input
                        type="url"
                        value={editingProject.githubUrl}
                        onChange={e => setEditingProject({...editingProject, githubUrl: e.target.value})}
                        placeholder="https://github.com/phukanmridusmita81/repo"
                      />
                    </div>
                  </div>

                  <div className="admin__modal-actions">
                    <button className="btn-secondary" onClick={() => setEditingProject(null)}>Cancel</button>
                    <button className="btn-primary" onClick={saveProject}>
                      <Save size={16}/> Save Project
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Delete confirm */}
          {deleteConfirm && (
            <div className="admin__modal-backdrop">
              <div className="admin__modal admin__modal--small card">
                <h3>Delete Project?</h3>
                <p>This will remove <strong>{deleteConfirm.title}</strong> from your portfolio. This cannot be undone.</p>
                <div className="admin__modal-actions">
                  <button className="btn-secondary" onClick={() => setDeleteConfirm(null)}>Cancel</button>
                  <button className="admin__btn-danger" onClick={() => deleteProject(deleteConfirm.id)}>
                    <Trash2 size={14}/> Delete
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Projects list */}
          {data.projects.length === 0 ? (
            <div className="admin__empty">
              <FolderOpen size={40}/>
              <p>No projects yet. Click "Add New Project" to get started!</p>
            </div>
          ) : (
            <div className="admin__project-list">
              {data.projects.map(proj => (
                <div key={proj.id} className="admin__project-item card">
                  <div className="admin__project-emoji">{proj.emoji}</div>
                  <div className="admin__project-info">
                    <div className="admin__project-name">
                      {proj.title}
                      {proj.featured && <span className="admin__badge admin__badge--featured">Featured</span>}
                    </div>
                    <div className="admin__project-desc">{proj.description?.slice(0, 100)}...</div>
                    <div className="admin__project-tags">
                      {(Array.isArray(proj.tags) ? proj.tags : proj.tags?.split(',') || []).map(t => (
                        <span key={t} className="admin__tag">{t.trim()}</span>
                      ))}
                    </div>
                  </div>
                  <div className="admin__project-actions">
                    <button
                      className="admin__icon-btn admin__icon-btn--star"
                      onClick={() => toggleFeatured(proj.id)}
                      title={proj.featured ? 'Remove featured' : 'Mark as featured'}
                    >⭐</button>
                    <button className="admin__icon-btn" onClick={() => editProject(proj)} title="Edit">
                      <Edit3 size={15}/>
                    </button>
                    <button className="admin__icon-btn admin__icon-btn--danger" onClick={() => setDeleteConfirm(proj)} title="Delete">
                      <Trash2 size={15}/>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ─── Stats Tab ─── */}
      {activeTab === 'stats' && (
        <div className="admin__panel">
          <h2 className="admin__panel-title">Stats & Settings</h2>
          <p className="admin__panel-desc">
            These numbers appear in the Hero section of your portfolio. 
            <strong> Years Coding auto-calculates</strong> from your start year every year. 
            Project count <strong>auto-updates</strong> when you add/remove projects.
          </p>

          <div className="admin__settings-grid">
            <div className="admin__setting-card card">
              <div className="admin__setting-icon">📅</div>
              <h3 className="admin__setting-title">Year You Started Coding</h3>
              <p className="admin__setting-desc">
                The "Years Coding" stat will auto-calculate from this year every time someone visits.
                Currently showing: <strong className="gradient-text">{stats.years} years</strong>
              </p>
              <div className="admin__setting-input-row">
                <input
                  type="number"
                  min="2000"
                  max={new Date().getFullYear()}
                  value={data.stats.startYear}
                  onChange={e => updateStats('startYear', e.target.value)}
                />
                <span className="admin__setting-hint">e.g. 2023 or 2024</span>
              </div>
            </div>

            <div className="admin__setting-card card">
              <div className="admin__setting-icon">⚙️</div>
              <h3 className="admin__setting-title">Technologies Count</h3>
              <p className="admin__setting-desc">
                The "Technologies" stat in your hero. Update this manually as you learn new tech.
                Currently showing: <strong className="gradient-text">{stats.technologies}</strong>
              </p>
              <div className="admin__setting-input-row">
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={data.stats.technologies}
                  onChange={e => updateStats('technologies', e.target.value)}
                />
                <span className="admin__setting-hint">Shown as "{data.stats.technologies}+"</span>
              </div>
            </div>

            <div className="admin__setting-card card admin__setting-card--info">
              <div className="admin__setting-icon">🔄</div>
              <h3 className="admin__setting-title">Projects Count</h3>
              <p className="admin__setting-desc">
                This is <strong>fully automatic</strong>! It counts the number of projects in your Projects tab.
                Right now you have <strong className="gradient-text">{data.projects.length} project{data.projects.length !== 1 ? 's' : ''}</strong> — 
                shown as <strong className="gradient-text">{stats.projects}</strong> in the portfolio.
              </p>
              <p className="admin__setting-note">Add or delete projects in the Projects tab to update this automatically.</p>
            </div>
          </div>

          <div className="admin__danger-zone">
            <h3 className="admin__danger-title">⚠️ Danger Zone</h3>
            <p>Reset all portfolio data to defaults. This will delete all your projects.</p>
            <button
              className="admin__btn-danger"
              onClick={() => {
                if (window.confirm('Are you sure? This will delete all your projects and reset everything.')) {
                  localStorage.removeItem('mp_portfolio_data');
                  setData(loadPortfolioData());
                  showToast('Data reset to defaults.', 'success');
                }
              }}
            >
              Reset All Data
            </button>
          </div>
        </div>
      )}
    </div>
  );
}