import React from 'react';
import { Code2, Cpu, Eye, Zap, Shield, Sparkles } from 'lucide-react';

export const UnderTheHoodScene: React.FC = () => {
  const pillars = [
    {
      icon: <Sparkles size={18} color="var(--accent-cyan)" />,
      title: 'Why 3D Exists Here',
      desc: 'The 3D environment is not ornamental dressing. It is a spatial metaphor for latent space and system architecture, demonstrating how raw hypotheses evolve into production machines.',
    },
    {
      icon: <Zap size={18} color="var(--accent-coral)" />,
      title: 'Scroll as Execution Engine',
      desc: 'Scrolling controls state progression rather than superficial reveals. Scroll velocity feeds directly into particle drift, audio waveform frequencies, and avatar pose transitions.',
    },
    {
      icon: <Eye size={18} color="var(--accent-emerald)" />,
      title: 'Semantic HTML & Accessibility',
      desc: 'All professional experience, publications, and skills exist in semantic DOM trees with full ARIA landmarks, keyboard navigable tabs, and WCAG AAA compliant contrast.',
    },
    {
      icon: <Cpu size={18} color="var(--accent-gold)" />,
      title: 'Capability Detection & Fallbacks',
      desc: 'Real-time WebGL capability tiering (Level 0: DOM only, Level 1: lightweight canvas, Level 2: full 3D) automatically responds to mobile GPUs and prefers-reduced-motion preferences.',
    },
    {
      icon: <Shield size={18} color="var(--accent-violet)" />,
      title: 'Procedural Audio & Zero Bloat',
      desc: 'Zero external MP3 audio assets. All sound design is synthetically synthesized in real-time via the browser-native Web Audio API, keeping initial payload lightweight.',
    },
    {
      icon: <Code2 size={18} color="var(--accent-cyan)" />,
      title: 'Static CI/CD Architecture',
      desc: 'Pure static build compiled with Vite + TypeScript, served via GitHub Pages with automated GitHub Actions deployment. Zero server-side runtime vulnerabilities.',
    },
  ];

  return (
    <section
      id="under-the-hood"
      aria-label="Technical Portfolio Engineering Architecture"
      style={{
        minHeight: '70vh',
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
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
          <span className="tech-tag">
            <Code2 size={13} />
            ARCHITECTURE // UNDER THE HOOD
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              color: 'var(--accent-cyan)',
            }}
          >
            PORTFOLIO SYSTEM INTERNALS
          </span>
        </div>

        <h2
          style={{
            fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)',
            letterSpacing: '-0.03em',
            marginBottom: 12,
          }}
        >
          UNDER THE HOOD.
        </h2>

        <p style={{ maxWidth: 740, fontSize: '1.05rem', color: 'var(--text-secondary)' }}>
          How this digital experience is engineered for performance, accessibility, and architectural integrity.
        </p>
      </div>

      {/* Engineering Pillars Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 20,
        }}
      >
        {pillars.map((pillar) => (
          <div
            key={pillar.title}
            className="blueprint-panel"
            style={{
              padding: 22,
              background: 'rgba(10, 13, 20, 0.82)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              {pillar.icon}
              <h3 style={{ fontSize: '1.1rem' }}>{pillar.title}</h3>
            </div>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
              {pillar.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};
