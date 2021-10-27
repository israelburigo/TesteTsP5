import p5 = require("p5");
import { IPaint } from "./ipaint";
import { transformVector } from "./utils/transformations";

export class Line implements IPaint {
  private _p5: p5;
  private _p1: p5.Vector;
  private _p2: p5.Vector;

  constructor(
    p5: p5,
    x1: number,
    y1: number,
    z1: number,
    x2: number,
    y2: number,
    z2: number
  ) {
    this._p5 = p5;
    this._p1 = p5.createVector(x1, y1, z1);
    this._p2 = p5.createVector(x2, y2, z2);
  }
  draw(): void {
    this._p5.push();
    this._p5.stroke(0xff, 0xff, 0xff);
    this._p5.line(this._p1.x, this._p1.y, this._p2.x, this._p2.y);
    this._p5.pop();
  }
  

  transform(m: number[][], origin: p5.Vector): void {
    transformVector(this._p1, m, origin);
    transformVector(this._p2, m, origin);
  }
}
