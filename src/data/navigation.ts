export interface NavStep {
  id: string;
  stepNumber: string;
  label: string;
  sublabel: string;
  domain: string;
  color: string;
}

export const navigationSteps: NavStep[] = [
  { id: "boot", stepNumber: "00", label: "BOOT", sublabel: "SYSTEM INIT", domain: "Initialization", color: "#00f0ff" },
  { id: "see", stepNumber: "01", label: "SEE", sublabel: "VISION & OCR", domain: "Computer Vision", color: "#38bdf8" },
  { id: "retrieve", stepNumber: "02", label: "RETRIEVE", sublabel: "MEMORY & RAG", domain: "RAG & Search", color: "#60a5fa" },
  { id: "act", stepNumber: "03", label: "ACT", sublabel: "AGENTS & MCP", domain: "Agentic Systems", color: "#818cf8" },
  { id: "speak", stepNumber: "04", label: "SPEAK", sublabel: "SIGNAL & VOICE", domain: "Speech AI", color: "#a78bfa" },
  { id: "generate", stepNumber: "05", label: "GENERATE", sublabel: "LATENT DIFFUSION", domain: "Generative AI", color: "#c084fc" },
  { id: "verify", stepNumber: "06", label: "VERIFY", sublabel: "EVAL & GUARDRAILS", domain: "Reliability", color: "#00f59b" },
  { id: "research", stepNumber: "07", label: "RESEARCH", sublabel: "PAPERS & ARCHIVE", domain: "Publications", color: "#ffd166" },
  { id: "field-log", stepNumber: "08", label: "FIELD LOG", sublabel: "PRODUCTION LOG", domain: "Experience", color: "#ff6b4a" },
  { id: "toolbox", stepNumber: "09", label: "TOOLBOX", sublabel: "SYSTEM STACK", domain: "Technical Skills", color: "#38bdf8" },
  { id: "side-missions", stepNumber: "10", label: "MISSIONS", sublabel: "HACKATHONS", domain: "Key Projects", color: "#f472b6" },
  { id: "origin", stepNumber: "11", label: "ORIGIN", sublabel: "ACADEMIC ROOTS", domain: "Education", color: "#fbbf24" },
  { id: "ship", stepNumber: "12", label: "SHIP", sublabel: "EXECUTION READY", domain: "Deployment & Contact", color: "#00f0ff" },
];
