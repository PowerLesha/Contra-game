import Game from "./Game.js";
import * as PIXI from "../pixi/pixi.mjs";

let app = new PIXI.Application({
  width: 1480,
  height: 768,
});

const game = new Game(app);

app.ticker.add(game.update, game);
document.body.appendChild(app.view);
