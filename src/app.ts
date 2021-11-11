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
    p5.text("fps: " + Number(1 / dt).toFixed(0), 10, 30);
    p5.pop();
  };
};

const canvas = new p5(sketch);
const fxz = document.getElementById("fxz").value;
let paints: Array<IPaint> = [];
const func = new Func(canvas, fxz);

paints.push(func);
origin.coords = { x: drawWindow.w / 2, y: drawWindow.h / 2, z: 0 };

const btn = document.getElementById("coolbutton");
btn.addEventListener("click", (e: Event) => buttonClick());

function buttonClick() {
  const fxz = document.getElementById("fxz").value;
  const func = new Func(canvas, fxz);
  paints = [];
  paints.push(func);
}
