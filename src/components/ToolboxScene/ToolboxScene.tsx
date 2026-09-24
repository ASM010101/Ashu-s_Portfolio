import React, { useState } from 'react';
import { skillsData, certificationsData } from '../../data/skills';
import { audioSynth } from '../../utils/audio';
import { Wrench, Award, CheckCircle2 } from 'lucide-react';

export const ToolboxScene: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredCategories =
    activeCategory === 'all'
      ? skillsData
      : skillsData.filter((c) => c.id === activeCategory);

  return (
    <section
      id="toolbox"
      aria-label="Technical Skills and System Toolbox"
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
        // Toolbox: Tools arranged by the physical subsystem they control
      </div>

      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
          <span className="tech-tag">
            <Wrench size={13} />
            09 // TOOLBOX
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              color: 'var(--accent-cyan)',
            }}
          >
            SYSTEM STACK &amp; CAPABILITIES
          </span>
        </div>

        <h2
          style={{
            fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)',
            letterSpacing: '-0.03em',
            marginBottom: 12,
          }}
        >
          THE TOOLBOX.
        </h2>

        <p style={{ maxWidth: 740, fontSize: '1.05rem', color: 'var(--text-secondary)' }}>
          Every framework, compiler, vector index, and protocol server mapped directly to its architectural domain.
        </p>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
        <button
          onClick={() => {
            setActiveCategory('all');
            audioSynth.playClick(900);
          }}
          className={activeCategory === 'all' ? 'btn-primary' : 'btn-secondary'}
          style={{ padding: '6px 14px', fontSize: '0.72rem' }}
          data-cursor="open"
          data-cursor-label="ALL"
        >
          ALL SUBSYSTEMS
        </button>
        {skillsData.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              setActiveCategory(cat.id);
              audioSynth.playClick(900);
            }}
            className={activeCategory === cat.id ? 'btn-primary' : 'btn-secondary'}
            style={{ padding: '6px 14px', fontSize: '0.72rem' }}
            data-cursor="open"
            data-cursor-label="FILTER"
          >
            {cat.category}
          </button>
        ))}
      </div>

      {/* Toolbox Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 18,
          marginBottom: 32,
        }}
      >
        {filteredCategories.map((cat) => (
          <div
            key={cat.id}
            className="blueprint-panel corner-crosshair"
            style={{
              padding: 20,
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
                  marginBottom: 10,
                }}
              >
                <span className="tech-tag" style={{ fontSize: '0.65rem', padding: '2px 6px' }}>
                  {cat.worldModule}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.65rem',
                    color: 'var(--text-muted)',
                  }}
                >
                  TAG: {cat.iconTag}
                </span>
              </div>

              <h3 style={{ fontSize: '1.1rem', marginBottom: 6, color: 'var(--text-primary)' }}>
                {cat.category}
              </h3>

              <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: 16 }}>
                {cat.description}
              </p>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {cat.items.map((item) => (
                <span
                  key={item}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    color: 'var(--accent-cyan)',
                    background: 'rgba(0, 240, 255, 0.08)',
                    padding: '3px 8px',
                    borderRadius: 3,
                    border: '1px solid rgba(0, 240, 255, 0.2)',
                  }}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Official Certification Card */}
      <div
        className="blueprint-panel corner-crosshair"
        style={{
          padding: 22,
          background: 'rgba(12, 16, 26, 0.9)',
          borderLeft: '3px solid var(--accent-gold)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 16,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 6,
              background: 'rgba(255, 209, 102, 0.1)',
              border: '1px solid rgba(255, 209, 102, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Award size={22} color="var(--accent-gold)" />
          </div>
          <div>
            <span className="tech-tag tech-tag-gold" style={{ fontSize: '0.65rem', marginBottom: 4 }}>
              PROFESSIONAL CERTIFICATION
            </span>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.05rem', fontWeight: 700 }}>
              {certificationsData[0].name}
            </div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Issuer: {certificationsData[0].issuer} · Certified {certificationsData[0].year}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--accent-emerald)' }}>
          <CheckCircle2 size={16} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', fontWeight: 600 }}>
            VERIFIED CREDENTIAL
          </span>
        </div>
      </div>
    </section>
  );
};
