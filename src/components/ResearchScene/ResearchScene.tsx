import React, { useState } from 'react';
import { publicationsData } from '../../data/publications';
import { audioSynth } from '../../utils/audio';
import { BookOpen, FileText, CheckCircle2, ChevronRight, Award } from 'lucide-react';

export const ResearchScene: React.FC = () => {
  const [selectedPaperId, setSelectedPaperId] = useState<string>(publicationsData[0].id);

  const activePaper = publicationsData.find((p) => p.id === selectedPaperId) || publicationsData[0];

  return (
    <section
      id="research"
      aria-label="Academic Research Papers and Publications"
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
        // Archive: Peer-reviewed hypotheses grounded in rigorous empirical benchmarks
      </div>

      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
          <span className="tech-tag tech-tag-gold">
            <BookOpen size={13} />
            07 // RESEARCH
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              color: 'var(--accent-gold)',
            }}
          >
            PEER-REVIEWED ARCHIVE &amp; BLUEPRINTS
          </span>
        </div>

        <h2
          style={{
            fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)',
            letterSpacing: '-0.03em',
            marginBottom: 12,
          }}
        >
          THE RESEARCH DESK.
        </h2>

        <p style={{ maxWidth: 740, fontSize: '1.05rem', color: 'var(--text-secondary)' }}>
          Rigorous foundational investigation spanning controllable diffusion latent manifolds and edge
          computer vision for autonomous aerial trajectory navigation.
        </p>
      </div>

      {/* Main Research Archive Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 24,
          alignItems: 'start',
        }}
      >
        {/* Left: Paper Selection List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {publicationsData.map((paper) => {
            const isSelected = selectedPaperId === paper.id;
            return (
              <button
                key={paper.id}
                onClick={() => {
                  setSelectedPaperId(paper.id);
                  audioSynth.playClick(900);
                }}
                data-cursor="open"
                data-cursor-label="UNFOLD"
                style={{
                  textAlign: 'left',
                  background: isSelected ? 'rgba(255, 209, 102, 0.08)' : 'rgba(15, 18, 26, 0.65)',
                  border: isSelected ? '1px solid var(--accent-gold)' : '1px solid var(--border-subtle)',
                  borderRadius: 6,
                  padding: 18,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span
                    className={isSelected ? 'tech-tag tech-tag-gold' : 'tech-tag'}
                    style={{ fontSize: '0.68rem', padding: '2px 8px' }}
                  >
                    {paper.badge}
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    {paper.date}
                  </span>
                </div>

                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.05rem',
                    fontWeight: 700,
                    lineHeight: 1.3,
                    color: isSelected ? 'var(--text-primary)' : 'var(--text-secondary)',
                  }}
                >
                  {paper.title}
                </div>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    color: 'var(--text-muted)',
                  }}
                >
                  <span>{paper.venue}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: isSelected ? 'var(--accent-gold)' : 'var(--text-muted)' }}>
                    <span>VIEW METHODS</span>
                    <ChevronRight size={13} />
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right: Unfolded Paper Blueprint & Method Architecture */}
        <div
          className="blueprint-panel corner-crosshair"
          style={{
            padding: 24,
            background: 'rgba(12, 14, 20, 0.92)',
            borderTop: '3px solid var(--accent-gold)',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1px solid var(--border-subtle)',
              paddingBottom: 10,
              marginBottom: 16,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <FileText size={16} color="var(--accent-gold)" />
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  color: 'var(--accent-gold)',
                  fontWeight: 600,
                }}
              >
                UNFOLDED_MANUSCRIPT_BLUEPRINT
              </span>
            </div>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.68rem',
                color: 'var(--text-muted)',
              }}
            >
              ROLE: {activePaper.role}
            </span>
          </div>

          <h3
            style={{
              fontSize: '1.25rem',
              lineHeight: 1.35,
              marginBottom: 12,
              color: 'var(--text-primary)',
            }}
          >
            {activePaper.title}
          </h3>

          <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
            <span className="tech-tag tech-tag-gold">{activePaper.venue}</span>
            <span className="tech-tag">{activePaper.date}</span>
            <span className="tech-tag tech-tag-emerald">{activePaper.role}</span>
          </div>

          <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: 18 }}>
            {activePaper.summary}
          </p>

          {/* Core Methodological Pillars */}
          <div style={{ marginBottom: 18 }}>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                color: 'var(--text-muted)',
                marginBottom: 8,
              }}
            >
              METHODOLOGICAL PILLARS:
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {activePaper.methods.map((method) => (
                <span
                  key={method}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    background: 'rgba(255, 209, 102, 0.08)',
                    border: '1px solid rgba(255, 209, 102, 0.25)',
                    color: 'var(--accent-gold)',
                    padding: '3px 8px',
                    borderRadius: 3,
                  }}
                >
                  {method}
                </span>
              ))}
            </div>
          </div>

          {/* Key Empirical Highlights */}
          <div
            style={{
              background: 'rgba(7, 8, 11, 0.7)',
              border: '1px solid var(--border-subtle)',
              padding: 14,
              borderRadius: 4,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
              <Award size={14} color="var(--accent-gold)" />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--accent-gold)' }}>
                PUBLICATION HIGHLIGHTS
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {activePaper.keyHighlights.map((hl, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                  <CheckCircle2 size={13} color="var(--accent-emerald)" style={{ marginTop: 2, flexShrink: 0 }} />
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{hl}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
