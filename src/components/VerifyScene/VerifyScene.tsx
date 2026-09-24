import React, { useState } from 'react';
import { audioSynth } from '../../utils/audio';
import { ShieldCheck, CheckCircle2, AlertTriangle, Play, Cpu, ArrowRight } from 'lucide-react';

interface EvalStage {
  id: string;
  name: string;
  check: string;
  status: 'passed' | 'warning' | 'testing';
  latency: string;
}

export const VerifyScene: React.FC = () => {
  const [isRunningCheck, setIsRunningCheck] = useState<boolean>(false);
  const [testPayload, setTestPayload] = useState<'valid' | 'regressive'>('valid');

  const stages: EvalStage[] = [
    {
      id: 'guardrail',
      name: 'GUARDRAIL VALIDATOR',
      check: testPayload === 'valid' ? 'Syntax and schema parameters conform to strict JSON definition.' : 'Tool parameter bounds test within allowed parameters.',
      status: 'passed',
      latency: '1.2ms',
    },
    {
      id: 'eval_harness',
      name: 'AUTOMATED EVALUATION',
      check: testPayload === 'valid' ? 'Context groundedness verified against retrieved reference vectors.' : 'Slight tone deviation detected against gold standard.',
      status: testPayload === 'valid' ? 'passed' : 'warning',
      latency: '24ms',
    },
    {
      id: 'regression',
      name: 'PRE-RELEASE REGRESSION CHECK',
      check: testPayload === 'valid' ? 'Zero behavioral regressions across all historical customer deployment suites.' : 'Pre-release alert triggered; flagged for manual review.',
      status: testPayload === 'valid' ? 'passed' : 'warning',
      latency: '85ms',
    },
    {
      id: 'release',
      name: 'PRODUCTION RELEASE GATE',
      check: testPayload === 'valid' ? 'All gates clear. Continuous deployment pipeline authorized.' : 'Release hold active until evaluation passes.',
      status: testPayload === 'valid' ? 'passed' : 'warning',
      latency: '0.4ms',
    },
  ];

  const handleRunEvaluation = (payloadType: 'valid' | 'regressive') => {
    setIsRunningCheck(true);
    setTestPayload(payloadType);
    audioSynth.playClick(900);

    setTimeout(() => {
      setIsRunningCheck(false);
      audioSynth.playChirp(payloadType === 'valid' ? 950 : 450, 0.15);
    }, 450);
  };

  return (
    <section
      id="verify"
      aria-label="Evaluation Pipelines and Reliability Guardrails"
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
        // Reliability: A model is not a system until it can be evaluated
      </div>

      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
          <span className="tech-tag tech-tag-emerald">
            <ShieldCheck size={13} />
            06 // VERIFY
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              color: 'var(--accent-emerald)',
            }}
          >
            EVALUATION GATES &amp; RELIABILITY
          </span>
        </div>

        <h2
          style={{
            fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)',
            letterSpacing: '-0.03em',
            marginBottom: 12,
          }}
        >
          A MODEL IS NOT A SYSTEM UNTIL IT CAN BE EVALUATED.
        </h2>

        <p style={{ maxWidth: 740, fontSize: '1.05rem', color: 'var(--text-secondary)' }}>
          Engineering pre-release regression checks, automated eval harnesses, and deterministic
          guardrails that catch behavioral degradation before customer deployment.
        </p>
      </div>

      {/* Conceptual Pipeline Flow */}
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
            minWidth: 640,
            justifyContent: 'space-between',
          }}
        >
          {['RAW MODEL OUTPUT', 'GUARDRAIL FILTER', 'AUTOMATED EVAL', 'REGRESSION CHECK', 'PRODUCTION RELEASE'].map(
            (step, i, arr) => (
              <React.Fragment key={step}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    color: i === arr.length - 1 ? 'var(--accent-emerald)' : 'var(--text-primary)',
                    fontWeight: 600,
                  }}
                >
                  {step}
                </span>
                {i < arr.length - 1 && <ArrowRight size={14} color="var(--border-technical)" />}
              </React.Fragment>
            )
          )}
        </div>
      </div>

      {/* Interactive Verification Workbench */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 24,
          alignItems: 'start',
        }}
      >
        {/* Left: Interactive Evaluation Gate Visualizer */}
        <div
          className="blueprint-panel corner-crosshair"
          style={{
            padding: 24,
            background: 'rgba(10, 14, 18, 0.9)',
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
            }}
          >
            <span style={{ color: 'var(--text-muted)' }}>PRE_RELEASE_EVALUATION_HARNESS</span>
            <span style={{ color: testPayload === 'valid' ? 'var(--accent-emerald)' : 'var(--accent-coral)' }}>
              STATUS: {testPayload === 'valid' ? 'READY_FOR_DEPLOY' : 'ALERT_FLAGGED'}
            </span>
          </div>

          {/* Test Signal Trigger Buttons */}
          <div style={{ display: 'flex', gap: 10, marginBottom: 18 }}>
            <button
              onClick={() => handleRunEvaluation('valid')}
              className={testPayload === 'valid' ? 'btn-primary' : 'btn-secondary'}
              style={{ padding: '6px 14px', fontSize: '0.72rem' }}
              data-cursor="open"
              data-cursor-label="VALID"
            >
              <Play size={11} />
              <span>TEST PRODUCTION SUITE</span>
            </button>
            <button
              onClick={() => handleRunEvaluation('regressive')}
              className={testPayload === 'regressive' ? 'btn-primary' : 'btn-secondary'}
              style={{
                padding: '6px 14px',
                fontSize: '0.72rem',
                borderColor: testPayload === 'regressive' ? 'var(--accent-coral)' : undefined,
                background: testPayload === 'regressive' ? 'rgba(255, 107, 74, 0.2)' : undefined,
                color: testPayload === 'regressive' ? 'var(--accent-coral)' : undefined,
              }}
              data-cursor="open"
              data-cursor-label="WARN"
            >
              <AlertTriangle size={11} />
              <span>SIMULATE EDGE CASE</span>
            </button>
          </div>

          {/* Evaluation Gate Checkpoints */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, opacity: isRunningCheck ? 0.4 : 1, transition: 'opacity 0.2s ease' }}>
            {stages.map((stage, idx) => (
              <div
                key={stage.id}
                style={{
                  background: 'rgba(7, 8, 11, 0.7)',
                  border: `1px solid ${stage.status === 'passed' ? 'rgba(0, 245, 155, 0.25)' : 'rgba(255, 107, 74, 0.4)'}`,
                  padding: 12,
                  borderRadius: 4,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 12,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  {stage.status === 'passed' ? (
                    <CheckCircle2 size={16} color="var(--accent-emerald)" />
                  ) : (
                    <AlertTriangle size={16} color="var(--accent-coral)" />
                  )}
                  <div>
                    <div
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.74rem',
                        fontWeight: 600,
                        color: stage.status === 'passed' ? 'var(--accent-emerald)' : 'var(--accent-coral)',
                      }}
                    >
                      GATE 0{idx + 1} // {stage.name}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>{stage.check}</div>
                  </div>
                </div>

                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.65rem',
                    color: 'var(--text-muted)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {stage.latency}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Engineering Philosophy & Samespace Case Context */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="blueprint-panel" style={{ padding: 22 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <Cpu size={18} color="var(--accent-emerald)" />
              <h3 style={{ fontSize: '1.2rem' }}>Samespace Reliability Harness</h3>
            </div>

            <div style={{ display: 'flex', gap: 6, marginBottom: 14, flexWrap: 'wrap' }}>
              <span className="tech-tag tech-tag-emerald">Pre-Release Regression Detection</span>
              <span className="tech-tag">Automated Evaluations</span>
              <span className="tech-tag tech-tag-gold">Production Guardrails</span>
            </div>

            <p style={{ fontSize: '0.92rem', marginBottom: 14 }}>
              Implemented guardrails and automated evaluation pipelines that catch regressions
              pre-release, improving AI reliability across conversational and agentic workflows.
            </p>

            <div
              style={{
                background: 'rgba(7, 8, 11, 0.6)',
                border: '1px solid var(--border-subtle)',
                padding: 12,
                borderRadius: 4,
                fontSize: '0.76rem',
                fontFamily: 'var(--font-mono)',
              }}
            >
              <div style={{ color: 'var(--accent-emerald)', marginBottom: 4 }}>
                CORE PRINCIPLE:
              </div>
              <div style={{ color: 'var(--text-secondary)' }}>
                Prompt engineering is fragile; evaluation pipelines provide reproducible safety guarantees.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
