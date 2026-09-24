import React from 'react';
import { educationData } from '../../data/education';
import { GraduationCap, CheckCircle2 } from 'lucide-react';

export const EducationScene: React.FC = () => {
  return (
    <section
      id="origin"
      aria-label="Academic Education and Research Trajectory"
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
        // Trajectory: Foundational rigor &rarr; Autonomous AI systems research
      </div>

      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
          <span className="tech-tag tech-tag-gold">
            <GraduationCap size={13} />
            11 // ORIGIN &amp; NEXT NODE
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              color: 'var(--accent-gold)',
            }}
          >
            ACADEMIC VECTOR
          </span>
        </div>

        <h2
          style={{
            fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)',
            letterSpacing: '-0.03em',
            marginBottom: 12,
          }}
        >
          ORIGIN TO NEXT NODE.
        </h2>

        <p style={{ maxWidth: 740, fontSize: '1.05rem', color: 'var(--text-secondary)' }}>
          From foundational undergraduate distinction at SRM to graduate artificial intelligence research at IIT Patna.
        </p>
      </div>

      {/* Origin -> Next Node Split Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 24,
          alignItems: 'stretch',
        }}
      >
        {educationData.map((edu) => (
          <div
            key={edu.id}
            className="blueprint-panel corner-crosshair"
            style={{
              padding: 24,
              background: edu.stage === 'NEXT NODE' ? 'rgba(12, 16, 26, 0.92)' : 'rgba(10, 13, 20, 0.85)',
              borderTop: edu.stage === 'NEXT NODE' ? '3px solid var(--accent-cyan)' : '3px solid var(--accent-gold)',
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
                <span
                  className={edu.stage === 'NEXT NODE' ? 'tech-tag' : 'tech-tag tech-tag-gold'}
                  style={{ fontSize: '0.68rem', padding: '2px 8px' }}
                >
                  {edu.stage}
                </span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  {edu.period}
                </span>
              </div>

              <h3 style={{ fontSize: '1.3rem', marginBottom: 6, color: 'var(--text-primary)' }}>
                {edu.institution}
              </h3>

              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--accent-cyan)', marginBottom: 8, fontWeight: 600 }}>
                {edu.degree}
              </div>

              {edu.grade && (
                <div
                  style={{
                    display: 'inline-block',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    color: 'var(--accent-gold)',
                    background: 'rgba(255, 209, 102, 0.1)',
                    padding: '2px 8px',
                    borderRadius: 3,
                    border: '1px solid rgba(255, 209, 102, 0.3)',
                    marginBottom: 12,
                  }}
                >
                  {edu.grade}
                </div>
              )}

              <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.55, marginBottom: 16 }}>
                {edu.focus}
              </p>
            </div>

            <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: 14 }}>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-muted)', marginBottom: 6 }}>
                MILESTONES &amp; FOCUS:
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {edu.takeaways.map((point, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                    <CheckCircle2 size={13} color="var(--accent-emerald)" style={{ marginTop: 2, flexShrink: 0 }} />
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
