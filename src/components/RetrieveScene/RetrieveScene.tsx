import React, { useState } from 'react';
import { audioSynth } from '../../utils/audio';
import { Database, Search, Cpu, ArrowRight, FileCode, Check } from 'lucide-react';

const SAMPLE_QUERIES = [
  'Enterprise SLA & support policy lookup',
  'Function tool calling schema definition',
  'Low-latency hybrid vector index ranking',
];

interface RetrievedChunk {
  id: string;
  source: string;
  similarity: number;
  preview: string;
  isHybridMatched: boolean;
}

const SAMPLE_CHUNKS: Record<string, RetrievedChunk[]> = {
  'Enterprise SLA & support policy lookup': [
    {
      id: 'chunk_041',
      source: 'enterprise_support_sla.md #p4',
      similarity: 0.942,
      preview: 'P1 incidents require acknowledgement within 15 minutes with automated escalations.',
      isHybridMatched: true,
    },
    {
      id: 'chunk_108',
      source: 'support_tier_routing.json #obj2',
      similarity: 0.898,
      preview: 'Enterprise tier customers receive dedicated agent routing with fallback to asynchronous queue.',
      isHybridMatched: true,
    },
    {
      id: 'chunk_219',
      source: 'incident_handover_protocol.md #p12',
      similarity: 0.865,
      preview: 'Continuous incident status telemetry updates every 300 seconds during active resolution.',
      isHybridMatched: false,
    },
  ],
  'Function tool calling schema definition': [
    {
      id: 'chunk_014',
      source: 'mcp_tool_contract.ts #interface',
      similarity: 0.961,
      preview: 'export interface ToolDefinition { name: string; description: string; inputSchema: JSONSchema; }',
      isHybridMatched: true,
    },
    {
      id: 'chunk_072',
      source: 'adk_agent_spec.yaml #line45',
      similarity: 0.915,
      preview: 'tools: - name: execute_sql_query parameters: query: type: string required: true',
      isHybridMatched: true,
    },
    {
      id: 'chunk_133',
      source: 'guardrail_validator.py #def',
      similarity: 0.874,
      preview: 'def validate_tool_arguments(tool_name: str, args: dict) -> EvaluationResult:',
      isHybridMatched: false,
    },
  ],
  'Low-latency hybrid vector index ranking': [
    {
      id: 'chunk_009',
      source: 'faiss_dense_retrieval.py #class',
      similarity: 0.955,
      preview: 'IndexIVFFlat with nlist=1024, combining dense dot-product with BM25 sparse lexical scoring.',
      isHybridMatched: true,
    },
    {
      id: 'chunk_088',
      source: 'hybrid_fusion_reciprocal.py #def',
      similarity: 0.923,
      preview: 'RRF_score = (1.0 / (60 + rank_dense)) + (1.0 / (60 + rank_sparse))',
      isHybridMatched: true,
    },
    {
      id: 'chunk_157',
      source: 'vector_sharding_benchmarks.md',
      similarity: 0.881,
      preview: 'Sub-25ms P99 retrieval latency sustained across 500k chunk embeddings in memory.',
      isHybridMatched: false,
    },
  ],
};

export const RetrieveScene: React.FC = () => {
  const [selectedQuery, setSelectedQuery] = useState(SAMPLE_QUERIES[0]);
  const [isSearching, setIsSearching] = useState(false);

  const activeChunks = SAMPLE_CHUNKS[selectedQuery] || SAMPLE_CHUNKS[SAMPLE_QUERIES[0]];

  const handleQuerySelect = (query: string) => {
    setIsSearching(true);
    audioSynth.playClick(900);
    setTimeout(() => {
      setSelectedQuery(query);
      setIsSearching(false);
      audioSynth.playChirp(700, 0.1);
    }, 280);
  };

  return (
    <section
      id="retrieve"
      aria-label="Retrieval-Augmented Generation & Vector Search"
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
        // Retrieval: The model has weights; the system provides memory.
      </div>

      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
          <span className="tech-tag">
            <Database size={13} />
            02 // RETRIEVE
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              color: 'var(--accent-cyan)',
            }}
          >
            RETRIEVAL-AUGMENTED GENERATION
          </span>
        </div>

        <h2
          style={{
            fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)',
            letterSpacing: '-0.03em',
            marginBottom: 12,
          }}
        >
          RETRIEVAL IS MEMORY.
        </h2>

        <p style={{ maxWidth: 740, fontSize: '1.05rem', color: 'var(--text-secondary)' }}>
          High-precision semantic memory indexing and hybrid ranking pipelines built to ground LLMs in
          factual enterprise context.
        </p>
      </div>

      {/* Conceptual System Pipeline Chain */}
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
            { step: '01', title: 'DOCUMENTS', desc: 'Unstructured Text & PDFs' },
            { step: '02', title: 'EMBEDDINGS', desc: 'High-Dimensional Vectors' },
            { step: '03', title: 'VECTOR SEARCH', desc: 'FAISS Dense Index' },
            { step: '04', title: 'HYBRID FUSION', desc: 'Dense + BM25 Lexical' },
            { step: '05', title: 'CONTEXT', desc: 'Assembled System Prompt' },
            { step: '06', title: 'LLM GENERATION', desc: 'Grounded Output' },
          ].map((node, i) => (
            <React.Fragment key={node.step}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: 'var(--accent-cyan)' }}>
                  {node.step} // {node.title}
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{node.desc}</span>
              </div>
              {i < 5 && <ArrowRight size={14} color="var(--border-technical)" />}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Interactive Retrieval Simulator */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: 24,
          alignItems: 'start',
        }}
      >
        {/* Left: Query Terminal & Vector Transformation */}
        <div className="blueprint-panel corner-crosshair" style={{ padding: 22 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 16,
              borderBottom: '1px solid var(--border-subtle)',
              paddingBottom: 8,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <Search size={14} color="var(--accent-cyan)" />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--accent-cyan)' }}>
                SEMANTIC_QUERY_INTERFACE
              </span>
            </div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)' }}>
              FAISS + HYBRID RANKING
            </span>
          </div>

          <div style={{ marginBottom: 14 }}>
            <label
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                color: 'var(--text-muted)',
                display: 'block',
                marginBottom: 8,
              }}
            >
              SELECT TEST QUERY TO EXECUTE RETRIEVAL:
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {SAMPLE_QUERIES.map((q) => (
                <button
                  key={q}
                  onClick={() => handleQuerySelect(q)}
                  data-cursor="open"
                  data-cursor-label="SEARCH"
                  style={{
                    textAlign: 'left',
                    background: selectedQuery === q ? 'rgba(0, 240, 255, 0.1)' : 'rgba(15, 18, 26, 0.6)',
                    border: selectedQuery === q ? '1px solid var(--accent-cyan)' : '1px solid var(--border-subtle)',
                    color: selectedQuery === q ? 'var(--accent-cyan)' : 'var(--text-primary)',
                    padding: '8px 12px',
                    borderRadius: 4,
                    fontSize: '0.78rem',
                    fontFamily: 'var(--font-mono)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <span>&gt; &ldquo;{q}&rdquo;</span>
                  {selectedQuery === q && <Check size={13} color="var(--accent-cyan)" />}
                </button>
              ))}
            </div>
          </div>

          {/* Samespace Production Context Note */}
          <div
            style={{
              background: 'rgba(7, 8, 11, 0.7)',
              border: '1px solid var(--border-technical)',
              padding: 12,
              borderRadius: 4,
              marginTop: 18,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
              <Cpu size={13} color="var(--accent-coral)" />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--accent-coral)' }}>
                PRODUCTION RECORD // SAMESPACE
              </span>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              Built end-to-end Retrieval-Augmented Generation pipelines using embeddings, FAISS, and
              hybrid retrieval for enterprise search and support workflows.
            </p>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                color: 'var(--text-muted)',
                marginTop: 6,
                display: 'block',
              }}
            >
              * Conceptual system view; proprietary parameters omitted.
            </span>
          </div>
        </div>

        {/* Right: Retrieved Vector Chunks & Similarity Scores */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              color: 'var(--text-muted)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span>TOP-K RETRIEVED CHUNKS ({activeChunks.length})</span>
            <span style={{ color: 'var(--accent-emerald)' }}>HYBRID FUSION CONFIRMED</span>
          </div>

          {activeChunks.map((chunk, index) => (
            <div
              key={chunk.id}
              className="blueprint-panel"
              style={{
                padding: 16,
                borderLeft: `3px solid ${index === 0 ? 'var(--accent-cyan)' : 'rgba(0, 240, 255, 0.3)'}`,
                transition: 'all 0.2s ease',
                opacity: isSearching ? 0.3 : 1,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 8,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <FileCode size={13} color="var(--accent-cyan)" />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-primary)' }}>
                    {chunk.source}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  {chunk.isHybridMatched && (
                    <span className="tech-tag tech-tag-emerald" style={{ fontSize: '0.62rem', padding: '1px 5px' }}>
                      BM25+DENSE
                    </span>
                  )}
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      color: index === 0 ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                    }}
                  >
                    SIM: {(chunk.similarity * 100).toFixed(1)}%
                  </span>
                </div>
              </div>

              <p
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.76rem',
                  color: 'var(--text-secondary)',
                  background: 'rgba(0, 0, 0, 0.35)',
                  padding: '8px 10px',
                  borderRadius: 3,
                  lineHeight: 1.5,
                }}
              >
                &ldquo;{chunk.preview}&rdquo;
              </p>
            </div>
          ))}

          {/* Localized Toolbox */}
          <div
            className="blueprint-panel"
            style={{
              padding: 12,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: 'rgba(12, 14, 20, 0.6)',
            }}
          >
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
              LOCALIZED TECH:
            </div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
              {['RAG', 'FAISS', 'Qdrant', 'Weaviate', 'Embeddings', 'Hybrid Retrieval'].map((tool) => (
                <span
                  key={tool}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.68rem',
                    color: 'var(--accent-cyan)',
                    background: 'rgba(0, 240, 255, 0.06)',
                    padding: '2px 7px',
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
    </section>
  );
};
