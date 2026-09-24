import React from 'react';
import type { ITomZone } from './ITomCanvas';
import { X } from 'lucide-react';
import { audioSynth } from '../../utils/audio';

interface MapOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  currentZone: ITomZone;
  onSelectZone: (zone: ITomZone) => void;
}

export const MapOverlay: React.FC<MapOverlayProps> = ({
  isOpen,
  onClose,
  currentZone,
  onSelectZone,
}) => {
  if (!isOpen) return null;

  const handleNavigate = (zone: ITomZone) => {
    audioSynth.playPaperRustle();
    onSelectZone(zone);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Corridor Map Navigation"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        background: 'rgba(20, 24, 32, 0.45)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        animation: 'fadeIn 0.2s ease',
      }}
      onClick={onClose}
    >
      {/* Crumpled Torn Paper Sheet */}
      <div
        className="torn-parchment-sheet"
        style={{
          width: '100%',
          maxWidth: 580,
          background: '#ffffff',
          border: '2px solid #1e232a',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.35)',
          padding: '24px 32px 36px 32px',
          position: 'relative',
          userSelect: 'none',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header: MAP & Close Button */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '2px dashed #94a3b8',
            paddingBottom: 12,
            marginBottom: 24,
          }}
        >
          <h2
            style={{
              fontFamily: '"Permanent Marker", "Patrick Hand", cursive, sans-serif',
              fontSize: '1.6rem',
              color: '#1e232a',
              letterSpacing: '0.08em',
              margin: 0,
            }}
          >
            MAP
          </h2>

          <button
            onClick={() => {
              audioSynth.playClick(900);
              onClose();
            }}
            aria-label="Close Map"
            className="torn-paper-btn"
            style={{
              background: '#f8fafc',
              border: '2px solid #1e232a',
              width: 32,
              height: 32,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '1px 2px 0px #1e232a',
            }}
          >
            <X size={18} strokeWidth={2.5} color="#1e232a" />
          </button>
        </div>

        {/* Hand-drawn Roadmap Container */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative',
            padding: '10px 0',
          }}
        >
          {/* Top Infinity Door */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginBottom: 16,
            }}
          >
            <span style={{ fontSize: '1.6rem', fontWeight: 700, color: '#1e232a' }}>∞</span>
            <div
              style={{
                width: 36,
                height: 48,
                border: '2px solid #1e232a',
                display: 'flex',
              }}
            >
              <div style={{ flex: 1, borderRight: '1px solid #1e232a' }} />
              <div style={{ flex: 1 }} />
            </div>
          </div>

          {/* Central Corridor Line */}
          <div
            style={{
              position: 'absolute',
              top: 70,
              bottom: 40,
              left: '50%',
              width: 3,
              background: '#1e232a',
              transform: 'translateX(-50%)',
            }}
          />

          {/* 4 Themed Stations along corridor path */}
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 24, zIndex: 10 }}>
            {/* 1. CONTACT (Right side) */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: '10%' }}>
              <button
                onClick={() => handleNavigate('CONTACT')}
                style={{
                  background: currentZone === 'CONTACT' ? '#fef3c7' : '#ffffff',
                  border: '2px solid #1e232a',
                  boxShadow: currentZone === 'CONTACT' ? '0 0 0 3px #ef4444' : '2px 2px 0px #1e232a',
                  padding: '8px 16px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  position: 'relative',
                }}
              >
                {currentZone === 'CONTACT' && <span className="red-push-pin" />}
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontFamily: '"Permanent Marker", cursive', fontSize: '1rem', color: '#1e232a' }}>
                    CONTACT
                  </div>
                  <div style={{ fontFamily: '"Patrick Hand", cursive', fontSize: '0.8rem', color: '#64748b' }}>
                    The Ocean Pier &amp; Beacon
                  </div>
                </div>
                <span style={{ fontSize: '1.4rem' }}>🌊</span>
              </button>
            </div>

            {/* 2. ABOUT (Left side) */}
            <div style={{ display: 'flex', justifyContent: 'flex-start', paddingLeft: '10%' }}>
              <button
                onClick={() => handleNavigate('ABOUT')}
                style={{
                  background: currentZone === 'ABOUT' ? '#fef3c7' : '#ffffff',
                  border: '2px solid #1e232a',
                  boxShadow: currentZone === 'ABOUT' ? '0 0 0 3px #ef4444' : '2px 2px 0px #1e232a',
                  padding: '8px 16px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  position: 'relative',
                }}
              >
                {currentZone === 'ABOUT' && <span className="red-push-pin" />}
                <span style={{ fontSize: '1.4rem' }}>✈️</span>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontFamily: '"Permanent Marker", cursive', fontSize: '1rem', color: '#1e232a' }}>
                    ABOUT
                  </div>
                  <div style={{ fontFamily: '"Patrick Hand", cursive', fontSize: '0.8rem', color: '#64748b' }}>
                    Sky Walker &amp; Research Papers
                  </div>
                </div>
              </button>
            </div>

            {/* 3. THE STUDIO (Right side) */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: '10%' }}>
              <button
                onClick={() => handleNavigate('STUDIO')}
                style={{
                  background: currentZone === 'STUDIO' ? '#fef3c7' : '#ffffff',
                  border: '2px solid #1e232a',
                  boxShadow: currentZone === 'STUDIO' ? '0 0 0 3px #ef4444' : '2px 2px 0px #1e232a',
                  padding: '8px 16px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  position: 'relative',
                }}
              >
                {currentZone === 'STUDIO' && <span className="red-push-pin" />}
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontFamily: '"Permanent Marker", cursive', fontSize: '1rem', color: '#1e232a' }}>
                    THE STUDIO
                  </div>
                  <div style={{ fontFamily: '"Patrick Hand", cursive', fontSize: '0.8rem', color: '#64748b' }}>
                    Samespace &amp; AI Stack
                  </div>
                </div>
                <span style={{ fontSize: '1.4rem' }}>💻</span>
              </button>
            </div>

            {/* 4. THE GALLERY (Left side) */}
            <div style={{ display: 'flex', justifyContent: 'flex-start', paddingLeft: '10%' }}>
              <button
                onClick={() => handleNavigate('GALLERY')}
                style={{
                  background: currentZone === 'GALLERY' ? '#fef3c7' : '#ffffff',
                  border: '2px solid #1e232a',
                  boxShadow: currentZone === 'GALLERY' ? '0 0 0 3px #ef4444' : '2px 2px 0px #1e232a',
                  padding: '8px 16px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  position: 'relative',
                }}
              >
                {currentZone === 'GALLERY' && <span className="red-push-pin" />}
                <span style={{ fontSize: '1.4rem' }}>🖼️</span>
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontFamily: '"Permanent Marker", cursive', fontSize: '1rem', color: '#1e232a' }}>
                    THE GALLERY
                  </div>
                  <div style={{ fontFamily: '"Patrick Hand", cursive', fontSize: '0.8rem', color: '#64748b' }}>
                    Flagship Works &amp; Computer Vision
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Bottom Entrance Circle */}
          <button
            onClick={() => handleNavigate('ENTRANCE')}
            style={{
              marginTop: 20,
              background: currentZone === 'ENTRANCE' ? '#fef3c7' : '#ffffff',
              border: '2px dashed #1e232a',
              borderRadius: '50%',
              width: 48,
              height: 48,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              zIndex: 10,
              boxShadow: currentZone === 'ENTRANCE' ? '0 0 0 3px #ef4444' : 'none',
              position: 'relative',
            }}
            title="Front Entrance"
          >
            {currentZone === 'ENTRANCE' && <span className="red-push-pin" />}
            <span style={{ fontSize: '1.2rem' }}>🏡</span>
          </button>
          <span style={{ fontFamily: '"Patrick Hand", cursive', fontSize: '0.8rem', color: '#64748b', marginTop: 4 }}>
            FRONT PORCH
          </span>
        </div>
      </div>

      <style>{`
        .red-push-pin {
          position: absolute;
          top: -12px;
          left: -12px;
          width: 20px;
          height: 20px;
          background: #ef4444;
          border: 2px solid #7f1d1d;
          border-radius: 50%;
          box-shadow: 2px 3px 6px rgba(0,0,0,0.4);
          z-index: 20;
        }
        .red-push-pin::after {
          content: '';
          position: absolute;
          top: 3px;
          left: 4px;
          width: 5px;
          height: 5px;
          background: #ffffff;
          border-radius: 50%;
        }
      `}</style>
    </div>
  );
};
