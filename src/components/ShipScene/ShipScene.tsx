import React from 'react';
import { contactConfig } from '../../data/contact';
import { audioSynth } from '../../utils/audio';
import confetti from 'canvas-confetti';
import { Mail, FileText, ArrowUpRight, Sparkles } from 'lucide-react';

const GithubIcon: React.FC<{ size?: number }> = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const LinkedinIcon: React.FC<{ size?: number }> = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export const ShipScene: React.FC = () => {
  const handleFireConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#00f0ff', '#ff6b4a', '#00f59b', '#ffd166'],
    });
    audioSynth.playChirp(1100, 0.18);
  };

  return (
    <section
      id="ship"
      aria-label="System Ready and Contact Gateway"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 10,
        padding: '100px 24px 80px 24px',
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
        // Note: Thanks for exploring the sketchbook. Let&apos;s build.
      </div>

      {/* Main Terminal Deployment Card */}
      <div
        className="blueprint-panel corner-crosshair"
        style={{
          padding: '48px 36px',
          background: 'rgba(10, 13, 20, 0.95)',
          border: '1px solid var(--border-active)',
          textAlign: 'center',
          boxShadow: '0 24px 64px rgba(0, 0, 0, 0.8), 0 0 40px rgba(0, 240, 255, 0.15)',
          maxWidth: 820,
          margin: '0 auto 60px auto',
        }}
      >
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
          <span className="tech-tag" style={{ padding: '4px 12px' }}>
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: '50%',
                backgroundColor: 'var(--accent-cyan)',
                display: 'inline-block',
              }}
              className="signal-blinking"
            />
            12 // FINAL CONVERGENCE
          </span>
        </div>

        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '1rem',
            letterSpacing: '0.15em',
            color: 'var(--accent-cyan)',
            marginBottom: 10,
          }}
        >
          SYSTEM READY.
        </div>

        <h2
          style={{
            fontSize: 'clamp(2.8rem, 6vw, 4.8rem)',
            letterSpacing: '-0.04em',
            marginBottom: 16,
            lineHeight: 1.05,
          }}
        >
          LET&apos;S BUILD.
        </h2>

        <p
          style={{
            fontSize: '1.15rem',
            color: 'var(--text-secondary)',
            maxWidth: 580,
            margin: '0 auto 36px auto',
            lineHeight: 1.6,
          }}
        >
          Have an interesting AI problem involving LLMs, high-throughput RAG, speech systems, or autonomous agent protocols?
        </p>

        {/* Primary Contact Action Hub */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 14,
            justifyContent: 'center',
            marginBottom: 32,
          }}
        >
          <a
            href={contactConfig.emailUrl}
            className="btn-primary"
            data-cursor="open"
            data-cursor-label="EMAIL"
            style={{ padding: '12px 24px', fontSize: '0.88rem' }}
            onClick={() => audioSynth.playClick(1000)}
          >
            <Mail size={16} />
            <span>CONTACT VIA EMAIL</span>
            <ArrowUpRight size={15} />
          </a>

          <a
            href={contactConfig.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
            data-cursor="open"
            data-cursor-label="GITHUB"
            style={{ padding: '12px 20px', fontSize: '0.88rem' }}
            onClick={() => audioSynth.playClick(900)}
          >
            <GithubIcon size={16} />
            <span>GITHUB [@ASM010101]</span>
            <ArrowUpRight size={15} />
          </a>

          <a
            href={contactConfig.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
            data-cursor="open"
            data-cursor-label="LINKEDIN"
            style={{ padding: '12px 20px', fontSize: '0.88rem' }}
            onClick={() => audioSynth.playClick(900)}
          >
            <LinkedinIcon size={16} />
            <span>LINKEDIN</span>
            <ArrowUpRight size={15} />
          </a>

          <a
            href={contactConfig.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
            data-cursor="open"
            data-cursor-label="PDF"
            style={{ padding: '12px 20px', fontSize: '0.88rem' }}
            onClick={() => audioSynth.playClick(950)}
          >
            <FileText size={16} />
            <span>DOWNLOAD RESUME PDF</span>
            <ArrowUpRight size={15} />
          </a>
        </div>

        {/* Celebratory Confetti Trigger */}
        <div>
          <button
            onClick={handleFireConfetti}
            style={{
              background: 'transparent',
              border: 'none',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              transition: 'color 0.15s ease',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-cyan)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
          >
            <Sparkles size={12} color="var(--accent-cyan)" />
            <span>[CLICK FOR CELEBRATORY SYSTEM LAUNCH CONFETTI]</span>
          </button>
        </div>
      </div>

      {/* Quiet Closing Footer Note */}
      <footer
        style={{
          borderTop: '1px solid var(--border-subtle)',
          paddingTop: 36,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 12,
          textAlign: 'center',
        }}
      >
        <div className="hand-annotation" style={{ fontSize: '1.4rem' }}>
          &ldquo;Thanks for exploring.&rdquo;
        </div>

        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-primary)' }}>
          Ashish Maurya
        </div>

        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--accent-cyan)' }}>
          Applied AI Engineer — LLMs, RAG, Speech AI &amp; Agentic Systems
        </div>

        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
          {contactConfig.location} · {contactConfig.email} · {contactConfig.phone}
        </div>

        <div
          style={{
            marginTop: 12,
            fontFamily: 'var(--font-mono)',
            fontSize: '0.68rem',
            color: 'var(--text-muted)',
          }}
        >
          Engineered with React + TypeScript + Three.js + GSAP · Static GitHub Pages Build
        </div>
      </footer>
    </section>
  );
};
