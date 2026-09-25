import * as THREE from 'three';
import { configureTextBuilder } from 'troika-three-text';

/**
 * Global Asset URL Resolver & Interceptors for GitHub Pages / subpaths.
 * Must execute before ANY Drei/Three.js preload or component evaluates.
 */

const rawBase = import.meta.env.BASE_URL || '/';
export const baseUrl = rawBase.endsWith('/') ? rawBase : rawBase + '/';

/**
 * Resolves any relative or absolute asset path against the Vite baseUrl.
 * E.g. '/textures/paper.webp' -> '/Ashu-s_Portfolio/textures/paper.webp'
 */
export const resolveAssetUrl = (url) => {
  if (typeof url !== 'string') return url;
  if (!baseUrl || baseUrl === '/') return url;

  // Handle data or blob URLs
  if (url.startsWith('data:') || url.startsWith('blob:')) {
    return url;
  }

  // Handle absolute URLs pointing to current origin (e.g. from Troika toAbsoluteURL)
  if (typeof window !== 'undefined' && window.location && window.location.origin) {
    const origin = window.location.origin;
    if (url.startsWith(origin)) {
      const path = url.slice(origin.length);
      if (path.startsWith('/') && !path.startsWith(baseUrl)) {
        return origin + baseUrl + path.slice(1);
      }
      return url;
    }
  }

  // Handle external third-party URLs (e.g. https://fonts.gstatic.com)
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }

  // Handle root-relative paths like '/fonts/...' or '/textures/...'
  if (url.startsWith('/') && !url.startsWith(baseUrl)) {
    return baseUrl + url.slice(1);
  }

  return url;
};

// 1. Configure Three.js DefaultLoadingManager IMMEDIATELY
if (baseUrl && baseUrl !== '/') {
  THREE.DefaultLoadingManager.setURLModifier((url) => {
    return resolveAssetUrl(url);
  });
}

// 2. Intercept XMLHttpRequest for Troika-3D-Text font loading & configure Troika text builder
if (typeof window !== 'undefined' && window.XMLHttpRequest && baseUrl && baseUrl !== '/') {
  const origOpen = window.XMLHttpRequest.prototype.open;
  window.XMLHttpRequest.prototype.open = function (method, url, ...rest) {
    const resolved = resolveAssetUrl(url);
    return origOpen.call(this, method, resolved, ...rest);
  };

  try {
    configureTextBuilder({ useWorker: false });
  } catch (err) {
    console.warn('Troika configureTextBuilder warning:', err);
  }
}

// 3. Intercept window.fetch for any network asset requests
if (typeof window !== 'undefined' && window.fetch && baseUrl && baseUrl !== '/') {
  const origFetch = window.fetch;
  window.fetch = function (input, init) {
    if (typeof input === 'string') {
      input = resolveAssetUrl(input);
    }
    return origFetch.call(this, input, init);
  };
}

// 4. Intercept Audio constructor for HTML5 audio elements
if (typeof window !== 'undefined' && window.Audio && baseUrl && baseUrl !== '/') {
  const OrigAudio = window.Audio;
  window.Audio = class extends OrigAudio {
    constructor(src) {
      super(src ? resolveAssetUrl(src) : undefined);
    }
  };
}
