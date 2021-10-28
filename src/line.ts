import p5 = require("p5");
import { DrawableComponent } from "./drawable-component";
import { transformVector } from "./utils/transformations";

export class Line extends DrawableComponent {
  
  private _p1: p5.Vector;
  private _p2: p5.Vector;

  constructor(
    canvas: p5,
    x1: number,
    y1: number,
    z1: number,
    x2: number,
    y2: number,
    z2: number
  ) {
    super(canvas)
    this._p1 = this.canvas.createVector(x1, y1, z1);
    this._p2 = this.canvas.createVector(x2, y2, z2);
  }

  update(dt: number): void {
    throw new Error("Method not implemented.");
  }
  
  draw(): void {
    this.canvas.push();
    this.canvas.stroke(0xff, 0xff, 0xff);
    this.canvas.line(this._p1.x, this._p1.y, this._p2.x, this._p2.y);
    this.canvas.pop();
  }
  

  transform(m: number[][], origin: p5.Vector): void {
    transformVector(this._p1, m, origin);
    transformVector(this._p2, m, origin);
  }
}
