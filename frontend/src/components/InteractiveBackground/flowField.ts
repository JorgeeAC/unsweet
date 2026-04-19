export function getFlowAngle(x: number, y: number, time: number): number {
  const a1 = Math.sin(x * 0.003 + time * 0.0004) * Math.PI;
  const a2 = Math.cos(y * 0.004 + time * 0.0003) * Math.PI;
  const a3 = Math.sin((x + y) * 0.002 + time * 0.0002) * 0.5;
  return a1 + a2 + a3;
}
