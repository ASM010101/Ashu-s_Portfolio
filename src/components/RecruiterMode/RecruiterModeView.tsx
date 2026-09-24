import React, { useState } from 'react';
import { profileData } from '../../data/profile';
import { experienceData } from '../../data/experience';
import { publicationsData } from '../../data/publications';
import { skillsData, certificationsData } from '../../data/skills';
import { educationData } from '../../data/education';
import { projectsData } from '../../data/projects';
import { contactConfig } from '../../data/contact';
import { audioSynth } from '../../utils/audio';
import {
  Briefcase,
  FileText,
  Mail,
  Copy,
  Check,
  Building,
  GraduationCap,
  BookOpen,
  Wrench,
  Award,
  Compass,
} from 'lucide-react';

const GithubIcon: React.FC<{ size?: number }> = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const LinkedinIcon: React.FC<{ size?: number }> = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

interface RecruiterModeViewProps {
  onSwitchToExplore: () => void;
}

export const RecruiterModeView: React.FC<RecruiterModeViewProps> = ({ onSwitchToExplore }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'experience' | 'research' | 'skills' | 'education' | 'projects'>('all');
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(contactConfig.email);
    setCopiedEmail(true);
    audioSynth.playChirp(1000, 0.1);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div
      style={{
        maxWidth: 1100,
        margin: '0 auto',
        padding: '100px 24px 80px 24px',
        position: 'relative',
        zIndex: 20,
      }}
    >
      {/* Top Banner Switching back to Explore */}
      <div
        className="blueprint-panel"
        style={{
          padding: '12px 20px',
          marginBottom: 32,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 12,
          borderLeft: '3px solid var(--accent-emerald)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Briefcase size={16} color="var(--accent-emerald)" />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--accent-emerald)', fontWeight: 600 }}>
            RECRUITER EXECUTIVE VIEW ACTIVE
          </span>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>— Information-first layout</span>
        </div>

        <button
          onClick={onSwitchToExplore}
          className="btn-secondary"
          style={{ padding: '6px 14px', fontSize: '0.75rem' }}
          data-cursor="open"
          data-cursor-label="EXPLORE"
        >
          <Compass size={13} />
          <span>SWITCH TO 3D EXPLORE MODE</span>
        </button>
      </div>

      {/* Recruiter Header Card */}
      <div
        className="blueprint-panel corner-crosshair"
        style={{
          padding: '32px 28px',
          background: 'rgba(12, 16, 26, 0.95)',
          marginBottom: 28,
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: 20,
            marginBottom: 20,
          }}
        >
          <div>
            <h1 style={{ fontSize: 'clamp(2.4rem, 4vw, 3.4rem)', marginBottom: 8 }}>{profileData.name}</h1>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.15rem', color: 'var(--accent-cyan)', fontWeight: 600, marginBottom: 4 }}>
              {profileData.title}
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              {profileData.subtitle}
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 4 }}>
              {profileData.location} · {profileData.phone}
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <a
                href={contactConfig.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{ padding: '8px 16px', fontSize: '0.78rem' }}
              >
                <FileText size={14} />
                <span>DOWNLOAD RESUME (PDF)</span>
              </a>

              <button
                onClick={handleCopyEmail}
                className="btn-secondary"
                style={{ padding: '8px 14px', fontSize: '0.78rem' }}
              >
                {copiedEmail ? <Check size={14} color="var(--accent-emerald)" /> : <Copy size={14} />}
                <span>{copiedEmail ? 'EMAIL COPIED' : 'COPY EMAIL'}</span>
              </button>
            </div>

            <div style={{ display: 'flex', gap: 8 }}>
              <a
                href={contactConfig.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
                style={{ padding: '6px 12px', fontSize: '0.75rem', flex: 1, justifyContent: 'center' }}
              >
                <LinkedinIcon size={14} />
                <span>LINKEDIN</span>
              </a>

              <a
                href={contactConfig.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
                style={{ padding: '6px 12px', fontSize: '0.75rem', flex: 1, justifyContent: 'center' }}
              >
                <GithubIcon size={14} />
                <span>GITHUB</span>
              </a>

              <a
                href={contactConfig.emailUrl}
                className="btn-secondary"
                style={{ padding: '6px 12px', fontSize: '0.75rem', flex: 1, justifyContent: 'center' }}
              >
                <Mail size={14} />
                <span>EMAIL</span>
              </a>
            </div>
          </div>
        </div>

        {/* Executive Summary */}
        <p style={{ fontSize: '0.96rem', color: 'var(--text-secondary)', lineHeight: 1.65, borderTop: '1px solid var(--border-subtle)', paddingTop: 16 }}>
          {profileData.summary}
        </p>

        {/* Quick Highlights / Proof Chips */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 16 }}>
          <span className="tech-tag tech-tag-emerald">M.Tech AI @ IIT Patna (2026–2028)</span>
          <span className="tech-tag">B.Tech CSE (AI&amp;ML) @ SRM (CGPA: 9.04/10.00)</span>
          <span className="tech-tag tech-tag-coral">SDE-1 AI/ML @ Samespace</span>
          <span className="tech-tag tech-tag-gold">IEEE &amp; ICICS 2025 Publications</span>
          <span className="tech-tag">IndiaAI Mission Research Fellow</span>
        </div>
      </div>

      {/* Recruiter Tab Filter Navigation */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
        {[
          { id: 'all', label: 'ALL SECTIONS', icon: <FileText size={13} /> },
          { id: 'experience', label: 'EXPERIENCE', icon: <Building size={13} /> },
          { id: 'research', label: 'RESEARCH & PAPERS', icon: <BookOpen size={13} /> },
          { id: 'skills', label: 'TECHNICAL SKILLS', icon: <Wrench size={13} /> },
          { id: 'education', label: 'EDUCATION', icon: <GraduationCap size={13} /> },
          { id: 'projects', label: 'PROJECTS', icon: <Compass size={13} /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id as typeof activeTab);
              audioSynth.playClick(900);
            }}
            className={activeTab === tab.id ? 'btn-primary' : 'btn-secondary'}
            style={{ padding: '8px 14px', fontSize: '0.76rem' }}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* SECTION: EXPERIENCE */}
      {(activeTab === 'all' || activeTab === 'experience') && (
        <section style={{ marginBottom: 36 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <Building size={18} color="var(--accent-cyan)" />
            <h2 style={{ fontSize: '1.4rem' }}>Professional Experience</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {experienceData.map((exp) => (
              <div key={exp.id} className="blueprint-panel" style={{ padding: 22 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 8, marginBottom: 6 }}>
                  <div>
                    <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)' }}>{exp.role}</h3>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--accent-cyan)', fontWeight: 600 }}>
                      {exp.company} {exp.location && `• ${exp.location}`}
                    </div>
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    {exp.period}
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, margin: '14px 0' }}>
                  {exp.highlights.map((h, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                      <span style={{ color: 'var(--accent-cyan)', fontSize: '0.85rem' }}>▸</span>
                      <span style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>{h}</span>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {exp.skills.map((s) => (
                    <span key={s} className="tech-tag" style={{ fontSize: '0.68rem', padding: '2px 6px' }}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* SECTION: RESEARCH & PUBLICATIONS */}
      {(activeTab === 'all' || activeTab === 'research') && (
        <section style={{ marginBottom: 36 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <BookOpen size={18} color="var(--accent-gold)" />
            <h2 style={{ fontSize: '1.4rem' }}>Publications &amp; Research</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {publicationsData.map((pub) => (
              <div key={pub.id} className="blueprint-panel" style={{ padding: 22, borderLeft: '3px solid var(--accent-gold)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 8, marginBottom: 6 }}>
                  <div>
                    <h3 style={{ fontSize: '1.15rem', color: 'var(--text-primary)' }}>{pub.title}</h3>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: 'var(--accent-gold)', marginTop: 2 }}>
                      {pub.venue} · {pub.date} · {pub.role}
                    </div>
                  </div>
                </div>

                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', margin: '10px 0 14px 0', lineHeight: 1.55 }}>
                  {pub.summary}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {pub.methods.map((m) => (
                    <span key={m} className="tech-tag tech-tag-gold" style={{ fontSize: '0.68rem', padding: '2px 6px' }}>
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* SECTION: TECHNICAL SKILLS */}
      {(activeTab === 'all' || activeTab === 'skills') && (
        <section style={{ marginBottom: 36 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <Wrench size={18} color="var(--accent-cyan)" />
            <h2 style={{ fontSize: '1.4rem' }}>Technical Skills &amp; Certifications</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16, marginBottom: 16 }}>
            {skillsData.map((s) => (
              <div key={s.id} className="blueprint-panel" style={{ padding: 18 }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '0.95rem', fontWeight: 700, color: 'var(--accent-cyan)', marginBottom: 10 }}>
                  {s.category}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {s.items.map((it) => (
                    <span key={it} className="tech-tag" style={{ fontSize: '0.72rem', padding: '2px 7px' }}>
                      {it}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Certification */}
          <div className="blueprint-panel" style={{ padding: 18, borderLeft: '3px solid var(--accent-gold)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Award size={18} color="var(--accent-gold)" />
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1rem', fontWeight: 700 }}>
                  {certificationsData[0].name}
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  {certificationsData[0].issuer} · {certificationsData[0].year}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SECTION: EDUCATION */}
      {(activeTab === 'all' || activeTab === 'education') && (
        <section style={{ marginBottom: 36 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <GraduationCap size={18} color="var(--accent-gold)" />
            <h2 style={{ fontSize: '1.4rem' }}>Education</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
            {educationData.map((edu) => (
              <div key={edu.id} className="blueprint-panel" style={{ padding: 22 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                  <h3 style={{ fontSize: '1.2rem', color: 'var(--text-primary)' }}>{edu.institution}</h3>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {edu.period}
                  </span>
                </div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--accent-cyan)', marginBottom: 6 }}>
                  {edu.degree}
                </div>
                {edu.grade && (
                  <span className="tech-tag tech-tag-gold" style={{ fontSize: '0.72rem', marginBottom: 10, display: 'inline-block' }}>
                    {edu.grade}
                  </span>
                )}
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginTop: 8 }}>
                  {edu.focus}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* SECTION: PROJECTS */}
      {(activeTab === 'all' || activeTab === 'projects') && (
        <section style={{ marginBottom: 36 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <Compass size={18} color="#f472b6" />
            <h2 style={{ fontSize: '1.4rem' }}>Engineering Projects &amp; Hackathons</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
            {projectsData.map((p) => (
              <div key={p.id} className="blueprint-panel" style={{ padding: 22 }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: 4 }}>{p.title}</h3>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: '#f472b6', marginBottom: 8 }}>
                  {p.hackathon} · {p.recognition}
                </div>
                <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', marginBottom: 12, lineHeight: 1.5 }}>
                  {p.description}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {p.techStack.map((t) => (
                    <span key={t} className="tech-tag" style={{ fontSize: '0.68rem', padding: '2px 6px' }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
