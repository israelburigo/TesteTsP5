import { or } from "mathjs";
import p5 = require("p5");
import { IPaint } from "./ipaint";
import { origin } from "./view-ctrl";

export class Dot implements IPaint {
  private _p5: p5;
  private _p: p5.Vector;
  private _color = [0xff, 0xff, 0xff];

  constructor(p5: p5, x: number, y: number, z: number) {
    this._p5 = p5;
    this._p = p5.createVector(x, y, z);
  }

  coords(): p5.Vector {
    return this._p;
  }

  update(dt: number): void {}

  draw(): void {
    this._p5.push();
    this._p5.stroke(this._color);
    const x = this._p.x * origin.zoom + origin.coords.x;
    const y = this._p.y * origin.zoom + origin.coords.y;
    this._p5.circle(x, y, 1);
    this._p5.pop();
  }

  calculate(quads: number[]): void {
    const r = calcR(quads, this._p.y);
    const g = calcG(quads, this._p.y);
    const b = calcB(quads, this._p.y);
    this._color = [r, g, b];
  }
}

function calcR(quads: number[], y: number): number {
  if (y < quads[2]) return 255;
  if (y > quads[3]) return 0;
  return (y - quads[3]) * 255/(quads[2] - quads[3])
}

function calcB(quads: number[], y: number): number {
  if (y > quads[4]) return 255;
  if (y < quads[3]) return 0;
  return (y - quads[3]) * 255/(quads[4] - quads[3])
}

function calcG(quads: number[], y: number): number {  
  if (y > quads[1] && y < quads[5]) return 255;
  if (y < quads[1]) return (y - quads[0]) * 255/(quads[1] - quads[0])
  if (y > quads[5]) return (y - quads[6]) * 255/(quads[5] - quads[6])
}
