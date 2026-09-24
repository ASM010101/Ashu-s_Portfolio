import React from 'react';
import { experienceData } from '../../data/experience';
import { skillsData, certificationsData } from '../../data/skills';
import { Award, CheckCircle } from 'lucide-react';

interface StudioOverlayProps {
  onClose?: () => void;
}

export const StudioOverlay: React.FC<StudioOverlayProps> = () => {
  return (
    <div
      role="region"
      aria-label="The Studio: Experience and Engineering Lab"
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
      <div style={{ maxWidth: 840, width: '100%' }}>
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
            THE STUDIO
          </div>
          <div
            style={{
              fontFamily: '"Patrick Hand", cursive',
              fontSize: '1.25rem',
              color: '#475569',
              marginTop: 4,
            }}
          >
            Production Engineering Experience &amp; Technical Lab
          </div>
        </div>

        {/* Experience Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginBottom: 40 }}>
          {experienceData.map((job) => (
            <div
              key={job.id}
              className="torn-parchment-sheet"
              style={{
                background: '#ffffff',
                border: '2px solid #1e232a',
                boxShadow: '3px 4px 0px #1e232a',
                padding: '24px 28px',
                position: 'relative',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: 8,
                  borderBottom: '2px dashed #cbd5e1',
                  paddingBottom: 12,
                  marginBottom: 14,
                }}
              >
                <div>
                  <h3
                    style={{
                      fontFamily: '"Permanent Marker", cursive',
                      fontSize: '1.35rem',
                      color: '#1e232a',
                      margin: 0,
                    }}
                  >
                    {job.role}
                  </h3>
                  <div
                    style={{
                      fontFamily: '"Patrick Hand", cursive',
                      fontSize: '1.1rem',
                      color: '#2563eb',
                      fontWeight: 700,
                      marginTop: 2,
                    }}
                  >
                    {job.company} · {job.location}
                  </div>
                </div>

                <span
                  style={{
                    fontFamily: '"JetBrains Mono", monospace',
                    fontSize: '0.8rem',
                    background: '#f1f5f9',
                    border: '1.5px solid #1e232a',
                    padding: '4px 10px',
                    borderRadius: 4,
                    color: '#1e232a',
                  }}
                >
                  {job.period}
                </span>
              </div>

              {/* Highlights */}
              <ul style={{ margin: 0, paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
                {job.highlights.map((h, i) => (
                  <li
                    key={i}
                    style={{
                      fontFamily: '"Patrick Hand", cursive',
                      fontSize: '1.1rem',
                      lineHeight: 1.5,
                      color: '#334155',
                    }}
                  >
                    {h}
                  </li>
                ))}
              </ul>

              {/* Tech Stack Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 16 }}>
                {job.skills.map((tech, i) => (
                  <span
                    key={i}
                    style={{
                      fontFamily: '"JetBrains Mono", monospace',
                      fontSize: '0.75rem',
                      background: '#f8fafc',
                      border: '1px solid #94a3b8',
                      padding: '2px 8px',
                      borderRadius: 3,
                      color: '#475569',
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Certifications & Skills */}
        <div
          className="torn-parchment-sheet"
          style={{
            background: '#ffffff',
            border: '2px solid #1e232a',
            boxShadow: '3px 4px 0px #1e232a',
            padding: '24px 28px',
            marginBottom: 30,
          }}
        >
          <div
            style={{
              fontFamily: '"Permanent Marker", cursive',
              fontSize: '1.3rem',
              color: '#1e232a',
              marginBottom: 16,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <Award size={20} color="#eab308" />
            <span>CERTIFICATIONS &amp; PRODUCTION STACK</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
            {certificationsData.map((c, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <CheckCircle size={16} color="#16a34a" />
                <span style={{ fontFamily: '"Patrick Hand", cursive', fontSize: '1.15rem', color: '#1e293b' }}>
                  <strong>{c.name}</strong> — {c.issuer} ({c.year})
                </span>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {skillsData.flatMap((g) => g.items).map((item, i) => (
              <span
                key={i}
                style={{
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: '0.8rem',
                  background: '#f1f5f9',
                  border: '1.5px solid #1e232a',
                  padding: '4px 10px',
                  borderRadius: 4,
                  color: '#1e232a',
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
