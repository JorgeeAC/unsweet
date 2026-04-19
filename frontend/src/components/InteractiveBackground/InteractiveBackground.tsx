import { useEffect, useRef } from 'react';
import type { Particle, InteractiveBackgroundProps } from './types';
import { getFlowAngle } from './flowField';
import { createParticle, getParticleCount } from './particleSystem';

const LERP = 0.03;
const CONNECTION_DIST = 120;
const CONNECTION_DIST_SQ = CONNECTION_DIST ** 2;
const MAX_CONNECTIONS = 5;
const LINE_MAX_ALPHA = 0.15;
const DELTA_CAP = 0.05;
const DPR_CAP = 2;

const canvasStyle = {
  position: 'fixed', top: 0, left: 0,
  width: '100%', height: '100%',
  zIndex: 0, pointerEvents: 'none',
} as const;

export default function InteractiveBackground({
  particleCount,
  interactionRadius = 120,
  color = '#1f1d19',
  intensity = 0.5,
  connections = true,
}: InteractiveBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 1. Canvas sizing
    let width = window.innerWidth;
    let height = window.innerHeight;
    const isMobile = window.matchMedia('(pointer: coarse)').matches;

    function applySize() {
      const dpr = Math.min(window.devicePixelRatio || 1, DPR_CAP);
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.scale(dpr, dpr);
    }
    applySize();

    // 2. Particles
    const count = getParticleCount(width, height, particleCount);
    const particles: Particle[] = Array.from({ length: count }, () =>
      createParticle(width, height)
    );

    // 3. Pointer state
    const pointer = { x: -9999, y: -9999, active: false };

    function onMouseMove(e: MouseEvent) {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointer.active = true;
    }
    function onMouseLeave() {
      pointer.active = false;
      pointer.x = -9999;
      pointer.y = -9999;
    }
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseleave', onMouseLeave);

    // 4. Animation loop
    let lastTime = 0;
    let rafId: number;
    let timestamp = 0;

    function loop(ts: number) {
      const delta = Math.min((ts - lastTime) / 1000, DELTA_CAP);
      lastTime = ts;
      timestamp = ts;
      update(delta);
      render();
      rafId = requestAnimationFrame(loop);
    }

    // 5. update
    function update(delta: number) {
      for (const p of particles) {
        const angle = getFlowAngle(p.x, p.y, timestamp);
        const targetVx = Math.cos(angle) * p.speed;
        const targetVy = Math.sin(angle) * p.speed;

        p.vx += (targetVx - p.vx) * LERP;
        p.vy += (targetVy - p.vy) * LERP;

        if (pointer.active) {
          const dx = p.x - pointer.x;
          const dy = p.y - pointer.y;
          const distSq = dx * dx + dy * dy;
          const radiusSq = interactionRadius * interactionRadius;
          if (distSq < radiusSq && distSq > 0) {
            const dist = Math.sqrt(distSq);
            const force = (1 - dist / interactionRadius) * intensity * 2;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;

            const maxSpd = p.speed * 4;
            const mag = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
            if (mag > maxSpd) {
              p.vx = (p.vx / mag) * maxSpd;
              p.vy = (p.vy / mag) * maxSpd;
            }
          }
        }

        p.x += p.vx * delta * 60;
        p.y += p.vy * delta * 60;

        const margin = 50;
        if (p.x < -margin) p.x = width + margin;
        else if (p.x > width + margin) p.x = -margin;
        if (p.y < -margin) p.y = height + margin;
        else if (p.y > height + margin) p.y = -margin;
      }
    }

    // 6. render
    function render() {
      ctx!.clearRect(0, 0, width, height);

      for (const p of particles) {
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx!.fillStyle = color;
        ctx!.globalAlpha = p.opacity;
        ctx!.fill();
      }
      ctx!.globalAlpha = 1;

      if (!isMobile && connections) {
        for (let i = 0; i < particles.length; i++) {
          let connCount = 0;
          for (let j = i + 1; j < particles.length && connCount < MAX_CONNECTIONS; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distSq = dx * dx + dy * dy;
            if (distSq < CONNECTION_DIST_SQ) {
              const alpha = (1 - distSq / CONNECTION_DIST_SQ) * LINE_MAX_ALPHA;
              ctx!.beginPath();
              ctx!.moveTo(particles[i].x, particles[i].y);
              ctx!.lineTo(particles[j].x, particles[j].y);
              ctx!.strokeStyle = color;
              ctx!.globalAlpha = alpha;
              ctx!.lineWidth = 1;
              ctx!.stroke();
              connCount++;
            }
          }
        }
        ctx!.globalAlpha = 1;
      }
    }

    // 7. Visibility pause
    function onVisibilityChange() {
      if (document.hidden) {
        cancelAnimationFrame(rafId);
      } else {
        lastTime = performance.now();
        rafId = requestAnimationFrame(loop);
      }
    }
    document.addEventListener('visibilitychange', onVisibilityChange);

    // 8. ResizeObserver with debounce
    let resizeTimer: ReturnType<typeof setTimeout>;
    const ro = new ResizeObserver(() => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        width = window.innerWidth;
        height = window.innerHeight;
        const dpr = Math.min(window.devicePixelRatio || 1, DPR_CAP);
        canvas!.width = width * dpr;
        canvas!.height = height * dpr;
        canvas!.style.width = `${width}px`;
        canvas!.style.height = `${height}px`;
        ctx!.scale(dpr, dpr);

        const margin = 50;
        for (const p of particles) {
          p.x = Math.min(Math.max(p.x, -margin), width + margin);
          p.y = Math.min(Math.max(p.y, -margin), height + margin);
        }
      }, 150);
    });
    ro.observe(document.documentElement);

    // Start loop
    rafId = requestAnimationFrame(loop);

    // 9. Cleanup
    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(resizeTimer);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      ro.disconnect();
    };
  }, [color, connections, intensity, interactionRadius, particleCount]);

  return <canvas ref={canvasRef} style={canvasStyle} />;
}
