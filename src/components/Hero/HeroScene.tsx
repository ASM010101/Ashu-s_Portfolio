import React from 'react';
import { profileData } from '../../data/profile';
import { audioSynth } from '../../utils/audio';
import { ArrowDown, FileText, Briefcase, Sparkles, Terminal } from 'lucide-react';

interface HeroSceneProps {
  onExecuteScroll: () => void;
  onToggleRecruiterMode: () => void;
  onOpenCommandPalette: () => void;
}

export const HeroScene: React.FC<HeroSceneProps> = ({
  onExecuteScroll,
  onToggleRecruiterMode,
  onOpenCommandPalette,
}) => {
  return (
    <section
      id="boot"
      aria-label="System Boot and Introduction"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 10,
        padding: '120px 24px 60px 24px',
        maxWidth: 1200,
        margin: '0 auto',
      }}
    >
      {/* Hand-drawn Marginalia / Sketchbook Notes */}
      <div
        className="hand-annotation"
        style={{
          position: 'absolute',
          top: 100,
          right: '5%',
          opacity: 0.85,
        }}
      >
        // Note: I don&apos;t just use models. I build the systems around them.
      </div>

      {/* Technical Header Signal */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          marginBottom: 20,
        }}
      >
        <span className="tech-tag">
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              backgroundColor: 'var(--accent-cyan)',
              display: 'inline-block',
            }}
            className="signal-blinking"
          />
          00 // BOOT SEQUENCE INITIALIZED
        </span>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
          }}
        >
          SYS_STATUS: ONLINE // IIT PATNA AI RESEARCH
        </span>
      </div>

      {/* Main Hero Identity */}
      <div style={{ maxWidth: 860 }}>
        <h1
          style={{
            fontSize: 'clamp(2.8rem, 6.5vw, 5.2rem)',
            fontWeight: 800,
            lineHeight: 1.02,
            letterSpacing: '-0.04em',
            marginBottom: 16,
            background: 'linear-gradient(180deg, #ffffff 40%, #94a3b8 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {profileData.name}
        </h1>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 12,
            marginBottom: 24,
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(1.1rem, 2.2vw, 1.6rem)',
              color: 'var(--accent-cyan)',
              fontWeight: 600,
              letterSpacing: '-0.01em',
            }}
          >
            {profileData.title}
          </span>
          <span style={{ color: 'var(--text-muted)' }}>—</span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(0.95rem, 1.8vw, 1.25rem)',
              color: 'var(--text-secondary)',
            }}
          >
            {profileData.subtitle}
          </span>
        </div>

        <p
          style={{
            fontSize: 'clamp(1rem, 1.4vw, 1.2rem)',
            lineHeight: 1.7,
            color: 'var(--text-secondary)',
            maxWidth: 720,
            marginBottom: 32,
          }}
        >
          {profileData.summary}
        </p>

        {/* Blueprint Domain Chips */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 8,
            marginBottom: 44,
          }}
        >
          {profileData.domains.map((domain, i) => (
            <span
              key={domain}
              className={i % 2 === 0 ? 'tech-tag' : 'tech-tag tech-tag-coral'}
              style={{ fontSize: '0.76rem', padding: '4px 10px' }}
            >
              {domain}
            </span>
          ))}
        </div>

        {/* Primary Call to Actions */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 14,
          }}
        >
          <button
            onClick={() => {
              onExecuteScroll();
              audioSynth.playClick(1100);
            }}
            className="btn-primary"
            data-cursor="enter"
            data-cursor-label="EXECUTE"
          >
            <Sparkles size={15} />
            <span>SCROLL TO EXECUTE</span>
            <ArrowDown size={15} />
          </button>

          <button
            onClick={() => {
              onToggleRecruiterMode();
              audioSynth.playClick(900);
            }}
            className="btn-secondary"
            data-cursor="open"
            data-cursor-label="RECRUITER"
          >
            <Briefcase size={15} />
            <span>RECRUITER FAST VIEW</span>
          </button>

          <a
            href="resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
            data-cursor="open"
            data-cursor-label="DOWNLOAD"
          >
            <FileText size={15} />
            <span>VIEW RESUME PDF</span>
          </a>

          <button
            onClick={() => {
              onOpenCommandPalette();
              audioSynth.playClick(1000);
            }}
            className="btn-secondary"
            data-cursor="system"
            data-cursor-label="TERMINAL"
            style={{ padding: '10px 14px' }}
            title="Open Command Terminal"
          >
            <Terminal size={15} />
          </button>
        </div>
      </div>

      {/* Floating telemetry tick box at bottom left */}
      <div
        className="blueprint-panel corner-crosshair"
        style={{
          marginTop: 60,
          padding: '12px 18px',
          maxWidth: 380,
          borderLeft: '3px solid var(--accent-cyan)',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.68rem',
            color: 'var(--accent-cyan)',
            marginBottom: 4,
          }}
        >
          CORE HYPOTHESIS // 00_BOOT
        </div>
        <div
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '0.9rem',
            color: 'var(--text-primary)',
            fontWeight: 600,
          }}
        >
          &ldquo;Research should survive contact with reality.&rdquo;
        </div>
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.68rem',
            color: 'var(--text-muted)',
            marginTop: 4,
          }}
        >
          IIT Patna M.Tech AI (2026–28) · Samespace Production AI
        </div>
      </div>
    </section>
  );
};
