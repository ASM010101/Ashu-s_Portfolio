export interface PublicationItem {
  id: string;
  title: string;
  venue: string;
  date: string;
  role: string;
  summary: string;
  methods: string[];
  keyHighlights: string[];
  badge: string;
  linkText?: string;
  url?: string;
}

export const publicationsData: PublicationItem[] = [
  {
    id: "icip-stable-diffusion",
    title: "ICIP: An Integrated Approach for AI Image Generation Using Stable Diffusion",
    venue: "T&F ICICS 2025, VVCE Mysuru",
    date: "Feb 2025",
    role: "Corresponding Author",
    badge: "CORRESPONDING AUTHOR",
    summary:
      "Proposed a novel framework combining Stable Diffusion, ControlNet, IP-Adapter, and inpainting for controllable, realistic image generation; fine-tuned on custom datasets.",
    methods: [
      "Stable Diffusion Latent Space",
      "ControlNet Spatial Conditioning",
      "IP-Adapter Image Prompt Injection",
      "Localized Diffusion Inpainting",
      "Custom Dataset Fine-Tuning",
    ],
    keyHighlights: [
      "Unifies multiple conditional diffusion controls into an integrated generative architecture",
      "Funded under the IndiaAI Mission research grant program",
      "Delivered oral presentation at Taylor & Francis ICICS 2025",
    ],
  },
  {
    id: "uav-yolo-detection",
    title: "Obstacle Detection in Path Planning for Unmanned Aerial Vehicles Based on YOLO",
    venue: "IEEE",
    date: "Jun 2024",
    role: "Co-Author (5 authors)",
    badge: "IEEE PUBLICATION",
    summary:
      "Investigated YOLO-based object detection for autonomous UAV path planning, evaluating model efficiency and deployment constraints in resource-limited environments.",
    methods: [
      "YOLO Architecture",
      "Edge Computer Vision",
      "Autonomous UAV Path Planning",
      "Latency & Resource Constraint Evaluation",
      "Real-Time Obstacle Avoidance",
    ],
    keyHighlights: [
      "Benchmarked real-time obstacle detection latencies under compute-limited onboard hardware",
      "Integrated spatial detection bounds with 3D UAV vector path-planning algorithms",
      "Published in IEEE conference proceedings",
    ],
  },
];
