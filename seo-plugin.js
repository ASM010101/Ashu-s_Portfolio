/**
 * Static SEO & LLMs.txt generation plugin for Ashish Maurya's Portfolio
 * Generates verified JSON-LD, semantic fallback HTML, and llms.txt.
 */

const SITE_URL = 'https://asm010101.github.io/Ashu-s_Portfolio';

const PROFILE = {
    name: 'Ashish Kumar Maurya',
    preferredName: 'Ashish Maurya',
    headline: 'Applied AI Engineer | LLMs, RAG, Speech AI & Agentic Systems',
    siteTitle: 'Ashish Maurya | Applied AI Engineer — LLMs, RAG, Speech AI & Agentic Systems',
    siteDescription: 'Interactive 3D hand-drawn portfolio of Ashish Maurya — Applied AI Engineer (M.Tech AI at IIT Patna, ex-Samespace). Explore real-time speech AI, agentic systems, RAG, and WebGL.',
    location: 'Mirzapur, UP, India',
    email: 'amashish950@gmail.com',
    github: 'https://github.com/ASM010101',
    linkedin: 'https://linkedin.com/in/ashish-maurya-728396262/',
    portfolioUrl: SITE_URL,
    resumeUrl: `${SITE_URL}/Ashish_Kumar_Maurya_Resume.pdf`,
    education: [
        {
            degree: 'Master of Technology (M.Tech), Artificial Intelligence',
            institution: 'Indian Institute of Technology (IIT) Patna',
            period: 'Jul 2026 – Jun 2028',
        },
        {
            degree: 'Bachelor of Technology, Computer Science & Engineering (AI & ML)',
            institution: 'SRM Institute of Science and Technology, Chennai',
            period: 'Jun 2021 – Jun 2025',
            grade: 'CGPA: 9.04 / 10.00'
        }
    ],
    experience: [
        {
            role: 'SDE-1 AI/ML Engineer',
            company: 'Samespace, Mumbai',
            period: 'Jul 2025 – Jun 2026',
            highlights: [
                'Built end-to-end Retrieval-Augmented Generation (RAG) pipelines using embeddings, FAISS, and hybrid retrieval for enterprise search and support workflows.',
                'Fine-tuned foundation models for customer-specific tool-calling and instruction-following, improving task completion across production deployments.',
                'Designed multi-agent systems on Google ADK framework with custom MCP servers to automate enterprise operations.',
                'Built multilingual TTS pipelines with code-switching and custom voice enhancements for communication products.',
                'Implemented guardrails and automated evaluation pipelines that catch regressions pre-release, improving AI reliability.',
                'Contributed encoder, mapper, and vocoder components to a speech-to-speech accent-translation system.'
            ]
        },
        {
            role: 'AI/ML Engineer Intern',
            company: 'Samespace',
            period: 'Feb 2025 – Jul 2025',
            highlights: [
                'Deployed AI solutions and integrated LLM-powered features into production systems.',
                'Supported model serving, evaluation, and scalable AI workflow design alongside the core engineering team.'
            ]
        },
        {
            role: 'Research Fellow',
            company: 'IndiaAI Mission (MeitY)',
            period: 'Sep 2024 – Feb 2025',
            highlights: [
                'Designed and developed the ICIP framework, integrating Stable Diffusion, ControlNet, IP-Adapter, and image inpainting for controllable image generation.',
                'Secured IndiaAI Mission research funding and presented the framework at Taylor & Francis ICICS 2025.'
            ]
        },
        {
            role: 'Research Fellow',
            company: 'HyperVerge Nexus, Chennai',
            period: 'Feb 2024 – Jun 2024',
            highlights: [
                'Developed image-generation pipelines using Stable Diffusion and LoRA fine-tuning for document and identity use cases.',
                'Researched document forgery detection and synthetic ID generation methods.',
                'Built generation workflows using diffusion models and the Fooocus ecosystem.'
            ]
        }
    ],
    publications: [
        {
            title: 'Obstacle Detection in Path Planning for Unmanned Aerial Vehicles Based on YOLO',
            venue: 'IEEE (Co-Author)',
            date: 'Jun 2024',
            url: 'https://ieeexplore.ieee.org/document/10550335',
            description: 'Investigated YOLO-based object detection for autonomous UAV path planning, evaluating model efficiency and deployment constraints in resource-limited environments.'
        },
        {
            title: 'ICIP: An Integrated Approach for AI Image Generation Using Stable Diffusion',
            venue: 'Taylor & Francis ICICS 2025, VVCE Mysuru (Corresponding Author)',
            date: 'Feb 2025',
            url: 'https://www.researchgate.net/publication/401880407_ICIP_An_integrated_approach_for_AI_image_generation_using_stable_diffusion',
            alternativeUrl: 'https://www.taylorfrancis.com/chapters/oa-edit/10.1201/9781003650201-13/icip-integrated-approach-ai-image-generation-using-stable-diffusion-maragatham-amutha-bhargavi-kaza-ashish-maurya-jackulin-mahariba',
            description: 'Proposed a novel framework combining Stable Diffusion, ControlNet, IP-Adapter, and inpainting for controllable, realistic image generation; fine-tuned on custom datasets.'
        }
    ],
    projects: [
        {
            title: 'Online Video KYC System',
            venue: 'Standard Chartered Hackathon',
            description: 'Built an AI-powered KYC system for secure customer onboarding combining face verification with automated document-validation workflows.',
            url: 'https://github.com/ASM010101'
        },
        {
            title: 'Financial Anomaly Detection System',
            venue: 'Barclays Hackathon (Finalist)',
            description: 'Engineered a financial-transaction anomaly-detection system using machine learning and transactional pattern data analytics; advanced to the final round.',
            url: 'https://github.com/ASM010101'
        }
    ],
    certifications: [
        {
            title: 'Oracle Cloud Infrastructure 2024 Generative AI Certified Professional',
            issuer: 'Oracle',
            date: '2025',
            url: 'https://education.oracle.com'
        }
    ],
    skills: {
        languages: ['Python', 'C', 'C++', 'JavaScript', 'HTML', 'CSS'],
        aiMl: ['PyTorch', 'TensorFlow', 'Transformers', 'Diffusers', 'PEFT', 'Scikit-Learn'],
        llmsGenerativeAi: ['RAG', 'FAISS', 'Qdrant', 'Weaviate', 'Tool Calling', 'Fine-Tuning', 'Prompt Engineering', 'LoRA', 'Stable Diffusion'],
        computerVision: ['YOLOv8', 'OpenCV', 'Roboflow'],
        agenticAi: ['Google ADK', 'MCP Servers', 'Guardrails', 'Automated Evaluations'],
        infrastructure: ['Docker', 'Git', 'Linux', 'AWS'],
        databases: ['MySQL', 'PostgreSQL']
    }
};

function buildJsonLd() {
    return [
        {
            '@context': 'https://schema.org',
            '@type': 'Person',
            '@id': `${SITE_URL}/#person`,
            name: PROFILE.name,
            alternateName: PROFILE.preferredName,
            url: SITE_URL,
            jobTitle: 'Applied AI Engineer',
            description: PROFILE.headline,
            alumniOf: [
                {
                    '@type': 'CollegeOrUniversity',
                    name: 'Indian Institute of Technology (IIT) Patna'
                },
                {
                    '@type': 'CollegeOrUniversity',
                    name: 'SRM Institute of Science and Technology'
                }
            ],
            knowsAbout: [
                'Large Language Models (LLMs)',
                'Retrieval-Augmented Generation (RAG)',
                'Speech AI & Speech-to-Speech',
                'Agentic Systems & MCP',
                'PyTorch',
                'Transformers',
                'Computer Vision & YOLO',
                'Three.js'
            ],
            sameAs: [
                PROFILE.github,
                PROFILE.linkedin,
                'https://ieeexplore.ieee.org/document/10550335',
                'https://www.researchgate.net/publication/401880407_ICIP_An_integrated_approach_for_AI_image_generation_using_stable_diffusion'
            ]
        },
        {
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            '@id': `${SITE_URL}/#website`,
            url: SITE_URL,
            name: PROFILE.siteTitle,
            description: PROFILE.siteDescription,
            publisher: { '@id': `${SITE_URL}/#person` }
        },
        {
            '@context': 'https://schema.org',
            '@type': 'ProfilePage',
            '@id': `${SITE_URL}/#profilepage`,
            url: SITE_URL,
            mainEntity: { '@id': `${SITE_URL}/#person` }
        },
        {
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            '@id': `${SITE_URL}/#publications`,
            name: 'Publications by Ashish Maurya',
            numberOfItems: PROFILE.publications.length,
            itemListElement: PROFILE.publications.map((p, idx) => ({
                '@type': 'ListItem',
                position: idx + 1,
                item: {
                    '@type': 'ScholarlyArticle',
                    name: p.title,
                    description: p.description,
                    url: p.url,
                    datePublished: p.date,
                    author: { '@id': `${SITE_URL}/#person` }
                }
            }))
        }
    ];
}

function buildLlmsTxt() {
    let md = `# ${PROFILE.name}\n\n`;
    md += `> ${PROFILE.headline}\n\n`;
    md += `- Location: ${PROFILE.location}\n`;
    md += `- Email: ${PROFILE.email}\n`;
    md += `- LinkedIn: ${PROFILE.linkedin}\n`;
    md += `- GitHub: ${PROFILE.github}\n`;
    md += `- Portfolio: ${PROFILE.portfolioUrl}\n\n`;

    md += `## Summary\n`;
    md += `AI/ML Engineer pursuing an M.Tech in Artificial Intelligence at IIT Patna, with hands-on experience shipping production LLM, RAG, and speech-AI systems at Samespace, backed by IEEE-published research and a corresponding-author paper at ICICS 2025. Prior Research Fellow at HyperVerge Nexus and under the IndiaAI Mission grant.\n\n`;

    md += `## Education\n`;
    PROFILE.education.forEach(e => {
        md += `- **${e.degree}** — ${e.institution} (${e.period})${e.grade ? ` [${e.grade}]` : ''}\n`;
    });
    md += `\n`;

    md += `## Experience\n`;
    PROFILE.experience.forEach(exp => {
        md += `### ${exp.role} — ${exp.company} (${exp.period})\n`;
        exp.highlights.forEach(h => {
            md += `- ${h}\n`;
        });
        md += `\n`;
    });

    md += `## Research Publications\n`;
    PROFILE.publications.forEach(pub => {
        md += `- **${pub.title}** (${pub.venue}, ${pub.date})\n`;
        md += `  Link: ${pub.url}\n`;
        md += `  Summary: ${pub.description}\n`;
    });
    md += `\n`;

    md += `## Key Projects\n`;
    PROFILE.projects.forEach(proj => {
        md += `- **${proj.title}** (${proj.venue})\n`;
        md += `  Link: ${proj.url}\n`;
        md += `  Description: ${proj.description}\n`;
    });
    md += `\n`;

    md += `## Technical Skills\n`;
    md += `- **Languages:** ${PROFILE.skills.languages.join(', ')}\n`;
    md += `- **AI / Machine Learning:** ${PROFILE.skills.aiMl.join(', ')}\n`;
    md += `- **LLMs & Generative AI:** ${PROFILE.skills.llmsGenerativeAi.join(', ')}\n`;
    md += `- **Computer Vision:** ${PROFILE.skills.computerVision.join(', ')}\n`;
    md += `- **Agentic AI:** ${PROFILE.skills.agenticAi.join(', ')}\n`;
    md += `- **Infrastructure & Tools:** ${PROFILE.skills.infrastructure.join(', ')}\n`;
    md += `- **Databases:** ${PROFILE.skills.databases.join(', ')}\n\n`;

    md += `## Certifications\n`;
    PROFILE.certifications.forEach(c => {
        md += `- **${c.title}** (${c.issuer}, ${c.date})\n`;
    });

    return md;
}

export function generateSeoHtml() {
    return {
        name: 'ashish-seo-plugin',

        configureServer(server) {
            server.middlewares.use((req, res, next) => {
                if (req.url === '/llms.txt') {
                    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
                    res.end(buildLlmsTxt());
                } else {
                    next();
                }
            });
        },

        transformIndexHtml(html) {
            const jsonLd = buildJsonLd();
            const jsonLdScript = `\n  <script type="application/ld+json">\n${JSON.stringify(jsonLd, null, 2)}\n  </script>\n`;
            
            let transformedHtml = html.replace('</head>', `${jsonLdScript}</head>`);
            return transformedHtml;
        },

        generateBundle() {
            this.emitFile({
                type: 'asset',
                fileName: 'llms.txt',
                source: buildLlmsTxt()
            });
        }
    };
}
