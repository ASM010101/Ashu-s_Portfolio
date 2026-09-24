import React from 'react';
import { projectsData } from '../../data/projects';
import { Compass, Trophy, ArrowRight, ShieldCheck, TrendingUp } from 'lucide-react';

export const SideMissionsScene: React.FC = () => {
  return (
    <section
      id="side-missions"
      aria-label="Hackathons and Engineering Side Missions"
      style={{
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 10,
        padding: '80px 24px 60px 24px',
        maxWidth: 1200,
        margin: '0 auto',
      }}
    >
      {/* Hand-drawn margin note */}
      <div
        className="hand-annotation"
        style={{
          position: 'absolute',
          top: 60,
          right: '8%',
          opacity: 0.85,
        }}
      >
        // Side Missions: Hackathon prototypes forged under tight time limits
      </div>

      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
          <span className="tech-tag" style={{ background: 'rgba(244, 114, 182, 0.1)', color: '#f472b6', borderColor: 'rgba(244, 114, 182, 0.3)' }}>
            <Compass size={13} />
            10 // SIDE MISSIONS
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              color: '#f472b6',
            }}
          >
            HACKATHON ARTIFACTS
          </span>
        </div>

        <h2
          style={{
            fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)',
            letterSpacing: '-0.03em',
            marginBottom: 12,
          }}
        >
          SIDE MISSIONS.
        </h2>

        <p style={{ maxWidth: 740, fontSize: '1.05rem', color: 'var(--text-secondary)' }}>
          High-intensity competitive engineering builds solving fraud mitigation and automated identity verification.
        </p>
      </div>

      {/* Side Missions Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 22,
        }}
      >
        {projectsData.map((project) => (
          <div
            key={project.id}
            className="blueprint-panel corner-crosshair"
            style={{
              padding: 24,
              background: 'rgba(10, 13, 20, 0.85)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 12,
                }}
              >
                <span className="tech-tag" style={{ color: '#f472b6', borderColor: 'rgba(244, 114, 182, 0.3)' }}>
                  {project.codeName}
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Trophy size={13} color="var(--accent-gold)" />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--accent-gold)' }}>
                    {project.recognition}
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                {project.id === 'online-video-kyc' ? (
                  <ShieldCheck size={18} color="var(--accent-cyan)" />
                ) : (
                  <TrendingUp size={18} color="#f472b6" />
                )}
                <h3 style={{ fontSize: '1.25rem' }}>{project.title}</h3>
              </div>

              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: 'var(--text-muted)', marginBottom: 12 }}>
                {project.hackathon} · {project.category}
              </div>

              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.55, marginBottom: 16 }}>
                {project.description}
              </p>

              {/* System Flow Steps */}
              <div
                style={{
                  background: 'rgba(7, 8, 11, 0.6)',
                  border: '1px solid var(--border-subtle)',
                  padding: 12,
                  borderRadius: 4,
                  marginBottom: 16,
                }}
              >
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)', marginBottom: 6 }}>
                  EXECUTION PIPELINE:
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 6 }}>
                  {project.systemFlow.map((step, idx) => (
                    <React.Fragment key={step}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-primary)' }}>
                        {step}
                      </span>
                      {idx < project.systemFlow.length - 1 && <ArrowRight size={10} color="var(--text-muted)" />}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>

            {/* Tech Stack */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.68rem',
                    color: '#f472b6',
                    background: 'rgba(244, 114, 182, 0.08)',
                    padding: '2px 7px',
                    borderRadius: 3,
                    border: '1px solid rgba(244, 114, 182, 0.25)',
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
