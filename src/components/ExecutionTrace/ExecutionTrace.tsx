import React, { useState, useEffect } from 'react';
import { navigationSteps } from '../../data/navigation';
import { audioSynth } from '../../utils/audio';
import { Volume2, VolumeX, Terminal, Play, Pause, Briefcase, Compass, FileText, ChevronLeft, ChevronRight } from 'lucide-react';

interface ExecutionTraceProps {
  currentStationIndex: number;
  totalStations: number;
  recruiterMode: boolean;
  onToggleRecruiterMode: () => void;
  onOpenCommandPalette: () => void;
  isTouring: boolean;
  onToggleTour: () => void;
  onSelectStation: (index: number) => void;
  onPrevStation: () => void;
  onNextStation: () => void;
}

export const ExecutionTrace: React.FC<ExecutionTraceProps> = ({
  currentStationIndex,
  totalStations,
  recruiterMode,
  onToggleRecruiterMode,
  onOpenCommandPalette,
  isTouring,
  onToggleTour,
  onSelectStation,
  onPrevStation,
  onNextStation,
}) => {
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    setIsMuted(audioSynth.getMuted());
  }, []);

  const handleToggleSound = () => {
    const muted = audioSynth.toggleMute();
    setIsMuted(muted);
  };

  const currentStep = navigationSteps[currentStationIndex] || navigationSteps[0];
  const progressPercent = ((currentStationIndex + 1) / totalStations) * 100;

  return (
    <>
      {/* Top Fixed Telemetry Bar */}
      <header
        role="banner"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 9000,
          background: 'rgba(7, 9, 14, 0.88)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid var(--border-technical)',
          padding: '10px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        {/* Left: Brand Identity & Active Station */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <button
            onClick={() => {
              onSelectStation(0);
              audioSynth.playClick(900);
            }}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              color: 'var(--text-primary)',
              padding: 0,
            }}
            data-cursor="open"
            data-cursor-label="ORIGIN"
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: 2,
                backgroundColor: 'var(--accent-cyan)',
                boxShadow: '0 0 10px var(--accent-cyan)',
              }}
              className="signal-blinking"
            />
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 700,
                fontSize: '1rem',
                letterSpacing: '-0.02em',
              }}
            >
              ASHISH MAURYA
            </span>
          </button>

          {/* Current Station Badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              background: 'rgba(0, 240, 255, 0.06)',
              border: '1px solid rgba(0, 240, 255, 0.25)',
              padding: '3px 10px',
              borderRadius: 4,
            }}
          >
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--accent-cyan)' }}>
              LAB STATION {currentStep.stepNumber}
            </span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>/</span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                fontWeight: 600,
                color: 'var(--text-primary)',
              }}
            >
              {currentStep.label}
            </span>
          </div>
        </div>

        {/* Center: Station Step Controls (Prev / Next) */}
        {!recruiterMode && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              background: 'rgba(15, 18, 26, 0.8)',
              border: '1px solid var(--border-technical)',
              borderRadius: 20,
              padding: '2px 8px',
            }}
            className="hide-on-mobile"
          >
            <button
              onClick={() => {
                onPrevStation();
                audioSynth.playRelayClick();
              }}
              disabled={currentStationIndex === 0}
              style={{
                background: 'transparent',
                border: 'none',
                color: currentStationIndex === 0 ? 'var(--text-muted)' : 'var(--accent-cyan)',
                cursor: currentStationIndex === 0 ? 'default' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                padding: '4px',
                opacity: currentStationIndex === 0 ? 0.3 : 1,
              }}
              title="Previous Lab Station (Left Arrow)"
              data-cursor="open"
              data-cursor-label="PREV"
            >
              <ChevronLeft size={16} />
            </button>

            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                color: 'var(--text-secondary)',
                padding: '0 6px',
              }}
            >
              {currentStationIndex + 1} of {totalStations}
            </span>

            <button
              onClick={() => {
                onNextStation();
                audioSynth.playRelayClick();
              }}
              disabled={currentStationIndex === totalStations - 1}
              style={{
                background: 'transparent',
                border: 'none',
                color: currentStationIndex === totalStations - 1 ? 'var(--text-muted)' : 'var(--accent-cyan)',
                cursor: currentStationIndex === totalStations - 1 ? 'default' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                padding: '4px',
                opacity: currentStationIndex === totalStations - 1 ? 0.3 : 1,
              }}
              title="Next Lab Station (Right Arrow)"
              data-cursor="open"
              data-cursor-label="NEXT"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}

        {/* Center Progress Bar */}
        <div
          style={{
            position: 'absolute',
            bottom: -1,
            left: 0,
            right: 0,
            height: 2,
            background: 'rgba(255, 255, 255, 0.05)',
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${progressPercent}%`,
              background: 'linear-gradient(90deg, #00f0ff, #ff6b4a)',
              boxShadow: '0 0 8px rgba(0, 240, 255, 0.8)',
              transition: 'width 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          />
        </div>

        {/* Right: Actions, Tour, Sound & Terminal */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {/* Recruiter Mode Toggle */}
          <button
            onClick={() => {
              onToggleRecruiterMode();
              audioSynth.playRelayClick();
            }}
            data-cursor="open"
            data-cursor-label={recruiterMode ? 'EXPLORE' : 'RECRUITER'}
            title={recruiterMode ? 'Switch to 3D Spatial Laboratory' : 'Switch to Executive Recruiter View'}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              fontWeight: 600,
              padding: '5px 12px',
              borderRadius: 4,
              cursor: 'pointer',
              border: recruiterMode ? '1px solid var(--accent-emerald)' : '1px solid var(--border-technical)',
              background: recruiterMode ? 'rgba(0, 245, 155, 0.12)' : 'rgba(15, 18, 26, 0.85)',
              color: recruiterMode ? 'var(--accent-emerald)' : 'var(--text-secondary)',
              transition: 'all 0.2s ease',
            }}
          >
            {recruiterMode ? <Briefcase size={13} /> : <Compass size={13} />}
            <span>{recruiterMode ? 'RECRUITER VIEW' : 'SPATIAL LAB'}</span>
          </button>

          {/* 60s Tour Button */}
          <button
            onClick={() => {
              onToggleTour();
              audioSynth.playClick(850);
            }}
            data-cursor="open"
            data-cursor-label={isTouring ? 'PAUSE' : 'TOUR'}
            title="60-Second Guided Tour across Stations"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 5,
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              padding: '5px 10px',
              borderRadius: 4,
              cursor: 'pointer',
              border: isTouring ? '1px solid var(--accent-cyan)' : '1px solid var(--border-subtle)',
              background: isTouring ? 'rgba(0, 240, 255, 0.15)' : 'transparent',
              color: isTouring ? 'var(--accent-cyan)' : 'var(--text-secondary)',
            }}
          >
            {isTouring ? <Pause size={12} /> : <Play size={12} />}
            <span className="hide-on-mobile">60s TOUR</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={handleToggleSound}
            data-cursor="open"
            data-cursor-label={isMuted ? 'AUDIO ON' : 'MUTE'}
            title={isMuted ? 'Unmute procedural sound effects' : 'Mute sound'}
            style={{
              background: 'transparent',
              border: '1px solid var(--border-subtle)',
              color: isMuted ? 'var(--text-muted)' : 'var(--accent-cyan)',
              padding: '6px',
              borderRadius: 4,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
            }}
            aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
          >
            {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
          </button>

          {/* Terminal Trigger */}
          <button
            onClick={() => {
              onOpenCommandPalette();
              audioSynth.playClick(1100);
            }}
            data-cursor="system"
            data-cursor-label="CMD+K"
            title="Open Command Terminal (Cmd+K)"
            style={{
              background: 'rgba(0, 240, 255, 0.08)',
              border: '1px solid rgba(0, 240, 255, 0.25)',
              color: 'var(--accent-cyan)',
              padding: '5px 8px',
              borderRadius: 4,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 5,
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
            }}
          >
            <Terminal size={13} />
            <kbd style={{ fontSize: '0.68rem', opacity: 0.8 }} className="hide-on-mobile">
              ⌘K
            </kbd>
          </button>

          {/* Resume PDF */}
          <a
            href="resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="open"
            data-cursor-label="PDF"
            title="Download Verified Resume PDF"
            style={{
              background: 'rgba(255, 107, 74, 0.08)',
              border: '1px solid rgba(255, 107, 74, 0.3)',
              color: 'var(--accent-coral)',
              padding: '5px 10px',
              borderRadius: 4,
              display: 'flex',
              alignItems: 'center',
              gap: 5,
              textDecoration: 'none',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              fontWeight: 600,
            }}
          >
            <FileText size={12} />
            <span className="hide-on-mobile">RESUME</span>
          </a>
        </div>
      </header>

      {/* Bottom Spatial Station Reel Navigation (Handcrafted Corridor Track) */}
      {!recruiterMode && (
        <nav
          aria-label="Spatial laboratory station reel"
          style={{
            position: 'fixed',
            bottom: 20,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 8500,
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            background: 'rgba(8, 10, 16, 0.92)',
            backdropFilter: 'blur(16px)',
            border: '1px solid var(--border-technical)',
            borderRadius: 30,
            padding: '6px 14px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.7), 0 0 20px rgba(0, 240, 255, 0.1)',
            maxWidth: '92vw',
            overflowX: 'auto',
          }}
        >
          {navigationSteps.map((step, idx) => {
            const isActive = currentStationIndex === idx;
            return (
              <button
                key={step.id}
                onClick={() => {
                  onSelectStation(idx);
                  audioSynth.playRelayClick();
                }}
                data-cursor="open"
                data-cursor-label={step.label}
                title={`${step.stepNumber} // ${step.label} (${step.domain})`}
                style={{
                  background: isActive ? 'var(--accent-cyan)' : 'transparent',
                  border: 'none',
                  color: isActive ? '#07080b' : 'var(--text-muted)',
                  cursor: 'pointer',
                  padding: '4px 10px',
                  borderRadius: 16,
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.68rem',
                  fontWeight: isActive ? 700 : 500,
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 5,
                }}
              >
                <span>{step.stepNumber}</span>
                {isActive && <span>{step.label}</span>}
              </button>
            );
          })}
        </nav>
      )}

      <style>{`
        @media (max-width: 768px) {
          .hide-on-mobile {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
};
