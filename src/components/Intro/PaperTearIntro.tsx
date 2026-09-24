import React, { useState } from 'react';
import { audioSynth } from '../../utils/audio';
import { ArrowRight, Scissors } from 'lucide-react';

interface PaperTearIntroProps {
  onEnter: () => void;
}

export const PaperTearIntro: React.FC<PaperTearIntroProps> = ({ onEnter }) => {
  const [isTearing, setIsTearing] = useState(false);
  const [isTorn, setIsTorn] = useState(false);

  const handleTear = () => {
    if (isTearing || isTorn) return;
    setIsTearing(true);
    audioSynth.playPaperTear();

    setTimeout(() => {
      audioSynth.playDoorOpen();
    }, 280);

    setTimeout(() => {
      setIsTorn(true);
      onEnter();
    }, 700);
  };

  if (isTorn) return null;

  return (
    <div
      role="dialog"
      aria-label="Interactive Paper Tear Entrance"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        background: '#07080b',
        overflow: 'hidden',
        cursor: 'grab',
      }}
      onClick={handleTear}
    >
      {/* Left Paper Half */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          width: '50.5%',
          background: 'radial-gradient(circle at 100% 50%, #151824 0%, #0a0c12 100%)',
          borderRight: '1px solid rgba(0, 240, 255, 0.4)',
          boxShadow: '10px 0 40px rgba(0, 0, 0, 0.9)',
          transform: isTearing ? 'translateX(-105%) rotate(-3deg)' : 'translateX(0)',
          transition: 'transform 0.7s cubic-bezier(0.77, 0, 0.175, 1)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-end',
          paddingRight: '6vw',
          userSelect: 'none',
        }}
      >
        <div style={{ textAlign: 'right', maxWidth: 420 }}>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              letterSpacing: '0.15em',
              color: 'var(--accent-cyan)',
              marginBottom: 12,
            }}
          >
            RESEARCH NOTE // 2026
          </div>
          <h1
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 4.2rem)',
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.04em',
              color: '#ffffff',
              marginBottom: 10,
            }}
          >
            ASHISH
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem',
              color: 'var(--text-secondary)',
            }}
          >
            LLMs · RAG · SPEECH AI
          </p>
        </div>
      </div>

      {/* Right Paper Half */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          width: '50.5%',
          background: 'radial-gradient(circle at 0% 50%, #151824 0%, #0a0c12 100%)',
          borderLeft: '1px solid rgba(0, 240, 255, 0.4)',
          boxShadow: '-10px 0 40px rgba(0, 0, 0, 0.9)',
          transform: isTearing ? 'translateX(105%) rotate(3deg)' : 'translateX(0)',
          transition: 'transform 0.7s cubic-bezier(0.77, 0, 0.175, 1)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          paddingLeft: '6vw',
          userSelect: 'none',
        }}
      >
        <div style={{ textAlign: 'left', maxWidth: 420 }}>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              letterSpacing: '0.15em',
              color: 'var(--accent-coral)',
              marginBottom: 12,
            }}
          >
            SYSTEM PROTOCOL
          </div>
          <h1
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 4.2rem)',
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: '-0.04em',
              color: '#ffffff',
              marginBottom: 10,
            }}
          >
            MAURYA
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem',
              color: 'var(--text-secondary)',
            }}
          >
            AGENTIC SYSTEMS · MCP
          </p>
        </div>
      </div>

      {/* Center Tear Seam & Interactive Callout */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 16,
          opacity: isTearing ? 0 : 1,
          transition: 'opacity 0.25s ease',
          pointerEvents: 'none',
        }}
      >
        {/* Pulsing Center Tear Button */}
        <div
          style={{
            background: 'rgba(10, 13, 20, 0.92)',
            border: '1px solid var(--accent-cyan)',
            padding: '12px 24px',
            borderRadius: 30,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            boxShadow: '0 0 30px rgba(0, 240, 255, 0.35)',
            cursor: 'pointer',
            pointerEvents: 'auto',
          }}
          onClick={handleTear}
        >
          <Scissors size={16} color="var(--accent-cyan)" />
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.82rem',
              fontWeight: 700,
              color: 'var(--accent-cyan)',
              letterSpacing: '0.08em',
            }}
          >
            CLICK TO TEAR &amp; ENTER
          </span>
        </div>

        <div
          style={{
            fontFamily: 'var(--font-hand)',
            fontSize: '1.4rem',
            color: 'var(--accent-gold)',
            textShadow: '0 0 10px rgba(255, 209, 102, 0.3)',
          }}
        >
          &ldquo;I don&apos;t just use models. I build the systems around them.&rdquo;
        </div>
      </div>

      {/* Skip Button (Top Right) */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onEnter();
        }}
        style={{
          position: 'absolute',
          top: 24,
          right: 28,
          zIndex: 20,
          background: 'rgba(15, 18, 26, 0.7)',
          border: '1px solid var(--border-subtle)',
          color: 'var(--text-muted)',
          padding: '6px 14px',
          borderRadius: 4,
          fontFamily: 'var(--font-mono)',
          fontSize: '0.72rem',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          transition: 'all 0.2s ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = '#ffffff';
          e.currentTarget.style.borderColor = 'var(--accent-cyan)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = 'var(--text-muted)';
          e.currentTarget.style.borderColor = 'var(--border-subtle)';
        }}
      >
        <span>SKIP INTRO</span>
        <ArrowRight size={13} />
      </button>
    </div>
  );
};
