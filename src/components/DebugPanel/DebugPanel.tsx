import React, { useState, useEffect } from 'react';
import { detectCapabilities } from '../../utils/capabilities';
import { Activity, X } from 'lucide-react';

interface DebugPanelProps {
  currentSectionId: string;
  scrollProgress: number;
  scrollVelocity: number;
  recruiterMode: boolean;
  isOpen: boolean;
  onClose: () => void;
}

export const DebugPanel: React.FC<DebugPanelProps> = ({
  currentSectionId,
  scrollProgress,
  scrollVelocity,
  recruiterMode,
  isOpen,
  onClose,
}) => {
  const [fps, setFps] = useState(60);
  const [viewport, setViewport] = useState({ w: 0, h: 0 });
  const [capabilities, setCapabilities] = useState(detectCapabilities());

  useEffect(() => {
    setCapabilities(detectCapabilities());

    const updateDimensions = () => {
      setViewport({ w: window.innerWidth, h: window.innerHeight });
    };
    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    // Lightweight FPS calculator
    let frameCount = 0;
    let lastTime = performance.now();
    let animId: number;

    const calcFps = (now: number) => {
      frameCount++;
      if (now >= lastTime + 1000) {
        setFps(Math.round((frameCount * 1000) / (now - lastTime)));
        frameCount = 0;
        lastTime = now;
      }
      animId = requestAnimationFrame(calcFps);
    };
    animId = requestAnimationFrame(calcFps);

    return () => {
      window.removeEventListener('resize', updateDimensions);
      cancelAnimationFrame(animId);
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div
      role="region"
      aria-label="Developer Debug Overlay"
      style={{
        position: 'fixed',
        bottom: 20,
        left: 20,
        zIndex: 99995,
        width: 300,
        background: 'rgba(7, 8, 11, 0.94)',
        backdropFilter: 'blur(16px)',
        border: '1px solid var(--accent-cyan)',
        borderRadius: 6,
        padding: 14,
        fontFamily: 'var(--font-mono)',
        fontSize: '0.72rem',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.6), 0 0 20px rgba(0, 240, 255, 0.2)',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid var(--border-technical)',
          paddingBottom: 6,
          marginBottom: 10,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--accent-cyan)' }}>
          <Activity size={13} />
          <span style={{ fontWeight: 700 }}>SYS_DEBUG_TELEMETRY</span>
        </div>
        <button
          onClick={onClose}
          style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
        >
          <X size={14} />
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 5, color: 'var(--text-secondary)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>ACTIVE NODE:</span>
          <span style={{ color: 'var(--accent-cyan)', fontWeight: 600 }}>{currentSectionId.toUpperCase()}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>FPS:</span>
          <span style={{ color: fps >= 50 ? 'var(--accent-emerald)' : 'var(--accent-coral)' }}>{fps} FPS</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>SCROLL PROGRESS:</span>
          <span>{scrollProgress.toFixed(1)}%</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>SCROLL VELOCITY:</span>
          <span>{scrollVelocity.toFixed(2)} px/ms</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>VIEWPORT:</span>
          <span>{viewport.w} × {viewport.h}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>WEBGL LEVEL:</span>
          <span style={{ color: 'var(--accent-cyan)' }}>Level {capabilities.webglLevel}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>QUALITY TIER:</span>
          <span>{capabilities.qualityLevel.toUpperCase()}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>REDUCED MOTION:</span>
          <span>{capabilities.prefersReducedMotion ? 'ACTIVE' : 'OFF'}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>RECRUITER MODE:</span>
          <span>{recruiterMode ? 'TRUE' : 'FALSE'}</span>
        </div>
      </div>
    </div>
  );
};
