import React, { useState } from 'react';
import { audioSynth } from '../../utils/audio';
import { Eye, Scan, Target, Navigation2, CheckCircle2, ShieldCheck } from 'lucide-react';

export const SeeScene: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'kyc' | 'uav'>('kyc');
  const [isScanning, setIsScanning] = useState(true);

  return (
    <section
      id="see"
      aria-label="Computer Vision and Spatial Perception"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 10,
        padding: '100px 24px 60px 24px',
        maxWidth: 1200,
        margin: '0 auto',
      }}
    >
      {/* Hand-drawn margin annotation */}
      <div
        className="hand-annotation"
        style={{
          position: 'absolute',
          top: 70,
          right: '8%',
          opacity: 0.85,
        }}
      >
        // Vision: Raw pixels &rarr; Bounding coordinates &rarr; Navigable geometry
      </div>

      {/* Section Header */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
          <span className="tech-tag">
            <Eye size={13} />
            01 // SEE
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              color: 'var(--accent-cyan)',
            }}
          >
            SPATIAL PERCEPTION &amp; OCR
          </span>
        </div>

        <h2
          style={{
            fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)',
            letterSpacing: '-0.03em',
            marginBottom: 12,
          }}
        >
          COMPUTERS THAT SEE.
        </h2>

        <p style={{ maxWidth: 740, fontSize: '1.05rem', color: 'var(--text-secondary)' }}>
          Transforming uncalibrated video feeds, identity credentials, and drone sensory inputs into
          structured, actionable coordinate planes.
        </p>
      </div>

      {/* Tab Selector */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 28 }}>
        <button
          onClick={() => {
            setActiveTab('kyc');
            audioSynth.playClick(950);
          }}
          className={activeTab === 'kyc' ? 'btn-primary' : 'btn-secondary'}
          style={{ padding: '8px 16px', fontSize: '0.78rem' }}
          data-cursor="open"
          data-cursor-label="KYC"
        >
          <Scan size={14} />
          <span>PROJECT: ONLINE VIDEO KYC</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('uav');
            audioSynth.playClick(950);
          }}
          className={activeTab === 'uav' ? 'btn-primary' : 'btn-secondary'}
          style={{ padding: '8px 16px', fontSize: '0.78rem' }}
          data-cursor="open"
          data-cursor-label="UAV"
        >
          <Navigation2 size={14} />
          <span>RESEARCH: UAV YOLO PATH PLANNING</span>
        </button>
      </div>

      {/* Interactive Inspection Desk Container */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 24,
          alignItems: 'start',
        }}
      >
        {/* Left: Interactive Visual Inspection Viewport */}
        <div
          className="blueprint-panel corner-crosshair scanline-effect"
          style={{
            padding: 24,
            minHeight: 380,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            background: 'rgba(10, 13, 20, 0.85)',
          }}
        >
          {/* Top Telemetry Header */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1px solid var(--border-subtle)',
              paddingBottom: 10,
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              color: 'var(--text-muted)',
            }}
          >
            <span>CHANNEL: 0xVISION_INSPECT</span>
            <span style={{ color: 'var(--accent-cyan)' }}>
              MODE: {activeTab === 'kyc' ? 'OCR_FACE_VERIFY' : 'YOLO_OBSTACLE_AVOIDANCE'}
            </span>
          </div>

          {/* Interactive Visual Canvas Area */}
          <div
            style={{
              position: 'relative',
              height: 240,
              margin: '20px 0',
              border: '1px dashed rgba(0, 240, 255, 0.25)',
              borderRadius: 4,
              overflow: 'hidden',
              background: 'radial-gradient(circle at center, rgba(0, 240, 255, 0.05) 0%, transparent 70%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Animated Laser Scanning Line */}
            {isScanning && (
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 2,
                  background: activeTab === 'kyc' ? '#00f0ff' : '#00f59b',
                  boxShadow: `0 0 12px ${activeTab === 'kyc' ? '#00f0ff' : '#00f59b'}`,
                  animation: 'scanSweep 2.8s ease-in-out infinite alternate',
                  zIndex: 4,
                }}
              />
            )}

            {activeTab === 'kyc' ? (
              /* Video KYC Simulated Document & Face Detection */
              <div
                style={{
                  position: 'relative',
                  width: '85%',
                  height: '75%',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: 6,
                  padding: 12,
                  display: 'flex',
                  gap: 14,
                  alignItems: 'center',
                }}
              >
                {/* Face Anchor Box */}
                <div
                  style={{
                    width: 70,
                    height: 85,
                    border: '2px solid var(--accent-cyan)',
                    borderRadius: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    background: 'rgba(0, 240, 255, 0.05)',
                  }}
                >
                  <Target size={24} color="var(--accent-cyan)" />
                  <span
                    style={{
                      position: 'absolute',
                      bottom: -18,
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.62rem',
                      color: 'var(--accent-cyan)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    FACE_ANCHOR [VERIFIED]
                  </span>
                </div>

                {/* Extracted Document Fields */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <div
                    style={{
                      border: '1px solid rgba(0, 245, 155, 0.5)',
                      padding: '4px 8px',
                      borderRadius: 3,
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.68rem',
                      color: 'var(--accent-emerald)',
                    }}
                  >
                    DOC_ID: EXTRACTED // OCR MATCH
                  </div>
                  <div
                    style={{
                      border: '1px solid rgba(0, 240, 255, 0.3)',
                      padding: '4px 8px',
                      borderRadius: 3,
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.68rem',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    LIVENESS: 3D FLASH VERIFIED
                  </div>
                  <div
                    style={{
                      border: '1px solid rgba(255, 107, 74, 0.3)',
                      padding: '4px 8px',
                      borderRadius: 3,
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.68rem',
                      color: 'var(--accent-coral)',
                    }}
                  >
                    TAMPER_DETECTION: CLEAN
                  </div>
                </div>
              </div>
            ) : (
              /* UAV YOLO Path Planning Vector Simulation */
              <div
                style={{
                  position: 'relative',
                  width: '90%',
                  height: '80%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                {/* Drone Waypoint */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 4,
                  }}
                >
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      border: '2px solid var(--accent-cyan)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Navigation2 size={16} color="var(--accent-cyan)" />
                  </div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--accent-cyan)' }}>
                    UAV_ORIGIN
                  </span>
                </div>

                {/* Trajectory Vector Path SVG */}
                <svg width="180" height="90" style={{ overflow: 'visible' }}>
                  <path
                    d="M 10 45 Q 60 10, 110 55 T 170 35"
                    fill="none"
                    stroke="#00f59b"
                    strokeWidth="2"
                    strokeDasharray="4 2"
                  />
                  {/* Obstacle Bounding Rectangles detected by YOLO */}
                  <rect
                    x="50"
                    y="15"
                    width="30"
                    height="40"
                    fill="rgba(255, 107, 74, 0.15)"
                    stroke="#ff6b4a"
                    strokeWidth="1.5"
                  />
                  <rect
                    x="115"
                    y="50"
                    width="35"
                    height="35"
                    fill="rgba(255, 107, 74, 0.15)"
                    stroke="#ff6b4a"
                    strokeWidth="1.5"
                  />
                </svg>

                {/* Destination Clearance Waypoint */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 4,
                      border: '2px solid var(--accent-emerald)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <CheckCircle2 size={15} color="var(--accent-emerald)" />
                  </div>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.6rem', color: 'var(--accent-emerald)' }}>
                    CLEAR_GOAL
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Interactive controls */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button
              onClick={() => {
                setIsScanning(!isScanning);
                audioSynth.playClick(1050);
              }}
              style={{
                background: 'rgba(0, 240, 255, 0.08)',
                border: '1px solid rgba(0, 240, 255, 0.25)',
                color: 'var(--accent-cyan)',
                padding: '4px 10px',
                borderRadius: 3,
                fontSize: '0.72rem',
                cursor: 'pointer',
                fontFamily: 'var(--font-mono)',
              }}
            >
              {isScanning ? 'PAUSE SCANNER' : 'START SCANNER'}
            </button>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-muted)' }}>
              PIPELINE: OPENCV + YOLOV8
            </span>
          </div>
        </div>

        {/* Right: Technical Explanation & Evidence Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {activeTab === 'kyc' ? (
            <div className="blueprint-panel" style={{ padding: 22 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <ShieldCheck size={18} color="var(--accent-cyan)" />
                <h3 style={{ fontSize: '1.2rem' }}>Online Video KYC System</h3>
              </div>

              <div style={{ display: 'flex', gap: 6, marginBottom: 14, flexWrap: 'wrap' }}>
                <span className="tech-tag">Standard Chartered Hackathon</span>
                <span className="tech-tag tech-tag-emerald">Face Verification</span>
                <span className="tech-tag tech-tag-gold">OCR Pipeline</span>
              </div>

              <p style={{ fontSize: '0.92rem', marginBottom: 16 }}>
                Built an AI-powered KYC system for secure customer onboarding at the Standard
                Chartered Hackathon, combining face verification with document-validation workflows.
              </p>

              <div
                style={{
                  background: 'rgba(7, 8, 11, 0.6)',
                  border: '1px solid var(--border-subtle)',
                  padding: 12,
                  borderRadius: 4,
                  fontSize: '0.78rem',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                <div style={{ color: 'var(--accent-cyan)', marginBottom: 4 }}>CORE PIPELINE FLOW:</div>
                <div style={{ color: 'var(--text-secondary)' }}>
                  Video Stream &rarr; Liveness &amp; Face Anchor &rarr; OCR Extraction &rarr; Document
                  Validation Check &rarr; Secure Customer Clearance
                </div>
              </div>
            </div>
          ) : (
            <div className="blueprint-panel" style={{ padding: 22 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <Navigation2 size={18} color="var(--accent-emerald)" />
                <h3 style={{ fontSize: '1.2rem' }}>UAV Path Planning with YOLO</h3>
              </div>

              <div style={{ display: 'flex', gap: 6, marginBottom: 14, flexWrap: 'wrap' }}>
                <span className="tech-tag tech-tag-emerald">IEEE Publication (Jun 2024)</span>
                <span className="tech-tag">Co-Author (5 authors)</span>
                <span className="tech-tag tech-tag-coral">YOLO Architecture</span>
              </div>

              <p style={{ fontSize: '0.92rem', marginBottom: 16 }}>
                Investigated YOLO-based object detection for autonomous UAV path planning, evaluating
                model efficiency and deployment constraints in resource-limited environments.
              </p>

              <div
                style={{
                  background: 'rgba(7, 8, 11, 0.6)',
                  border: '1px solid var(--border-subtle)',
                  padding: 12,
                  borderRadius: 4,
                  fontSize: '0.78rem',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                <div style={{ color: 'var(--accent-emerald)', marginBottom: 4 }}>
                  ENGINEERING OBJECTIVE:
                </div>
                <div style={{ color: 'var(--text-secondary)' }}>
                  Evaluated model efficiency and edge deployment constraints under compute-limited onboard
                  hardware for real-time trajectory re-planning.
                </div>
              </div>
            </div>
          )}

          {/* Connected Toolbox Technologies for this scene */}
          <div
            className="blueprint-panel"
            style={{
              padding: 16,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: 'rgba(12, 14, 20, 0.6)',
            }}
          >
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              LOCALIZED TOOLBOX:
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {['YOLOv8', 'OpenCV', 'Roboflow', 'Python'].map((tool) => (
                <span
                  key={tool}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    color: 'var(--accent-cyan)',
                    background: 'rgba(0, 240, 255, 0.06)',
                    padding: '2px 8px',
                    borderRadius: 3,
                    border: '1px solid rgba(0, 240, 255, 0.2)',
                  }}
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scanSweep {
          0% { top: 0%; }
          100% { top: 96%; }
        }
      `}</style>
    </section>
  );
};
