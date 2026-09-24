import React, { useState } from 'react';
import { audioSynth } from '../../utils/audio';
import { Bot, Network, ArrowRight, Play, Terminal, ShieldAlert, Cpu } from 'lucide-react';

interface AgentNode {
  id: string;
  name: string;
  role: string;
  status: 'idle' | 'executing' | 'ready';
  toolUsed: string;
}

export const ActScene: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  const steps = [
    { title: 'User Intent Ingestion', detail: 'Deconstructing multi-modal user prompt into discrete actionable sub-goals.' },
    { title: 'ADK Multi-Agent Routing', detail: 'Google ADK orchestrator routes sub-tasks to specialized domain agents.' },
    { title: 'MCP Protocol Server Call', detail: 'Invoking Model Context Protocol (MCP) tool endpoints with strict JSON schemas.' },
    { title: 'Deterministic Output Validation', detail: 'Pre-execution guardrails and regression evaluation check before state mutation.' },
  ];

  const agentNodes: AgentNode[] = [
    { id: 'coord', name: 'ADK Orchestrator', role: 'Decomposition & Task Dispatcher', status: 'ready', toolUsed: 'google_adk_router' },
    { id: 'retrieval', name: 'Knowledge Agent', role: 'Context & Vector Fetching', status: 'ready', toolUsed: 'hybrid_faiss_mcp' },
    { id: 'execution', name: 'Tool Calling Agent', role: 'Deterministic Function Invocation', status: 'ready', toolUsed: 'custom_mcp_server' },
    { id: 'eval', name: 'Guardrail Evaluator', role: 'Pre-release Regression & Safety Gate', status: 'ready', toolUsed: 'automated_eval_harness' },
  ];

  const handleSimulate = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setActiveStep(0);
    audioSynth.playChirp(600, 0.1);

    const interval = setInterval(() => {
      setActiveStep((prev) => {
        if (prev >= steps.length - 1) {
          clearInterval(interval);
          setIsSimulating(false);
          audioSynth.playChirp(1000, 0.2);
          return prev;
        }
        audioSynth.playClick(850 + prev * 100);
        return prev + 1;
      });
    }, 700);
  };

  return (
    <section
      id="act"
      aria-label="Agentic AI and MCP Tool Execution"
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
        // Agents: Beyond passive answering &rarr; Autonomous, bounded action
      </div>

      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
          <span className="tech-tag">
            <Network size={13} />
            03 // ACT
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              color: 'var(--accent-cyan)',
            }}
          >
            AGENTIC AI &amp; PROTOCOL SERVERS
          </span>
        </div>

        <h2
          style={{
            fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)',
            letterSpacing: '-0.03em',
            marginBottom: 12,
          }}
        >
          FROM ANSWERS TO ACTION.
        </h2>

        <p style={{ maxWidth: 740, fontSize: '1.05rem', color: 'var(--text-secondary)' }}>
          Autonomous multi-agent orchestration built upon Google ADK and custom Model Context Protocol
          (MCP) servers with deterministic safety guardrails.
        </p>
      </div>

      {/* Main Agent Graph Visual Container */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 24,
          alignItems: 'start',
        }}
      >
        {/* Left: Real-time Orchestration Graph */}
        <div
          className="blueprint-panel corner-crosshair"
          style={{
            padding: 24,
            background: 'rgba(9, 11, 16, 0.88)',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1px solid var(--border-subtle)',
              paddingBottom: 10,
              marginBottom: 18,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Bot size={15} color="var(--accent-cyan)" />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent-cyan)' }}>
                MULTI_AGENT_ORCHESTRATION_TOPOLOGY
              </span>
            </div>
            <button
              onClick={handleSimulate}
              disabled={isSimulating}
              className="btn-primary"
              style={{ padding: '4px 10px', fontSize: '0.72rem' }}
              data-cursor="open"
              data-cursor-label="SIMULATE"
            >
              <Play size={11} />
              <span>{isSimulating ? 'EXECUTING...' : 'RUN PIPELINE'}</span>
            </button>
          </div>

          {/* Interactive Agent Nodes Matrix */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {agentNodes.map((agent, index) => {
              const isCurrent = activeStep === index;
              return (
                <div
                  key={agent.id}
                  style={{
                    background: isCurrent ? 'rgba(0, 240, 255, 0.12)' : 'rgba(15, 18, 26, 0.6)',
                    border: isCurrent ? '1px solid var(--accent-cyan)' : '1px solid var(--border-subtle)',
                    borderRadius: 4,
                    padding: 12,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: 4,
                        background: isCurrent ? 'var(--accent-cyan)' : 'rgba(255, 255, 255, 0.05)',
                        color: isCurrent ? '#07080b' : 'var(--text-muted)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                      }}
                    >
                      0{index + 1}
                    </div>
                    <div>
                      <div
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.78rem',
                          fontWeight: 600,
                          color: isCurrent ? 'var(--accent-cyan)' : 'var(--text-primary)',
                        }}
                      >
                        {agent.name}
                      </div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{agent.role}</div>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.65rem',
                        background: 'rgba(0, 0, 0, 0.4)',
                        padding: '2px 6px',
                        borderRadius: 3,
                        border: '1px solid var(--border-subtle)',
                        color: 'var(--accent-cyan)',
                      }}
                    >
                      {agent.toolUsed}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Current Execution Telemetry */}
          <div
            style={{
              marginTop: 18,
              background: 'rgba(7, 8, 11, 0.8)',
              border: '1px solid var(--border-technical)',
              padding: 12,
              borderRadius: 4,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
              <Terminal size={12} color="var(--accent-cyan)" />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--accent-cyan)' }}>
                ACTIVE STEP TELEMETRY [PHASE {activeStep + 1}/4]
              </span>
            </div>
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                color: 'var(--text-primary)',
                fontWeight: 600,
                marginBottom: 2,
              }}
            >
              {steps[activeStep].title}
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
              {steps[activeStep].detail}
            </div>
          </div>
        </div>

        {/* Right: Samespace Production Architecture & Tech Details */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div className="blueprint-panel" style={{ padding: 22 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <Cpu size={18} color="var(--accent-cyan)" />
              <h3 style={{ fontSize: '1.2rem' }}>Samespace Agentic Systems</h3>
            </div>

            <div style={{ display: 'flex', gap: 6, marginBottom: 14, flexWrap: 'wrap' }}>
              <span className="tech-tag">Google ADK</span>
              <span className="tech-tag tech-tag-coral">Custom MCP Servers</span>
              <span className="tech-tag tech-tag-emerald">Tool Calling</span>
              <span className="tech-tag tech-tag-gold">Instruction Following</span>
            </div>

            <p style={{ fontSize: '0.92rem', marginBottom: 16 }}>
              Designed multi-agent systems on Google&apos;s ADK framework with custom MCP servers to
              automate enterprise workflows. Fine-tuned foundation models for customer-specific
              tool-calling and instruction-following, improving task completion across production
              deployments.
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
              <div style={{ color: 'var(--accent-cyan)', marginBottom: 4 }}>
                MCP ARCHITECTURAL PARADIGM:
              </div>
              <div style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 6 }}>
                USER <ArrowRight size={12} /> AGENT <ArrowRight size={12} /> MCP SERVER <ArrowRight size={12} /> ENTERPRISE TOOL
              </div>
            </div>
          </div>

          <div className="blueprint-panel" style={{ padding: 18, background: 'rgba(12, 15, 22, 0.7)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <ShieldAlert size={16} color="var(--accent-emerald)" />
              <div
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  color: 'var(--accent-emerald)',
                }}
              >
                GUARDRAILS &amp; EVALUATION HOOKS
              </div>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              Implemented guardrails and automated evaluation pipelines that catch regressions pre-release,
              ensuring agentic tool execution adheres strictly to deterministic parameters.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
