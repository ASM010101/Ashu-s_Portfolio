import './initAssets.js'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { extend } from '@react-three/fiber'
import { RevealMaterial } from './components/canvas/shaders/RevealMaterial.jsx'
import { RevealBasicMaterial } from './components/canvas/shaders/RevealBasicMaterial.jsx'
import { PaintRevealMaterial } from './components/canvas/shaders/PaintRevealMaterial.jsx'
import App from './App.jsx'

// Explicitly register custom materials at app root so Rollup never tree-shakes them
extend({ RevealMaterial, RevealBasicMaterial, PaintRevealMaterial })

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
