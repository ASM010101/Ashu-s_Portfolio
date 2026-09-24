import React, { useState } from 'react';
import { experienceData } from '../../data/experience';
import { audioSynth } from '../../utils/audio';
import { Briefcase, Building, ChevronDown, CheckCircle2, Terminal } from 'lucide-react';

export const ExperienceScene: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string>(experienceData[0].id);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? '' : id));
    audioSynth.playClick(900);
  };

  return (
    <section
      id="field-log"
      aria-label="Engineering Field Log and Professional Experience"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 10,
        padding: '100px 24px 60px 24px',
        maxWidth: 1200,
        margin: '0 auto',
      }}
    >
      {/* Hand-drawn margin note */}
      <div
        className="hand-annotation"
        style={{
          position: 'absolute',
          top: 70,
          right: '8%',
          opacity: 0.85,
        }}
      >
        // Field Log: Production systems deployed to real users under SLA constraints
      </div>

      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
          <span className="tech-tag tech-tag-coral">
            <Briefcase size={13} />
            08 // FIELD LOG
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              color: 'var(--accent-coral)',
            }}
          >
            PRODUCTION CHECKPOINTS &amp; RESEARCH MISSIONS
          </span>
        </div>

        <h2
          style={{
            fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)',
            letterSpacing: '-0.03em',
            marginBottom: 12,
          }}
        >
          FIELD LOG.
        </h2>

        <p style={{ maxWidth: 740, fontSize: '1.05rem', color: 'var(--text-secondary)' }}>
          Chronological record of production AI engineering and national research fellowship deployments.
        </p>
      </div>

      {/* Field Log Entries */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {experienceData.map((exp) => {
          const isExpanded = expandedId === exp.id;
          return (
            <div
              key={exp.id}
              className="blueprint-panel corner-crosshair"
              style={{
                padding: 22,
                background: isExpanded ? 'rgba(12, 15, 24, 0.92)' : 'rgba(9, 11, 16, 0.75)',
                borderLeft: isExpanded ? '3px solid var(--accent-coral)' : '3px solid var(--border-subtle)',
                transition: 'all 0.25s ease',
              }}
            >
              {/* Header / Click to Toggle */}
              <div
                onClick={() => toggleExpand(exp.id)}
                data-cursor="open"
                data-cursor-label={isExpanded ? 'COLLAPSE' : 'EXPAND'}
                style={{
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  flexWrap: 'wrap',
                  gap: 12,
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                    <span className="tech-tag tech-tag-coral" style={{ fontSize: '0.68rem', padding: '2px 8px' }}>
                      {exp.entryNumber}
                    </span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      {exp.type}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.35rem', marginBottom: 4, color: 'var(--text-primary)' }}>
                    {exp.role}
                  </h3>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--accent-cyan)' }}>
                    <Building size={14} />
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: 600 }}>
                      {exp.company}
                    </span>
                    {exp.location && (
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>• {exp.location}</span>
                    )}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.78rem',
                      color: 'var(--text-secondary)',
                      background: 'rgba(255, 255, 255, 0.04)',
                      padding: '4px 10px',
                      borderRadius: 4,
                      border: '1px solid var(--border-subtle)',
                    }}
                  >
                    {exp.period}
                  </span>
                  <ChevronDown
                    size={18}
                    color="var(--accent-cyan)"
                    style={{
                      transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s ease',
                    }}
                  />
                </div>
              </div>

              {/* One-Liner Summary */}
              <div
                style={{
                  marginTop: 12,
                  fontSize: '0.92rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.5,
                }}
              >
                {exp.oneLiner}
              </div>

              {/* Expanded Detail View */}
              {isExpanded && (
                <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid var(--border-subtle)' }}>
                  {/* Highlights */}
                  <div style={{ marginBottom: 16 }}>
                    <div
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.7rem',
                        color: 'var(--text-muted)',
                        marginBottom: 10,
                      }}
                    >
                      KEY TECHNICAL DELIVERABLES:
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {exp.highlights.map((bullet, idx) => (
                        <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                          <CheckCircle2 size={14} color="var(--accent-emerald)" style={{ marginTop: 3, flexShrink: 0 }} />
                          <span style={{ fontSize: '0.86rem', color: 'var(--text-primary)', lineHeight: 1.55 }}>
                            {bullet}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Research & Production Note */}
                  {exp.researchNote && (
                    <div
                      style={{
                        background: 'rgba(7, 8, 11, 0.7)',
                        border: '1px solid var(--border-technical)',
                        padding: 12,
                        borderRadius: 4,
                        marginBottom: 16,
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                        <Terminal size={12} color="var(--accent-coral)" />
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--accent-coral)' }}>
                          ENGINEERING OBSERVATION // LOG
                        </span>
                      </div>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                        {exp.researchNote}
                      </p>
                    </div>
                  )}

                  {/* Skills Deployed */}
                  <div>
                    <div
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.68rem',
                        color: 'var(--text-muted)',
                        marginBottom: 8,
                      }}
                    >
                      TECHNOLOGIES EXECUTED:
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {exp.skills.map((skill) => (
                        <span
                          key={skill}
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.72rem',
                            color: 'var(--accent-cyan)',
                            background: 'rgba(0, 240, 255, 0.06)',
                            padding: '3px 8px',
                            borderRadius: 3,
                            border: '1px solid rgba(0, 240, 255, 0.2)',
                          }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
