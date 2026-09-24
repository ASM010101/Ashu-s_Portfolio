export interface ProjectItem {
  id: string;
  codeName: string;
  title: string;
  category: string;
  hackathon: string;
  recognition: string;
  description: string;
  capabilities: string[];
  techStack: string[];
  systemFlow: string[];
}

export const projectsData: ProjectItem[] = [
  {
    id: "online-video-kyc",
    codeName: "SIDE MISSION 01",
    title: "Online Video KYC System",
    category: "Computer Vision, OCR, Face Verification",
    hackathon: "Standard Chartered Hackathon",
    recognition: "Hackathon Engineering Project",
    description:
      "Built an AI-powered KYC system for secure customer onboarding at the Standard Chartered Hackathon, combining face verification with document-validation workflows.",
    capabilities: [
      "Real-time customer face verification against identity document portrait",
      "Automated OCR bounding-box extraction from government ID cards",
      "Tamper detection and document liveness verification pipeline",
      "Low-friction, secure remote onboarding workflow",
    ],
    techStack: ["Computer Vision", "OCR", "Face Verification", "OpenCV", "Python"],
    systemFlow: [
      "Video Stream Input",
      "Face Liveness & Detection",
      "Document OCR Scan",
      "Identity Vector Verification",
      "Validation Report",
    ],
  },
  {
    id: "financial-anomaly-detection",
    codeName: "SIDE MISSION 02",
    title: "Financial Anomaly Detection System",
    category: "Machine Learning, Data Analytics",
    hackathon: "Barclays Hackathon",
    recognition: "Advanced to Final Round",
    description:
      "Built a financial-transaction anomaly-detection system for the Barclays Hackathon; advanced to the final round.",
    capabilities: [
      "Real-time transaction stream anomaly scoring",
      "High-dimensional financial feature engineering",
      "Flagging fraudulent patterns while minimizing false-positive interruptions",
      "Comprehensive telemetry dashboard for audit transparency",
    ],
    techStack: ["Machine Learning", "Data Analytics", "Scikit-Learn", "Python", "Statistical Modeling"],
    systemFlow: [
      "Transaction Ingestion",
      "Feature Normalization",
      "Ensemble Anomaly Classifier",
      "Risk Score Calculation",
      "Alert & Audit Log",
    ],
  },
];
