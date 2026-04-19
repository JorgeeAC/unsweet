import type { Particle } from './types';

export function createParticle(width: number, height: number): Particle {
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    vx: 0,
    vy: 0,
    speed: 0.3 + Math.random() * 0.4,
    radius: 1 + Math.random() * 1.5,
    opacity: 0.2 + Math.random() * 0.3,
  };
}

export function getParticleCount(width: number, height: number, override?: number): number {
  if (override !== undefined) return override;
  const isMobile = window.matchMedia('(pointer: coarse)').matches;
  const cap = isMobile ? 60 : 150;
  const count = Math.floor((width * height) / 8000);
  return Math.max(30, Math.min(count, cap));
}
