export type QualityLevel = 'high' | 'balanced' | 'low';
export type WebGLLevel = 0 | 1 | 2; // 0 = DOM only, 1 = 2.5D/lightweight, 2 = full 3D

export interface SystemCapabilities {
  hasWebGL: boolean;
  webglLevel: WebGLLevel;
  isMobile: boolean;
  prefersReducedMotion: boolean;
  qualityLevel: QualityLevel;
  devicePixelRatio: number;
}

export function detectCapabilities(): SystemCapabilities {
  if (typeof window === 'undefined') {
    return {
      hasWebGL: false,
      webglLevel: 0,
      isMobile: false,
      prefersReducedMotion: false,
      qualityLevel: 'balanced',
      devicePixelRatio: 1,
    };
  }

  const isMobile =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
    window.innerWidth < 768;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let hasWebGL = false;
  let webglLevel: WebGLLevel = 0;

  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (gl) {
      hasWebGL = true;
      webglLevel = isMobile || prefersReducedMotion ? 1 : 2;
    }
  } catch {
    hasWebGL = false;
    webglLevel = 0;
  }

  let qualityLevel: QualityLevel = 'high';
  if (isMobile || prefersReducedMotion || webglLevel <= 1) {
    qualityLevel = 'balanced';
  }
  if (!hasWebGL) {
    qualityLevel = 'low';
  }

  const dpr = Math.min(window.devicePixelRatio || 1, qualityLevel === 'high' ? 2 : 1.5);

  return {
    hasWebGL,
    webglLevel,
    isMobile,
    prefersReducedMotion,
    qualityLevel,
    devicePixelRatio: dpr,
  };
}
