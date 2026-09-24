import React from 'react';
import type { ITomZone } from './ITomCanvas';
import { Volume2, VolumeX, Menu, Trophy, ArrowLeft } from 'lucide-react';
import { audioSynth } from '../../utils/audio';

interface TornPaperControlsProps {
  currentZone: ITomZone;
  onZoneChange: (zone: ITomZone) => void;
  audioMuted: boolean;
  onToggleAudio: () => void;
  onOpenMap: () => void;
  onOpenAchievements: () => void;
}

export const TornPaperControls: React.FC<TornPaperControlsProps> = ({
  currentZone,
  onZoneChange,
  audioMuted,
  onToggleAudio,
  onOpenMap,
  onOpenAchievements,
}) => {
  const getBottomTicketContent = () => {
    switch (currentZone) {
      case 'ENTRANCE':
        return {
          title: 'EXPLORER',
          subtitle: `Click a door to enter. Audio is currently [${audioMuted ? '🔇 OFF' : '🔊 ON'}]`,
        };
      case 'CORRIDOR':
        return {
          title: 'WANDERER',
          subtitle: 'Scroll to explore the corridor',
        };
      case 'ABOUT':
        return {
          title: 'SKY WALKER',
          subtitle: 'Scroll to fly through my story',
        };
      case 'GALLERY':
        return {
          title: 'ART CRITIC',
          subtitle: 'Click any project frame to inspect',
        };
      case 'STUDIO':
        return {
          title: 'DIRECTOR',
          subtitle: 'Inspect Samespace & production lab',
        };
      case 'CONTACT':
        return {
          title: 'SOCIABLE',
          subtitle: 'Pick a transmission channel on the pier',
        };
    }
  };

  const ticket = getBottomTicketContent();

  const handleBack = () => {
    audioSynth.playClick(900);
    if (currentZone === 'CORRIDOR') {
      onZoneChange('ENTRANCE');
    } else {
      onZoneChange('CORRIDOR');
    }
  };

  return (
    <>
      {/* Top Left Back Button (Visible when inside a room or corridor) */}
      {currentZone !== 'ENTRANCE' && (
        <button
          onClick={handleBack}
          aria-label="Back to previous area"
          className="torn-paper-btn"
          style={{
            position: 'fixed',
            top: 20,
            left: 20,
            zIndex: 100,
            width: 44,
            height: 44,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            background: '#ffffff',
            border: '2px solid #1e232a',
            color: '#1e232a',
            boxShadow: '2px 3px 0px #1e232a',
          }}
          title="Back"
        >
          <ArrowLeft size={22} strokeWidth={2.5} />
        </button>
      )}

      {/* Top Right Controls (Menu / Sound / Achievements) */}
      <div
        style={{
          position: 'fixed',
          top: 20,
          right: 20,
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}
      >
        {/* Menu / Map Button */}
        <button
          onClick={() => {
            audioSynth.playClick(1000);
            onOpenMap();
          }}
          aria-label="Open Map Navigation"
          className="torn-paper-btn"
          style={{
            width: 44,
            height: 44,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            background: '#ffffff',
            border: '2px solid #1e232a',
            color: '#1e232a',
            boxShadow: '2px 3px 0px #1e232a',
          }}
          title="Map"
        >
          <Menu size={22} strokeWidth={2.5} />
        </button>

        {/* Audio Toggle Button */}
        <button
          onClick={onToggleAudio}
          aria-label={audioMuted ? 'Unmute Audio' : 'Mute Audio'}
          className="torn-paper-btn"
          style={{
            width: 44,
            height: 44,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            background: '#ffffff',
            border: '2px solid #1e232a',
            color: '#1e232a',
            boxShadow: '2px 3px 0px #1e232a',
          }}
          title={audioMuted ? 'Unmute Sound' : 'Mute Sound'}
        >
          {audioMuted ? (
            <VolumeX size={20} strokeWidth={2.5} />
          ) : (
            <Volume2 size={20} strokeWidth={2.5} />
          )}
        </button>

        {/* Achievements Button */}
        <button
          onClick={() => {
            audioSynth.playClick(1100);
            onOpenAchievements();
          }}
          aria-label="Open Achievements"
          className="torn-paper-btn"
          style={{
            width: 44,
            height: 44,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            background: '#ffffff',
            border: '2px solid #1e232a',
            color: '#1e232a',
            boxShadow: '2px 3px 0px #1e232a',
          }}
          title="Achievements"
        >
          <Trophy size={20} strokeWidth={2.5} />
        </button>
      </div>

      {/* Bottom Centered Torn Paper Ticket (The iconic ITom status badge) */}
      <div
        role="status"
        aria-live="polite"
        className="torn-ticket"
        style={{
          position: 'fixed',
          bottom: 24,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 90,
          background: '#ffffff',
          border: '2px solid #1e232a',
          boxShadow: '3px 4px 0px #1e232a',
          padding: '10px 24px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
          userSelect: 'none',
          pointerEvents: 'none',
          maxWidth: '90vw',
        }}
      >
        <div
          style={{
            fontFamily: '"Permanent Marker", "Patrick Hand", cursive, sans-serif',
            fontSize: '1rem',
            fontWeight: 700,
            letterSpacing: '0.05em',
            color: '#1e232a',
          }}
        >
          {ticket.title}
        </div>
        <div
          style={{
            fontFamily: '"Patrick Hand", "Comic Neue", cursive, sans-serif',
            fontSize: '0.92rem',
            color: '#475569',
          }}
        >
          {ticket.subtitle}
        </div>
      </div>
    </>
  );
};
