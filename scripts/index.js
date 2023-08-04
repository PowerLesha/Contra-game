import Game from "./Game.js";
import * as PIXI from "../pixi/pixi.mjs";

let app = new PIXI.Application({
  width: 1480,
  height: 768,
});

document.body.appendChild(app.view);

new Game(app);
