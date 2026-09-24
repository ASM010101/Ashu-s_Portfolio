import React, { useState, useEffect } from 'react';
import { ITomCanvas } from './components/ITom/ITomCanvas';
import type { ITomZone } from './components/ITom/ITomCanvas';
import { TornPaperControls } from './components/ITom/TornPaperControls';
import { MapOverlay } from './components/ITom/MapOverlay';
import { AchievementsPanel } from './components/ITom/AchievementsPanel';
import type { AchievementItem } from './components/ITom/AchievementsPanel';
import { GalleryInspectModal } from './components/ITom/GalleryInspectModal';
import type { GalleryProject } from './components/ITom/GalleryInspectModal';
import { GalleryOverlay } from './components/ITom/GalleryOverlay';
import { StudioOverlay } from './components/ITom/StudioOverlay';
import { AboutOverlay } from './components/ITom/AboutOverlay';
import { audioSynth } from './utils/audio';
import './App.css';

export const App: React.FC = () => {
  const [currentZone, setCurrentZone] = useState<ITomZone>('ENTRANCE');
  const [audioMuted, setAudioMuted] = useState<boolean>(true);
  const [isMapOpen, setIsMapOpen] = useState<boolean>(false);
  const [isAchievementsOpen, setIsAchievementsOpen] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<GalleryProject | null>(null);

  const [achievements, setAchievements] = useState<AchievementItem[]>([
    { id: 'explorer', title: 'Explorer', desc: 'Click a door to enter', unlocked: false },
    { id: 'wanderer', title: 'Wanderer', desc: 'Scroll to explore the corridor', unlocked: false },
    { id: 'skywalker', title: 'Sky Walker', desc: 'Scroll to fly through my story', unlocked: false },
    { id: 'director', title: 'Director', desc: 'Drag to rotate and browse', unlocked: false },
    { id: 'artcritic', title: 'Art Critic', desc: 'Click project to inspect', unlocked: false },
    { id: 'sociable', title: 'Sociable', desc: 'Find a contact method', unlocked: false },
  ]);

  const unlockAchievement = (id: string) => {
    setAchievements((prev) =>
      prev.map((item) => {
        if (item.id === id && !item.unlocked) {
          audioSynth.playChirp(1200, 0.2);
          return { ...item, unlocked: true };
        }
        return item;
      })
    );
  };

  const handleToggleAudio = () => {
    const muted = audioSynth.toggleMute();
    setAudioMuted(muted);
  };

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (selectedProject) {
          setSelectedProject(null);
        } else if (isMapOpen) {
          setIsMapOpen(false);
        } else if (isAchievementsOpen) {
          setIsAchievementsOpen(false);
        } else if (currentZone !== 'ENTRANCE' && currentZone !== 'CORRIDOR') {
          setCurrentZone('CORRIDOR');
        } else if (currentZone === 'CORRIDOR') {
          setCurrentZone('ENTRANCE');
        }
      } else if (e.key === 'm' || e.key === 'M') {
        setIsMapOpen((prev) => !prev);
        audioSynth.playClick(1000);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentZone, isMapOpen, isAchievementsOpen, selectedProject]);

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', position: 'relative' }}>
      {/* 3D ITom Spatial Canvas World */}
      <ITomCanvas
        currentZone={currentZone}
        onZoneChange={(zone) => {
          setCurrentZone(zone);
          if (zone === 'CORRIDOR') unlockAchievement('wanderer');
          if (zone === 'ABOUT') unlockAchievement('skywalker');
          if (zone === 'GALLERY') unlockAchievement('artcritic');
          if (zone === 'STUDIO') unlockAchievement('director');
          if (zone === 'CONTACT') unlockAchievement('sociable');
        }}
        onInspectProject={() => {}}
        audioMuted={audioMuted}
        onUnlockAchievement={unlockAchievement}
      />

      {/* Top and Bottom Torn Paper UI Controls (Exact ITom style) */}
      <TornPaperControls
        currentZone={currentZone}
        onZoneChange={setCurrentZone}
        audioMuted={audioMuted}
        onToggleAudio={handleToggleAudio}
        onOpenMap={() => setIsMapOpen(true)}
        onOpenAchievements={() => setIsAchievementsOpen(true)}
      />

      {/* 2D Zone Overlays (Gallery, Studio, About) */}
      {currentZone === 'GALLERY' && (
        <GalleryOverlay
          onSelectProject={(project) => {
            setSelectedProject(project);
            unlockAchievement('artcritic');
          }}
        />
      )}

      {currentZone === 'STUDIO' && (
        <StudioOverlay />
      )}

      {currentZone === 'ABOUT' && (
        <AboutOverlay />
      )}

      {/* Project Detail Modal */}
      <GalleryInspectModal
        isOpen={Boolean(selectedProject)}
        selectedProject={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Crumpled Paper Roadmap Overlay (Map) */}
      <MapOverlay
        isOpen={isMapOpen}
        onClose={() => setIsMapOpen(false)}
        currentZone={currentZone}
        onSelectZone={(zone) => {
          setCurrentZone(zone);
          if (zone === 'CORRIDOR') unlockAchievement('wanderer');
          if (zone === 'ABOUT') unlockAchievement('skywalker');
          if (zone === 'GALLERY') unlockAchievement('artcritic');
          if (zone === 'STUDIO') unlockAchievement('director');
          if (zone === 'CONTACT') unlockAchievement('sociable');
        }}
      />

      {/* Achievements Slideout Panel */}
      <AchievementsPanel
        isOpen={isAchievementsOpen}
        onClose={() => setIsAchievementsOpen(false)}
        achievements={achievements}
      />
    </div>
  );
};

export default App;
