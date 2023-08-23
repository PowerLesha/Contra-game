import Game from "./Game.js";
import * as PIXI from "../lib/pixi.mjs";

let app = new PIXI.Application({
  width: 1900,
  height: 850,
});

const game = new Game(app);

app.ticker.add(game.update, game);
document.body.appendChild(app.view);

document.addEventListener("keydown", function (key) {
  game.keyboardProcessor.onKeyDown(key);
});

document.addEventListener("keyup", function (key) {
  game.keyboardProcessor.onKeyUp(key);
});
