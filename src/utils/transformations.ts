import p5 from "p5";

export function transformVector(
  v: p5.Vector,
  m: number[][],
  origin: p5.Vector
): void {
  const dx = v.x - origin.x;
  const dy = v.y - origin.y;
  const dz = v.z - origin.z;
  const x = m[0][0] * dx + m[0][1] * dy + m[0][2] * dz;
  const y = m[1][0] * dx + m[1][1] * dy + m[1][2] * dz;
  const z = m[2][0] * dx + m[2][1] * dy + m[2][2] * dz;
  v.x = x + origin.x;
  v.y = y + origin.y;
  v.z = z + origin.z;
}
