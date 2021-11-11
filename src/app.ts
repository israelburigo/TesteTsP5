import p5 = require("p5");
import { IPaint } from "./ipaint";
import { Func } from "./func";
import { drawWindow } from "./utils/consts";
import { origin } from "./view-ctrl";

const sketch = function (p5: p5): any {
  p5.setup = () => {
    const canvas = p5.createCanvas(drawWindow.w, drawWindow.h);
    canvas.parent("app");
  };

  p5.draw = () => {
    const dt = p5.deltaTime / 1000;
    p5.background("black");
    paints.forEach((p) => {
      p.update(dt);
      p.draw();
    });
    
    p5.push();
    p5.fill(0xff, 0xff, 0xff);
    p5.text("fps: " + 1 / dt, 10, 30);
    p5.pop();
  };
};

const canvas = new p5(sketch);
const paints: Array<IPaint> = [];
origin.coords = { x: drawWindow.w / 2, y: drawWindow.h / 2, z: 0 };

const func = new Func(canvas, "(0.02*x^2 + 0.02*z^2)");
paints.push(func);
