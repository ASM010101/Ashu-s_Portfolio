import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import * as THREE from 'three'
import App from './App.jsx'

// --- Global Three.js LoadingManager URL resolution for base paths (GitHub Pages) ---
const baseUrl = import.meta.env.BASE_URL;
if (baseUrl && baseUrl !== '/') {
  THREE.DefaultLoadingManager.setURLModifier((url) => {
    if (typeof url === 'string' && url.startsWith('/') && !url.startsWith(baseUrl)) {
      return baseUrl + url.slice(1);
    }
    return url;
  });
}

// --- Console Signature ---
if (typeof window !== 'undefined') {
  console.log(
    '%c ASHISH MAURYA %c APPLIED AI %c',
    'background: #111; color: #fff; padding: 5px 10px; font-weight: bold; border-radius: 3px 0 0 3px;',
    'background: #0070f3; color: #fff; padding: 5px 10px; font-weight: bold; border-radius: 0 3px 3px 0;',
    'background: transparent'
  );
  console.log(
    '%cAshish Maurya %c— Applied AI Engineer | IIT Patna AI | ex-Samespace 🚀',
    'font-weight: bold; color: #0070f3; font-size: 14px;',
    'color: #666; font-size: 14px;'
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
