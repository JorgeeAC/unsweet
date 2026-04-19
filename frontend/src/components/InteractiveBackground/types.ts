export interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  speed: number; radius: number; opacity: number;
}

export interface InteractiveBackgroundProps {
  particleCount?: number;
  interactionRadius?: number;
  color?: string;
  intensity?: number;
  connections?: boolean;
  className?: string;
}
