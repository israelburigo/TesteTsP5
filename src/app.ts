import p5 = require("p5");
import { Line } from "./line";
import { Lines } from "./lines";

const sketch = function (p5: p5): any {
  const lines = new Lines();
  p5.setup = () => {
    const canvas = p5.createCanvas(500, 500);
    canvas.parent("app");

    const w = p5.width / 2;
    const h = p5.height / 2;    

    lines.push(new Line(p5, w - 100, h - 100, 0, w + 100, h - 100, 0));
    lines.push(new Line(p5, w + 100, h - 100, 0, w + 100, h + 100, 0));
    lines.push(new Line(p5, w + 100, h + 100, 0, w - 100, h + 100, 0));
    lines.push(new Line(p5, w - 100, h + 100, 0, w - 100, h - 100, 0));

    lines.push(new Line(p5, w - 100, h - 100, 200, w + 100, h - 100, 200));
    lines.push(new Line(p5, w + 100, h - 100, 200, w + 100, h + 100, 200));
    lines.push(new Line(p5, w + 100, h + 100, 200, w - 100, h + 100, 200));
    lines.push(new Line(p5, w - 100, h + 100, 200, w - 100, h - 100, 200));

    lines.push(new Line(p5, w - 100, h - 100, 0, w - 100, h - 100, 200));
    lines.push(new Line(p5, w + 100, h - 100, 0, w + 100, h - 100, 200));
    lines.push(new Line(p5, w + 100, h + 100, 0, w + 100, h + 100, 200));
    lines.push(new Line(p5, w - 100, h + 100, 0, w - 100, h + 100, 200));
  };

  p5.draw = () => {    

    const dt = p5.deltaTime / 1000

   lines.rotate(dt, p5.createVector(p5.width / 2, p5.height/2, 200/2))

    p5.background("black");
    lines.draw();
  };
};

new p5(sketch);
