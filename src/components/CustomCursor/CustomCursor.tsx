import React, { useEffect, useState } from 'react';

interface CursorProps {
  label?: string;
  variant?: 'default' | 'inspect' | 'open' | 'enter' | 'system' | 'scroll';
}

export const CustomCursor: React.FC<CursorProps> = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [targetPos, setTargetPos] = useState({ x: -100, y: -100 });
  const [hoverState, setHoverState] = useState<{ active: boolean; label: string; variant: string }>({
    active: false,
    label: '',
    variant: 'default',
  });
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile or touch
    if (typeof window !== 'undefined') {
      const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || window.innerWidth < 768;
      setIsMobile(isTouch);
      if (isTouch) return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setTargetPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      // Check hovered element context
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest('[data-cursor]') as HTMLElement | null;
        if (interactive) {
          const label = interactive.getAttribute('data-cursor-label') || 'INSPECT';
          const variant = interactive.getAttribute('data-cursor') || 'inspect';
          setHoverState({ active: true, label, variant });
          return;
        }

        const clickable = target.closest('button, a, input, select, textarea, [role="button"]');
        if (clickable) {
          const isLink = clickable.tagName === 'A';
          setHoverState({
            active: true,
            label: isLink ? 'OPEN' : 'EXECUTE',
            variant: 'open',
          });
          return;
        }
      }

      setHoverState({ active: false, label: '', variant: 'default' });
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Smooth cursor interpolation loop
    let animId: number;
    const updateCursor = () => {
      setPos((prev) => ({
        x: prev.x + (targetPos.x - prev.x) * 0.25,
        y: prev.y + (targetPos.y - prev.y) * 0.25,
      }));
      animId = requestAnimationFrame(updateCursor);
    };
    animId = requestAnimationFrame(updateCursor);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      cancelAnimationFrame(animId);
    };
  }, [isVisible, targetPos]);

  if (isMobile || !isVisible) return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
        pointerEvents: 'none',
        zIndex: 99999,
        transition: 'transform 0.04s linear',
      }}
    >
      {/* Central precision dot */}
      <div
        style={{
          position: 'absolute',
          top: -3,
          left: -3,
          width: 6,
          height: 6,
          borderRadius: '50%',
          backgroundColor: hoverState.active ? '#00f0ff' : '#ffffff',
          boxShadow: hoverState.active ? '0 0 10px #00f0ff' : 'none',
          transition: 'all 0.15s ease',
        }}
      />

      {/* Reticle Ring */}
      <div
        style={{
          position: 'absolute',
          top: hoverState.active ? -20 : -14,
          left: hoverState.active ? -20 : -14,
          width: hoverState.active ? 40 : 28,
          height: hoverState.active ? 40 : 28,
          borderRadius: '50%',
          border: `1px ${hoverState.active ? 'dashed' : 'solid'} ${hoverState.active ? '#00f0ff' : 'rgba(255, 255, 255, 0.3)'}`,
          transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
          animation: hoverState.active ? 'spin 10s linear infinite' : 'none',
        }}
      />

      {/* Technical Micro Label */}
      {hoverState.active && hoverState.label && (
        <div
          style={{
            position: 'absolute',
            top: 14,
            left: 14,
            fontFamily: 'var(--font-mono)',
            fontSize: '9px',
            letterSpacing: '0.12em',
            color: '#00f0ff',
            backgroundColor: 'rgba(7, 8, 11, 0.92)',
            padding: '2px 6px',
            border: '1px solid rgba(0, 240, 255, 0.4)',
            borderRadius: 2,
            whiteSpace: 'nowrap',
            textTransform: 'uppercase',
          }}
        >
          {hoverState.label}
        </div>
      )}
    </div>
  );
};
