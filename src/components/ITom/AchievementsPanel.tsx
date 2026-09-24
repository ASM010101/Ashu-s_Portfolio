import React from 'react';
import { X, CheckCircle, Lock } from 'lucide-react';
import { audioSynth } from '../../utils/audio';

export interface AchievementItem {
  id: string;
  title: string;
  desc: string;
  unlocked: boolean;
}

interface AchievementsPanelProps {
  isOpen: boolean;
  onClose: () => void;
  achievements: AchievementItem[];
}

export const AchievementsPanel: React.FC<AchievementsPanelProps> = ({
  isOpen,
  onClose,
  achievements,
}) => {
  if (!isOpen) return null;

  const unlockedCount = achievements.filter((a) => a.unlocked).length;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Achievements Panel"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 210,
        background: 'rgba(15, 20, 28, 0.4)',
        backdropFilter: 'blur(6px)',
        display: 'flex',
        justifyContent: 'flex-end',
        animation: 'fadeIn 0.2s ease',
      }}
      onClick={onClose}
    >
      {/* Torn Paper Sliding Panel */}
      <div
        className="torn-parchment-sheet"
        style={{
          width: '100%',
          maxWidth: 380,
          height: '100%',
          background: '#ffffff',
          borderLeft: '3px solid #1e232a',
          boxShadow: '-10px 0 35px rgba(0, 0, 0, 0.25)',
          padding: '24px 28px',
          display: 'flex',
          flexDirection: 'column',
          animation: 'slideInRight 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards',
          userSelect: 'none',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '2px dashed #94a3b8',
            paddingBottom: 14,
            marginBottom: 20,
          }}
        >
          <h2
            style={{
              fontFamily: '"Permanent Marker", "Patrick Hand", cursive, sans-serif',
              fontSize: '1.35rem',
              color: '#1e232a',
              letterSpacing: '0.06em',
              margin: 0,
            }}
          >
            ACHIEVEMENTS
          </h2>

          <button
            onClick={() => {
              audioSynth.playClick(900);
              onClose();
            }}
            aria-label="Close Achievements"
            className="torn-paper-btn"
            style={{
              background: '#f8fafc',
              border: '2px solid #1e232a',
              width: 30,
              height: 30,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '1px 2px 0px #1e232a',
            }}
          >
            <X size={16} strokeWidth={2.5} color="#1e232a" />
          </button>
        </div>

        {/* Achievement Checklist */}
        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 18 }}>
          {achievements.map((item) => (
            <div
              key={item.id}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 12,
                opacity: item.unlocked ? 1 : 0.45,
                transition: 'opacity 0.2s ease',
              }}
            >
              {item.unlocked ? (
                <CheckCircle size={22} color="#16a34a" strokeWidth={2.5} style={{ flexShrink: 0, marginTop: 2 }} />
              ) : (
                <Lock size={20} color="#94a3b8" strokeWidth={2.2} style={{ flexShrink: 0, marginTop: 3 }} />
              )}

              <div>
                <div
                  style={{
                    fontFamily: '"Permanent Marker", "Patrick Hand", cursive, sans-serif',
                    fontSize: '1.05rem',
                    color: '#1e232a',
                  }}
                >
                  {item.title}
                </div>
                <div
                  style={{
                    fontFamily: '"Patrick Hand", "Comic Neue", cursive, sans-serif',
                    fontSize: '0.9rem',
                    color: '#475569',
                    marginTop: 2,
                  }}
                >
                  {item.desc}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer with Counter */}
        <div
          style={{
            borderTop: '2px dashed #94a3b8',
            paddingTop: 16,
            textAlign: 'center',
            fontFamily: '"Permanent Marker", cursive',
            fontSize: '1rem',
            letterSpacing: '0.08em',
            color: '#1e232a',
          }}
        >
          {unlockedCount} / {achievements.length} EXPLORED
        </div>
      </div>

      <style>{`
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
};
