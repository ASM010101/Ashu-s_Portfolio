import React, { useState } from 'react';
import { audioSynth } from '../../utils/audio';
import { Sparkles, Award, Shield } from 'lucide-react';

export const GenerationScene: React.FC = () => {
  const [denoiseStep, setDenoiseStep] = useState<number>(35);
  const [activeConditions, setActiveConditions] = useState<{ [key: string]: boolean }>({
    lora: true,
    controlnet: true,
    ipadapter: true,
    inpaint: false,
  });

  const toggleCondition = (key: string) => {
    setActiveConditions((prev) => ({ ...prev, [key]: !prev[key] }));
    audioSynth.playClick(950);
  };

  return (
    <section
      id="generate"
      aria-label="Generative Diffusion and Controllable Generation"
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
        // Diffusion: Gaussian chaos constrained into sharp semantic form
      </div>

      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
          <span className="tech-tag" style={{ background: 'rgba(192, 132, 252, 0.1)', color: '#c084fc', borderColor: 'rgba(192, 132, 252, 0.3)' }}>
            <Sparkles size={13} />
            05 // GENERATE
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              color: '#c084fc',
            }}
          >
            CONTROLLABLE DIFFUSION PIPELINES
          </span>
        </div>

        <h2
          style={{
            fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)',
            letterSpacing: '-0.03em',
            marginBottom: 12,
          }}
        >
          FROM NOISE TO CONTROL.
        </h2>

        <p style={{ maxWidth: 740, fontSize: '1.05rem', color: 'var(--text-secondary)' }}>
          Latent diffusion architectures conditioned via ControlNet geometry, IP-Adapter representations,
          and LoRA weight adaptations developed under IndiaAI Mission research grant.
        </p>
      </div>

      {/* Latent Pipeline Architecture Flowchart */}
      <div
        className="blueprint-panel"
        style={{
          padding: '16px 20px',
          marginBottom: 28,
          background: 'rgba(9, 11, 16, 0.85)',
          overflowX: 'auto',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            minWidth: 680,
            justifyContent: 'space-between',
          }}
        >
          {[
            { step: '01', title: 'RANDOM NOISE', desc: 'Gaussian Latent Tensor ε ~ N(0, I)' },
            { step: '02', title: 'BASE MODEL', desc: 'Stable Diffusion Latent U-Net' },
            { step: '03', title: 'LORA ADAPTERS', desc: 'Low-Rank Identity Fine-Tuning' },
            { step: '04', title: 'CONTROLNET', desc: 'Spatial Edge / Depth Condition' },
            { step: '05', title: 'IP-ADAPTER', desc: 'Image-Prompt Feature Injection' },
            { step: '06', title: 'INPAINTING', desc: 'Target Region Synthesis' },
          ].map((node) => (
            <div key={node.step} style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: '#c084fc' }}>
                {node.step} // {node.title}
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{node.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Interactive Diffusion Workbench */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 24,
          alignItems: 'start',
        }}
      >
        {/* Left: Interactive Latent Denoising Simulator */}
        <div
          className="blueprint-panel corner-crosshair"
          style={{
            padding: 24,
            background: 'rgba(10, 12, 18, 0.9)',
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
            <span>LATENT_SPACE_DECODER</span>
            <span style={{ color: '#c084fc' }}>TIMESTEP t = {50 - denoiseStep} / 50</span>
          </div>

          {/* Procedural Latent Canvas Representation */}
          <div
            style={{
              position: 'relative',
              height: 220,
              margin: '12px 0 20px 0',
              borderRadius: 4,
              border: '1px dashed rgba(192, 132, 252, 0.3)',
              overflow: 'hidden',
              background: 'radial-gradient(circle at center, rgba(192, 132, 252, 0.08) 0%, #07080b 80%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Dynamic Latent Noise Matrix simulation */}
            <div
              style={{
                width: '100%',
                height: '100%',
                display: 'grid',
                gridTemplateColumns: 'repeat(16, 1fr)',
                gridTemplateRows: 'repeat(10, 1fr)',
                gap: 2,
                padding: 8,
                opacity: 0.9,
              }}
            >
              {Array.from({ length: 160 }).map((_, i) => {
                const noiseFactor = Math.sin(i * 137.5 + denoiseStep * 0.2);
                const isFormed = denoiseStep > 25 && (i % 5 === 0 || i % 7 === 0);
                return (
                  <div
                    key={i}
                    style={{
                      background: isFormed
                        ? '#00f0ff'
                        : noiseFactor > 0
                        ? `rgba(192, 132, 252, ${(Math.abs(noiseFactor) * (50 - denoiseStep)) / 50})`
                        : `rgba(255, 107, 74, ${(Math.abs(noiseFactor) * (50 - denoiseStep)) / 50})`,
                      borderRadius: 1,
                      transition: 'background 0.2s ease',
                    }}
                  />
                );
              })}
            </div>

            {/* Structured Manifold Overlay */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: `rgba(7, 8, 11, ${(50 - denoiseStep) / 100})`,
                pointerEvents: 'none',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8rem',
                  color: '#c084fc',
                  background: 'rgba(10, 12, 18, 0.85)',
                  padding: '6px 14px',
                  borderRadius: 4,
                  border: '1px solid rgba(192, 132, 252, 0.4)',
                }}
              >
                {denoiseStep < 15
                  ? 'NOISE PHASE // ε ~ N(0, I)'
                  : denoiseStep < 35
                  ? 'LATENT ATTENTION U-NET CONVERGENCE'
                  : 'CONDITIONED HIGH-FIDELITY SYNTHESIS'}
              </div>
            </div>
          </div>

          {/* Denoising Step Slider */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                DENOISING RECONSTRUCTION PROGRESS:
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#c084fc' }}>
                {denoiseStep}/50 STEPS
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={50}
              value={denoiseStep}
              onChange={(e) => {
                setDenoiseStep(Number(e.target.value));
                if (Number(e.target.value) % 10 === 0) audioSynth.playClick(800 + Number(e.target.value) * 5);
              }}
              style={{
                width: '100%',
                accentColor: '#c084fc',
                cursor: 'pointer',
              }}
            />
          </div>

          {/* Conditioning Toggles */}
          <div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-muted)', display: 'block', marginBottom: 8 }}>
              ACTIVE CONDITIONING BRANCHES:
            </span>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {[
                { key: 'lora', label: '+ LoRA Fine-Tune' },
                { key: 'controlnet', label: '+ ControlNet' },
                { key: 'ipadapter', label: '+ IP-Adapter' },
                { key: 'inpaint', label: '+ Inpainting' },
              ].map((cond) => (
                <button
                  key={cond.key}
                  onClick={() => toggleCondition(cond.key)}
                  style={{
                    background: activeConditions[cond.key] ? 'rgba(192, 132, 252, 0.15)' : 'rgba(15, 18, 26, 0.6)',
                    border: activeConditions[cond.key] ? '1px solid #c084fc' : '1px solid var(--border-subtle)',
                    color: activeConditions[cond.key] ? '#c084fc' : 'var(--text-muted)',
                    padding: '4px 10px',
                    borderRadius: 3,
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.7rem',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  {cond.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Research Fellowship Records (IndiaAI Mission & HyperVerge Nexus) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* IndiaAI Mission Card */}
          <div className="blueprint-panel" style={{ padding: 22 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <Award size={18} color="var(--accent-gold)" />
              <h3 style={{ fontSize: '1.2rem' }}>IndiaAI Mission Research Fellow</h3>
            </div>

            <div style={{ display: 'flex', gap: 6, marginBottom: 14, flexWrap: 'wrap' }}>
              <span className="tech-tag tech-tag-gold">National Research Grant</span>
              <span className="tech-tag">ICIP Framework</span>
              <span className="tech-tag tech-tag-emerald">T&amp;F ICICS 2025</span>
            </div>

            <p style={{ fontSize: '0.92rem', marginBottom: 14 }}>
              Designed and developed the ICIP framework, integrating Stable Diffusion, ControlNet,
              IP-Adapter, and image inpainting for controllable image generation. Secured IndiaAI
              Mission research funding and presented the framework at T&amp;F ICICS 2025.
            </p>

            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                color: 'var(--accent-gold)',
                background: 'rgba(255, 209, 102, 0.08)',
                padding: '8px 12px',
                borderRadius: 4,
                border: '1px solid rgba(255, 209, 102, 0.25)',
              }}
            >
              Corresponding Author Paper: &ldquo;ICIP: An Integrated Approach for AI Image Generation Using Stable Diffusion&rdquo;
            </div>
          </div>

          {/* HyperVerge Nexus Card */}
          <div className="blueprint-panel" style={{ padding: 22 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <Shield size={18} color="var(--accent-cyan)" />
              <h3 style={{ fontSize: '1.2rem' }}>HyperVerge Nexus Research Fellow</h3>
            </div>

            <div style={{ display: 'flex', gap: 6, marginBottom: 14, flexWrap: 'wrap' }}>
              <span className="tech-tag">HyperVerge Nexus, Chennai</span>
              <span className="tech-tag tech-tag-coral">Document Forgery</span>
              <span className="tech-tag">Fooocus Ecosystem</span>
            </div>

            <p style={{ fontSize: '0.92rem', marginBottom: 10 }}>
              Developed image-generation pipelines using Stable Diffusion and LoRA fine-tuning for document
              and identity use cases. Researched document forgery detection and synthetic ID generation methods.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
