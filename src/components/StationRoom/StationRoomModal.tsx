import React, { useEffect } from 'react';
import { navigationSteps } from '../../data/navigation';
import { audioSynth } from '../../utils/audio';
import { HeroScene } from '../Hero/HeroScene';
import { SeeScene } from '../SeeScene/SeeScene';
import { RetrieveScene } from '../RetrieveScene/RetrieveScene';
import { ActScene } from '../ActScene/ActScene';
import { SpeechScene } from '../SpeechScene/SpeechScene';
import { GenerationScene } from '../GenerationScene/GenerationScene';
import { VerifyScene } from '../VerifyScene/VerifyScene';
import { ResearchScene } from '../ResearchScene/ResearchScene';
import { ExperienceScene } from '../ExperienceScene/ExperienceScene';
import { ToolboxScene } from '../ToolboxScene/ToolboxScene';
import { SideMissionsScene } from '../SideMissionsScene/SideMissionsScene';
import { EducationScene } from '../EducationScene/EducationScene';
import { ShipScene } from '../ShipScene/ShipScene';
import { X, ChevronLeft, ChevronRight, Compass } from 'lucide-react';

interface StationRoomModalProps {
  stationIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigateStation: (index: number) => void;
  onToggleRecruiterMode: () => void;
  onOpenCommandPalette: () => void;
}

export const StationRoomModal: React.FC<StationRoomModalProps> = ({
  stationIndex,
  isOpen,
  onClose,
  onNavigateStation,
  onToggleRecruiterMode,
  onOpenCommandPalette,
}) => {
  const currentStep = navigationSteps[stationIndex] || navigationSteps[0];
  const total = navigationSteps.length;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        onClose();
        audioSynth.playDoorOpen();
      } else if (e.key === 'ArrowRight' && stationIndex < total - 1) {
        onNavigateStation(stationIndex + 1);
        audioSynth.playGlide();
      } else if (e.key === 'ArrowLeft' && stationIndex > 0) {
        onNavigateStation(stationIndex - 1);
        audioSynth.playGlide();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, stationIndex, total]);

  if (!isOpen) return null;

  const renderContent = () => {
    switch (stationIndex) {
      case 0:
        return (
          <HeroScene
            onExecuteScroll={() => onNavigateStation(1)}
            onToggleRecruiterMode={onToggleRecruiterMode}
            onOpenCommandPalette={onOpenCommandPalette}
          />
        );
      case 1:
        return <SeeScene />;
      case 2:
        return <RetrieveScene />;
      case 3:
        return <ActScene />;
      case 4:
        return <SpeechScene />;
      case 5:
        return <GenerationScene />;
      case 6:
        return <VerifyScene />;
      case 7:
        return <ResearchScene />;
      case 8:
        return <ExperienceScene />;
      case 9:
        return <ToolboxScene />;
      case 10:
        return <SideMissionsScene />;
      case 11:
        return <EducationScene />;
      case 12:
        return <ShipScene />;
      default:
        return null;
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Station Room: ${currentStep.label}`}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9200,
        background: 'rgba(5, 7, 11, 0.88)',
        backdropFilter: 'blur(28px)',
        WebkitBackdropFilter: 'blur(28px)',
        display: 'flex',
        flexDirection: 'column',
        animation: 'roomZoomIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        overflowY: 'auto',
      }}
    >
      {/* Top Station Navigation & Exit Bar */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          background: 'rgba(9, 11, 17, 0.95)',
          borderBottom: '1px solid var(--border-technical)',
          padding: '12px 28px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 2,
              backgroundColor: currentStep.color,
              boxShadow: `0 0 10px ${currentStep.color}`,
            }}
          />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: currentStep.color, fontWeight: 700 }}>
            ROOM {currentStep.stepNumber} // {currentStep.label}
          </span>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }} className="hide-on-mobile">
            — {currentStep.domain}
          </span>
        </div>

        {/* Station Jump Controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button
            onClick={() => {
              if (stationIndex > 0) {
                onNavigateStation(stationIndex - 1);
                audioSynth.playGlide();
              }
            }}
            disabled={stationIndex === 0}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid var(--border-subtle)',
              color: stationIndex === 0 ? 'var(--text-muted)' : '#ffffff',
              padding: '4px 10px',
              borderRadius: 4,
              cursor: stationIndex === 0 ? 'default' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              opacity: stationIndex === 0 ? 0.3 : 1,
            }}
          >
            <ChevronLeft size={14} />
            <span>PREV ROOM</span>
          </button>

          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            {stationIndex + 1}/{total}
          </span>

          <button
            onClick={() => {
              if (stationIndex < total - 1) {
                onNavigateStation(stationIndex + 1);
                audioSynth.playGlide();
              }
            }}
            disabled={stationIndex === total - 1}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid var(--border-subtle)',
              color: stationIndex === total - 1 ? 'var(--text-muted)' : '#ffffff',
              padding: '4px 10px',
              borderRadius: 4,
              cursor: stationIndex === total - 1 ? 'default' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              opacity: stationIndex === total - 1 ? 0.3 : 1,
            }}
          >
            <span>NEXT ROOM</span>
            <ChevronRight size={14} />
          </button>

          {/* Close / Return to Corridor */}
          <button
            onClick={() => {
              onClose();
              audioSynth.playDoorOpen();
            }}
            data-cursor="open"
            data-cursor-label="EXIT"
            style={{
              background: 'rgba(0, 240, 255, 0.1)',
              border: '1px solid var(--accent-cyan)',
              color: 'var(--accent-cyan)',
              padding: '6px 14px',
              borderRadius: 4,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              fontWeight: 600,
              marginLeft: 8,
            }}
            title="Exit to Walkable 3D Corridor (ESC)"
          >
            <Compass size={14} />
            <span>CORRIDOR [ESC]</span>
            <X size={14} />
          </button>
        </div>
      </div>

      {/* Main Room Body */}
      <div style={{ flex: 1, padding: '20px 0 60px 0' }}>
        {renderContent()}
      </div>

      <style>{`
        @keyframes roomZoomIn {
          from {
            opacity: 0;
            transform: scale(0.97);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};
