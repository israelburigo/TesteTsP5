import p5 = require("p5");
import { Dot } from "./dot";
import { IPaint } from "./ipaint";
import "regenerator-runtime/runtime";
import * as math from "mathjs";
import { origin } from "./view-ctrl";
import {
  matrix3dX,
  matrix3dY,
  matrix3dZ,
  transformVector,
} from "./utils/transformations";

export class Func implements IPaint {
  private _p5: p5;
  private _dots: Array<Dot> = [];
  private _mouseDown: boolean = false;
  private _lastPoint: { x: number; y: number };
  private _quads: number[];
  private _dotsOrigin: { x: number; y: number; z: number };

  constructor(p5: p5, fx: string) {
    this._p5 = p5;
    this.calculate(fx);
    this._p5.mouseWheel = this.wheelHandler;
  }

  draw(): void {
    this._dots.forEach((p) => {
      p.draw();
    });
    this._p5.push();
    this._p5.fill(0xff, 0xff, 0xff);
    this._p5.text(
      "zoom: " + Number(origin.zoom * 100).toFixed(0) + "%",
      10,
      15
    );
    this._p5.pop();
  }

  update(dt: number): void {
    this.mouseHandler();
  }

  calculate(fx: string): void {
    this._dots = [];
    let min = 999999999;
    let max = -999999999;
    let x = -30;
    while (x < 30) {
      let z = -30;
      while (z < 30) {
        const y = math.evaluate(fx, { x, z });
        if (y < min) min = y;
        if (y > max) max = y;
        this._dots.push(new Dot(this._p5, x, y, z));
        z += 1;
      }
      x += 1;
    }

    const xs = this._dots.map((p) => p.coords().x);
    const ys = this._dots.map((p) => p.coords().y);
    const zs = this._dots.map((p) => p.coords().z);

    this._dotsOrigin = {
      x: (Math.max(...xs) + Math.min(...xs)) / 2,
      y: (Math.max(...ys) + Math.min(...ys)) / 2,
      z: (Math.max(...zs) + Math.min(...zs)) / 2,
    };

    this._quads = [];
    const quantQuads = 6;
    for (let i = 0; i <= quantQuads; i++) {
      this._quads.push((i / quantQuads) * (max - min) + min);
    }

    this._dots.forEach((p) => p.calculate(this._quads));
  }

  wheelHandler(event?: { delta: number }): void {
    if (!event) {
      return;
    }
    if (event.delta < 0) {
      origin.zoom += 0.01;
      if (origin.zoom > 10) origin.zoom = 10;
    } else {
      origin.zoom -= 0.01;
      if (origin.zoom < 0.01) origin.zoom = 0.01;
    }
  }

  mouseHandler(): void {
    if (this._p5.mouseIsPressed && !this._mouseDown) {
      this._mouseDown = true;
      this._lastPoint = { x: this._p5.mouseX, y: this._p5.mouseY };
    } else if (!this._p5.mouseIsPressed) {
      this._mouseDown = false;
    }

    if (!this._mouseDown) return;

    if (this._p5.mouseButton == "center") {
      const x = this._p5.mouseX - this._lastPoint.x;
      const y = this._p5.mouseY - this._lastPoint.y;

      const radX = x < 0 ? -0.1 : x > 0 ? 0.1 : 0;
      const radY = y < 0 ? -0.1 : y > 0 ? 0.1 : 0;
      if (radX != 0)
        this._dots.forEach((p) => {
          transformVector(p.coords(), matrix3dY(radX), this._dotsOrigin);
        });

      if (radY != 0)
        this._dots.forEach((p) => {
          transformVector(p.coords(), matrix3dX(radY), this._dotsOrigin);
        });

      this._lastPoint = { x: this._p5.mouseX, y: this._p5.mouseY };
    }

    if (this._p5.mouseButton == "left") {
      const x = this._p5.mouseX - this._lastPoint.x;
      const y = this._p5.mouseY - this._lastPoint.y;

      origin.coords.x += x;
      origin.coords.y += y;

      this._lastPoint = { x: this._p5.mouseX, y: this._p5.mouseY };
    }
  }
}
