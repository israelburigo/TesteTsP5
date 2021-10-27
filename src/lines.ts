import p5 from "p5";
import { IPaint } from "./ipaint";
import { Line } from "./line";

export class Lines implements IPaint {
  private _items: Line[] = [];

  push(item: Line): void {
    this._items.push(item);
  }

  draw(): void {
    this._items.forEach((p) => p.draw());
  }

  rotate(rad: number, origin: p5.Vector): void {
    this._items.forEach((p) => {
      p.transform(this.rotateX(rad), origin);
      p.transform(this.rotateY(rad), origin);
    });
  }

  private rotateX(rad: number): number[][] {
      return [
          [Math.cos(rad), Math.sin(rad), 0],
          [-Math.sin(rad), Math.cos(rad), 0],
          [0, 0, 1],
      ]
  }
  private rotateY(rad: number): number[][] {
    return [
        [1, 0, 0],
        [0, Math.cos(rad), Math.sin(rad)],
        [0, -Math.sin(rad), Math.cos(rad)],
    ]
  }
}
