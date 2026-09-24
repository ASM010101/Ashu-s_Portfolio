import React from 'react';
import { educationData } from '../../data/education';
import { publicationsData } from '../../data/publications';
import { GraduationCap, BookOpen, Download } from 'lucide-react';
import { audioSynth } from '../../utils/audio';

interface AboutOverlayProps {
  onClose?: () => void;
}

export const AboutOverlay: React.FC<AboutOverlayProps> = () => {
  return (
    <div
      role="region"
      aria-label="About: Story, Education and Publications"
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
            ASHISH MAURYA
          </div>
          <div
            style={{
              fontFamily: '"Caveat", cursive',
              fontSize: '1.5rem',
              color: '#d97706',
              marginTop: 4,
            }}
          >
            &ldquo;I don&apos;t just use models. I build the systems around them.&rdquo;
          </div>
        </div>

        {/* Story Summary Card */}
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
          <p
            style={{
              fontFamily: '"Patrick Hand", cursive',
              fontSize: '1.25rem',
              lineHeight: 1.6,
              color: '#334155',
              margin: '0 0 16px 0',
            }}
          >
            Applied AI Engineer focused on making generative models, agentic workflows, and real-time vision pipelines robust, predictable, and measurable in production. Currently pursuing <strong>M.Tech in Artificial Intelligence at IIT Patna</strong> (2026–2028). Formerly full-time <strong>SDE-1 at Samespace</strong>, building real-time conversational telephony systems and research fellow at <strong>HyperVerge</strong> and <strong>IndiaAI Mission</strong>.
          </p>

          <div style={{ display: 'flex', gap: 12 }}>
            <a
              href="resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => audioSynth.playPaperRustle()}
              className="torn-paper-btn"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '8px 18px',
                background: '#1e232a',
                color: '#ffffff',
                textDecoration: 'none',
                fontFamily: '"Permanent Marker", cursive',
                fontSize: '0.95rem',
                border: '2px solid #1e232a',
                boxShadow: '2px 3px 0px #64748b',
              }}
            >
              <Download size={16} />
              <span>DOWNLOAD RESUME (PDF)</span>
            </a>
          </div>
        </div>

        {/* Education Timeline */}
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
            <GraduationCap size={22} color="#2563eb" />
            <span>ACADEMIC ROOTS</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {educationData.map((edu) => (
              <div
                key={edu.id}
                style={{
                  borderLeft: '3px solid #1e232a',
                  paddingLeft: 14,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
                  <h4
                    style={{
                      fontFamily: '"Permanent Marker", cursive',
                      fontSize: '1.15rem',
                      color: '#1e232a',
                      margin: 0,
                    }}
                  >
                    {edu.degree}
                  </h4>
                  <span
                    style={{
                      fontFamily: '"JetBrains Mono", monospace',
                      fontSize: '0.8rem',
                      color: '#64748b',
                    }}
                  >
                    {edu.period}
                  </span>
                </div>
                <div
                  style={{
                    fontFamily: '"Patrick Hand", cursive',
                    fontSize: '1.1rem',
                    color: '#2563eb',
                    fontWeight: 700,
                  }}
                >
                  {edu.institution}
                </div>
                <div
                  style={{
                    fontFamily: '"Patrick Hand", cursive',
                    fontSize: '1rem',
                    color: '#475569',
                    marginTop: 2,
                  }}
                >
                  {edu.grade ? `Grade: ${edu.grade} · ` : ''}
                  {edu.takeaways.join(' · ')}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Peer-Reviewed Publications */}
        <div
          className="torn-parchment-sheet"
          style={{
            background: '#ffffff',
            border: '2px solid #1e232a',
            boxShadow: '3px 4px 0px #1e232a',
            padding: '24px 28px',
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
            <BookOpen size={22} color="#16a34a" />
            <span>PEER-REVIEWED RESEARCH PAPERS</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            {publicationsData.map((pub) => (
              <div
                key={pub.id}
                style={{
                  borderLeft: '3px solid #16a34a',
                  paddingLeft: 14,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
                  <h4
                    style={{
                      fontFamily: '"Permanent Marker", cursive',
                      fontSize: '1.1rem',
                      color: '#1e232a',
                      margin: 0,
                    }}
                  >
                    {pub.title}
                  </h4>
                  <span
                    style={{
                      fontFamily: '"JetBrains Mono", monospace',
                      fontSize: '0.78rem',
                      background: '#f0fdf4',
                      border: '1px solid #86efac',
                      color: '#15803d',
                      padding: '2px 8px',
                      borderRadius: 3,
                    }}
                  >
                    {pub.badge} · {pub.date}
                  </span>
                </div>
                <div
                  style={{
                    fontFamily: '"Patrick Hand", cursive',
                    fontSize: '1rem',
                    color: '#64748b',
                    marginTop: 2,
                  }}
                >
                  {pub.venue} · {pub.role}
                </div>
                <p
                  style={{
                    fontFamily: '"Patrick Hand", cursive',
                    fontSize: '1.05rem',
                    color: '#334155',
                    margin: '6px 0 0 0',
                  }}
                >
                  {pub.summary}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
