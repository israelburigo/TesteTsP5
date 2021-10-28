import p5 = require("p5");
import { Line } from "./line";
import { Lines } from "./lines";
import { DrawableComponent } from "./drawable-component";

const sketch = function (p5: p5): any {
  const drawables = new Array<DrawableComponent>();
  p5.setup = () => {
    const canvas = p5.createCanvas(500, 500);
    canvas.parent("app");

    const w = p5.width / 2;
    const h = p5.height / 2;

    drawables.push(new Line(p5, w - 100, h - 100, 0, w + 100, h - 100, 0));
    drawables.push(new Line(p5, w + 100, h - 100, 0, w + 100, h + 100, 0));
    drawables.push(new Line(p5, w + 100, h + 100, 0, w - 100, h + 100, 0));
    drawables.push(new Line(p5, w - 100, h + 100, 0, w - 100, h - 100, 0));

    drawables.push(new Line(p5, w - 100, h - 100, 200, w + 100, h - 100, 200));
    drawables.push(new Line(p5, w + 100, h - 100, 200, w + 100, h + 100, 200));
    drawables.push(new Line(p5, w + 100, h + 100, 200, w - 100, h + 100, 200));
    drawables.push(new Line(p5, w - 100, h + 100, 200, w - 100, h - 100, 200));

    drawables.push(new Line(p5, w - 100, h - 100, 0, w - 100, h - 100, 200));
    drawables.push(new Line(p5, w + 100, h - 100, 0, w + 100, h - 100, 200));
    drawables.push(new Line(p5, w + 100, h + 100, 0, w + 100, h + 100, 200));
    drawables.push(new Line(p5, w - 100, h + 100, 0, w - 100, h + 100, 200));
  };

  p5.draw = () => {
    const dt = p5.deltaTime / 1000;
    drawables.forEach((p) => {
      p.update(dt);
      p.draw();
    });
    // lines.rotate(dt, p5.createVector(p5.width / 2, p5.height / 2, 200 / 2));

    // p5.background("black");
    // lines.draw();
  };
};

new p5(sketch);
