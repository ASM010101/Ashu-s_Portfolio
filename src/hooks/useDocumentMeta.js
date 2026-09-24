import { useEffect, useRef } from 'react';
import { useScene } from '../context/SceneContext';

/**
 * useDocumentMeta — Dynamic Meta Tags & Virtual Routing (History API)
 * 
 * Updates the browser URL, page title, and meta description
 * whenever the user enters/exits a 3D room. Also handles the
 * browser back/forward buttons for seamless navigation.
 */

const SITE_URL = 'https://asm010101.github.io/Ashu-s_Portfolio';
const BASE_PATH = (import.meta.env.BASE_URL || '/').replace(/\/+$/, '');

const ROOM_META = {
    null: {
        path: '/',
        title: 'Ashish Maurya | Applied AI Engineer — LLMs, RAG, Speech AI & Agentic Systems',
        description: 'Interactive 3D hand-drawn portfolio by Ashish Maurya — Applied AI Engineer (IIT Patna M.Tech AI, ex-Samespace). Explore neural systems, agentic workflows, and WebGL experiments.',
    },
    about: {
        path: '/about',
        title: 'About Ashish Maurya | Applied AI Engineer',
        description: 'Discover Ashish Maurya\'s journey from IIT Patna to Samespace, IEEE publications, IndiaAI and HyperVerge fellowships.',
    },
    gallery: {
        path: '/gallery',
        title: 'AI Projects & Research | Ashish Maurya',
        description: 'Explore real-world AI projects: UAV YOLOv8 tracking, sub-200ms Video KYC, Barclays GNN anomaly detection, and agentic RAG engines.',
    },
    studio: {
        path: '/studio',
        title: 'The Studio & AI Lab | Ashish Maurya',
        description: 'Explore technical deep-dives, benchmarks, and research writings on agentic AI, LLM evaluation, and low-latency speech pipelines.',
    },
    contact: {
        path: '/contact',
        title: 'Contact & Connect | Ashish Maurya',
        description: 'Get in touch with Ashish Maurya. Connect via LinkedIn, GitHub, Resume, or direct email in this interactive 3D contact room.',
    },
};

// Map URL paths back to room IDs for deep linking
const PATH_TO_ROOM = {
    '/': null,
    '/about': 'about',
    '/gallery': 'gallery',
    '/studio': 'studio',
    '/contact': 'contact',
};

/**
 * Returns the room ID that the initial URL points to (for deep linking).
 * Call this once at app startup to determine if we need to auto-teleport.
 */
export function getInitialRoomFromUrl() {
    let path = window.location.pathname.replace(/\/+$/, '') || '/';
    if (BASE_PATH && path.startsWith(BASE_PATH)) {
        path = path.slice(BASE_PATH.length) || '/';
    }
    return PATH_TO_ROOM[path] !== undefined ? PATH_TO_ROOM[path] : null;
}

export function useDocumentMeta() {
    const { currentRoom, teleportTo, hasEntered } = useScene();
    const isHandlingPopState = useRef(false);
    const lastPushedRoom = useRef(undefined); // Track what we last pushed to avoid duplicates

    // Update document meta and URL when room changes
    useEffect(() => {
        const roomKey = currentRoom === null ? 'null' : currentRoom;
        const meta = ROOM_META[roomKey] || ROOM_META['null'];

        // Update the page title
        document.title = meta.title;

        // Update meta description
        const descTag = document.querySelector('meta[name="description"]');
        if (descTag) {
            descTag.setAttribute('content', meta.description);
        }

        // Update OG meta tags
        const ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) ogTitle.setAttribute('content', meta.title);

        const ogDesc = document.querySelector('meta[property="og:description"]');
        if (ogDesc) ogDesc.setAttribute('content', meta.description);

        const fullRoute = meta.path === '/' ? '' : meta.path;
        const canonicalUrl = `${SITE_URL}${fullRoute}`;

        const ogUrl = document.querySelector('meta[property="og:url"]');
        if (ogUrl) ogUrl.setAttribute('content', canonicalUrl);

        // Update canonical link
        const canonicalTag = document.querySelector('link[rel="canonical"]');
        if (canonicalTag) {
            canonicalTag.setAttribute('href', canonicalUrl);
        }

        // Target path for browser history
        const browserPath = `${BASE_PATH}${meta.path === '/' ? '/' : meta.path}`;

        // Push to browser history (only if not handling a popstate event and room actually changed)
        if (!isHandlingPopState.current && lastPushedRoom.current !== currentRoom) {
            if (lastPushedRoom.current === undefined) {
                window.history.replaceState({ room: currentRoom }, '', browserPath);
            } else {
                window.history.pushState({ room: currentRoom }, '', browserPath);
            }
            lastPushedRoom.current = currentRoom;
        }

        isHandlingPopState.current = false;
    }, [currentRoom]);

    // Handle browser back/forward buttons
    useEffect(() => {
        const handlePopState = (event) => {
            isHandlingPopState.current = true;
            const targetRoom = event.state?.room ?? null;
            lastPushedRoom.current = targetRoom;

            if (targetRoom === null) {
                const meta = ROOM_META['null'];
                document.title = meta.title;
            } else if (hasEntered) {
                teleportTo(targetRoom);
            }
        };

        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, [teleportTo, hasEntered]);
}
