import React, { useState, useEffect, useRef } from 'react';
import { contactConfig } from '../../data/contact';
import { audioSynth } from '../../utils/audio';
import confetti from 'canvas-confetti';
import {
  Terminal,
  Search,
  ArrowRight,
  ExternalLink,
  Briefcase,
  Compass,
  FileText,
  Mail,
  Sparkles,
  X,
} from 'lucide-react';

const GithubIcon: React.FC<{ size?: number }> = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const LinkedinIcon: React.FC<{ size?: number }> = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (sectionId: string) => void;
  recruiterMode: boolean;
  onToggleRecruiterMode: () => void;
}

interface CommandItem {
  id: string;
  title: string;
  category: string;
  action: () => void;
  icon: React.ReactNode;
  shortcut?: string;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onNavigate,
  recruiterMode,
  onToggleRecruiterMode,
}) => {
  const [query, setQuery] = useState('');
  const [terminalOutput, setTerminalOutput] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setTerminalOutput(null);
    }
  }, [isOpen]);

  const commands: CommandItem[] = [
    {
      id: 'nav-boot',
      title: 'Jump to 00 // System Boot',
      category: 'Navigation',
      action: () => {
        onNavigate('boot');
        onClose();
      },
      icon: <Terminal size={14} />,
    },
    {
      id: 'nav-see',
      title: 'Jump to 01 // Computers That See (CV & OCR)',
      category: 'Navigation',
      action: () => {
        onNavigate('see');
        onClose();
      },
      icon: <Search size={14} />,
    },
    {
      id: 'nav-retrieve',
      title: 'Jump to 02 // Retrieval is Memory (RAG)',
      category: 'Navigation',
      action: () => {
        onNavigate('retrieve');
        onClose();
      },
      icon: <Search size={14} />,
    },
    {
      id: 'nav-act',
      title: 'Jump to 03 // From Answers to Action (Agents & MCP)',
      category: 'Navigation',
      action: () => {
        onNavigate('act');
        onClose();
      },
      icon: <ArrowRight size={14} />,
    },
    {
      id: 'nav-speak',
      title: 'Jump to 04 // Language is Signal (Speech AI)',
      category: 'Navigation',
      action: () => {
        onNavigate('speak');
        onClose();
      },
      icon: <Sparkles size={14} />,
    },
    {
      id: 'nav-generate',
      title: 'Jump to 05 // From Noise to Control (Diffusion)',
      category: 'Navigation',
      action: () => {
        onNavigate('generate');
        onClose();
      },
      icon: <Sparkles size={14} />,
    },
    {
      id: 'nav-verify',
      title: 'Jump to 06 // Verify & Guardrails',
      category: 'Navigation',
      action: () => {
        onNavigate('verify');
        onClose();
      },
      icon: <Terminal size={14} />,
    },
    {
      id: 'nav-research',
      title: 'Jump to 07 // Research & Publications',
      category: 'Navigation',
      action: () => {
        onNavigate('research');
        onClose();
      },
      icon: <FileText size={14} />,
    },
    {
      id: 'nav-field-log',
      title: 'Jump to 08 // Field Log (Experience)',
      category: 'Navigation',
      action: () => {
        onNavigate('field-log');
        onClose();
      },
      icon: <Briefcase size={14} />,
    },
    {
      id: 'nav-ship',
      title: 'Jump to 12 // System Ready (Contact & Ship)',
      category: 'Navigation',
      action: () => {
        onNavigate('ship');
        onClose();
      },
      icon: <Terminal size={14} />,
    },
    {
      id: 'toggle-mode',
      title: recruiterMode ? 'Switch to 3D Narrative Explore Mode' : 'Switch to Fast Recruiter Mode',
      category: 'Mode',
      action: () => {
        onToggleRecruiterMode();
        onClose();
      },
      icon: recruiterMode ? <Compass size={14} /> : <Briefcase size={14} />,
    },
    {
      id: 'view-resume',
      title: 'View Resume (PDF)',
      category: 'Documents',
      action: () => {
        window.open('resume.pdf', '_blank');
        onClose();
      },
      icon: <FileText size={14} />,
    },
    {
      id: 'open-github',
      title: 'Open GitHub Profile (@ASM010101)',
      category: 'External',
      action: () => {
        window.open(contactConfig.githubUrl, '_blank');
        onClose();
      },
      icon: <GithubIcon size={14} />,
    },
    {
      id: 'open-linkedin',
      title: 'Open LinkedIn Profile',
      category: 'External',
      action: () => {
        window.open(contactConfig.linkedinUrl, '_blank');
        onClose();
      },
      icon: <LinkedinIcon size={14} />,
    },
    {
      id: 'open-email',
      title: 'Send Email (amashish950@gmail.com)',
      category: 'External',
      action: () => {
        window.location.href = contactConfig.emailUrl;
        onClose();
      },
      icon: <Mail size={14} />,
    },
  ];

  // Handle raw terminal commands for easter eggs
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      const trimmed = query.trim().toLowerCase();
      if (trimmed === 'whoami') {
        setTerminalOutput('ASHISH MAURYA // Applied AI Engineer // IIT Patna M.Tech AI // Samespace AI');
        audioSynth.playChirp(800, 0.15);
      } else if (trimmed === 'matrix') {
        setTerminalOutput('WAKE UP, NEO... System initialized in latent manifold.');
        audioSynth.playBootPulse();
      } else if (trimmed === 'confetti' || trimmed === 'celebrate') {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
        setTerminalOutput('SYSTEM_DEPLOYMENT_COMPLETE: Confetti fired!');
        audioSynth.playChirp(1200, 0.2);
      } else if (trimmed === 'weights' || trimmed === 'lora') {
        setTerminalOutput('LoRA rank=16, alpha=32, target_modules=["q_proj", "v_proj"]. Zero hallucination tolerance.');
        audioSynth.playChirp(600, 0.1);
      } else if (filteredCommands.length > 0) {
        filteredCommands[0].action();
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  const filteredCommands = commands.filter(
    (c) =>
      c.title.toLowerCase().includes(query.toLowerCase()) ||
      c.category.toLowerCase().includes(query.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command Palette Terminal"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99990,
        background: 'rgba(5, 7, 10, 0.82)',
        backdropFilter: 'blur(16px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="blueprint-panel corner-crosshair"
        style={{
          width: '100%',
          maxWidth: 640,
          background: 'rgba(10, 13, 20, 0.95)',
          border: '1px solid var(--border-active)',
          borderRadius: 8,
          overflow: 'hidden',
          boxShadow: '0 24px 64px rgba(0, 0, 0, 0.8), 0 0 40px rgba(0, 240, 255, 0.2)',
        }}
      >
        {/* Terminal Header */}
        <div
          style={{
            padding: '12px 18px',
            borderBottom: '1px solid var(--border-technical)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'rgba(0, 240, 255, 0.04)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Terminal size={15} color="var(--accent-cyan)" />
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.78rem',
                color: 'var(--accent-cyan)',
                fontWeight: 600,
                letterSpacing: '0.08em',
              }}
            >
              ASHISH//COMMAND_PALETTE
            </span>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Input Bar */}
        <div
          style={{
            padding: '14px 18px',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            borderBottom: '1px solid var(--border-subtle)',
          }}
        >
          <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent-cyan)' }}>&gt;</span>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setTerminalOutput(null);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Type a command or jump to scene (try: whoami, matrix, lora, confetti)..."
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.9rem',
            }}
          />
          <kbd
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              color: 'var(--text-muted)',
              padding: '2px 6px',
              border: '1px solid var(--border-subtle)',
              borderRadius: 3,
            }}
          >
            ESC
          </kbd>
        </div>

        {/* Interactive Terminal Response (Easter egg output) */}
        {terminalOutput && (
          <div
            style={{
              padding: '12px 18px',
              background: 'rgba(0, 240, 255, 0.08)',
              borderBottom: '1px solid var(--border-technical)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              color: 'var(--accent-cyan)',
            }}
          >
            {terminalOutput}
          </div>
        )}

        {/* Command List */}
        <div
          style={{
            maxHeight: 340,
            overflowY: 'auto',
            padding: '8px 0',
          }}
        >
          {filteredCommands.length === 0 ? (
            <div
              style={{
                padding: '24px 18px',
                textAlign: 'center',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                color: 'var(--text-muted)',
              }}
            >
              No matching commands. Press Enter to execute terminal query.
            </div>
          ) : (
            filteredCommands.map((cmd) => (
              <button
                key={cmd.id}
                onClick={() => {
                  cmd.action();
                  audioSynth.playClick(1000);
                }}
                data-cursor="open"
                data-cursor-label="RUN"
                style={{
                  width: '100%',
                  textAlign: 'left',
                  background: 'transparent',
                  border: 'none',
                  padding: '10px 18px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  color: 'var(--text-primary)',
                  transition: 'background 0.12s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(0, 240, 255, 0.08)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ color: 'var(--accent-cyan)' }}>{cmd.icon}</span>
                  <div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem' }}>{cmd.title}</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                      {cmd.category}
                    </div>
                  </div>
                </div>
                <ExternalLink size={12} color="var(--text-muted)" />
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
