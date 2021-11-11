import { cos, matrix, sin } from "mathjs";
import p5 from "p5";

export function transformVector(
  v: p5.Vector,
  m: number[][],
  origin: { x: number; y: number; z: number }
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

export function matrix3dX(rad: number): number[][] {
  return [
    [1, 0, 0],
    [0, cos(rad), -sin(rad)],
    [0, sin(rad), cos(rad)],
  ];
}

export function matrix3dY(rad: number): number[][] {
  return [
    [cos(rad), 0, sin(rad)],
    [0, 1, 0],
    [-sin(rad), 0, cos(rad)],
  ];
}

export function matrix3dZ(rad: number): number[][] {
  return [
    [cos(rad), -sin(rad), 0],
    [sin(rad), cos(rad), 0],
    [0, 0, 1],
  ];
}
