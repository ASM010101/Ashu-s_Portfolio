export interface ExperienceItem {
  id: string;
  entryNumber: string;
  role: string;
  company: string;
  location?: string;
  period: string;
  type: "Full-time" | "Internship" | "Research Fellowship";
  oneLiner: string;
  highlights: string[];
  skills: string[];
  systemArchitectureDiagram?: string;
  researchNote?: string;
}

export const experienceData: ExperienceItem[] = [
  {
    id: "samespace-sde1",
    entryNumber: "ENTRY 01",
    role: "SDE-1 AI/ML Engineer",
    company: "Samespace",
    location: "Mumbai",
    period: "Jul 2025 – Jun 2026",
    type: "Full-time",
    oneLiner: "Shipping enterprise RAG pipelines, fine-tuned agentic tool systems, and speech AI workflows in production.",
    highlights: [
      "Built end-to-end Retrieval-Augmented Generation pipelines using embeddings, FAISS, and hybrid retrieval for enterprise search and support workflows.",
      "Fine-tuned foundation models for customer-specific tool-calling and instruction-following, improving task completion across production deployments.",
      "Designed multi-agent systems on Google's ADK framework with custom MCP servers to automate complex workflows.",
      "Built multilingual TTS pipelines with code-switching and custom voice enhancements for communication products.",
      "Implemented guardrails and automated evaluation pipelines that catch regressions pre-release, improving AI reliability.",
      "Contributed encoder, mapper, and vocoder components to a speech-to-speech accent-translation system.",
    ],
    skills: [
      "RAG",
      "FAISS",
      "Embeddings",
      "Hybrid Retrieval",
      "Model Fine-Tuning",
      "Google ADK",
      "MCP Servers",
      "Multilingual TTS",
      "Speech-to-Speech",
      "Guardrails",
      "Automated Evaluations",
    ],
    researchNote: "Enterprise production constraint: Low latency vector retrieval + deterministic tool execution via model fine-tuning and strict pre-release regression evaluation gates.",
  },
  {
    id: "samespace-intern",
    entryNumber: "ENTRY 02",
    role: "AI/ML Engineer Intern",
    company: "Samespace",
    location: "Mumbai / Remote",
    period: "Feb 2025 – Jul 2025",
    type: "Internship",
    oneLiner: "Production model serving, evaluation harness setup, and scalable LLM feature integrations.",
    highlights: [
      "Deployed AI solutions and integrated LLM-powered features into production systems.",
      "Supported model serving, evaluation, and scalable AI workflow design alongside the core engineering team.",
    ],
    skills: ["Model Serving", "LLM Integration", "Evaluation Frameworks", "Python", "Transformers", "Docker"],
    researchNote: "Transitioned from lab experimentation to hardened high-availability model serving infrastructure.",
  },
  {
    id: "hyperverge-nexus",
    entryNumber: "ENTRY 03",
    role: "Research Fellow",
    company: "HyperVerge Nexus",
    location: "Chennai",
    period: "Feb 2024 – Jun 2024",
    type: "Research Fellowship",
    oneLiner: "Investigating synthetic ID generation, document forgery detection, and diffusion-based image pipelines.",
    highlights: [
      "Developed image-generation pipelines using Stable Diffusion and LoRA fine-tuning for document and identity use cases.",
      "Researched document forgery detection and synthetic ID generation methods.",
      "Built generation workflows using diffusion models and the Fooocus ecosystem.",
    ],
    skills: ["Stable Diffusion", "LoRA", "Document Forgery Detection", "Synthetic ID Generation", "Fooocus", "PyTorch"],
    researchNote: "Focused on adversarial boundary conditions in document fraud and synthetic identity forensics.",
  },
  {
    id: "indiaai-mission",
    entryNumber: "ENTRY 04",
    role: "Research Fellow",
    company: "IndiaAI Mission",
    period: "Sep 2024 – Feb 2025",
    type: "Research Fellowship",
    oneLiner: "Conceiving and developing the ICIP framework for controllable image generation under national AI grant funding.",
    highlights: [
      "Designed and developed the ICIP framework, integrating Stable Diffusion, ControlNet, IP-Adapter, and image inpainting for controllable image generation.",
      "Secured IndiaAI Mission research funding and presented the framework at T&F ICICS 2025.",
    ],
    skills: ["ICIP Framework", "Stable Diffusion", "ControlNet", "IP-Adapter", "Inpainting", "Custom Datasets", "PyTorch"],
    researchNote: "Awarded research funding under the national IndiaAI Mission initiative; yielded corresponding-author publication at ICICS 2025.",
  },
];
