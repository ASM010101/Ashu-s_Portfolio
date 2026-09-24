import React from 'react';
import { galleryProjectsList } from './GalleryInspectModal';
import type { GalleryProject } from './GalleryInspectModal';
import { Eye } from 'lucide-react';
import { audioSynth } from '../../utils/audio';

interface GalleryOverlayProps {
  onSelectProject: (project: GalleryProject) => void;
  onClose?: () => void;
}

export const GalleryOverlay: React.FC<GalleryOverlayProps> = ({
  onSelectProject,
}) => {
  return (
    <div
      role="region"
      aria-label="The Gallery: Exhibition of Flagship Works"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 80,
        background: 'rgba(246, 247, 250, 0.94)',
        backdropFilter: 'blur(10px)',
        overflowY: 'auto',
        padding: '80px 24px 100px 24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        animation: 'fadeIn 0.25s ease',
      }}
    >
      <div style={{ maxWidth: 940, width: '100%' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div
            style={{
              fontFamily: '"Permanent Marker", cursive',
              fontSize: '2.4rem',
              color: '#1e232a',
              letterSpacing: '0.04em',
            }}
          >
            THE GALLERY
          </div>
          <div
            style={{
              fontFamily: '"Patrick Hand", cursive',
              fontSize: '1.25rem',
              color: '#475569',
              marginTop: 4,
            }}
          >
            Click any picture frame to inspect verified architecture and benchmarks
          </div>
        </div>

        {/* 2x2 Picture Frames Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
            gap: 24,
          }}
        >
          {galleryProjectsList.map((project) => (
            <div
              key={project.id}
              onClick={() => {
                audioSynth.playClick(1100);
                onSelectProject(project);
              }}
              className="torn-parchment-sheet"
              style={{
                background: '#ffffff',
                border: '3px solid #1e232a',
                boxShadow: '4px 5px 0px #1e232a',
                padding: '24px',
                cursor: 'pointer',
                transition: 'transform 0.15s ease, box-shadow 0.15s ease',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translate(-3px, -3px)';
                e.currentTarget.style.boxShadow = '7px 8px 0px #1e232a';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translate(0, 0)';
                e.currentTarget.style.boxShadow = '4px 5px 0px #1e232a';
              }}
            >
              <div>
                {/* Badge */}
                <span
                  style={{
                    fontFamily: '"JetBrains Mono", monospace',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    color: '#2563eb',
                    background: '#eff6ff',
                    border: '1px solid #bfdbfe',
                    padding: '2px 8px',
                    borderRadius: 3,
                  }}
                >
                  {project.badge}
                </span>

                {/* Title */}
                <h3
                  style={{
                    fontFamily: '"Permanent Marker", cursive',
                    fontSize: '1.25rem',
                    color: '#1e232a',
                    margin: '10px 0 8px 0',
                    lineHeight: 1.25,
                  }}
                >
                  {project.title}
                </h3>

                {/* Description snippet */}
                <p
                  style={{
                    fontFamily: '"Patrick Hand", cursive',
                    fontSize: '1.05rem',
                    lineHeight: 1.5,
                    color: '#475569',
                    margin: 0,
                  }}
                >
                  {project.description.slice(0, 140)}...
                </p>
              </div>

              {/* Action Bar */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderTop: '2px dashed #cbd5e1',
                  paddingTop: 12,
                  marginTop: 18,
                }}
              >
                <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                  {project.stack.slice(0, 3).map((s, idx) => (
                    <span
                      key={idx}
                      style={{
                        fontFamily: '"JetBrains Mono", monospace',
                        fontSize: '0.7rem',
                        background: '#f1f5f9',
                        border: '1px solid #94a3b8',
                        padding: '1px 6px',
                        borderRadius: 3,
                        color: '#334155',
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                    fontFamily: '"Permanent Marker", cursive',
                    fontSize: '0.85rem',
                    color: '#1e232a',
                  }}
                >
                  <Eye size={15} />
                  <span>INSPECT</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
