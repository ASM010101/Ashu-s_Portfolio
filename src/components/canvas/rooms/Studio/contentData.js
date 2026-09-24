/**
 * Studio Content Data for Ashish Maurya
 * 
 * Displays technical deep-dives, research papers, system architectures,
 * and AI engineering workflows on the interactive 3D monitor tower.
 * 
 * Platforms: 'youtube', 'blog', 'tiktok'
 */

export const PLATFORM_CONFIG = {
    youtube: {
        color: '#FF0000',
        accentColor: '#cc0000',
        icon: '▶',
        label: 'Research & Demos',
        shape: 'tv', // Wide CRT style
    },
    blog: {
        color: '#4A90D9',
        accentColor: '#2d6cb5',
        icon: '📝',
        label: 'Engineering Notes',
        shape: 'monitor', // Thin desktop monitor
    },
    tiktok: {
        color: '#00F2EA',
        accentColor: '#FF0050',
        icon: '⚡',
        label: 'Architecture Snippets',
        shape: 'phone', // Vertical phone
    },
};

const RAW_CONTENT_DATA = [
    // ============ CRT TVs (Research Demos & Framework Presentations) ============
    {
        id: 'yt-001',
        platform: 'youtube',
        title: 'ICIP: Controllable AI Image Generation with Stable Diffusion',
        description: 'Presentation of the ICIP framework presented at T&F ICICS 2025. Unifies Stable Diffusion, ControlNet, IP-Adapter, and inpainting under IndiaAI Mission research grant.',
        frontTexture: '/textures/studio/tvfront_filmikprojektdlamultiego.webp',
        paintedFrontTexture: '/textures/studio/tvfront_filmikprojektdlamultiego_painted.webp',
        thumbnail: null,
        url: 'https://www.researchgate.net/publication/401880407_ICIP_An_integrated_approach_for_AI_image_generation_using_stable_diffusion',
        date: '2025-02-15',
        views: '3.4K',
        duration: '14:20',
    },
    {
        id: 'yt-002',
        platform: 'youtube',
        title: 'UAV Real-Time Obstacle Detection: IEEE 2024 Research',
        description: 'Deep dive into deploying YOLOv8 object detection on edge compute modules for autonomous UAV collision avoidance and real-time path planning.',
        frontTexture: '/textures/studio/tvfront_filmikedytowaniezdjec.webp',
        paintedFrontTexture: '/textures/studio/tvfront_filmikedytowaniezdjec_painted.webp',
        thumbnail: null,
        url: 'https://ieeexplore.ieee.org/document/10550335',
        date: '2024-06-20',
        views: '2.8K',
        duration: '12:45',
    },
    {
        id: 'yt-003',
        platform: 'youtube',
        title: 'Building Enterprise RAG with FAISS and Hybrid Embeddings',
        description: 'Architecting scalable vector search pipelines with dense and sparse retrieval, re-ranking strategies, and chunk optimization for enterprise support at Samespace.',
        thumbnail: null,
        url: 'https://github.com/ASM010101',
        date: '2025-09-10',
        views: '1.9K',
        duration: '18:10',
    },
    {
        id: 'yt-004',
        platform: 'youtube',
        title: 'Agentic Workflows: Google ADK and Custom MCP Servers',
        description: 'Designing autonomous multi-agent systems using Google Agent Development Kit (ADK) paired with Model Context Protocol (MCP) servers for operational tooling.',
        thumbnail: null,
        url: 'https://github.com/ASM010101',
        date: '2025-11-05',
        views: '2.2K',
        duration: '16:30',
    },
    {
        id: 'yt-005',
        platform: 'youtube',
        title: 'Speech-to-Speech Accent Translation Architecture',
        description: 'Neural voice transformation breakdown: analyzing acoustic encoders, latent voice mapping, and neural vocoders for real-time accent translation.',
        thumbnail: null,
        url: 'https://github.com/ASM010101',
        date: '2025-12-12',
        views: '2.7K',
        duration: '21:15',
    },
    {
        id: 'yt-006',
        platform: 'youtube',
        title: 'HyperVerge Nexus: Synthetic ID & Document Forgery Detection',
        description: 'Research insights from developing diffusion-based synthetic document generation and anti-spoofing verification at HyperVerge Nexus.',
        thumbnail: null,
        url: 'https://hyperverge.co',
        date: '2024-05-18',
        views: '1.6K',
        duration: '15:40',
    },
    {
        id: 'yt-007',
        platform: 'youtube',
        title: 'Fine-Tuning Foundation Models for Tool-Calling Reliability',
        description: 'Techniques for LoRA and instruction fine-tuning to dramatically increase JSON structured output accuracy and multi-step tool calling.',
        thumbnail: null,
        url: 'https://github.com/ASM010101',
        date: '2025-10-22',
        views: '2.1K',
        duration: '19:50',
    },
    {
        id: 'yt-008',
        platform: 'youtube',
        title: 'Oracle Cloud OCI Generative AI Certification Breakdown',
        description: 'Comprehensive walkthrough of OCI GenAI service architectures, vector databases, and enterprise governance principles.',
        thumbnail: null,
        url: 'https://education.oracle.com',
        date: '2025-01-20',
        views: '1.4K',
        duration: '11:25',
    },

    // ============ Desktop Monitors (Engineering Notes & Technical Papers) ============
    {
        id: 'blog-001',
        platform: 'blog',
        title: 'IEEE 2024: Edge YOLO for Autonomous UAVs',
        description: 'Full analysis of model quantizations, latency benchmarks, and deployment constraints when running YOLOv8 on resource-constrained UAV onboard chips.',
        frontTexture: '/textures/studio/monitorfront_postnafbdoublewinner.webp',
        paintedFrontTexture: '/textures/studio/monitorfront_postnafbdoublewinner_painted.webp',
        thumbnail: null,
        url: 'https://ieeexplore.ieee.org/document/10550335',
        date: '2024-06-15',
        readTime: '6 min',
    },
    {
        id: 'blog-002',
        platform: 'blog',
        title: 'ICIP Stable Diffusion: Controllable Generation Framework',
        description: 'How coupling ControlNet conditioning with IP-Adapter semantic priors enables high-fidelity, deterministic diffusion generation without catastrophic quality loss.',
        thumbnail: null,
        url: 'https://www.researchgate.net/publication/401880407_ICIP_An_integrated_approach_for_AI_image_generation_using_stable_diffusion',
        date: '2025-02-10',
        readTime: '8 min',
    },
    {
        id: 'blog-003',
        platform: 'blog',
        title: 'Production RAG at Samespace: Lessons from Enterprise Scale',
        description: 'Overcoming semantic drift, chunking boundary anomalies, and hybrid re-ranking latency in high-concurrency customer support search systems.',
        thumbnail: null,
        url: 'https://github.com/ASM010101',
        date: '2025-08-14',
        readTime: '7 min',
    },
    {
        id: 'blog-004',
        platform: 'blog',
        title: 'Multilingual TTS Pipelines with Code-Switching Support',
        description: 'Architecting streaming text-to-speech synthesis supporting mid-sentence language transitions with consistent speaker voice characteristics.',
        thumbnail: null,
        url: 'https://github.com/ASM010101',
        date: '2025-10-02',
        readTime: '9 min',
    },
    {
        id: 'blog-005',
        platform: 'blog',
        title: 'Standard Chartered Hackathon: Online Video KYC Architecture',
        description: 'Building an automated customer onboarding pipeline with real-time biometric face liveness, OCR document validation, and identity matching.',
        thumbnail: null,
        url: 'https://github.com/ASM010101',
        date: '2024-03-20',
        readTime: '7 min',
    },
    {
        id: 'blog-006',
        platform: 'blog',
        title: 'Barclays Hackathon: Financial Anomaly Detection System',
        description: 'Engineering high-throughput transaction monitoring models using machine learning to detect fraud signatures with minimal false positives.',
        thumbnail: null,
        url: 'https://github.com/ASM010101',
        date: '2024-04-18',
        readTime: '8 min',
    },
    {
        id: 'blog-007',
        platform: 'blog',
        title: 'Automated Evaluation Pipelines & Guardrails for LLMs',
        description: 'Preventing prompt regressions and hallucination propagation in production pipelines using automated test suites and structured guardrails.',
        thumbnail: null,
        url: 'https://github.com/ASM010101',
        date: '2025-11-28',
        readTime: '6 min',
    },
    {
        id: 'blog-008',
        platform: 'blog',
        title: 'Upcoming M.Tech AI Research Focus at IIT Patna',
        description: 'Exploring upcoming graduate research directions in frontier generative models, neuromorphic computing, and scalable reasoning engines at IIT Patna.',
        thumbnail: null,
        url: 'https://www.iitp.ac.in',
        date: '2026-03-01',
        readTime: '5 min',
    },

    // ============ Vertical Phones (Architecture Snippets & Quick Takeaways) ============
    {
        id: 'tt-001',
        platform: 'tiktok',
        title: 'RAG Chunking: Overlap vs Small-to-Big',
        description: 'Why small chunk retrieval with parent document expansion yields higher answer fidelity than large monolithic chunks.',
        frontTexture: '/textures/studio/phonefront_followmeontiktok.webp',
        paintedFrontTexture: '/textures/studio/phonefront_followmeontiktok_painted.webp',
        thumbnail: null,
        url: 'https://github.com/ASM010101',
        date: '2025-11-12',
        views: '8.4K',
        likes: '720',
    },
    {
        id: 'tt-002',
        platform: 'tiktok',
        title: 'YOLOv8 Edge Optimization for Drones',
        description: 'FP16 quantization on Jetson Nano: slicing inference latency from 85ms to 18ms with zero recall loss.',
        thumbnail: null,
        url: 'https://ieeexplore.ieee.org/document/10550335',
        date: '2024-07-04',
        views: '12.1K',
        likes: '1.1K',
    },
    {
        id: 'tt-003',
        platform: 'tiktok',
        title: 'ControlNet + IP-Adapter in Practice',
        description: 'Decoupling structural control and facial identity conditioning for deterministic Stable Diffusion pipelines.',
        thumbnail: null,
        url: 'https://www.researchgate.net/publication/401880407_ICIP_An_integrated_approach_for_AI_image_generation_using_stable_diffusion',
        date: '2025-02-18',
        views: '9.6K',
        likes: '890',
    },
    {
        id: 'tt-004',
        platform: 'tiktok',
        title: 'MCP Servers in 60 Seconds',
        description: 'How the Model Context Protocol standardizes agent tool discovery across IDEs, local apps, and cloud tools.',
        thumbnail: null,
        url: 'https://github.com/ASM010101',
        date: '2025-12-01',
        views: '14.2K',
        likes: '1.4K',
    },
    {
        id: 'tt-005',
        platform: 'tiktok',
        title: 'Voice Code-Switching in TTS',
        description: 'Handling bilingual sentences (English + Hindi) smoothly without robotic phonetic breaks.',
        thumbnail: null,
        url: 'https://github.com/ASM010101',
        date: '2025-10-15',
        views: '7.8K',
        likes: '640',
    },
    {
        id: 'tt-006',
        platform: 'tiktok',
        title: 'LoRA Rank & Alpha Selection Rule',
        description: 'Practical heuristic: why rank 16 with alpha 32 often beats rank 64 for structured instruction following.',
        thumbnail: null,
        url: 'https://github.com/ASM010101',
        date: '2025-09-28',
        views: '11.5K',
        likes: '980',
    },
    {
        id: 'tt-007',
        platform: 'tiktok',
        title: 'FAISS Index Choice: Flat vs HNSW',
        description: 'When exact cosine distance via IndexFlatIP matters vs when HNSW speedup justifies the RAM trade-off.',
        thumbnail: null,
        url: 'https://github.com/ASM010101',
        date: '2025-08-25',
        views: '6.9K',
        likes: '510',
    },
    {
        id: 'tt-008',
        platform: 'tiktok',
        title: 'Anti-Spoofing in Video KYC',
        description: 'Combining frequency domain texture analysis with 3D landmark depth to prevent screen replay attacks.',
        thumbnail: null,
        url: 'https://github.com/ASM010101',
        date: '2024-04-05',
        views: '10.3K',
        likes: '860',
    },
    {
        id: 'tt-009',
        platform: 'tiktok',
        title: 'Guardrails That Actually Stop Bad Outputs',
        description: 'Pydantic structured output validation combined with secondary verifier agents in high-stakes workflows.',
        thumbnail: null,
        url: 'https://github.com/ASM010101',
        date: '2025-11-19',
        views: '13.7K',
        likes: '1.2K',
    },
    {
        id: 'tt-010',
        platform: 'tiktok',
        title: 'IndiaAI Mission Grant Journey',
        description: 'How our research proposal secured national funding from the Ministry of Electronics and Information Technology.',
        thumbnail: null,
        url: 'https://indiaai.gov.in',
        date: '2024-09-30',
        views: '15.9K',
        likes: '1.7K',
    },
    {
        id: 'tt-011',
        platform: 'tiktok',
        title: 'Dockerizing GPU Inference Workflows',
        description: 'Multi-stage Docker builds with NVIDIA Container Toolkit for lightweight, reproducible PyTorch deployment.',
        thumbnail: null,
        url: 'https://github.com/ASM010101',
        date: '2025-07-14',
        views: '8.2K',
        likes: '710',
    },
    {
        id: 'tt-012',
        platform: 'tiktok',
        title: 'From SRM IST to IIT Patna',
        description: 'Reflecting on 4 years in CSE (AI & ML) at SRM, building systems at Samespace, and preparing for IIT Patna.',
        thumbnail: null,
        url: 'https://linkedin.com/in/ashish-maurya-728396262/',
        date: '2026-02-01',
        views: '18.1K',
        likes: '2.3K',
    },
];

const ytTextures = ['/textures/studio/tvfront_filmikprojektdlamultiego.webp', '/textures/studio/tvfront_filmikedytowaniezdjec.webp'];
const ytPaintedTextures = ['/textures/studio/tvfront_filmikprojektdlamultiego_painted.webp', '/textures/studio/tvfront_filmikedytowaniezdjec_painted.webp'];
const blogTextures = ['/textures/studio/monitorfront_postnafbdoublewinner.webp'];
const blogPaintedTextures = ['/textures/studio/monitorfront_postnafbdoublewinner_painted.webp'];
const ttTextures = ['/textures/studio/phonefront_followmeontiktok.webp'];
const ttPaintedTextures = ['/textures/studio/phonefront_followmeontiktok_painted.webp'];

let ytIdx = 0, blogIdx = 0, ttIdx = 0;
let ytPIdx = 0, blogPIdx = 0, ttPIdx = 0;

export const CONTENT_DATA = RAW_CONTENT_DATA.map((item) => {
    return {
        ...item,
        frontTexture: item.frontTexture || (
            item.platform === 'youtube' ? ytTextures[ytIdx++ % ytTextures.length] :
                item.platform === 'blog' ? blogTextures[blogIdx++ % blogTextures.length] :
                    ttTextures[ttIdx++ % ttTextures.length]
        ),
        paintedFrontTexture: item.paintedFrontTexture || (
            item.platform === 'youtube' ? ytPaintedTextures[ytPIdx++ % ytPaintedTextures.length] :
                item.platform === 'blog' ? blogPaintedTextures[blogPIdx++ % blogPaintedTextures.length] :
                    ttPaintedTextures[ttPIdx++ % ttPaintedTextures.length]
        )
    };
});

// Helper to get content by platform
export const getContentByPlatform = (platform) => {
    if (platform === 'all') return CONTENT_DATA;
    return CONTENT_DATA.filter(item => item.platform === platform);
};

// Get latest content (for "On Air" indicator)
export const getLatestContent = () => {
    return [...CONTENT_DATA].sort((a, b) => new Date(b.date) - new Date(a.date))[0];
};
