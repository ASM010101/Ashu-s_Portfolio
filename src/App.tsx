import React, { useState, useEffect } from 'react';
import { PaperTearIntro } from './components/Intro/PaperTearIntro';
import { CorridorCanvas } from './components/Canvas/CorridorCanvas';
import { StationRoomModal } from './components/StationRoom/StationRoomModal';
import { RecruiterModeView } from './components/RecruiterMode/RecruiterModeView';
import { ExecutionTrace } from './components/ExecutionTrace/ExecutionTrace';
import { CustomCursor } from './components/CustomCursor/CustomCursor';
import { CommandPalette } from './components/CommandPalette/CommandPalette';
import { DebugPanel } from './components/DebugPanel/DebugPanel';
import { navigationSteps } from './data/navigation';
import { audioSynth } from './utils/audio';
import { CornerDownLeft } from 'lucide-react';
import './App.css';

export const App: React.FC = () => {
  const [introCompleted, setIntroCompleted] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('ashu_intro_done') === 'true';
    }
    return false;
  });

  const [currentStationIndex, setCurrentStationIndex] = useState<number>(0);
  const [isRoomOpen, setIsRoomOpen] = useState<boolean>(false);
  const [recruiterMode, setRecruiterMode] = useState<boolean>(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState<boolean>(false);
  const [debugPanelOpen, setDebugPanelOpen] = useState<boolean>(false);
  const [isTouring, setIsTouring] = useState<boolean>(false);

  const totalStations = navigationSteps.length;

  const navigateToStation = (index: number) => {
    if (index < 0 || index >= totalStations) return;
    setCurrentStationIndex(index);
    audioSynth.playGlide();
  };

  const handleNextStation = () => {
    if (currentStationIndex < totalStations - 1) {
      navigateToStation(currentStationIndex + 1);
    }
  };

  const handlePrevStation = () => {
    if (currentStationIndex > 0) {
      navigateToStation(currentStationIndex - 1);
    }
  };

  const handleEnterRoom = (index: number) => {
    setCurrentStationIndex(index);
    setIsRoomOpen(true);
    audioSynth.playDoorOpen();
  };

  const handleCloseRoom = () => {
    setIsRoomOpen(false);
    audioSynth.playDoorOpen();
  };

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if typing in an input or textarea
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) {
        return;
      }

      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
        audioSynth.playClick(1100);
        return;
      }

      if (e.ctrlKey && e.shiftKey && (e.key === 'D' || e.key === 'd')) {
        e.preventDefault();
        setDebugPanelOpen((prev) => !prev);
        audioSynth.playChirp(700, 0.1);
        return;
      }

      if (e.key === 'Escape') {
        if (isRoomOpen) {
          handleCloseRoom();
        } else if (recruiterMode) {
          setRecruiterMode(false);
        } else if (isTouring) {
          setIsTouring(false);
        }
        return;
      }

      // If room is NOT open and NOT in recruiter mode: corridor navigation
      if (!isRoomOpen && !recruiterMode) {
        if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === 'ArrowDown') {
          e.preventDefault();
          handleNextStation();
        } else if (e.key === 'ArrowLeft' || e.key === 'PageUp' || e.key === 'ArrowUp') {
          e.preventDefault();
          handlePrevStation();
        } else if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          handleEnterRoom(currentStationIndex);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentStationIndex, isRoomOpen, recruiterMode, isTouring]);

  // 60-Second Guided Tour loop
  useEffect(() => {
    if (!isTouring) return;

    const timer = setTimeout(() => {
      if (currentStationIndex < totalStations - 1) {
        navigateToStation(currentStationIndex + 1);
      } else {
        setIsTouring(false);
      }
    }, 4500);

    return () => clearTimeout(timer);
  }, [isTouring, currentStationIndex, totalStations]);

  const currentStep = navigationSteps[currentStationIndex] || navigationSteps[0];

  return (
    <div className={`portfolio-root ${recruiterMode ? 'recruiter-mode-active' : ''}`}>
      {/* Precision Reticle Cursor */}
      <CustomCursor />

      {/* Interactive Paper Tear Intro (First-time landing) */}
      {!introCompleted && (
        <PaperTearIntro
          onEnter={() => {
            setIntroCompleted(true);
            sessionStorage.setItem('ashu_intro_done', 'true');
          }}
        />
      )}

      {/* Persistent Execution Trace & Spatial Telemetry Header */}
      <ExecutionTrace
        currentStationIndex={currentStationIndex}
        totalStations={totalStations}
        recruiterMode={recruiterMode}
        onToggleRecruiterMode={() => {
          setIsRoomOpen(false);
          setRecruiterMode((prev) => !prev);
        }}
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
        isTouring={isTouring}
        onToggleTour={() => setIsTouring((prev) => !prev)}
        onSelectStation={navigateToStation}
        onPrevStation={handlePrevStation}
        onNextStation={handleNextStation}
      />

      {/* 3D Walkable Corridor Canvas (ITom-style physical spatial hallway) */}
      <CorridorCanvas
        currentDoorIndex={currentStationIndex}
        onSelectDoor={navigateToStation}
        onEnterRoom={handleEnterRoom}
        isRoomOpen={isRoomOpen}
        recruiterMode={recruiterMode}
      />

      {/* RECRUITER VIEW (A1 Gallery-standard Executive Candidate Page) */}
      {recruiterMode && (
        <RecruiterModeView onSwitchToExplore={() => setRecruiterMode(false)} />
      )}

      {/* CORRIDOR FLOATING STATION CONTROLLER (Visible when in hallway) */}
      {!recruiterMode && !isRoomOpen && (
        <div
          role="region"
          aria-label="Active Corridor Portal Controller"
          style={{
            position: 'fixed',
            bottom: 78,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 8400,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 12,
            pointerEvents: 'none',
            maxWidth: '92vw',
            width: 620,
          }}
        >
          {/* Frosted Glass Floating Card for currently focused Station */}
          <div
            className="blueprint-panel corner-crosshair"
            style={{
              pointerEvents: 'auto',
              width: '100%',
              padding: '16px 24px',
              background: 'rgba(9, 12, 19, 0.88)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: `1px solid ${currentStep.color}44`,
              boxShadow: `0 12px 40px rgba(0, 0, 0, 0.8), 0 0 25px ${currentStep.color}22`,
              borderRadius: 12,
              animation: 'fadeInUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 2,
                    backgroundColor: currentStep.color,
                    boxShadow: `0 0 8px ${currentStep.color}`,
                    display: 'inline-block',
                  }}
                />
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: currentStep.color,
                    letterSpacing: '0.1em',
                  }}
                >
                  STATION {currentStep.stepNumber} // {currentStep.domain}
                </span>
              </div>

              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  color: 'var(--text-muted)',
                }}
              >
                DOOR {currentStationIndex + 1} OF {totalStations}
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
              <div>
                <h2
                  style={{
                    fontSize: '1.35rem',
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                    color: '#ffffff',
                    margin: 0,
                  }}
                >
                  {currentStep.label}
                </h2>
                <p
                  style={{
                    fontSize: '0.82rem',
                    color: 'var(--text-secondary)',
                    margin: '4px 0 0 0',
                    fontFamily: 'var(--font-body)',
                  }}
                >
                  {currentStep.sublabel} — {currentStep.domain}
                </p>
              </div>

              {/* Enter Door Button */}
              <button
                onClick={() => handleEnterRoom(currentStationIndex)}
                className="btn-primary"
                data-cursor="open"
                data-cursor-label="ENTER"
                style={{
                  whiteSpace: 'nowrap',
                  padding: '10px 20px',
                  fontSize: '0.82rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  boxShadow: `0 0 20px ${currentStep.color}44`,
                  borderColor: currentStep.color,
                  flexShrink: 0,
                }}
              >
                <span>ENTER ROOM</span>
                <CornerDownLeft size={15} />
              </button>
            </div>
          </div>

          {/* Micro Navigation Tips */}
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.68rem',
              color: 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              letterSpacing: '0.05em',
              textShadow: '0 2px 4px rgba(0,0,0,0.8)',
            }}
          >
            <span>[ ⇅ SCROLL OR DRAG TO WALK ]</span>
            <span>·</span>
            <span>[ CLICK ANY DOOR OR SPACE TO ENTER ]</span>
            <span>·</span>
            <span>[ ⌘K FOR QUICK JUMP ]</span>
          </div>
        </div>
      )}

      {/* INTERACTIVE STATION ROOM WORKBENCH MODAL */}
      <StationRoomModal
        stationIndex={currentStationIndex}
        isOpen={isRoomOpen && !recruiterMode}
        onClose={handleCloseRoom}
        onNavigateStation={(idx) => {
          setCurrentStationIndex(idx);
          audioSynth.playGlide();
        }}
        onToggleRecruiterMode={() => {
          setIsRoomOpen(false);
          setRecruiterMode(true);
        }}
        onOpenCommandPalette={() => setCommandPaletteOpen(true)}
      />

      {/* Global Command Palette (⌘K) */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        onNavigate={(sectionId: string) => {
          const idx = navigationSteps.findIndex((s) => s.id === sectionId);
          if (idx !== -1) {
            navigateToStation(idx);
            setIsRoomOpen(true);
          }
        }}
        recruiterMode={recruiterMode}
        onToggleRecruiterMode={() => {
          setIsRoomOpen(false);
          setRecruiterMode((prev) => !prev);
        }}
      />

      {/* Telemetry Debug Panel (Ctrl+Shift+D) */}
      <DebugPanel
        currentSectionId={currentStep.id}
        scrollProgress={(currentStationIndex + 1) / totalStations}
        scrollVelocity={0}
        recruiterMode={recruiterMode}
        isOpen={debugPanelOpen}
        onClose={() => setDebugPanelOpen(false)}
      />

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(14px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default App;
