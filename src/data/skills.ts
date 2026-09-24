export interface SkillCategory {
  id: string;
  category: string;
  worldModule: string;
  description: string;
  items: string[];
  iconTag: string;
}

export const skillsData: SkillCategory[] = [
  {
    id: "agentic-ai",
    category: "Agentic AI & Orchestration",
    worldModule: "03 / ACT",
    description: "Multi-agent systems, protocol servers, and deterministic tool execution engines.",
    items: ["Google ADK", "MCP Servers", "Guardrails", "Automated Evaluations"],
    iconTag: "AGENT",
  },
  {
    id: "llms-genai",
    category: "LLMs & Generative AI",
    worldModule: "02 / RETRIEVE & 05 / GENERATE",
    description: "Vector indexing, hybrid search pipelines, parameter-efficient tuning, and diffusion models.",
    items: [
      "RAG",
      "FAISS",
      "Qdrant",
      "Weaviate",
      "Tool Calling",
      "Fine-Tuning",
      "Prompt Engineering",
      "LoRA",
      "Stable Diffusion",
    ],
    iconTag: "GENAI",
  },
  {
    id: "ai-ml-core",
    category: "AI / Machine Learning",
    worldModule: "CORE ENGINE",
    description: "Foundation deep learning architectures, attention mechanisms, and fine-tuning frameworks.",
    items: ["PyTorch", "TensorFlow", "Transformers", "Diffusers", "PEFT", "Scikit-Learn"],
    iconTag: "ML",
  },
  {
    id: "computer-vision",
    category: "Computer Vision",
    worldModule: "01 / SEE",
    description: "Real-time edge object detection, facial verification, and automated OCR pipelines.",
    items: ["YOLOv8", "OpenCV", "Roboflow"],
    iconTag: "CV",
  },
  {
    id: "speech-ai",
    category: "Speech AI",
    worldModule: "04 / SPEAK",
    description: "Multilingual text-to-speech, code-switching synthesis, and accent mapping.",
    items: ["Multilingual TTS", "Code-Switching", "Custom Voice Enhancement", "Accent Translation (Encoder/Mapper/Vocoder)"],
    iconTag: "VOICE",
  },
  {
    id: "languages",
    category: "Languages",
    worldModule: "SYNTAX",
    description: "Core programming languages utilized across ML pipelines and systems engineering.",
    items: ["Python", "C", "C++", "JavaScript", "HTML", "CSS"],
    iconTag: "LANG",
  },
  {
    id: "infrastructure",
    category: "Infrastructure & Tools",
    worldModule: "RUNTIME",
    description: "Containerization, cloud serving, CI/CD, and distributed model execution environments.",
    items: ["Docker", "Git", "Linux", "AWS"],
    iconTag: "OPS",
  },
  {
    id: "databases",
    category: "Databases & Storage",
    worldModule: "STORAGE",
    description: "Relational persistence and high-throughput transactional databases.",
    items: ["PostgreSQL", "MySQL"],
    iconTag: "DATA",
  },
];

export interface CertificationItem {
  name: string;
  issuer: string;
  year: string;
  badge: string;
}

export const certificationsData: CertificationItem[] = [
  {
    name: "Oracle Cloud Infrastructure 2024 Generative AI Certified Professional",
    issuer: "Oracle",
    year: "2025",
    badge: "OCI CERTIFIED",
  },
];
