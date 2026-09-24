import React, { useState } from 'react';
import { audioSynth } from '../../utils/audio';
import { Mic, Activity, Radio, Cpu, Layers } from 'lucide-react';

export const SpeechScene: React.FC = () => {
  const [activeChannel, setActiveChannel] = useState<'accent' | 'tts'>('accent');
  const [selectedLanguage, setSelectedLanguage] = useState<'en-in' | 'hi-en' | 'multilingual'>('hi-en');

  const channels = [
    { id: 'accent', label: 'ACCENT TRANSLATION PIPELINE', icon: <Radio size={13} /> },
    { id: 'tts', label: 'MULTILINGUAL CODE-SWITCHING TTS', icon: <Mic size={13} /> },
  ];

  return (
    <section
      id="speak"
      aria-label="Speech AI and Accent Translation Systems"
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
      {/* Hand-drawn margin note */}
      <div
        className="hand-annotation"
        style={{
          position: 'absolute',
          top: 70,
          right: '8%',
          opacity: 0.85,
        }}
      >
        // Speech: Voice is acoustics modulated by identity, accent & intent
      </div>

      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
          <span className="tech-tag" style={{ background: 'rgba(167, 139, 250, 0.1)', color: '#a78bfa', borderColor: 'rgba(167, 139, 250, 0.3)' }}>
            <Activity size={13} />
            04 // SPEAK
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              color: '#a78bfa',
            }}
          >
            SPEECH AI &amp; ACCENT SYNTHESIS
          </span>
        </div>

        <h2
          style={{
            fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)',
            letterSpacing: '-0.03em',
            marginBottom: 12,
          }}
        >
          LANGUAGE IS SIGNAL.
        </h2>

        <p style={{ maxWidth: 740, fontSize: '1.05rem', color: 'var(--text-secondary)' }}>
          Acoustic waveform processing, speech-to-speech accent mapping, and multilingual text-to-speech
          with seamless code-switching synthesis.
        </p>
      </div>

      {/* Channel Selector */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 28 }}>
        {channels.map((ch) => (
          <button
            key={ch.id}
            onClick={() => {
              setActiveChannel(ch.id as 'accent' | 'tts');
              audioSynth.playClick(900);
            }}
            className={activeChannel === ch.id ? 'btn-primary' : 'btn-secondary'}
            style={{ padding: '8px 16px', fontSize: '0.78rem' }}
            data-cursor="open"
            data-cursor-label="CHANNEL"
          >
            {ch.icon}
            <span>{ch.label}</span>
          </button>
        ))}
      </div>

      {/* Speech Workbench Container */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 24,
          alignItems: 'start',
        }}
      >
        {/* Left: Waveform & Spectral Oscilloscope */}
        <div
          className="blueprint-panel corner-crosshair scanline-effect"
          style={{
            padding: 24,
            background: 'rgba(10, 11, 18, 0.88)',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1px solid var(--border-subtle)',
              paddingBottom: 10,
              marginBottom: 16,
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              color: 'var(--text-muted)',
            }}
          >
            <span>SPECTRAL_OSCILLOSCOPE // 24kHz</span>
            <span style={{ color: '#a78bfa' }}>SAMPLING: ACTIVE</span>
          </div>

          {/* Procedural Waveform Visualizer Graphic */}
          <div
            style={{
              height: 180,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 3,
              margin: '12px 0 20px 0',
              padding: '0 12px',
              background: 'rgba(0, 0, 0, 0.45)',
              borderRadius: 4,
              border: '1px dashed rgba(167, 139, 250, 0.25)',
              overflow: 'hidden',
            }}
          >
            {Array.from({ length: 48 }).map((_, i) => {
              const heightMultiplier = Math.sin((i / 48) * Math.PI) * 0.8 + 0.2;
              const barHeight = Math.max(12, Math.floor(Math.sin(i * 0.4) * 60 + 70) * heightMultiplier);
              return (
                <div
                  key={i}
                  style={{
                    flex: 1,
                    height: `${barHeight}px`,
                    background:
                      i % 3 === 0
                        ? '#00f0ff'
                        : i % 2 === 0
                        ? '#a78bfa'
                        : '#ff6b4a',
                    opacity: 0.8,
                    borderRadius: 2,
                    animation: `pulseGlow ${1.2 + (i % 5) * 0.2}s ease-in-out infinite alternate`,
                  }}
                />
              );
            })}
          </div>

          {/* Interactive Language / Dialect Switcher */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-muted)' }}>
              SYNTHESIS CODE-SWITCHING CONFIGURATION:
            </span>
            <div style={{ display: 'flex', gap: 8 }}>
              {[
                { id: 'en-in', label: 'English (Indian Accent)' },
                { id: 'hi-en', label: 'Hinglish Code-Switch' },
                { id: 'multilingual', label: 'Cross-Lingual Transfer' },
              ].map((lang) => (
                <button
                  key={lang.id}
                  onClick={() => {
                    setSelectedLanguage(lang.id as 'en-in' | 'hi-en' | 'multilingual');
                    audioSynth.playClick(1000);
                  }}
                  style={{
                    background: selectedLanguage === lang.id ? 'rgba(167, 139, 250, 0.15)' : 'rgba(15, 18, 26, 0.6)',
                    border: selectedLanguage === lang.id ? '1px solid #a78bfa' : '1px solid var(--border-subtle)',
                    color: selectedLanguage === lang.id ? '#a78bfa' : 'var(--text-secondary)',
                    padding: '6px 10px',
                    borderRadius: 3,
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.68rem',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Technical Architectural Pillars (Encoder / Mapper / Vocoder) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="blueprint-panel" style={{ padding: 22 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <Cpu size={18} color="#a78bfa" />
              <h3 style={{ fontSize: '1.2rem' }}>Speech-to-Speech Architecture</h3>
            </div>

            <div style={{ display: 'flex', gap: 6, marginBottom: 14, flexWrap: 'wrap' }}>
              <span className="tech-tag" style={{ color: '#a78bfa', borderColor: 'rgba(167, 139, 250, 0.3)' }}>
                Samespace Production
              </span>
              <span className="tech-tag">Encoder / Mapper / Vocoder</span>
              <span className="tech-tag tech-tag-emerald">Accent Translation</span>
            </div>

            <p style={{ fontSize: '0.92rem', marginBottom: 16 }}>
              Contributed encoder, mapper, and vocoder components to a speech-to-speech
              accent-translation system. Built multilingual TTS pipelines with code-switching and
              custom voice enhancements for communication products.
            </p>

            {/* Tripartite System Diagram */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 8,
                marginTop: 12,
              }}
            >
              {[
                { title: 'ENCODER', role: 'Acoustic Disentanglement', desc: 'Isolating phonetic content from speaker accent' },
                { title: 'MAPPER', role: 'Target Latent Projection', desc: 'Aligning source accent vectors to target distribution' },
                { title: 'VOCODER', role: 'Neural Waveform Re-Synthesis', desc: 'High-fidelity audio generation preserving timbre' },
              ].map((comp) => (
                <div
                  key={comp.title}
                  style={{
                    background: 'rgba(7, 8, 11, 0.7)',
                    border: '1px solid var(--border-technical)',
                    padding: 10,
                    borderRadius: 4,
                  }}
                >
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: '#a78bfa', fontWeight: 700 }}>
                    {comp.title}
                  </div>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-primary)', fontWeight: 600, marginTop: 2 }}>
                    {comp.role}
                  </div>
                  <div style={{ fontSize: '0.64rem', color: 'var(--text-muted)', marginTop: 4 }}>
                    {comp.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className="blueprint-panel"
            style={{
              padding: 14,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: 'rgba(12, 14, 20, 0.6)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Layers size={13} color="#a78bfa" />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                CORE STACK:
              </span>
            </div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {['PyTorch', 'Transformers', 'Diffusers', 'TTS Pipelines', 'Audio DSP'].map((t) => (
                <span
                  key={t}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.68rem',
                    color: '#a78bfa',
                    background: 'rgba(167, 139, 250, 0.08)',
                    padding: '2px 7px',
                    borderRadius: 3,
                    border: '1px solid rgba(167, 139, 250, 0.25)',
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
