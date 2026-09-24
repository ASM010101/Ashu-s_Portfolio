export interface EducationItem {
  id: string;
  stage: "ORIGIN" | "NEXT NODE";
  institution: string;
  degree: string;
  period: string;
  grade?: string;
  location: string;
  focus: string;
  takeaways: string[];
}

export const educationData: EducationItem[] = [
  {
    id: "srm-ist",
    stage: "ORIGIN",
    institution: "SRM Institute of Science and Technology",
    degree: "Bachelor of Technology — Computer Science & Engineering (AI & ML)",
    period: "Jun 2021 – Jun 2025",
    grade: "CGPA: 9.04 / 10.00",
    location: "Kattankulathur, Chennai, India",
    focus: "Foundational Artificial Intelligence, Machine Learning, Data Structures, and Applied Computer Vision",
    takeaways: [
      "Graduated with distinction (CGPA 9.04 / 10.00)",
      "Published IEEE research on UAV path planning with YOLO",
      "Conducted research fellowships at HyperVerge Nexus and under the IndiaAI Mission",
    ],
  },
  {
    id: "iit-patna",
    stage: "NEXT NODE",
    institution: "Indian Institute of Technology (IIT) Patna",
    degree: "Master of Technology (M.Tech) — Artificial Intelligence",
    period: "Jul 2026 – Jun 2028",
    location: "Patna, Bihar, India",
    focus: "Advanced Deep Learning, Autonomous Agentic Architectures, Neural Representation, and Scalable AI Systems",
    takeaways: [
      "Pursuing graduate research at an Institute of National Importance",
      "Focusing on the convergence of large language models, agentic reasoning, and production deployment constraints",
    ],
  },
];
