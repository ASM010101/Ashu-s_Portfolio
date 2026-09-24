import React from 'react';
import { X, ExternalLink, CheckCircle } from 'lucide-react';
import { audioSynth } from '../../utils/audio';

const GithubIcon: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

export interface GalleryProject {
  id: string;
  title: string;
  category: string;
  badge: string;
  description: string;
  metrics: string[];
  stack: string[];
  githubUrl?: string;
  liveUrl?: string;
  paperDoi?: string;
}

export const galleryProjectsList: GalleryProject[] = [
  {
    id: 'uav-yolo',
    title: 'UAV YOLOv8 Real-Time Surveillance & Anti-Spoofing',
    category: 'Computer Vision & IEEE Research',
    badge: 'IEEE Published · Jun 2024',
    description:
      'Engineered an edge-optimized YOLOv8 pipeline for autonomous UAV aerial surveillance and liveness verification. Integrated custom anchor refinement and lightweight backbone quantization for high-speed edge hardware.',
    metrics: ['91.3% mAP@0.5', '<18ms inference latency on Jetson Orin', 'Peer-reviewed IEEE publication'],
    stack: ['PyTorch', 'YOLOv8', 'OpenCV', 'TensorRT', 'Edge AI'],
    paperDoi: 'https://doi.org/10.1109/UAV-YOLO-2024',
    githubUrl: 'https://github.com/ASM010101',
  },
  {
    id: 'standard-chartered-kyc',
    title: 'Standard Chartered Real-Time Video KYC Pipeline',
    category: 'Computer Vision & Hackathon Winner',
    badge: 'Hackathon Winner · 1st Place',
    description:
      'Full-stack automated Video KYC identity verification system. Combines facial landmark 3D depth analysis, active optical flow anti-spoofing, and document OCR under 400ms.',
    metrics: ['99.4% anti-spoofing precision', '<400ms end-to-end OCR latency', '1st Place Hackathon Award'],
    stack: ['Python', 'FastAPI', 'MediaPipe', 'Tesseract OCR', 'Docker'],
    githubUrl: 'https://github.com/ASM010101',
  },
  {
    id: 'barclays-anomaly',
    title: 'Barclays Multi-Agent Financial Anomaly Detection',
    category: 'Agentic Systems & Graph DAG',
    badge: 'Barclays Winner · 1st Place',
    description:
      'Autonomous multi-agent DAG pipeline for real-time transactional fraud triage. Features dual-agent deliberation, deterministic rule verification, and automated audit logging.',
    metrics: ['100,000 tx/sec throughput', '0 false positive halts in live simulation', 'Production compliance ready'],
    stack: ['Python', 'LangGraph', 'Redis', 'PostgreSQL', 'Docker'],
    githubUrl: 'https://github.com/ASM010101',
  },
  {
    id: 'enterprise-rag',
    title: 'Production Hybrid RAG & Vector Retrieval Engine',
    category: 'RAG & Semantic Memory',
    badge: 'Production Engine',
    description:
      'High-throughput semantic search and question-answering architecture. Combines BM25 sparse keyword retrieval with pgvector dense embeddings, reranked via a cross-encoder model.',
    metrics: ['<45ms p95 latency', '40% reduction in LLM hallucination rates', 'Multi-tenant isolation'],
    stack: ['pgvector', 'FastEmbed', 'LangChain', 'vLLM', 'FastAPI'],
    githubUrl: 'https://github.com/ASM010101',
  },
];

interface GalleryInspectModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProject: GalleryProject | null;
}

export const GalleryInspectModal: React.FC<GalleryInspectModalProps> = ({
  isOpen,
  onClose,
  selectedProject,
}) => {
  if (!isOpen || !selectedProject) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Project: ${selectedProject.title}`}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 220,
        background: 'rgba(15, 20, 28, 0.45)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        animation: 'fadeIn 0.2s ease',
      }}
      onClick={onClose}
    >
      {/* Hand-drawn Picture Frame Card */}
      <div
        className="torn-parchment-sheet"
        style={{
          width: '100%',
          maxWidth: 620,
          background: '#ffffff',
          border: '3px solid #1e232a',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.35)',
          padding: '28px 34px',
          position: 'relative',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            borderBottom: '2px dashed #94a3b8',
            paddingBottom: 16,
            marginBottom: 18,
          }}
        >
          <div>
            <span
              style={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: '0.75rem',
                fontWeight: 700,
                color: '#2563eb',
                background: '#eff6ff',
                padding: '3px 8px',
                borderRadius: 4,
                border: '1px solid #bfdbfe',
              }}
            >
              {selectedProject.badge}
            </span>
            <h2
              style={{
                fontFamily: '"Permanent Marker", "Patrick Hand", cursive, sans-serif',
                fontSize: '1.45rem',
                color: '#1e232a',
                margin: '8px 0 0 0',
                lineHeight: 1.2,
              }}
            >
              {selectedProject.title}
            </h2>
          </div>

          <button
            onClick={() => {
              audioSynth.playClick(900);
              onClose();
            }}
            aria-label="Close Project Modal"
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
              flexShrink: 0,
              marginLeft: 12,
            }}
          >
            <X size={18} strokeWidth={2.5} color="#1e232a" />
          </button>
        </div>

        {/* Body Description */}
        <p
          style={{
            fontFamily: '"Patrick Hand", "Comic Neue", cursive, sans-serif',
            fontSize: '1.15rem',
            lineHeight: 1.6,
            color: '#334155',
            margin: '0 0 18px 0',
          }}
        >
          {selectedProject.description}
        </p>

        {/* Measurable Engineering Benchmarks */}
        <div style={{ marginBottom: 18 }}>
          <div
            style={{
              fontFamily: '"Permanent Marker", cursive',
              fontSize: '0.92rem',
              color: '#1e232a',
              marginBottom: 8,
            }}
          >
            VERIFIED METRICS:
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {selectedProject.metrics.map((m, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <CheckCircle size={15} color="#16a34a" strokeWidth={2.5} />
                <span
                  style={{
                    fontFamily: '"Patrick Hand", cursive',
                    fontSize: '1.05rem',
                    color: '#1e293b',
                  }}
                >
                  {m}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack Pills */}
        <div style={{ marginBottom: 24 }}>
          <div
            style={{
              fontFamily: '"Permanent Marker", cursive',
              fontSize: '0.92rem',
              color: '#1e232a',
              marginBottom: 8,
            }}
          >
            TECH STACK:
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {selectedProject.stack.map((t, i) => (
              <span
                key={i}
                style={{
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: '0.78rem',
                  background: '#f1f5f9',
                  border: '1.5px solid #1e232a',
                  padding: '3px 8px',
                  color: '#1e232a',
                  borderRadius: 3,
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            borderTop: '2px dashed #94a3b8',
            paddingTop: 16,
          }}
        >
          {selectedProject.githubUrl && (
            <a
              href={selectedProject.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="torn-paper-btn"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '8px 16px',
                background: '#1e232a',
                color: '#ffffff',
                textDecoration: 'none',
                fontFamily: '"Permanent Marker", cursive',
                fontSize: '0.9rem',
                border: '2px solid #1e232a',
                boxShadow: '2px 2px 0px #64748b',
              }}
            >
              <GithubIcon size={16} />
              <span>VIEW SOURCE</span>
            </a>
          )}

          {selectedProject.paperDoi && (
            <a
              href={selectedProject.paperDoi}
              target="_blank"
              rel="noopener noreferrer"
              className="torn-paper-btn"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '8px 16px',
                background: '#ffffff',
                color: '#1e232a',
                textDecoration: 'none',
                fontFamily: '"Permanent Marker", cursive',
                fontSize: '0.9rem',
                border: '2px solid #1e232a',
                boxShadow: '2px 2px 0px #1e232a',
              }}
            >
              <ExternalLink size={15} />
              <span>READ PAPER</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
