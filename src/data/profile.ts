export interface ProfileData {
  name: string;
  title: string;
  subtitle: string;
  tagline: string;
  creativePhilosophy: string;
  location: string;
  phone: string;
  email: string;
  linkedin: string;
  github: string;
  currentPursuit: string;
  summary: string;
  domains: string[];
}

export const profileData: ProfileData = {
  name: "Ashish Maurya",
  title: "Applied AI Engineer",
  subtitle: "LLMs, RAG, Speech AI & Agentic Systems",
  tagline: "I don't just use models. I build the systems around them.",
  creativePhilosophy: "An AI Engineer's Sketchbook Becoming a Machine: From raw notebook hypotheses to enterprise-grade autonomous systems.",
  location: "Mirzapur, UP, India",
  phone: "+91 6306602646",
  email: "amashish950@gmail.com",
  linkedin: "https://linkedin.com/in/ashish-maurya-728396262/",
  github: "https://github.com/ASM010101",
  currentPursuit: "Pursuing M.Tech in Artificial Intelligence at Indian Institute of Technology (IIT) Patna (2026–2028)",
  summary:
    "AI/ML Engineer pursuing an M.Tech in Artificial Intelligence at IIT Patna, with hands-on experience shipping production LLM, RAG, and speech-AI systems at Samespace, backed by IEEE-published research and a corresponding-author paper at ICICS 2025. Prior Research Fellow at HyperVerge Nexus and under the IndiaAI Mission grant. Core strengths: PyTorch, Transformers, and end-to-end generative AI pipelines from data to deployment.",
  domains: [
    "Large Language Models (LLMs)",
    "Retrieval-Augmented Generation (RAG)",
    "Speech AI & Accent Translation",
    "Agentic Systems & MCP",
    "Diffusion & Controllable GenAI",
    "Computer Vision & Edge Detection",
  ],
};
